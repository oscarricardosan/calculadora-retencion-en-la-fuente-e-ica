
/**
 * baseUvt (undefined)=> no aplica
 * baseEnPesos (undefined)=> 100%
 * https://www.abcfinanzas.com/wp-content/uploads/2016/12/Tabla-Retenci%C3%B3n-en-la-fuente-2017.pdf
 * https://www.abcfinanzas.com/finanzas-personales/impuestos/tabla-retencion-la-fuente-ano-2018
 */
var conceptosFuente= [
    // {id: 1, label: "SALARIALES: Salarios, y pagos o abonos en cuenta por concepto de ingresos por honorarios y por compensación por servicios personales obtenidos por las personas que informen que no han contratado o vinculado dos (2) o más trabajadores asociados a la actividad.", baseUvt: 87, baseEnPesos: 2981000, porcentajeTarifa: Tabla del Art.383 del ET, aiu: false},
    {id: 2, label: "SALARIALES: Indemnizaciones salariales empleado ingresos superiores a 10 SMMLV (Art. 401-3 E.T.) DUR 1625 1.2.4.1.13", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 20, aiu: false},
    {id: 3, label: "HONORARIOS Y CONSULTORIA: Honorarios y Comisiones (Cuando el beneficiario del pago sea una persona jurídica o asimilada. DUR 1625 Art. 1.2.4.3.1", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 11, aiu: false},
    {id: 4, label: "HONORARIOS Y CONSULTORIA: Honorarios y Comisiones cuando el beneficiario del pago sea una persona natural No declarante (Art. 392 Inc 3), sera del 11% cuando los contratos que se firmen en el año gravable o que la suma de los ingresos con el agente retenedor superen 3.300 uvt ($113.091.000 Uvt año 2017). DUR 1625 Art. 1.2.4.3.1", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 10, aiu: false},
    {id: 5, label: "HONORARIOS Y CONSULTORIA: Por servicios de licenciamiento o derecho de uso de software. Los pagos o abonos en cuenta que se realicen a contribuyentes con residencia o domicilio en Colombia obligados a presentar declaración del Impuesto sobre la renta y complementarios en el país. DUR 1625 Art. 1.2.4.3.1 Parágrafo, para no declarantes la tarifa se aplica segun lo establecido en el numeral 4", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 3.5, aiu: false},
    {id: 6, label: "HONORARIOS Y CONSULTORIA: Por actividades de análisis, diseño, desarrollo, implementación, mantenimiento, ajustes, pruebas, suministro y documentación, fases necesarias en la elaboración de programas de informática, sean o no personalizados, así como el diseño de páginas web y consultoría en programas de informática.  1625 Art. 1.2.4.3.1 Parágrafo para no declarantes la tarifa aplica segun lo establecido en el numeral 4", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 3.5, aiu: false},
    {id: 7, label: "HONORARIOS Y CONSULTORIA: Contratos de consultoria y administración delegada diferentes del numeral 6. (Cuando el beneficiario sea una persona jurídica o asimilada) DUR 1625 Art. 1.2.4.10.2", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 11, aiu: false},
    {id: 8, label: "HONORARIOS Y CONSULTORIA: Contratos de consultoria y administración delegada P.N. No declarantes (La tarifa sera del 11% si cumple con los mismos requisitos del numeral 4) DUR 1625 Art. 1.2.4.10.2", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 10, aiu: false},
    {id: 9, label: "HONORARIOS Y CONSULTORIA: En los contratos de consultoría de obras públicas celebrados con personas  jurídicas por la Nación, los departamentos las Intendencias, las Comisarías, los Municipios , el Distrito Especial e Bogotá los establecimientos públicos, las empresas industriales y comerciales del Estado posea el noventa  por ciento (90%) o más de su capital  social cuyo  remuneración se efectúe con base en el método  de factor multiplicador. DUR 1625 Art. 1.2.4.10.1", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 2, aiu: false},
    {id: 10, label: "HONORARIOS Y CONSULTORIA: Contratos de consultoría en ingeniería de proyectos de infraestructura y edificaciones, que realicen las PN  o PJ pública o privado, las sociedades de hecho, y  demás entidades a favor de PN o PJ y entidades contribuyentes obligadas a presentar declaración de Renta. DUR 1625 Art. 1.2.4.10.3.", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 6, aiu: false},
    {id: 11, label: "HONORARIOS Y CONSULTORIA: Contratos de consultoría en ingeniería de proyectos de infraestructura y edificaciones, a favor de PN  No obligadas a presentar declaración de Renta.  La retencion para PN o Uniones temporales Sera del 6% en los casos señalados en el numeral 4.  DUR 1625 Art. 1.2.4.10.3.", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 10, aiu: false},
    {id: 12, label: "HONORARIOS Y CONSULTORIA: Prestación de servicios de sísmica para el sector hidrocarburos. Pagos o abonos en cuenta que realicen las personas jurídicas, las sociedades de hecho y las demás entidades y personas naturales  a PN, PJ o asimiladas obligados a declarar renta. DUR 1625 Art. 1.2.4.4.13. Para No declarantes de renta la tarifa es del 10%", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 6, aiu: false},
    {id: 13, label: "SERVICIOS: Servicios en general personas jurídicas y asimiladas y PN declarantes de renta. DUR 1625 Art. 1.2.4.4.14.", baseUvt: 4, baseEnPesos: 137000, porcentajeTarifa: 4, aiu: false},
    {id: 14, label: "SERVICIOS: Servicios en general PN no declarantes de renta. DUR 1625 Art. 1.2.4.4.14.", baseUvt: 4, baseEnPesos: 137000, porcentajeTarifa: 6, aiu: false},
    {id: 15, label: "SERVICIOS: Servicios de transporte nacional de carga (terrestre, aéreo o marítimo) DUR 1625 Art. 1.2.4.4.8.", baseUvt: 4, baseEnPesos: 137000, porcentajeTarifa: 1, aiu: false},
    {id: 16, label: "SERVICIOS: Servicios de Transporte nacional de pasajeros (terrestre). DECLARANTES Y  NO DECLARANTE DUR 1625 Art. 1.2.4.10.6.", baseUvt: 27, baseEnPesos: 925000, porcentajeTarifa: 3.5, aiu: false},
    {id: 17, label: "SERVICIOS: Servicio de transporte nacional de pasajeros (aéreo y marítimo)  DUR 1625 Art. 1.2.4.4.6.", baseUvt: 4, baseEnPesos: 137000, porcentajeTarifa: 1, aiu: false},
    {id: 18, label: "SERVICIOS: Servicios prestados por Empresas Temporales de Empleo. (Sobre AIU Mayor o igual a 4 uvt) DUR 1625 Art. 1.2.4.4.10.", baseUvt: 4, baseEnPesos: 137000, porcentajeTarifa: 1, aiu: false},
    {id: 19, label: "SERVICIOS: Servicios de vigilancia y aseo prestados por empresas de vigilancia y aseo. (Sobre AIU Mayor o igual a 4 uvt). DUR 1625 Art. 1.2.4.4.10.", baseUvt: 4, baseEnPesos: 137000, porcentajeTarifa: 2, aiu: false},
    {id: 20, label: "SERVICIOS: Los servicios integrales de salud que involucran servicios calificados y no calificados, prestados a un usuario por instituciones prestadoras de salud IPS, que comprenden hospitalización, radiología, medicamentos, exámenes y análisis de laboratorios clínicos (Art. 392 Inc 5 E.T.) DUR 1625 Art. 1.2.4.4.12.", baseUvt: 4, baseEnPesos: 137000, porcentajeTarifa: 2, aiu: false},
    {id: 21, label: "SERVICIOS: Arrendamiento de Bienes Muebles. DUR 1625 Art. 1.2.4.4.10.", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 4, aiu: false},
    {id: 22, label: "SERVICIOS: Arrendamiento de Bienes Inmuebles. DECLARANTES Y NO DECLARANTES. DUR 1625 Art. 1.2.4.10.6.", baseUvt: 27, baseEnPesos: 925000, porcentajeTarifa: 3.5, aiu: false},
    {id: 23, label: "SERVICIOS: Por emolumentos eclesiásticos efectuados a personas naturales que sean 'declarantes de renta' DUR 1625 Art. 1.2.4.10.9.", baseUvt: 27, baseEnPesos: 925000, porcentajeTarifa: 4, aiu: false},
    {id: 24, label: "SERVICIOS: Por emolumentos eclesiásticos efectuados a personas naturales  que no sean declarantes de renta. DUR 1625 Art. 1.2.4.10.9.", baseUvt: 27, baseEnPesos: 925000, porcentajeTarifa: 3.5, aiu: false},
    {id: 25, label: "SERVICIOS: Servicio de Hoteles , Restaurantes y Hospedajes.  DECLARANTES Y NO DECLARANTES DUR 1625 Art. 1.2.4.10.6.", baseUvt: 4, baseEnPesos: 137000, porcentajeTarifa: 3.5, aiu: false},
    {id: 26, label: "SERVICIOS: Contratos de construcción, urbanización y en general confección de obra material de bien inmueble. DUR 1625 Art. 1.2.4.9.1.", baseUvt: 27, baseEnPesos: 925000, porcentajeTarifa: 2, aiu: false},
    {id: 27, label: "COMPRAS: Compras y otros ingresos tributarios en general DECLARANTE DUR 1625 Art. 1.2.4.9.1.", baseUvt: 27, baseEnPesos: 925000, porcentajeTarifa: 2.5, aiu: false},
    {id: 28, label: "COMPRAS: Compras y otros ingresos tributarios en general NO DECLARANTE DUR 1625 Art. 1.2.4.9.1.", baseUvt: 27, baseEnPesos: 925000, porcentajeTarifa: 3.5, aiu: false},
    {id: 29, label: "COMPRAS: Compra de bienes y productos Agrícolas o Pecuarios sin procesamiento industrial . Con procesamiento aplica la retención por compras, o en las compras de café pergamino tipo federación DUR 1625 Art. 1.2.4.6.7.", baseUvt: 92, baseEnPesos: 3153000, porcentajeTarifa: 1.5, aiu: false},
    {id: 30, label: "COMPRAS: Compra de Café Pergamino o cereza. DUR 1625 Art. 1.2.4.6.8.", baseUvt: 160, baseEnPesos: 5483000, porcentajeTarifa: 0.5 , aiu: false},
    {id: 31, label: "COMPRAS: Compra de Combustibles derivados del petróleo a favor de distribuidores mayoristas o minoristas de combustibles. DUR 1625 Art. 1.2.4.10.5.", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 0.1, aiu: false},
    {id: 32, label: "COMPRAS: Adquision de Vehiculos. DUR 1625 Art. 1.2.4.6.9", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 1, aiu: false},
    {id: 33, label: "COMPRAS: Compra de oro por las sociedades de comercialización internacional. DUR 1625 Art. 1.2.4.6.9", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 1, aiu: false},
    {id: 34, label: "COMPRAS: Adquisicion de Bienes raices para vivienda de habitación por las primeras 20.000 uvt.  DUR 1625 Art. 1.2.4.9.1. ", baseUvt: 20000, baseEnPesos: 0, porcentajeTarifa: 1, aiu: false},
    {id: 35, label: "COMPRAS: Adquisicion de Bienes raices para vivienda de habitación sobre el exceso de las primeras 20.000 uvt. DUR 1625 Art. 1.2.4.9.1.", baseUvt: 20000, baseEnPesos: 685400000, porcentajeTarifa: 2.5, aiu: false},
    {id: 36, label: "COMPRAS: Adquisicion de Bienes raices uso diferente a vivienda de habitación. DUR 1625 Art. 1.2.4.9.1.", baseUvt: 27, baseEnPesos: 925000, porcentajeTarifa: 2.5, aiu: false},
    {id: 37, label: "COMPRAS: Enajenación de activos fijos por parte de una persona natural o juridica (Art. 398, 399 y 368-2  E.T.) o venta de bienes inmuebles vendedor persona natual. DUR 1625 Art. 1.2.4.5.1.", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 1, aiu: false},
    {id: 38, label: "OTROS: Pagos a establecimientos comerciales que aceptan como medio de pago las tarjetas débito o crédito. DUR 1625 Art. 1.3.2.1.8.", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 1.5, aiu: false},
    {id: 39, label: "OTROS: Loterías, Rifas, Apuestas y similares. DUR 1625 Art. 1.2.5.1.", baseUvt: 48, baseEnPesos: 1645000, porcentajeTarifa: 20, aiu: false},
    {id: 40, label: "OTROS: Premios obtenidos por el propietario del caballo o can en concursos hípicos o similares. DUR 1625 Art. 1.2.5.4.", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 10, aiu: false},
    {id: 41, label: "OTROS: Colocacion independiente de juegos de suerte y azar. Los ingresos diarios de cada colocador debe exceder de 5 UVT (Art. 401-1 E.T.)", baseUvt: 5, baseEnPesos: 171000, porcentajeTarifa: 3, aiu: false},
    {id: 42, label: "OTROS: Indeminizaciones diferentes a las salariales y a las percibidas en demandas contra el estado (Art. 401-2 E.T.)", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 20, aiu: false},
    {id: 43, label: "OTROS: Rendimientos Financieros Provenientes de titulos de renta fija, contemplados en el Decreto 700 de 1997. DUR 1625 Art. 1.2.4.2.83", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 4, aiu: false},
    {id: 44, label: "OTROS: Rendimientos financieros en general  Art. 395, 396 y DUR 1625 Art. 1.2.4.2.5", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 7, aiu: false},
    {id: 45, label: "OTROS: Rendimienos financieros provenientes de títulos de denominación en moneda extranjera DUR 1625 Art. 1.2.4.2.56", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 4, aiu: false},
    {id: 46, label: "OTROS: Ingresos provenientes de las operaciones realizadas a través de instrumentos financieros derivados.Dcto 2418 de 2013 Art. 1", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 2.5, aiu: false},
    {id: 47, label: "OTROS: Intereses originados en operaciones activas de crédito u operaciones de mutuo comercial. DUR 1625 Art. 1.2.4.2.85", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 2.5, aiu: false},
    {id: 48, label: "OTROS: Dividendos y participaciones gravadas año gravable 2016 y anteriores, No declarantes residentes, sociedades u otras entidades extranjeras, por personas naturales sin residencia en Colombia y por sucesiones ilíquidas de causantes que no eran residentes en Colombia DUR 1625 Art. 1.2.4.7.1.", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 33, aiu: false},
    {id: 49, label: "OTROS: Dividendos y participaciones gravadas año gravable 2016 y anteriores. Declarantes. DUR 1625 Art. 1.2.4.7.1.", baseUvt: 1400, baseEnPesos: 47978000, porcentajeTarifa: 20, aiu: false},
    {id: 50, label: "OTROS: Por actividades de estudios de mercado y la realización de encuestas de opinión pública que se efectúen a las personas jurídicas, las sociedades de hecho y las demás entidades  DUR 1625 Art. 1.2.4.3.1.", baseUvt: 0, baseEnPesos: 1, porcentajeTarifa: 4, aiu: false},


];