/** VARIABLES */
let arpeta = DriveApp.getFolderById('1-mDMURZspRdUmLKEjCqYb4rGyy5eP3AQ');
var da = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ISAGEN");
var bdisa = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("BD_ISAGEN");  
let fechaisa = da.getRange('B1').getValue();  
let fechafiltro =  Utilities.formatDate(new Date(fechaisa),"GMT","dd-MM-yyyy");
let fechahoja = Utilities.formatDate(new Date(fechaisa),"GMT","dd/MM/yyyy");


function probar(){
/** CONSTRUYE EL NOMBRE DEL ARCHIVO DE EXCEL A BUSCAR */
let nombre = "Frt10922_"+fechafiltro+"_EnergíaDiario.xls";
Logger.log(nombre);
var destSpreadsheetId = "15LZTDR3gW7yAJ9d69-7HYve4d90z_iFvTnlFfdGmx0E";  // Added
var destSheetName = "BD_ISAGEN";  // Added

fileName =  nombre;
var excelFile = DriveApp.getFilesByName(fileName).next();
var fileId = excelFile.getId();
var blob = excelFile.getBlob();
var resource = {title: excelFile.getName().replace(/.xlsx?/, "")};  // Modified
var sourceSpreadsheet = Drive.Files.insert(resource, blob, {convert: true});  // Modified

var sourceSheet = SpreadsheetApp.openById(sourceSpreadsheet.id).getSheets()[0];
var destSheet = SpreadsheetApp.openById(destSpreadsheetId).getSheetByName(destSheetName);
var values = sourceSheet.getDataRange().getValues();
Logger.log(values);
let c = values.map(function(r){return [r[1]]});
let d = c.filter(function(q){
  if(typeof q[0]=='number'){
    return true;
  }else{
    return false;
  }
});
d.unshift([fechahoja]);
Logger.log(fechahoja);
let e = transpose(d);

destSheet.getRange(destSheet.getLastRow() + 1, 1, e.length, e[0].length).setValues(e);
} 

function transpose(a) {
    return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) { return r[c]; });
    });
}

