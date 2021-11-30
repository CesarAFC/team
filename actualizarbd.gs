var address = '138.121.202.66:1433';
var user = 'SAIMREAD';
var userPwd = 'A$ppi177Mcxo';
var db = 'SAIM_TEAMBAQ';
var dbUrl = 'jdbc:sqlserver://' + address + ';databaseName=' + db;

function IMPORTAR_DATOS() {
    var P1='148yDZr1kjXBKG4llqQoEkt90MNXdj0P1vT3SbYIr9U0'; 
    //var P1='1-wiDbYDJkqg_n_anW3nWfp1cfryxrc6KJPkbWN43RjY';
    var P2='BD_SAIM'; 
    ConsSQL=bibliotecaSQL(1);
    consultaEstadisticas(ConsSQL,P1,P2);
    //organizar();
}

function consultaEstadisticas(ConsSQL,Archivo,nomHoja) {
  var connection = Jdbc.getConnection(dbUrl, user, userPwd);
  //var stm = connection.createStatement().setQueryTimeout(5);
  var SQLstatement = connection.createStatement();
  var result = SQLstatement.executeQuery(ConsSQL);
  var numCols = result.getMetaData().getColumnCount();
  var Libro = SpreadsheetApp.openById(Archivo);
  var Hoja = Libro.getSheetByName(nomHoja);

  Hoja.clearContents();
  //Hoja.clear();
 
  var cell = Hoja.getRange('A3');
  
  for(var i=0; i<numCols; i++) {
      var nomColumna=result.getMetaData().getColumnName(i+1);
      cell.offset(0, i).setValue(nomColumna);
      Logger.log(nomColumna)   
    }
  
  var cell = Hoja.getRange('A4');
  var row = 0;
  while(result.next()) {
    //if(row > 12620){
      for(var i=0; i<numCols; i++) {   
        cell.offset(row, i).setValue(result.getString(i+1));
      }
    //}
  row++;
 }
 

  result.close();
  SQLstatement.close();
  connection.close();

  

}

function bibliotecaSQL(codConsulta){
  var Consulta="";
  switch(codConsulta){
    case 1: 
      Consulta=Consulta+"select Estado, Orden, Especialidad, [Fecha Creación], Activo, [Nombre de Activo], Título, [Firma Resposanble], [Firma Supervisor], [Firma Coordinador] from dbo.OrdenExcel where Orden like '%21' and not Especialidad = 'MET' ";
      break;
       
    default:
      Consulta="";
      break;
      
  }

  return Consulta;
 }


function organizar(){
   
   var wss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('BD_SAIM'); 
   var datos = wss.getRange(4,4,wss.getLastRow(),1).getValues();
   
   var nueva = datos.map(function(r){
     if(typeof r[0]=='string'){

       r[0] = r[0].substr(3,2)+'/'+r[0].substr(0,2)+'/'+r[0].substr(6,4);
       return [r[0]];
     }else{
       r[0] = Utilities.formatDate(new Date(r[0].getTime()),"GMT","dd/MM/yyyy").toString();
       r[0] = r[0].substr(3,2)+'/'+r[0].substr(0,2)+'/'+r[0].substr(6,4);
       return [r[0]];
     }
   });
   wss.getRange(4,4,nueva.length,nueva[0].length).setValues(nueva);

}

function actualizar(){
  try {
  IMPORTAR_DATOS();
  throw 'error';
} catch(e){
Logger.log(e);
} finally {
  organizar();
};
}

function onOpen(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Base de datos OT')
  .addItem('Actualizar', 'IMPORTAR_DATOS')
  .addItem('Organizar', 'organizar')
  .addToUi();
};
