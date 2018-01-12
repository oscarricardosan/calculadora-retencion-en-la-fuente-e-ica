
/**
 * baseUvt (undefined)=> no aplica
 * baseEnPesos (undefined)=> 100%
 * https://www.abcfinanzas.com/wp-content/uploads/2016/12/Tabla-Retenci%C3%B3n-en-la-fuente-2017.pdf
 * https://www.abcfinanzas.com/finanzas-personales/impuestos/tabla-retencion-la-fuente-ano-2018
 */
var conceptosFuente= [
    {id: 1, label: 'Compras generales (declarantes)', baseUvt: 27, baseEnPesos: 895000, porcentajeTarifa: 2.5, aiu: false},
    {id: 2, label: 'Compras generales (no declarantes)', baseUvt: 27, baseEnPesos: 895000, porcentajeTarifa: 3.5, aiu: false},
    {id: 3, label: 'Compras con tarjeta débito o crédito', baseUvt: 0, baseEnPesos: undefined, porcentajeTarifa: 1.5, aiu: false},
    {id: 4, label: 'Compras de bienes o productos agrícolas o pecuarios sin procesamiento industrial ', baseUvt: 92, baseEnPesos: 3050000, porcentajeTarifa: 1.5, aiu: false},
    {id: 5, label: 'Compras de bienes o productos agrícolas o pecuarios con procesamiento industrial (declarantes) ', baseUvt: 27, baseEnPesos: 895000, porcentajeTarifa: 2.5, aiu: false},
    {id: 6, label: 'Compras de bienes o productos agrícolas o pecuarios con procesamiento industrial declarantes (no declarantes)', baseUvt: 27, baseEnPesos: 895000, porcentajeTarifa: 3.5, aiu: false},
    {id: 7, label: 'Compras de café pergamino o cereza', baseUvt: 160, baseEnPesos: 5305000, porcentajeTarifa: 0.5, aiu: false},
    {id: 8, label: 'Compras de combustibles derivados del petróleo', baseUvt: 0, baseEnPesos: undefined, porcentajeTarifa: 0.1, aiu: false},
    {id: 9, label: 'Enajenación de activos fijos de personas naturales (notarías y tránsito son agentes retenedores)', baseUvt: 0, baseEnPesos: undefined, porcentajeTarifa: 1, aiu: false},
    {id: 10, label: 'Compras de vehículos', baseUvt: 0, baseEnPesos: undefined, porcentajeTarifa: 1, aiu: false},
    {id: 11, label: 'Compras de bienes raíces cuya destinación y uso sea vivienda de habitación (por las primeras 20.000 UVT, es decir hasta $637.780.000)', baseUvt: 0, baseEnPesos: undefined, porcentajeTarifa: 1, aiu: false},
    {id: 12, label: 'Compras de bienes raíces cuya destinación y uso sea vivienda de habitación (exceso de las primeras 20.000 UVT, es decir superior a $637.780.000)', baseUvt: 20000, baseEnPesos: 663120000, porcentajeTarifa: 2.5, aiu: false},
    {id: 13, label: 'Compras de bienes raíces cuya destinación y uso sea distinto a vivienda de habitación', baseUvt: 0, baseEnPesos: undefined, porcentajeTarifa: 2.5, aiu: false},
    {id: 14, label: 'Servicios generales (declarantes)', baseUvt: 4, baseEnPesos: 133000, porcentajeTarifa: 4, aiu: false},
    {id: 15, label: 'Servicios generales (no declarantes)', baseUvt: 4, baseEnPesos: 133000, porcentajeTarifa: 6, aiu: false},
    {id: 16, label: 'Por emolumentos eclesiásticos (declarantes) ', baseUvt: 27, baseEnPesos: 895000, porcentajeTarifa: 4, aiu: false},
    {id: 17, label: 'Por emolumentos eclesiásticos (no declarantes) ', baseUvt: 27, baseEnPesos: 895000, porcentajeTarifa: 3.5, aiu: false},
    {id: 18, label: 'Servicios de transporte de carga', baseUvt: 4, baseEnPesos: 133000, porcentajeTarifa: 1, aiu: false},
    {id: 19, label: 'Servicios de transporte nacional de pasajeros por vía terrestre (declarantes)', baseUvt: 27, baseEnPesos: 895000, porcentajeTarifa: 3.5, aiu: false},
    {id: 20, label: 'Servicios de transporte nacional de pasajeros por vía terrestre (no declarantes)', baseUvt: 27, baseEnPesos: 895000, porcentajeTarifa: 3.5, aiu: false},
    {id: 21, label: 'Servicios de transporte nacional de pasajeros por vía aérea o marítima', baseUvt: 4, baseEnPesos: 133000, porcentajeTarifa: 1, aiu: false},
    {id: 22, label: 'Servicios prestados por empresas de servicios temporales (sobre AIU)', baseUvt: 4, baseEnPesos: 133000, porcentajeTarifa: 1, aiu: true},
    {id: 23, label: 'Servicios prestados por empresas de vigilancia y aseo (sobre AIU)', baseUvt: 4, baseEnPesos: 133000, porcentajeTarifa: 2, aiu: true},
    {id: 24, label: 'Servicios integrales de salud prestados por IPS', baseUvt: 4, baseEnPesos: 133000, porcentajeTarifa: 2, aiu: false},
    {id: 25, label: 'Servicios de hoteles y restaurantes (declarantes) ', baseUvt: 4, baseEnPesos: 133000, porcentajeTarifa: 3.5, aiu: false},
    {id: 26, label: 'Servicios de hoteles y restaurantes (no declarantes) ', baseUvt: 4, baseEnPesos: 133000, porcentajeTarifa: 3.5, aiu: false},
    {id: 27, label: 'Arrendamiento de bienes muebles', baseUvt: 0, baseEnPesos: undefined, porcentajeTarifa: 4, aiu: false},
    {id: 28, label: 'Arrendamiento de bienes inmuebles (declarantes)', baseUvt: 27, baseEnPesos: 895000, porcentajeTarifa: 3.5, aiu: false},
    {id: 29, label: 'Arrendamiento de bienes inmuebles (no declarantes)', baseUvt: 27, baseEnPesos: 895000, porcentajeTarifa: 3.5, aiu: false},
    {id: 30, label: 'Otros ingresos tributarios (declarantes)', baseUvt: 27, baseEnPesos: 895000, porcentajeTarifa: 2.5, aiu: false},
    {id: 31, label: 'Otros ingresos tributarios (no declarantes)', baseUvt: 27, baseEnPesos: 895000, porcentajeTarifa: 3.5, aiu: false},
    {id: 32, label: 'Honorarios y comisiones (personas jurídicas)', baseUvt: 0, baseEnPesos: undefined, porcentajeTarifa: 11, aiu: false},
    {id: 33, label: 'Honorarios y comisiones personas naturales que suscriban contrato o cuya sumatoria de los pagos o abonos en cuenta superen las 3.300 UVT ($105.135.000)', baseUvt: 0, baseEnPesos: undefined, porcentajeTarifa: 11, aiu: false},
    {id: 34, label: 'Honorarios y comisiones (no declarantes)', baseUvt: 0, baseEnPesos: undefined, porcentajeTarifa: 10, aiu: false},
    {id: 35, label: 'Servicios de licenciamiento o derecho de uso de software', baseUvt: 0, baseEnPesos: undefined, porcentajeTarifa: 3.5, aiu: false},
    {id: 36, label: 'Intereses o rendimientos financieros', baseUvt: 0, baseEnPesos: undefined, porcentajeTarifa: 7, aiu: false},
    {id: 37, label: 'Rendimientos financieros provenientes de títulos de renta fija ', baseUvt: 0, baseEnPesos: undefined, porcentajeTarifa: 4, aiu: false},
    {id: 38, label: 'Loterías, rifas, apuestas y similares', baseUvt: 48, baseEnPesos: 1591000, porcentajeTarifa: 20, aiu: false},
    {id: 39, label: 'Retención en colocación independiente de juegos de suerte y azar ', baseUvt: 5, baseEnPesos: 166000, porcentajeTarifa: 3, aiu: false},
    {id: 40, label: 'Contratos de construcción y urbanización', baseUvt: 0, baseEnPesos: undefined, porcentajeTarifa: 2, aiu: false},
];