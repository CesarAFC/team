/** --------------------------------------------------------------------------------------------------------------- */
/** ---------------------------------------------- VARIABLES ------------------------------------------------------ */
/** --------------------------------------------------------------------------------------------------------------- */
let carpeta = DriveApp.getFolderById('1TsnlvoDVJJZWRV2IbT-Ghsctnwo7T-2X');
let filtro = DriveApp.getFolderById('1nR9wtnd1VwF3_YabWp4loGi8jiUD8FZA');
let ids = [];
let ss = SpreadsheetApp.openById('1ghf0ngrt5tvU32yOjIyEggq-5oNOU9h_zEyliq1toG0');
let ws = ss.getSheetByName('FACTURAS');
/** --------------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------------- */
/** ---------------------------CLASIFICA LOS PDF'S EN LA CARPETA Y LOS ENVIA AL FOLDER CORRESPONDIENTE ------------ */
/** --------------------------------------------------------------------------------------------------------------- */
function myFunction() {

  let provds = ws.getRange(2,1,ws.getLastRow(),3).getValues();
  let proveedores = provds.filter(function(x){ if(typeof x[0]=="string"){return false;}else{return true;}});
  Logger.log(proveedores)

  for(var i =0;i<proveedores.length;i++){
    var files = carpeta.searchFiles('fullText contains '+ proveedores[i][0] +' and mimeType contains "PDF" and title contains "Scan" ');

    while (files.hasNext()) {
      var file = files.next();
      file.makeCopy(DriveApp.getFolderById(proveedores[i][2]));
      file.setTrashed(true);
      Logger.log(file.getName());
    }
    
  }
}
/** --------------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------------- */
/**------------------------------------------- OBTIENE LOS PDF'S ESCANEADOS ----------------------------------------*/
/** --------------------------------------------------------------------------------------------------------------- */
function correo(){
  var correos = GmailApp.search('label:DIGITALIZACIÒN is:unread ');

  /** MATRIZ CON DATOS DEL CORREO */
  correos.forEach(function(x){

    var r = x.getMessages();
    x.markRead();
    r.forEach(function(b){

        var t = b.getAttachments();
        t.forEach(function(v){

          var l = DriveApp.createFile(v);
          l.makeCopy(carpeta);
          l.setTrashed(true);
        });
    });
  });          
  Logger.log(correos.length);
}
/** --------------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------------- */
/** --------------------------------------BUSCA EL ID DE LAS CARPETAS DE FACTURAS---------------------------------- */
/** --------------------------------------------------------------------------------------------------------------- */
function carpetasfolder(){ 
  let folderprincipal = DriveApp.getFolderById('0AMH4w7hbVJuuUk9PVA');
  let folders = folderprincipal.getFolders() ;
  Logger.log(folders)
 
  while (folders.hasNext()){

    var folder = folders.next();
    Logger.log(folder.getName()+" "+folder.getId());
    ids.push([folder.getId(),folder.getName()]);

  }

  Logger.log(ids)

  Logger.log(provds)
  //ws.getRange(2,1,ids.length,ids[0].length).setValues(ids);

}
/** --------------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------------- */
