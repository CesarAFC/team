var ss = SpreadsheetApp.openById("1Kysrh0JhWoafH3llLCdKpCpkVGWIFQIKr5EOpib_4b0");
var ws = ss.getSheetByName("Codigos");
var ws2 = ss.getSheetByName("Pedidos");
var ws3 = ss.getSheetByName("Helpers");
var user = Session.getActiveUser();

function doGet() {

  return HtmlService.createTemplateFromFile("indexprueba").evaluate().setFaviconUrl("https://alianzateam.com/wp-content/uploads/2019/11/favicon-1.png").setTitle("Pedido de Insumos - Alianza Team ®");
  
}

function obtenerdatos(){

var datos = ws.getRange(2,1,ws.getLastRow()-1,5).getValues();
var i = 0;
var datosHtml = datos.map(function(r){
 
  if(i==0){
i=i+1
    return ["<tr><th>"+r[0]+"</th><th>"+r[1]+"</th><th>"+r[2]+"</th><th style='display:none;'>"+r[3]+"</th><th>Cantidad a pedir</th><th>Añadir</th></tr>"]


  }else{
    i=i+1
    return ["<tr><td>"+r[0]+"</td><td>"+r[1]+"</td><td>"+r[2]+"</td><td style='display:none;'>"+r[3]+"</td><td><input id ='input"+(i-1)+"' type='number' class='form-control'></input></td><td><button id='"+(i-1)+"' type='button' value='"+(i-1)+"' onclick='añadir(this)' class='btn btn-success'>Añadir</button></td></tr>"]

  }}).join(' ');

return datosHtml;

}

function anadirDatos(datostabla){
ws2.appendRow([new Date().getTime().toString(), Utilities.formatDate(new Date(),"GMT","dd/MM/yyyy"), datostabla.codigo, datostabla.desc, datostabla.clase, datostabla.cant, datostabla.leadT,"Pendiente",user]);
//Logger.log(datospedidos())
return datospedidos();
}



function datospedidos(){
var datapedidos = ws2.getRange(2,1,ws2.getLastRow(),9).getValues();
var datosfil = datapedidos.filter(  
  function(row){ 
    Utilities.formatDate(new Date(row[1]),"GMT","dd/MM/yyyy")
  return row[8] == user &&  Utilities.formatDate(new Date(row[1]),"GMT","dd/MM/yyyy") == Utilities.formatDate(new Date(),"GMT","dd/MM/yyyy")
}
);

var datosprueba = datosfil.map(function(r){return [r[0].toString(), Utilities.formatDate(new Date(r[1]),"GMT","dd/MM/yyyy"),r[2].toString(),r[3].toString(),r[6].toString(),r[5].toString(),r[8].toString()]; })

Logger.log(datosprueba)
return datosprueba;

}

function deleteData(ID){ 
    ID.toString();
    var datosdelete = ws2.getRange(2,1,ws2.getLastRow(),1).getValues();
    var gogle = datosdelete.map(function(q){return q[0].toString()});
    var indexar = gogle.indexOf(ID);
    ws2.deleteRow(indexar+2);

  return datospedidos();
}


function editData1(idnt,cantnueva){
  idnt.toString();
  var datosedit = ws2.getRange(2,1,ws2.getLastRow(),6).getValues();
  var gle = datosedit.filter(function(p){return p[0]==idnt});
  var buscarindex = datosedit.map(function(q){return q[0].toString()})
  var indexart = buscarindex.indexOf(idnt);
  var datoseditar = gle.map(function(r){return r })
  datoseditar[0].pop();
  datoseditar[0].push(cantnueva);
  Logger.log(indexart);

  ws2.getRange(indexart+2,1,1,datoseditar[0].length).setValues(datoseditar);
  return datospedidos();
}






