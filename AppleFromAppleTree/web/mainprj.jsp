<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="comlib.ConnDB"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="css/jquery-ui-1.8.16.custom.css">
<link rel="stylesheet" href="css/style.css" type="text/css" media="screen" >
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery.js"></script>
<script type ="text/javascript" src ="js/_jquery.js"></script>         
<script type ="text/javascript" src ="js/i18n/jquery-ui-i18n.js"></script>        
<script type ="text/javascript" src ="js/jquery-ui-1.8.20.custom.js"></script>    
<!DOCTYPE html>
 <script>
     var vimg=0;//номер выбранной картинки
     var  kotv = 0;// количество правильных ответов
     
     var kif = 16;//количество исходных файлов вычисляется на пред. шагу, когда читаем папку родители и сохраняя передаем в куки или в гет
     var kseef = 1; //количество просмотренных фото
    
  
      function choice(){
        if (vimg == 0){alert("Выберите фото ребенка");}
        else{      
            var put_parent = $("#CheckUch").attr("src");
            var NFLike  =  put_parent.substring(put_parent.lastIndexOf('/')+1,put_parent.length - 4); ;//номер выбранной фотографии
                             //Зписываем результат в БД(или в файлик)    
                             $.ajax({
                                 url: 'LikeInBase.jsp?NFLike=' + NFLike + '&vid=Res',
                                 beforeSend: function () {  
                                    alert("Отличный выбор!!");},
                                 success: function (data) {
                                   //  alert(data);

                                 }
                             });
                             $("#next").attr("disabled", 'disabled=""');
                             $("#next").attr("onclick", 'onclick=""');
                             document.location.replace("index.jsp");
                         }
   
    }
    
function ClickImg(Num, Count){
    $("#CheckUch").attr("src", "kids/F" + Num + ".JPG");
    $('#img' + Num).attr("style", "border:1px solid #356aa0; filter: invert(40%);");      
    for (var t = 1; t <= 6; t++){        
       if (t != Num) {
           $('#img' + t).attr("style", "");  
       }
    }
    vimg = Num; 
} 
$(document).ready(function(){
    

});
	  </script>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Выберите понравившееся фото</title>
        <link rel="shortcut icon" href="AFA.png" type="image/png">
    </head>
    <body>
        <div id="wrap">
            <%
                ConnDB cdb = new ConnDB();
                String logc = cdb.getCookies(request, "NAME_DOMAIN");  
                String id = cdb.getCookies(request, "ID");
out.print("<div class=\"two\"><h1>\"Новогодний переполох...\" " + logc + " </h1></div>");
            %>
 
            
                  
<div id="nav"> 
    <label id="sms" name="sms"  type="text"> Учаcтник </label>  
    
            </div>
<div id="main" >         
    <div class="image-decor"> <img name = "CheckUch" id = "CheckUch" src="" width="380" height="420" > </div>
  
    <div class="avd_div">Выберите фото-><a href="#" class="bucn_2_s" id ="next" name="next"  onclick="choice();">Проголосовать за выбранную фотографию</a></div>        

    <br/>    
    <table  style="width: 100%;" id = "TablRandomKids" name="TablRandomKids">
        <tr>
            <%
            // выгружаем 6 фотографий в строку
            int CountFoto = 6; //getCountFile
            for(int i = 1; i<= CountFoto; i++){
                out.print("<td>"
                        + "<div class = \"box\"  name = \"img" + i + "\" id = \"img" + i + "\" onclick=\"ClickImg(" + i + ", " + CountFoto + ")\">"
                        + " <div class=\"box-inner\"> <img src=\"kids/F" + i + ".JPG\" width=\"200\" height=\"220\">     "
                        + "     <div class=\"text\"> <h2>Выбрать</h2>  </div>"
                        + "</div>" 
                        + "</div>"
                        + "</td>");
            }%>
      
        </tr>
    </table>

</div>
                 
<div id="sidebar"> <br/> <br/> <br/> <br/> <br/></div>
<div id="footer" >© ОПФР по Забайкальскому краю (спец.-эксперт Литвинчук Д.С.) от 01.05.2020 г </div>
</body>
</html>
