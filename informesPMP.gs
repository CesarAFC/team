function OcultarFilas() {
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheets= ss.getSheetByName("PMP - ELECTRICO");
  
  ss.getSheetByName("PMP - ELECTRICO").showRows(13, 350);
  
   for (var i = 13; i <= 350; i++) {
     if(sheets.getRange(i, 4).getValue() == ""){
       sheets.hideRow(sheets.getRange('B'+i+':B350'));
             SpreadsheetApp.flush();
             break;
     }
   }
var sheets1= ss.getSheetByName("PMP - MECANICO");
  
  ss.getSheetByName("PMP - MECANICO").showRows(13, 530);
  
   for (var i = 13; i <= 530; i++) {
     if(sheets1.getRange(i, 4).getValue() == ""){
       sheets1.hideRow(sheets1.getRange('B'+i+':B530'));
             SpreadsheetApp.flush(); 
             break;
     }
   }
var sheets2= ss.getSheetByName("PMP - SERVICIOS");
  
  ss.getSheetByName("PMP - SERVICIOS").showRows(13, 350);
  
   for (var i = 13; i <= 350; i++) {
     if(sheets2.getRange(i, 4).getValue() == ""){
       sheets2.hideRow(sheets2.getRange('B'+i+':B350'));
             SpreadsheetApp.flush();
             break;
     }
   }
var sheets4= ss.getSheetByName("PMP - REFRIGERACION");
  
  ss.getSheetByName("PMP - REFRIGERACION").showRows(13, 350);
  
   for (var i = 13; i <= 350; i++) {
     if(sheets4.getRange(i, 4).getValue() == ""){
       sheets4.hideRow(sheets4.getRange('B'+i+':B350'));
             SpreadsheetApp.flush();
             break;
     }
   }

var sheets3=ss.getSheetByName("GRAFICAS");
EnviarCorreo(sheets,sheets1,sheets2,sheets3,sheets4)
}

function EnviarCorreo(sheets,sheets1,sheets2,sheets3,sheets4) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
    var hoy = new Date(); 
  var mes = Utilities.formatDate(hoy,Session.getTimeZone(), "MM");
  var dia = Utilities.formatDate(hoy,Session.getTimeZone(), "dd");
  var ano = Utilities.formatDate(hoy, Session.getTimeZone(), "YYYY")
  var fecha = dia+"/"+mes+"/"+ano;
  var subject ='Cumplimiento al programa de mantenimiento preventivo '+'-'+dia+'-'+mes+'-'+ano +' ';
  var carpeta = DriveApp.getFoldersByName("INFORMES PMP SEMANA");
  var email='gmunive@alianzateam.com,jhramirez@alianzateam.com,jotorres@alianzateam.com,yeins.valdez@alianzateam.com,practicante.mantenimiento@alianzateam.com,brayan.osorio@alianzateam.com,Dario.villa@alianzateam.com';
  //var email='practicante.mantenimiento@alianzateam.com,brayan.osorio@alianzateam.com';
  var htmlbody='Buen día,<br/> <br/> Se adjunta informe de cumplimiento del programa de mantenimiento preventivo para las especialidades Electrico, Mecanico, Refrigeración y Servicios. <br/><br/><br/>Gracias.<br/> '; 
  //var asunto ='Reporte de Produccion '+linea + ' '+maquina+' '+turno+'  ' +dia+'-'+mes+'-'+ano +'';
  
 
  var url = "https://docs.google.com/spreadsheets/d/1_JufOOkJiIRnBT8hdctwQ0q_rdLWOjr3KuiM95Cwodg/export?".replace("1_JufOOkJiIRnBT8hdctwQ0q_rdLWOjr3KuiM95Cwodg", ss.getId());
    
    var url_ext = 'exportFormat=pdf&format=pdf'        // exportar a formato pdf / csv / xls / xlsx
  + '&size=letter'                // paper size legal / letter / A4       
  + '&portrait=true'                    // orientacion, false para horizontal
  + '&fitw=true&source=labnol'           // fit to page width, false for actual size
  + '&sheetnames=true&printtitle=false' // hide optional headers and footers
  + '&pagenumbers=true&gridlines=false' // hide page numbers and gridlines
  + '&fzr=true'                         // do not repeat row headers (frozen rows) on each page        
  + '&gid=';                            // the sheet's Id
  //printnotes=false             //true/false
  //horizontal_alignment=CENTER  //LEFT/CENTER/RIGHT
  //vertical_alignment=TOP       //TOP/MIDDLE/BOTTOM
  //top_margin=0.00              //All four margins must be set!
  //bottom_margin=0.00           //All four margins must be set!
  //left_margin=0.00             //All four margins must be set!
  //right_margin=0.00            //All four margins must be set!
  var token = ScriptApp.getOAuthToken();
  var blobs = [];
  var carpetacont=carpeta.next();
var response = UrlFetchApp.fetch(url + url_ext + sheets.getSheetId(), {
      headers: {
        'Authorization': 'Bearer ' +  token
      }
    });
var response1 = UrlFetchApp.fetch(url + url_ext + sheets1.getSheetId(), {
      headers: {
        'Authorization': 'Bearer ' +  token
      }
    });   
var response2 = UrlFetchApp.fetch(url + url_ext + sheets2.getSheetId(), {
      headers: {
        'Authorization': 'Bearer ' +  token
      }
    });   
var response3 = UrlFetchApp.fetch(url + url_ext + sheets3.getSheetId(), {
      headers: {
        'Authorization': 'Bearer ' +  token
      }
    });
var response4 = UrlFetchApp.fetch(url + url_ext + sheets4.getSheetId(), {
      headers: {
        'Authorization': 'Bearer ' +  token
      }
    });

    
blobs[0] = response.getBlob().setName('ESTADO PMP - ELECTRICO'+'.pdf');
carpetacont.createFile(blobs[0]);
    Logger.log("Storage Space used: " + DriveApp.getStorageUsed());

blobs[1] = response1.getBlob().setName('ESTADO PMP - MECANICO'+'.pdf');
carpetacont.createFile(blobs[1]);
    Logger.log("Storage Space used: " + DriveApp.getStorageUsed());
    
blobs[2] = response2.getBlob().setName('ESTADO PMP - SERVICIOS'+'.pdf');
carpetacont.createFile(blobs[2]);
    Logger.log("Storage Space used: " + DriveApp.getStorageUsed());
blobs[3] = response3.getBlob().setName('INFORME'+'.pdf');
carpetacont.createFile(blobs[3]);
    Logger.log("Storage Space used: " + DriveApp.getStorageUsed());
blobs[4] = response4.getBlob().setName('ESTADO PMP - REFRIGERACIÓN'+'.pdf');
carpetacont.createFile(blobs[4]);
    Logger.log("Storage Space used: " + DriveApp.getStorageUsed());


    if (MailApp.getRemainingDailyQuota() > 0) 
     
     GmailApp.sendEmail(email, subject, htmlbody, {cc:'wilmer.escobar@alianzateam.com,jorge.villalobos@alianzateam.com',attachments:[blobs[0],blobs[1],blobs[2],blobs[3],blobs[4]],htmlBody:htmlbody});
    SpreadsheetApp.getActiveSpreadsheet().toast("Mensaje Enviado", "Informe de PMP");
}
