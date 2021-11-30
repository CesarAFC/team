function Obtener_datos_txt (){
  var Resumen = SpreadsheetApp.getActive().getSheetByName('Hoja 10');
  var Sheet = SpreadsheetApp.getActive().getSheetByName("Energia");
  //var Fech = new Date(Sheet.getRange('H1').getValue());
  //var Fech1 = new Date(Sheet.getRange('H1').getValue());
  
  //var FechaC = Fech.getDate();
  //var FechaH = new Date().getDate();
  
  //Logger.log(FechaC);
  //Logger.log(FechaH);
  
 
    

  var Medidores = [['JABONERIA BINACHI','A020','JABONERIA'],
                   ['JABONERIA MAZZONIE','A030','JABONERIA'],
                   ['CALDERAS','A050','CALDERAS'],
                   ['RECIBO Y ALMACENAMIENTO','B040','RECIBO Y ALMACENAMIENTO'],
                   ['DIQUE DE JABONERIA','B200','JABONERIA'],
                   ['SOPLADO BIDONES','A150','SOPLADO'],
                   ['SOPLADO PET','A140','SOPLADO'],
                   ['ENVASES','A160','ENVASES'],
                   ['COMPRESORES DE AIRE-SOPLADO','A130','SOPLADO'],
                   ['SUBESTACION ENVASES 1250 KVA ','D100','ENVASES'],
                   ['SUBESTACION ENVASES 515 KVA','A090','ENVASES'],
                   ['GIANAZZA 440V','A010','REFINERIA FISICA'],
                   ['TIRTUAUX 440V','A110','FRACCIONAMIENTO'],
                   ['BOMBA PATIO VERDE 440V','C170','REFINERIA FISICA'],
                   ['SUBESTACION REFINERIA FISICA 500 KVA','A120','REFINERIA FISICA'],
                   ['SERVICIOS AUX REF FISICA','B210','REFINERIA FISICA'],
                   ['REF QUIMICA 440V','B070','REFINERIA QUIMICA'],
                   ['INTER 440V','A220','REFINERIA QUIMICA'],
                   ['TK´S DE ENVASES 440V','A190','ENVASES'],
                   ['TOTALIZADOR TABLERO 220V','A180','PLANTA'],
                   ['LABORATORIO 220V','A230','LABORATORIO'],
                   ['TOTALIZADOR 220 CEDIS','A280','CEDIS'],
                   ['CALDERA JCT','C060','CALDERAS'],
                   ['TOTALIZADOR 440 CEDIS','C290','CEDIS'],
                   ['MTTO - ALMACEN','A270','MANTENIMEINTO MECANICO'],
                   ['SUBESTACION JABONERIA 400 KVA','A250','JABONERIA'],
                   ['SUBESTACION JABONERIA 500 KVA','A240','JABONERIA'],
                   ['JABONERIA 220V ','C260','JABONERIA']];
  var Carpeta = DriveApp.getFolderById('1-mDMURZspRdUmLKEjCqYb4rGyy5eP3AQ');
  
  var Fech = new Date(Sheet.getRange('H1').getValue());
  const Fech1 = new Date();

  for (var j=0 ; j<28; j++){
  var Nobmbre_doc = Fech.getFullYear().toString()+new String(('0' + (Fech.getMonth()+1)).slice(-2))+Medidores[j][1]+'.txt';
  Logger.log(Nobmbre_doc)
  Archivo= Carpeta.getFilesByName(Nobmbre_doc).next();
  Archivo.getAs(MimeType.CSV);
  Datos=Archivo.getBlob().getDataAsString();
  csvData = Utilities.parseCsv(Datos,';');
  
  var Fecha=Utilities.formatDate(new Date(Fech.getTime()),"GMT","dd/MM/yyyy");
  var Fecha1=Utilities.formatDate(new Date(Fech.getTime() - 24*60*60*1000),"GMT","dd/MM/yyyy");
  var Fecha2=Utilities.formatDate(new Date(Fech.getTime()),"GMT","d/MM/yyyy");
  var Fecha3=Utilities.formatDate(new Date(Fech.getTime() - 24*60*60*1000),"GMT","d/MM/yyyy");
  
  var Datos_filtro = csvData.filter(function (item){
    //Logger.log(item[0] + " "+ item[1])
    return (item[0]==Fecha || item[0]==Fecha1 || item[0]==Fecha2 || item[0]==Fecha3);
    
    });
    var F = new Array ()
    //SpreadsheetApp.getActive().getSheetByName('Hoja 6').getRange(1, 1,csvData.length, csvData[0].length).setValues(csvData);
    //Logger.log(Datos_filtro)
  for (var i=0 ; i<13 ;i++){
    i = 0
    //Logger.log(Datos_filtro[i]+" "+Datos_filtro[i][0])
    if (Datos_filtro[i] != null && (Datos_filtro[i][0]==Fecha1 || Datos_filtro[i][0]==Fecha3 ) && (Datos_filtro[i][1]=='00:00:00' || Datos_filtro[i][1]=='00:30:00' || Datos_filtro[i][1]   =='01:00:00' || Datos_filtro[i][1]=='01:30:00' || Datos_filtro[i][1]=='02:00:00' || Datos_filtro[i][1]=='02:30:00' || Datos_filtro[i][1]=='03:00:00' || Datos_filtro[i][1]=='03:30:00' || Datos_filtro[i][1]=='04:00:00' || Datos_filtro[i][1]=='04:30:00' || Datos_filtro[i][1]=='05:00:00' || Datos_filtro[i][1]=='0:00:00' || Datos_filtro[i][1]=='00:30:00' || Datos_filtro[i][1]   =='01:00:00' || Datos_filtro[i][1]=='01:30:00' || Datos_filtro[i][1]=='2:00:00' || Datos_filtro[i][1]=='2:30:00' || Datos_filtro[i][1]=='3:00:00' || Datos_filtro[i][1]=='3:30:00' || Datos_filtro[i][1]=='4:00:00' || Datos_filtro[i][1]=='4:30:00' || Datos_filtro[i][1]=='5:00:00')){
      
      Datos_filtro[i].shift();
  }else{
    break;
  };
  };
  for (var i=0 ; i<Datos_filtro.length ;i++){
    Logger.log(Datos_filtro[i][1]+' '+Datos_filtro[i][0]+' '+Fecha)
  if(Datos_filtro[i] != null && (Datos_filtro[i][0]==Fecha || Datos_filtro[i][0]==Fecha2 ) && (Datos_filtro[i][1]=='06:30:00' || Datos_filtro[i][1]=='07:00:00' || Datos_filtro[i][1]=='07:30:00' || Datos_filtro[i][1]=='08:00:00' || Datos_filtro[i][1]=='08:30:00' || Datos_filtro[i][1]=='09:00:00' || Datos_filtro[i][1]=='09:30:00' || Datos_filtro[i][1]=='6:30:00' || Datos_filtro[i][1]=='7:00:00' || Datos_filtro[i][1]=='7:30:00' || Datos_filtro[i][1]=='8:00:00' || Datos_filtro[i][1]=='8:30:00' || Datos_filtro[i][1]=='9:00:00' || Datos_filtro[i][1]=='9:30:00' || Datos_filtro[i][1]=='10:00:00' || Datos_filtro[i][1]=='10:30:00' || Datos_filtro[i][1]=='11:00:00' || Datos_filtro[i][1]=='11:30:00' || Datos_filtro[i][1]=='12:00:00' || Datos_filtro[i][1]=='12:30:00' || Datos_filtro[i][1]=='13:00:00' || Datos_filtro[i][1]=='13:30:00' || Datos_filtro[i][1]=='14:00:00' || Datos_filtro[i][1]=='14:30:00' || Datos_filtro[i][1]=='15:00:00' || Datos_filtro[i][1]=='15:30:00' || Datos_filtro[i][1]=='16:00:00' || Datos_filtro[i][1]=='16:30:00'  || Datos_filtro[i][1]=='17:00:00' || Datos_filtro[i][1]=='17:30:00' || Datos_filtro[i][1]=='18:00:00' || Datos_filtro[i][1]=='18:30:00'  || Datos_filtro[i][1]=='19:00:00' || Datos_filtro[i][1]=='19:30:00' || Datos_filtro[i][1]=='20:00:00' || Datos_filtro[i][1]=='20:30:00' || Datos_filtro[i][1]=='21:00:00' || Datos_filtro[i][1]=='21:30:00' || Datos_filtro[i][1]=='22:00:00' || Datos_filtro[i][1]=='22:30:00' || Datos_filtro[i][1]=='23:00:00' || Datos_filtro[i][1]=='23:30:00')){

Logger.log(Datos_filtro[i][1])
Datos_filtro.splice(i,Datos_filtro.length-i);
//Datos_filtro[i].shift();
break;
  };
  };
  
  for (var i=0 ;i<Datos_filtro.length;i++){
     
      //Cambio por acumulado
    if (i !=0){

    var Consumo=parseFloat(Datos_filtro[i][32])+parseFloat(Datos_filtro[i-1][32]);

    Datos_filtro[i].splice(32, 1,Consumo);
    //Datos_filtro[i].splice(2,30)
    }else if (i==0){

    Datos_filtro[i].splice(32, 1,parseFloat(Datos_filtro[i][32]));

  };

};
//Logger.log(Datos_filtro)
Datos_filtro = Datos_filtro.filter(function (item){return ((item[0]==Fecha || item[0]==Fecha2));});
//Resumen.getRange(Resumen.getLastRow()+1,1,Datos_filtro.length,Datos_filtro[0].length).setValues(Datos_filtro);
var D=Datos_filtro.length
//Logger.log(D-1)
if(Datos_filtro[D-1] != null){
Datos_filtro[D-1].splice(0,1,Fecha1);
Datos_filtro[D-1].splice(2,30);
Datos_filtro[D-1].splice(3);
Datos_filtro[D-1].push(Medidores[j][0],Medidores[j][1],Medidores[j][2]);

Sheet.getRange(Sheet.getLastRow()+1, 1, 1, Datos_filtro[D-1].length).setValues(new Array(Datos_filtro[D-1]));
}else{
  Sheet.getRange(Sheet.getLastRow()+1, 1, 1, 6).setValues(new Array([Fecha1,'06:00:00',0,Medidores[j][0],Medidores[j][1],Medidores[j][2]]));

}
  };
  Sheet.getRange('H1').setValue(Utilities.formatDate(new Date(Fech.getTime() + 1*24*60*60*1000),"GMT","dd/MM/yyyy"));

}
