/* 
 * Данный файл создан для работы с page1.jsp 
 * работа с таймером, выделением disable, вывод всплывающего окна
 * 
 */
var base = 60; 
var clocktimer,dateObj,dh,dm,ds,ms; 
var readout=''; 
var h=1; 
var m=1; 
var tm=1; 
var s=0; 
var ts=0; 
var ms=0; 
var show=true; 
var init=0; 
var ii=0; 
/*функция для замены картинки, передаем id кнопки и название img, заменяем картинку*/
function ch_icon(img, put){   
     $(img).attr("src", put);
}
/*для page3.jsp*/
function bt_ch_pepl(path, id_p){    
    var left = (screen.width/2-300);
    var top = (screen.height/2-300);
     $.ajax({
     url:   window.showModalDialog(path + "/people/ch_people.jsp?id_p="+id_p,window,"center:yes; dialogWidth:650px;dialogHeight:600px; dialogTop:" + top + ";dialogLeft:"+ left+";"),
     beforeSend: function(){},
     success: function(){}
   });
}
/*function ADD_USERS(typ, id_p){
 if (typ == "add"){            
//var param = $('#frm_main').serialize();     
location.href = "add_p_db.jsp?"+param;    //переходим на редактирование в бд
}    
else if (typ=="see"){
            location.href = "add_p_db.jsp?id="+id_p+"&fl=see";             
        }
} */
function clearALL() {
clearTimeout(clocktimer);
h=1;m=1;tm=1;s=0;ts=0;ms=0;
init=0;show=true;
readout='00:00:00.00';
document.frm_main.clock.value=readout;
var CF = document.frm_main;
for (ij=0;ij<=9;ij++) { CF[mPLUS[ij]].value = ''; }
ii = 0;
}
function startTIME() { 
    var cdateObj = new Date(); 
    var t = (cdateObj.getTime() - dateObj.getTime())-(s*1000); 
    if (t>999) { s++; } 
    if (s>=(m*base)) { ts=0; m++; } else { 
        ts=parseInt(s);//(ms/100)+
        if(ts>=base) { ts=ts-((m-1)*base); } 
    } 
    if (m>(h*base)) { tm=1; h++; } else { 
        tm=parseInt(m);//(ms/100)+
        if(tm>=base) { 
            tm=tm-((h-1)*base); 
        } 
} 
//ms = Math.round(t/10); if (ms>99) {ms=0;} if (ms==0) {ms='00';}if (ms>0&&ms<=9) { ms = '0'+ms; } 

if (ts>0) { ds = ts; if (ts<10) { ds = '0'+ts; }} else { ds = '00'; } 
dm=tm-1; 
if (dm>0) { if (dm<10) { dm = '0'+dm; }} else { dm = '00'; } 
dh=h-1; 
if (dh>0) { if (dh<10) { dh = '0'+dh; }} else { dh = '00'; } 
readout = dh + ':' + dm + ':' + ds;// + '.' + ms; 
if (show==true) { document.frm_main.clock.value = readout; } 
clocktimer = setTimeout("startTIME()",1); 
}
function findTIME() { 
if (init==0) { 
    dateObj = new Date(); 
    startTIME(); 
    init=1; var today = new Date();
var d_start =   today.toLocaleFormat("%d.%m.%Y %H:%M:%S");
$('#d_start').val(d_start);
    $('#incall').attr('src', "images/pause.ico");
    $('#sms').replaceWith("<label id=\"sms\" name=\"sms\" style=\"color: green; font-weight: bold\">Завершить разговор </label>");

} 
else { 
    if(show==true) {
        show=false; 
        $('#save').removeAttr("disabled");  
        $('#start').attr('disabled', true);
        var today = new Date();
        var d_end =   today.toLocaleFormat("%d.%m.%Y %H:%M:%S");
        $('#d_stop').val(d_end);
        var tim_talk = $("#clock").val();
        $('#sms').replaceWith("<label id=\"sms\" style=\"color: red; font-weight: bold\">*время разговора " + tim_talk + " </label>");
        $('#fin_pepl').removeAttr('disabled');
    } else { show=true; $('#incall').attr('src', "/SAYTEL/images/play.ico");} 
}
}

$(document).ready(function(){   
window.onload = function() {
//    findTIME();
    clearALL();
    $('#statys').attr('disabled', true);
    $('#categ').attr('disabled', true);
}

$("#tabl_pepl").dataTable(
    {
        "oLanguage":
            {
                "sLengthMenu": "Показать _MENU_ записей",
                "sZeroRecords": "К сожалению ничего не найдено",
                "sInfo": "Показано _START_ - _END_ из _TOTAL_ записей",
                "sInfoEmpty": "Показано 0 - 0 из 0 записей",
                "sInfoFiltered": "( Всего _MAX_ записей )",
                "sSearch": "Поиск:",
                "oPaginate":
                    {
                        "sFirst": "В начало",
                        "sLast": "В конец",
                        "sNext": "Вперёд",
                        "sPrevious": "Назад"
                    }
            }
    }
  );
$("#r1").click(function(){
if ($("#r1").is(":checked")) {
    $('#f_or_p').replaceWith("<td id=\"f_or_p\"><label id=\"fiol\"><b>Фамилия:</b></label><input id=\"fio\" style=\"font-family: Time New Roman;\" size=\"25\" name=\"fio\" type=\"text\" onkeyup=\"this.value = this.value.replace (/[^-.;:'a-zA-Zа-яА-Я\']/g,'','').toUpperCase()\">\n\
        <p><label id=\"namel\"><b>Имя:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id=\"name\" style=\"font-family: Time New Roman;\" name=\"name\" type=\"text\" onkeyup=\"this.value = this.value.replace (/[^-\.;:'a-zA-Zа-яА-Я']/g,'','').toUpperCase()\">\n\
        <p><label id=\"otchl\"><b>Отчество:</b></label><input id=\"otch\" style=\"font-family: Time New Roman;\" name=\"otch\"  type=\"text\" onkeyup=\"this.value = this.value.replace (/[^-\.;:'a-zA-Zа-яА-Я']/g,'','').toUpperCase()\"></td>");
}
});
 $("#r2").click(function(){
     if ($("#r2").is(":checked")) {
        $('#f_or_p').replaceWith("<td id=\"f_or_p\">\n\
<input id=\"org\" size=\"25\"  style=\"font-family: Times new Roman\" name=\"org\" value=\"\" type=\"text\" onclick=\"this.value=''\" onkeyup=\"this.value = this.value.toString().toUpperCase()\"></td> ");
}
});

$("#chfio").click(function(){
 if ($("#chfio").is(":checked")){     
    $('#fio').removeAttr("disabled");
    $('#name').removeAttr("disabled");
    $('#otch').removeAttr("disabled");
    $('#org').removeAttr("disabled");
    $('#fiol').replaceWith("<label id=\"fiol\"><b>Фамилия:</b></label>");
    $('#namel').replaceWith("<label id=\"namel\"><b>Имя:</b></label>");
    $('#otchl').replaceWith("<label id=\"otchl\"><b>Отчество:</b></label>");
    $('#forp').replaceWith("<label id=\"forp\"><b>Фио/Орг.:</b></label>");   
 }else{
    $('#fio').attr('disabled', true);
    $('#name').attr('disabled', true);
    $('#otch').attr('disabled', true);
    $('#org').attr('disabled', true);
    $('#fiol').replaceWith("<label id=\"fiol\"><del><b>Фамилия:</b></del></label>");
    $('#namel').replaceWith("<label id=\"namel\"><del><b>Имя:</b></del></label>");
    $('#otchl').replaceWith("<label id=\"otchl\"><del><b>Отчество:</b></del></label>");
    $('#forp').replaceWith("<label id=\"forp\"><del><b>Фио/Орг.:</b></del></label>");
 };
});
$("#chtel").click(function(){
 if ($("#chtel").is(":checked")){     
    $('#tel').removeAttr("disabled");
    //$('#tel').val("");
    $('#tell').replaceWith("<label id=\"tell\"><b>Телефон:</b></label>");    
 }else{ 
    $('#tel').attr('disabled', true);
    $('#tel').val("-");
    $('#tell').replaceWith("<label id=\"tell\"><del><b>Телефон:</b></del></label>");
 };
});
$("#chaddr").click(function(){
 if ($("#chaddr").is(":checked")){   
    $('#nm_street').removeAttr("disabled");
    $('#dom').removeAttr("disabled");    
    $('#kv').removeAttr("disabled");
    $('#street').removeAttr("disabled");
    $('#addrl').replaceWith("<label id=\"addrl\"><b>Адрес:</b></label>");
 }else{
    $('#nm_street').attr('disabled', true);
    $('#dom').attr('disabled', true);    
    $('#kv').attr('disabled', true);
    $('#street').attr('disabled', true);     
    $('#addrl').replaceWith("<label id=\"addrl\"><del><b>Адрес:</b></del></label>");
 };
});
/***********************раюота с обращениями*****************************/
 
$("#statys").change(function(){
if (this.value == "OK"){
    $('#imgg').attr("src", "images/OKs.png");   
   }
/*else if (this.value == "NOT"){
    $('#imgg').attr("src", "../images/NOT.png");
  }*/
else if (this.value == "SAY"){
    $('#imgg').attr("src", "images/SAY.png");
  }
else if (this.value == "MOVE"){
    $('#imgg').attr("src", "images/SSend.png");
  }
else if (this.value == "CLOSE"){
     $('#imgg').attr("src", "images/close.png");
    /*
     *Статусы в базе 
     *1) - даны разъяснения SAY
     *2) - решено положительно OK
     *3) - отказано в удовлетворении просьбы CLOSE
     *4) - направлено по принадлежности MOVE
     **/
}
});
//Постановка на контроль
$("#kontr").click(function(){
if ($("#kontr").is(":checked")) {
    $('#kontr').val("on");
    $('#statys').attr("style","visibility: hidden"); 
    $('#imgg').attr("src", "images/NOT.png");
}
else{
    $('#statys').attr("style","visibility: visible"); 
    $('#kontr').val("off");
    $('#imgg').attr("src", "images/OKs.png");   
    $('#statys').val("OK");
    document.getElementById("statys").options[1].selected=true
}
});
//поиск абонента кнопка "fin_pepl"
$("#fin_pepl").click(function(){
var fio_all =  "";
var tel = "", addr = "", kat = "";
var str_d, str_kv, str_d;    
var where = "";
//ФИО/Организация
if (!$("#chfio").is(":checked")) {}
else{
if ($("#r1").is(":checked")){
    var fio_f = $('#fio').val().toString();
    var fio_n= $('#name').val().toString();
    var fio_o = $('#otch').val().toString();
    $('#fl_og').val("F");
    fio_all = "";
    if (fio_f == null || fio_f.trim() == ""){
        if (fio_n == null || fio_n.trim() == ""){
            if (fio_o == null || fio_o.trim() == ""){}
            else fio_all = fio_o;
        }
        else fio_all = fio_n + " " + fio_o;
    }
    else{
        if (fio_n == null || fio_n.trim() == ""){
            if (fio_o == null || fio_o.trim() == "") fio_all = fio_f;
            else fio_all = fio_f + " " + fio_o;
        }
        else{
            if (fio_o == null || fio_o.trim() == "") fio_all = fio_f + " " + fio_n;
            else fio_all = fio_f + " " + fio_n + " " + fio_o;
        } 
    }
    if (fio_all == "") {where = "p.fl_org = \'F\'";}
    else where = "(p.fio like \'|" + fio_all + "|\' and p.fl_org = \'F\')";
}
else {
    $('#fl_og').val("P");//предприятие
    fio_all = $('#org').val().toString();
    if (fio_all == null || fio_all.trim() == ""){where = "p.fl_org = \'P\'";}
    else where = " (p.fio like \'|" + fio_all + "|\' and p.fl_org = \'P\')";
}
}
   var city = $('#city').val().toString();   
   var nm_str = $('#nm_street').val().toString();
   var str = $('#street').val().toString();
   var dom = $('#dom').val().toString();
   var kv = $('#kv').val().toString(); 
//Адрес
if (!$("#chaddr").is(":checked")) {}
else{   
   if (str == null || str.trim() == ""){addr = "";}
   else{
       if (dom == null || dom.trim() == ""){addr = nm_str + str; } 
       else addr = nm_str + str + " д." + dom;
       if (kv == null || kv.trim() == ""){}
       else addr += " кв." + kv;
   }
   if (city == null || city.trim() == "" || city == "0"){
       if (addr == ""){}
       else {
           if (where == ""){
               where = " p.street like \'|" + addr + "|\'"; 
           }
           else{where += " and p.street like \'|" + addr + "|\' "; }
       }
   }
   else{
        if (addr == ""){}
        else{
            if (where == "") where = "(p.area like \'|" + city + "|\' and p.street like \'|" + addr + "|\')";
            else{where += " and (p.area like \'|" + city + "|\' and p.street like \'|" + addr + "|\')"; }
       }
   }
}
//Телефон если флаг true то по данному полю не ищем
if (!$("#chtel").is(":checked")) {}
else{
   tel = $('#tel').val().toString();
   if (tel == null || tel.trim() == ""){}   
   else {
       if (where == ""){
           where = " p.tel like \'|" + tel + "|\'";
       }
       else where += " and p.tel like \'|"+ tel +"|\'";
   }
}
var cat = $('#categ').val().toString();
if (cat == null || cat.trim() == "" || cat.trim() == "5"){}   
   else {
       if (where == ""){
           where = " p.id_categ =" + cat ;
       }
       else where += " and p.id_categ = "+ cat;
   }
if ($("#fl_secr").is(":checked")){$("#fl_secr").val("on");}
else{$("#fl_secr").val("off");}
var giv_s = $("#fl_secr").val();
if (giv_s == "off"){
       // if (where == ""){
      //     where = " p.giv_secret ='" + giv_s+"'" ;
     //  }
     //  else where += " and p.giv_secret ='" + giv_s+"'";
   }   
   else {
       if (where == ""){
           where = " p.giv_secret ='" + giv_s+"'" ;
       }
       else where += " and p.giv_secret ='" + giv_s+"'";
   }
    var left = (screen.width/2-400);
    var top = (screen.height/2-400);
   // alert(where);
    $.ajax({
     url:   window.showModalDialog('people/tabl_pepl.jsp?where='+ where,window,"center:yes; dialogWidth:900px;dialogHeight:700px; dialogTop:" + top + ";dialogLeft:"+ left+";"),
     beforeSend: function(){},
     success: function(){
     }
   });
   //location.href = 'people/tabl_pepl.jsp?where='+ where;
   /*$.ajax({
       url: 'people/tabl_pepl.jsp?where='+ where,
       beforeSend: function(){},
       success: function(data){
           $('#tabl_pepl_info').remove();
           $('#tabl_pepl_paginate').remove();
           $('#tabl_pepl_length').remove();
           $('#tabl_pepl_filter').remove();  
           //$('#ADD').remove();  
           $("#tabl_pepl").dataTable();
           $('#tabl_pepl').replaceWith(data); 
           $("#tabl_pepl").dataTable();
       }
   });*/
});
//добавление данных
$("#save").click(function(){  
var tim_talk = $("#clock").val();
var d_s = $("#d_start").val();
var d_p = $("#d_stop").val();
 //alert(tim_talk);
/*сперва добавляем абонента по введенным данным*/
var id_p = $('#id_p').val();
var city = $('#city').val().toString();   
var nm_str = $('#nm_street').val().toString();
var str = $('#street').val().toString();
var dom = $('#dom').val().toString();
var kv = $('#kv').val().toString();
var fio_all = "";
var addr = "";var tel = "";
var fl = true;var fio = "";
var fl_org; var name; var otch;
//разбор ФИО 
if ($("#r1").is(":checked")) fl_org = "F";
   else fl_org = "O";
   if ($("#r2").is(":checked")) fl_org = "P";
   else fl_org = "F";
if (!$("#chfio").is(":checked")){
    fio_all = "АНОНИМ"; 
}
else{      
   if (fl_org == "F"){
       fio = $('#fio').val().toString(), 
       name=$('#name').val().toString(), 
       otch = $('#otch').val().toString();
       if ((fio == null || fio == "") && (name == null || name == "") && (otch == null || otch == "")){
           fio_all= "АНОНИМ";
           //$('#fio').attr("style", " border: 2px red solid;");
       }
       else{
           $('#fio').attr("style", "font-family: Times new Roman");
           if (fio == null) fio = ""; else fio = fio.trim();
           if (name == null) name = ""; else name = name.trim();
           if (otch == null) otch = ""; else otch = otch.trim();
           fio_all = fio.trim() + " " + name + " " + otch;
           fio_all = fio_all.trim();
       }
   }
   else{
        fio_all = $('#org').val();
        if (fio_all == "" || fio_all == null){
            fio_all = "АНОНИМ";
            //$('#org').attr("style", "font-family: Times new Roman; border: 2px red solid;");
        }
        else{
            $('#org').attr("style", "font-family: Times new Roman");
        }
    }
}
var city;
//Адрес
if (!$("#chaddr").is(":checked")) addr = "-";
else{
    if ((str == null || str == "") && (dom == null || dom == "") && (kv == null || kv == ""))
    addr = "-";
    else{
        if (str == null || str == ""){//$('#street').attr("style", "border: 2px red solid;"); 
            addr = "ул.-";}
        else{$('#street').attr("style", "font-family: Times new Roman");addr = nm_str + str;}
        if (dom == null || dom == ""){//$('#dom').attr("style", "border: 2px red solid;");
            addr += " д.-";}
        else{$('#dom').attr("style", "font-family: Times new Roman");addr += " д." + dom;}
        if (kv == null || kv == ""){//$('#kv').attr("style", "border: 2px red solid;");
            addr += " кв.-";}
        else{$('#kv').attr("style", "font-family: Times new Roman");addr += " кв." + kv;}
        //addr = nm_str + str + " д." + dom + " кв." + kv;
    }
}
//наименование города
if (city == null || city.trim() == "" || city == "0"){
    //$('#city').attr("style", "border: 2px red solid;");//flag = false;
    city = "Г.ЧИТА";
}
else{$('#city').attr("style", "font-family: Times new Roman");}
//телефон
if (!$("#chtel").is(":checked")) tel = "-";
else{
   tel = $('#tel').val().toString();
   if (tel == null || tel.trim() == ""){//$('#tel').attr("style", "border: 2px red solid;"); 
       tel = "-";}
   else $('#tel').attr("style", "font-family: Times new Roman");
}
//категория абонента, если не выбрали берем 5-не выбрана
var cat = $('#categ').val().toString();
   if (cat == null || cat.trim() == "" || cat.trim() == "0"){
      // $('#categ').attr("style", "border: 2px red solid;");
       cat = 5;
   }   
   else $('#categ').attr("style", "font-family: Times new Roman");
//флаг предоставления инфры   
if ($("#fl_secr").is(":checked")){$("#fl_secr").val("on");}else{$("#fl_secr").val("off");}
//var param = $('#frm_main').serialize(); 
/*Данные для добавления в таблицу PEOPLE */
var parPEPL ="&area="+city+"&street="+addr+"&tel="+tel+"&fl_org="+fl_org+"&fio="+fio_all+"&id_categ="+ cat +"&giv_secret="+ $("#fl_secr").val(); 

/*теперь добавляем заявку*/
//время разговора
var id_t = $("#id_t").val();//тема 
var statys = "";
if ($("#kontr").is(":checked")){
    statys = "NOT"
}else{
     statys = $("#statys").val();//статус
}
fl = true; //var st_tem;
if (statys.trim() == "0" || statys == null){
    fl = false; 
    //$('#statys').attr("style", "border: 2px red solid;width: 350px");
} else  $('#statys').attr("style", "width: 350px");      
if (id_t.trim() == "0" || id_t == null){
      fl = false; 
      //$('#id_t').attr("style", "border: 2px red solid;width: 350px");
} else $('#id_t').attr("style", "width: 350px");      
var t_quest = $("#text_quest").val();
if (t_quest == null || t_quest.trim() == ""){
    t_quest = "";
} else {}
var t_answ = $("#text_answer").val();
if (t_answ == null || t_answ.trim() == ""){
   t_answ = "";
}  
//alert(statys);
//var paramZ = $('#add_zajv').serialize();//данные для добавления
//param+=paramZ;
parPEPL = parPEPL + "&id_p="+id_p+"&id_t=" + id_t + "&quest="+t_quest+"&answer=" + t_answ+"&statys="+statys + "&tim_talk="+tim_talk;
var urll = 'Calling/add_newcall_db.jsp?vid=addPZ'+parPEPL+'&d_s='+d_s+"&d_p="+d_p;
//alert(url);
if (fl == true){
  $.ajax({
      url: urll,
      //data:parPEPL,
      beforeSend: function(){},
      success: function(data){
          alert(data);
          location.reload (true);
          //$("#tabl_call").dataTable();
          //обнуляем данные для поиска
          //$('#temaFILTR').val("0");
          //$('#st_FILTR').val("0");
         // $("#dpost").attr("checked", false);
         // $("#bt_find").click();                
         // $("#tabl_call").dataTable();
      }
   });
  }
  else{
    alert("Введите обязательные поля отмеченные звездочкой!");
  }
  });
 $("#start").click(function(){  //кнопка принять вызов - <<Start>> 
    var tim_talk = $("#clock").val();
    $('#r1').removeAttr("disabled");
    $('#r2').removeAttr("disabled");
    $('#fl_secr').removeAttr("disabled");
    $("#clock").val(tim_talk);
    $('#fin_pepl').removeAttr("disabled");
    $('#org').removeAttr("disabled");
    $('#fio').removeAttr("disabled");
    $('#name').removeAttr("disabled");
    $('#otch').removeAttr("disabled");
    $('#tel').removeAttr("disabled");
    
    $('#chaddr').removeAttr("disabled");
    $('#chfio').removeAttr("disabled");
    $('#chtel').removeAttr("disabled");
    
    $('#nm_street').removeAttr("disabled");
    $('#street').removeAttr("disabled");
    $('#dom').removeAttr("disabled");
    $('#kv').removeAttr("disabled");
    $('#city').removeAttr("disabled");
    $('#id_t').removeAttr("disabled");
    $('#text_quest').removeAttr("disabled");
    $('#text_answer').removeAttr("disabled");
    $('#statys').removeAttr("disabled");
    $('#categ').removeAttr("disabled");    
    
    //$('#save').removeAttr("disabled");  
    //$('#start').attr('disabled', true);  
    $('#fin_pepl').removeAttr("disabled");  
    //$('#stop').removeAttr("disabled"); 
    //$('#incall').attr('src', 'src="../images/say.png"');
    findTIME();
 }); 
/*$("#stop").click(function(){  //кнопка принятия вызова - <<Stop>>    
    $('#fin_pepl').attr('disabled', true);
    $('#stop').attr('disabled', true);    
    $('#start').removeAttr("disabled");
    var tim_talk = $("#clock").val();//время разговора
    $("#clock").val(tim_talk);
    $("#clock").attr('disabled', true);
    //location.reload(true);
    //findTIME();
 }); */
});

