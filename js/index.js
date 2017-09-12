var vm;
function iniciar(){
    try{
        vm= new Vue({
            el: '#app',
            data: {
                url_apk_android: 'https://build.phonegap.com/apps/2792307/share',
                url_savne: 'https://www.savne.net/',
                url_web: 'https://calculadora-retenciones.savne.net/',

                error: 'Para hacer el calculo debes completar los campos en rojo',
                calculando: false,
                autoretenedor: false,
                sources: {
                    conceptos: conceptosFuente,
                    ciius_gravados: ciius_gravadosFuente
                },
                base: 0,
                concepto: null,
                ciiu: null,
                valor_cobro: 0,
                valor_a_pagar: 0,
                valor_retencion_ica: 0,
                valor_base_con_retenciones_aplicadas: 0,
                valor_retencion_fuente: 0,
                calcular: function() {
                    if(this.validateData()===false) return false;
                    this.calculando= true;
                    var resultado= this.calcularSinPersistencia(this.base, this.concepto, this.ciiu);
                    this.addResultadoToData(resultado);
                    this.calculando= false;
                },
                validateData: function(){
                    if(this.autoretenedor===false && (this.base<=0 || this.ciiu === null || this.concepto === null)) {
                        this.error='Para hacer el calculo debes completar los campos en rojo';
                        return false;
                    }
                    if(this.autoretenedor===true && (this.base<=0 || this.ciiu === null)) {
                        this.error='Para hacer el calculo debes completar los campos en rojo';
                        return false;
                    }
                    if(this.autoretenedor===false && (this.concepto.baseEnPesos !== undefined && this.base<this.concepto.baseEnPesos)) {
                        this.error=
                            'Base mínima para el concepto "'+this.concepto.label+'" es de '+accounting.formatMoney(this.concepto.baseEnPesos);
                        return false;
                    }
                    this.error= null;
                    return true;
                },
                acercar_calculo: function(){
                    this.calculando= true;

                    if(this.autoretenedor)
                        var base_con_retencion_en_la_fuente= 0;
                    else
                        var base_con_retencion_en_la_fuente= this.base / ((100 - this.concepto.porcentajeTarifa)/100);

                    retencion_con_ica= (this.base * this.ciiu.tarifa)/1000;
                    valor_para_recibir_base_completa= base_con_retencion_en_la_fuente + retencion_con_ica;

                    var valor_deseado= this.base;
                    var valor_cobro= accounting.toFixed(valor_para_recibir_base_completa, 2);
                    do{
                        valor_cobro= (valor_cobro *1) + (100*1);
                        resultado= this.calcularSinPersistencia(valor_cobro, this.concepto, this.ciiu);
                    }while (accounting.toFixed(resultado.valor_a_pagar, 2) < valor_deseado);
                    this.addResultadoToData(resultado);
                    this.base= resultado.valor_cobro;
                    this.calculando= false;
                },
                addResultadoToData: function(resultado){
                    this.valor_retencion_fuente= resultado.valor_retencion_fuente;
                    this.valor_retencion_ica= resultado.valor_retencion_ica;
                    this.valor_a_pagar= resultado.valor_a_pagar;
                    this.valor_cobro= resultado.valor_cobro;

                },
                calcularSinPersistencia: function(base, concepto, ciiu){
                    if(this.autoretenedor)
                        var valor_retencion_fuente= 0;
                    else
                        var valor_retencion_fuente= base * (concepto.porcentajeTarifa/100);
                    var valor_retencion_ica= (base * ciiu.tarifa)/1000;
                    var valor_a_pagar= base - valor_retencion_fuente - valor_retencion_ica;
                    var valor_cobro= base;
                    return {
                        valor_retencion_fuente: valor_retencion_fuente,
                        valor_retencion_ica: valor_retencion_ica,
                        valor_a_pagar: valor_a_pagar,
                        valor_cobro: valor_cobro
                    };
                }

            },
            filters: {
                formatMoney: function (value) {
                    return accounting.formatMoney(value);
                },
                formatNumber: function (value) {
                    return accounting.formatNumber(value);
                }
            },
            watch: {
                autoretenedor: function (val) {
                    this.calcular();
                },
                base: function (val) {
                    this.calcular();
                },
                ciiu: function (val) {
                    this.calcular();
                },
                concepto: function (val) {
                    this.calcular();
                }
            },
            created: function(){
                accounting.settings = {
                    currency: {
                        symbol : "$",   // default currency symbol is '$'
                        format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
                        decimal : ",",  // decimal point separator
                        thousand: ".",  // thousands separator
                        precision : 2   // decimal places
                    },
                    number: {
                        precision : 0,  // default precision on numbers is 0
                        thousand: ".",
                        decimal : ","
                    }
                }
            }
        });
    }
    catch(err) {
        alert('Error: '+err.message);
    }
}
iniciar();
$(document).ready(function(){
    $('.select2').select2();
    $('.conceptos').change();
    $('.ciius_gravados').change();
    $('.ciius_gravados').change(function(){
        if($(this).val()=='')
            vm.ciiu= null;
        else
            vm.ciiu= ciius_gravadosFuente[$(this).val()];
        vm.calcular();
    });
    $('.enlaceExterno').click(function(event){
        event.preventDefault();
        window.open($(this).attr('href'), '_system');
    });
    $('.conceptos').change(function(){
        if($(this).val() === '' || $(this).val() === null)
            vm.ciiu= null;
        else
            vm.concepto= conceptosFuente[$(this).val()];
        vm.calcular();
    });
});

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    window.open = cordova.InAppBrowser.open;
}

