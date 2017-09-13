
/**
 * baseUvt (undefined)=> no aplica
 * baseEnPesos (undefined)=> 100%
 * https://www.abcfinanzas.com/wp-content/uploads/2016/12/Tabla-Retenci%C3%B3n-en-la-fuente-2017.pdf
 */
var conceptosFuente= [
    {id: 1, 'label': 'Compras generales (declarantes)', baseUvt: 27, baseEnPesos: 860000, porcentajeTarifa: 2.5, aiu: false},
    {id: 2, 'label': 'Compras generales (no declarantes)', baseUvt: 27, baseEnPesos: 860000, porcentajeTarifa: 3.5, aiu: false},
    {id: 3, 'label': 'Compras con tarjeta débito o crédito', baseUvt: 0.001, baseEnPesos: undefined, porcentajeTarifa: 1.5, aiu: false},
    {id: 4, 'label': 'Compras de bienes o productos agrícolas o pecuarios sin procesamiento industria', baseUvt: 92.001, baseEnPesos: 2931000, porcentajeTarifa: 1.5, aiu: false},
    {id: 5, 'label': 'Compras de bienes o productos agrícolas o pecuarios con procesamiento industrial (declarantes) ', baseUvt: 27, baseEnPesos: 860000, porcentajeTarifa: 2.5, aiu: false},
    {id: 6, 'label': 'Compras de bienes o productos agrícolas o pecuarios con procesamiento industrial declarantes (no declarantes)', baseUvt: 27, baseEnPesos: 860000, porcentajeTarifa: 3.5, aiu: false},
    {id: 7, 'label': 'Compras de café pergamino o cereza', baseUvt: 160.001, baseEnPesos: 5097000, porcentajeTarifa: 0.5, aiu: false},
    {id: 8, 'label': 'Compras de combustibles derivados del petróleo', baseUvt: 0.001, baseEnPesos: undefined, porcentajeTarifa: 0.1, aiu: false},
    {id: 9, 'label': 'Enajenación de activos fijos de personas naturales (notarías y tránsito son agentes retenedores)', baseUvt: undefined, baseEnPesos: undefined, porcentajeTarifa: 1, aiu: false},
    {id: 10, 'label': 'Compras de vehículos', baseUvt: undefined, baseEnPesos: undefined, porcentajeTarifa: 1, aiu: false},
    {id: 11, 'label': 'Servicios generales (declarantes)', baseUvt: 4, baseEnPesos: 127000, porcentajeTarifa: 4, aiu: false},
    {id: 12, 'label': 'Servicios generales (no declarantes)', baseUvt: 6, baseEnPesos: 127000, porcentajeTarifa: 6, aiu: false},
    {id: 13, 'label': 'Servicios de transporte de carga', baseUvt: 4, baseEnPesos: 127000, porcentajeTarifa: 1, aiu: false},
    {id: 14, 'label': 'Servicios de transporte nacional de pasajeros por vía terrestre (declarantes)', baseUvt: 27, baseEnPesos: 860000, porcentajeTarifa: 3.5, aiu: false},
    {id: 15, 'label': 'Servicios de transporte nacional de pasajeros por vía terrestre (no declarantes)', baseUvt: 27, baseEnPesos: 860000, porcentajeTarifa: 3.5, aiu: false},
    {id: 16, 'label': 'Servicios prestados por empresas de servicios temporales (sobre AIU)', baseUvt: 4, baseEnPesos: 127000, porcentajeTarifa: 1, aiu: true},
    {id: 17, 'label': 'Servicios prestados por empresas de vigilancia y aseo (sobre AIU)', baseUvt: 4, baseEnPesos: 127000, porcentajeTarifa: 2, aiu: true},
    {id: 18, 'label': 'Servicios integrales de salud prestados por IPS', baseUvt: 4, baseEnPesos: 127000, porcentajeTarifa: 2, aiu: false},
    {id: 19, 'label': 'Servicios de hoteles y restaurantes (declarantes) ', baseUvt: 4, baseEnPesos: 127000, porcentajeTarifa: 3.5, aiu: false},
    {id: 10, 'label': 'Servicios de hoteles y restaurantes (no declarantes) ', baseUvt: 4, baseEnPesos: 127000, porcentajeTarifa: 3.5, aiu: false},
    {id: 21, 'label': 'Arrendamiento de bienes muebles', baseUvt: undefined, baseEnPesos: undefined, porcentajeTarifa: 4, aiu: false},
    {id: 22, 'label': 'Arrendamiento de bienes inmuebles (declarantes)', baseUvt: 27, baseEnPesos: 860000, porcentajeTarifa: 3.5, aiu: false},
    {id: 23, 'label': 'Arrendamiento de bienes inmuebles (no declarantes)', baseUvt: 27, baseEnPesos: 860000, porcentajeTarifa: 3.5, aiu: false},
    {id: 24, 'label': 'Honorarios y comisiones (personas jurídicas)', baseUvt: undefined, baseEnPesos: undefined, porcentajeTarifa: 11, aiu: false},
    {id: 25, 'label': 'Honorarios y comisiones personas naturales que suscriban contrato o cuya sumatoria de los pagos o abonos en cuenta superen las 3.300 UVT', baseUvt: undefined, baseEnPesos: undefined, porcentajeTarifa: 11, aiu: false},
    {id: 26, 'label': 'Honorarios y comisiones (no declarantes)', baseUvt: undefined, baseEnPesos: undefined, porcentajeTarifa: 10, aiu: false},
    {id: 27, 'label': 'Servicios de licenciamiento o derecho de uso de software', baseUvt: undefined, baseEnPesos: undefined, porcentajeTarifa: 3.5, aiu: false},
    {id: 28, 'label': 'Intereses o rendimientos financieros', baseUvt: undefined, baseEnPesos: undefined, porcentajeTarifa: 7, aiu: false},
    {id: 29, 'label': 'Contratos de construcción y urbanización', baseUvt: undefined, baseEnPesos: undefined, porcentajeTarifa: 2, aiu: false},
];