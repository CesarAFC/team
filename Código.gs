var lin = 'https://docs.google.com/spreadsheets/d/1uIFGP5Pw1UXCwLJZbdkEMIlqjbtOiSxC1jfLDOH_5pY/edit#gid=1347388017';
var lin2 = 'https://docs.google.com/spreadsheets/d/15LZTDR3gW7yAJ9d69-7HYve4d90z_iFvTnlFfdGmx0E/edit#gid=0';


function doGet() {
  return HtmlService.createTemplateFromFile("index").evaluate().setFaviconUrl("https://alianzateam.com/wp-content/uploads/2019/11/favicon-1.png").setTitle("Lecturas diarias - ALIANZA TEAM");
}

//agregar una nueva columna

//function addnewrow(rowData){

//Generar ID's letras y números
var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
var ID_LENGTH = 8;
function cesar(){
    var rtn = "";
    for (var i = 0; i < ID_LENGTH; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
     }  
  return rtn;  
}


//Agregar datos a la fila en la hoja de DATOS-MEDIDORES
function addnewrow(rowData){
  
  var ss  = SpreadsheetApp.openByUrl(lin2);
  var ws  = ss.getSheetByName('Datos');

  var Inicio = Utilities.formatDate(new Date(new Date(rowData.fech).valueOf()-24*60*60*1000),"GMT","dd/MM/yyyy")
  var Ultima_fila = ws.getLastRow();
  var rango = "A12398"+":F"+Ultima_fila
  var Datos1 = ws.getRange(rango).getValues();

  var Filtro =Datos1.filter(function (item){return (Utilities.formatDate(item[1],"GMT","dd/MM/yyyy")==Inicio && item[2]==rowData.categoria && item[3]==rowData.nombre && item[4]==rowData.equipos)});
  var Col5 = Filtro.map(function(col){return col[5]});
  Col5.length=1;
  //var Maxi= Math.max.apply(null, Col5);
  var Consumo= rowData.qty-Col5;
  
   if(rowData.equipos == 'KRA 54'){
     
     ws.appendRow([cesar(), Utilities.formatDate(new Date(rowData.fech),"GMT","dd/MM/yyyy") ,rowData.categoria,'REFINERIA QUIMICA',rowData.equipos,rowData.qty.replace(".",","),Consumo]);
     ws.appendRow([cesar(), Utilities.formatDate(new Date(rowData.fech),"GMT","dd/MM/yyyy") ,rowData.categoria,rowData.nombre,rowData.equipos,rowData.qty.replace(".",","),Consumo]);
     //ws.appendRow([cesar(), Utilities.formatDate(new Date(rowData.fech),"GMT","dd/MM/yyyy") ,rowData.categoria,'REFINERIA QUIMICA',rowData.equipos,rowData.qty.replace(".",","),Consumo]);

   } else 
            if(rowData.equipos == 'ED. VENTAS'){

             ws.appendRow([cesar(), Utilities.formatDate(new Date(rowData.fech),"GMT","dd/MM/yyyy") ,rowData.categoria,rowData.nombre,rowData.equipos,(rowData.qty.replace(".",",")),Consumo]); 
             ws.appendRow([cesar(), Utilities.formatDate(new Date(rowData.fech),"GMT","dd/MM/yyyy") ,rowData.categoria,'VENTAS BAKERY','ED. VENTAS 20%',(rowData.qty.replace(".",","))*0.2,Consumo]);
             ws.appendRow([cesar(), Utilities.formatDate(new Date(rowData.fech),"GMT","dd/MM/yyyy") ,rowData.categoria,'ENVASE','ENVASES-AGUA 80%',(rowData.qty.replace(".",","))*0.8,Consumo]);
            } else 
                    if(rowData.equipos == 'CASINO - VESTIER OP'){
                     ws.appendRow([cesar(), Utilities.formatDate(new Date(rowData.fech),"GMT","dd/MM/yyyy") ,rowData.categoria,rowData.nombre,rowData.equipos,(rowData.qty.replace(".",",")),Consumo]);
                     ws.appendRow([cesar(), Utilities.formatDate(new Date(rowData.fech),"GMT","dd/MM/yyyy") ,rowData.categoria,rowData.nombre,'CASINO - VESTIER OP 80%',(rowData.qty.replace(".",","))*0.8,Consumo]);
                    ws.appendRow([cesar(), Utilities.formatDate(new Date(rowData.fech),"GMT","dd/MM/yyyy") ,rowData.categoria,'SOLIDOS','SOLIDOS-AGUA',(rowData.qty.replace(".",","))*0.2,Consumo]);
      
                    } else {

                      ws.appendRow([cesar(), Utilities.formatDate(new Date(rowData.fech),"GMT","dd/MM/yyyy"),rowData.categoria,rowData.nombre,rowData.equipos,rowData.qty.replace(".",","),Consumo]);
                      }

   

 //ws.appendRow([idlinea, Utilities.formatDate(new Date(),"GMT","dd/MM/yyyy"),rowData.categoria,rowData.nombre,rowData.equipos,rowData.qty.replace(".",","),Consumo]);
  

  //ws.getRange(1,1,ws.getLastRow(), ws.getLastColumn()).removeDuplicates([1, 2, 3]);

  //return true;
}

function datoslistahoja(){

  var ss  = SpreadsheetApp.openByUrl(lin2);
  var ws  = ss.getSheetByName('TablasCascada');
  return ws.getRange(1,1,ws.getLastRow(),3).getValues();
  Logger.log(datoslistahoja())
}


function getDataRegistro(){
  var hoja = SpreadsheetApp.openById('15LZTDR3gW7yAJ9d69-7HYve4d90z_iFvTnlFfdGmx0E').getSheetByName('Datos')
  var Inicios = new Date(hoja.getRange('H2').getValue());
  var ultima_fila = hoja.getLastRow();
  var rango = "B12398"+":F"+ultima_fila
  var Datos1 = hoja.getRange(rango).getValues();
  var Inicio=Utilities.formatDate(new Date(Inicios.getTime()),"GMT","dd/MM/yyyy");
  var filtrados = Datos1.filter( rowts => Utilities.formatDate(rowts[0],"GMT","dd/MM/yyyy")==Inicio);
  Logger.log(Inicios)
  Logger.log(filtrados)
   return filtrados
}

function prueba(){
  var datos = {categoria: "AGUA AAA", equipos: "FACCINI ENVASE", nombre: "ENVASE", fech: "2021-09-08"};
  Logger.log(filtrarDatos(datos));
}


function filtrarDatos(data){
  var ss1 = SpreadsheetApp.openByUrl(lin2);
  var ws1 = ss1.getSheetByName('Datos');
  var dat = ws1.getRange(ws1.getLastRow()-3000,1,2999,6).getValues();
  var fecha = data.fech;
  var area = data.categoria;
  var planta = data.nombre;
  var equipo= data.equipos;
  var dat_filtro = dat.filter(function(a){
    if(Utilities.formatDate(a[1],"GMT","yyyy-MM-dd")==fecha && a[2]== area && a[3] == planta && a[4] == equipo ){
      return true;
    }else{
      return false;
    }
  });
  var dato = dat_filtro.map(function(r){return r[5]});
  var a = dato.toString();
  return a;
  Logger.log(dat)
  Logger.log(dat_filtro)
  Logger.log(dato)
}

function datos(dat){
  var ss1 = SpreadsheetApp.openByUrl(lin2);
  var ws1 = ss1.getSheetByName('Datos');
  var dat = ws1.getRange(ws1.getLastRow()-3000,1,2999,6).getValues();
  Logger.log(dat)
  return dat;
}



