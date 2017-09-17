var vm;
function iniciar(){
    try{
        vm= new Vue({
            el: '#app',
            data: {
                url_apk_android: 'https://play.google.com/store/apps/details?id=osg.calculadora.retencionfuente_e_ica',
                url_savne: 'https://www.savne.net/',
                url_web: 'https://calculadora-retenciones.savne.net/',

                error: 'Para hacer el calculo debes completar los campos en rojo',
                calculando: false,
                enviando_email: false,
                sources: {
                    conceptos: conceptosFuente,
                    ciius_gravados: ciius_gravadosFuente
                },
                data_calculadora: {
                    base: 0,
                    autoretenedor: false,
                    concepto: null,
                    ciiu: null,
                    aplica_iva: false,
                },
                data_email: {
                    email: null,
                    fecha: null,
                    ciudad: null,
                    servicios_prestados: [{nombre: ''}],
                    leyenda_al_final: [],
                    cliente: {
                        nombre: null,
                        identificacion: null,
                    },
                    usuario: {
                        nombre: null,
                        identificacion: null,
                        telefono: null,
                    },
                },
                history: [],
                porcentaje_iva: 19,
                valor_iva: 0,
                valor_cobro: 0,
                valor_a_pagar: 0,
                valor_retencion_ica: 0,
                valor_base_con_retenciones_aplicadas: 0,
                valor_retencion_fuente: 0,
                calcular: function() {
                    this.data_calculadora.base= accounting.toFixed(this.data_calculadora.base, 0)*1;
                    if(this.validateData()===false) return false;
                    this.calculando= true;
                    var resultado= this.calcularSinPersistencia(this.data_calculadora.base, this.data_calculadora.concepto, this.data_calculadora.ciiu);
                    this.addResultadoToData(resultado);
                    this.calculando= false;
                    Default_calculatorModel.insertOrUpdate(this.data_calculadora);
                },
                validateData: function(){
                    this.data_calculadora.concepto= this.data_calculadora.concepto===undefined?null:this.data_calculadora.concepto;
                    this.data_calculadora.ciiu= this.data_calculadora.ciiu===undefined?null:this.data_calculadora.ciiu;
                    if(this.data_calculadora.autoretenedor===false && (this.data_calculadora.base<=0 || this.data_calculadora.ciiu === null || this.data_calculadora.concepto === null)) {
                        this.error='Para hacer el calculo debes completar los campos en rojo';
                        return false;
                    }
                    if(this.data_calculadora.autoretenedor===true && (this.data_calculadora.base<=0 || this.data_calculadora.ciiu === null)) {
                        this.error='Para hacer el calculo debes completar los campos en rojo';
                        return false;
                    }
                    if(this.data_calculadora.autoretenedor===false && (this.data_calculadora.concepto.baseEnPesos !== undefined && this.data_calculadora.base<this.data_calculadora.concepto.baseEnPesos)) {
                        this.error=
                            'Base mínima para el concepto "'+this.data_calculadora.concepto.label+'" es de '+accounting.formatMoney(this.data_calculadora.concepto.baseEnPesos);
                        return false;
                    }
                    this.error= null;
                    return true;
                },
                acercar_calculo: function(){
                    this.calculando= true;

                    if(this.data_calculadora.autoretenedor)
                        var base_con_retencion_en_la_fuente= 0;
                    else
                        var base_con_retencion_en_la_fuente= this.data_calculadora.base / ((100 - this.data_calculadora.concepto.porcentajeTarifa)/100);
                    retencion_con_ica= (this.data_calculadora.base * this.data_calculadora.ciiu.tarifa)/1000;
                    valor_para_recibir_base_completa= base_con_retencion_en_la_fuente  + retencion_con_ica;

                    var valor_deseado= this.data_calculadora.base;
                    var valor_cobro= accounting.toFixed(valor_para_recibir_base_completa, 2)*1;

                    do{
                        valor_cobro= (valor_cobro *1) + (100*1);
                        resultado= this.calcularSinPersistencia(valor_cobro, this.data_calculadora.concepto, this.data_calculadora.ciiu);
                    }while (resultado.valor_a_pagar < valor_deseado);
                    this.addResultadoToData(resultado);
                    this.data_calculadora.base= resultado.valor_cobro;
                    this.calculando= false;
                },
                addResultadoToData: function(resultado){
                    this.valor_retencion_fuente= resultado.valor_retencion_fuente;
                    this.valor_retencion_ica= resultado.valor_retencion_ica;
                    this.valor_a_pagar= resultado.valor_a_pagar;
                    this.valor_cobro= resultado.valor_cobro;
                    this.valor_iva= resultado.valor_iva;

                },
                calcularSinPersistencia: function(base, concepto, ciiu){
                    if(this.data_calculadora.autoretenedor)
                        var valor_retencion_fuente= 0;
                    else
                        var valor_retencion_fuente= base * (concepto.porcentajeTarifa/100);

                    if(this.data_calculadora.aplica_iva)
                        var valor_iva= base * (this.porcentaje_iva/100);
                    else
                        var valor_iva=0;

                    var valor_retencion_ica= (base * ciiu.tarifa)/1000;

                    var valor_a_pagar= base - valor_retencion_fuente - valor_retencion_ica - valor_iva;
                    var valor_cobro= base;
                    return {
                        valor_retencion_fuente: accounting.toFixed(valor_retencion_fuente, 2)*1,
                        valor_retencion_ica: accounting.toFixed(valor_retencion_ica, 2)*1,
                        valor_a_pagar: accounting.toFixed(valor_a_pagar, 2)*1,
                        valor_iva: accounting.toFixed(valor_iva, 2)*1,
                        valor_cobro: accounting.toFixed(valor_cobro, 2)*1
                    };
                },
                now: function(){
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth()+1; //January is 0!
                    if(dd<10) dd = '0'+dd;
                    if(mm<10) mm = '0'+mm;
                    return today.getFullYear()+'-'+mm+'-'+dd;
                },
                now_with_time: function(){
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth()+1; //January is 0!
                    var HH = today.getHours(); //January is 0!
                    var mi = today.getMinutes(); //January is 0!
                    var ss = today.getSeconds(); //January is 0!
                    if(dd<10) dd = '0'+dd;
                    if(mm<10) mm = '0'+mm;
                    if(HH<10) HH = '0'+HH;
                    if(mi<10) mi = '0'+mi;
                    if(ss<10) ss = '0'+ss;
                    return today.getFullYear()+'-'+mm+'-'+dd+' '+HH+':'+mi+':'+ss;
                },
                enviarEmail: function(){
                    data= this.data_email;
                    data.valor= this.data_calculadora.base;
                    data.token_= "KlculatorUs3r64AS_fgbjhdbJvFF545FJVWhoptr_hi";
                    this.enviando_email= true;
                    var request = $.ajax({
                        url: "https://calculadora-retenciones-server.savne.net/simple_api/sendMail",
                        jsonp: "callback",
                        dataType: "jsonp",
                        data: vm.data_email
                    });
                    request.done(function(respon){
                        alert(respon.message);
                        if(respon.success){
                            Default_emailModel.insertOrUpdate(vm.data_email);
                            HistoryModel.store({
                                data_email: vm.data_email,
                                data_calculadora: vm.data_calculadora,
                                fecha: vm.now_with_time()
                            });
                            $('#modalEmail').modal('hide');
                            vm.enviando_email= false;
                            vm.history= HistoryModel.get();
                        }
                    });
                    request.fail(function(jqXHR, textStatus) {
                        alert('Error al enviar email. Intentelo más tarde. '+textStatus);
                        vm.enviando_email= false;
                    });
                },
                agregarServicio: function(){
                    this.data_email.servicios_prestados.push({nombre: ''});
                },
                retirarServicio: function(servicio){
                    this.data_email.servicios_prestados.splice(
                        this.data_email.servicios_prestados.indexOf(servicio), 1
                    );
                },
                cagarDesdeHistorial: function(registro){
                    this.data_email= registro.data_email;
                    this.data_calculadora= registro.data_calculadora;
                    $('#modalHistory').modal('hide');
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
                data_calculadora: {
                    handler: function (val, oldVal) { this.calcular(); },
                    deep: true
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
                };
                this.data_email.fecha= this.now();
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

    $('.ciius_gravados').change();
    $('.ciius_gravados').change(function(){
        if($(this).val()=='')
            vm.data_calculadora.ciiu= null;
        else
            vm.data_calculadora.ciiu= _.findWhere(vm.sources.ciius_gravados, {id: $(this).val()*1});
        vm.calcular();
    });

    $('.conceptos').change();
    $('.conceptos').change(function(){
        if($(this).val() === '' || $(this).val() === null)
            vm.data_calculadora.concepto= null;
        else
            vm.data_calculadora.concepto= _.findWhere(vm.sources.conceptos, {id: $(this).val()*1});
        vm.calcular();
    });


    $('.enlaceExterno').click(function(event){
        event.preventDefault();
        window.open($(this).attr('href'), '_system');
    });
    addDefaultValues();
});


function addDefaultValues(){
    Default_calculatorModel.loaded(function(){
        if(!Default_calculatorModel.isEmpty()){
            defaultCalculator= Default_calculatorModel.get();
            vm.data_calculadora= defaultCalculator;

            $('.ciius_gravados').val(defaultCalculator.ciiu.id);
            $('.ciius_gravados').change();

            $('.conceptos').val(defaultCalculator.concepto.id);
            $('.conceptos').change();
            $('.baseField').val(defaultCalculator.base).focus().blur();
        }
    });
    Default_emailModel.loaded(function(){
        if(!Default_emailModel.isEmpty()){
            vm.data_email= Default_emailModel.get();
            window.setTimeout(function(){$('#modalEmail *').blur();}, 500);
            window.setTimeout(function(){$('#modalEmail *').blur();}, 1000);
        }
    });
    HistoryModel.loaded(function(){
        if(!HistoryModel.isEmpty()){
            vm.history= HistoryModel.get();
        }
    });
}


Default_emailModel.loaded(function(){
    //console.log(Default_calculatorModel.get());
});




/** Ready on mobiles **/
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    window.open = cordova.InAppBrowser.open;
}