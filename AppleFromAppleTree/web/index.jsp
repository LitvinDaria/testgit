<%@page contentType="text/html" pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="css/jquery-ui-1.8.16.custom.css">
<link rel="stylesheet" href="css/style.css" type="text/css" media="screen" >
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
         <link rel="shortcut icon" href="dopimg/AFA.png" type="image/png">
        <title>Новогодний переполох</title>
    </head>
    
    <body >  
        <header style="text-align:  center;"><h1><img src="dopimg/ELKA.jpg" width="70" height="70">Новогодний переполох</h1></header>
        <div class="main" style="text-align:  center; background-color: #F5CAC3">&nbsp;&nbsp;                         
            <form  method="post" action="avtor.jsp">
                <p>
                    ДОМЕННОЕ ИМЯ:("Код" из парольной карточки) 
                <% out.print("<input id=\"login\" name=\"login\" type=\"text\">");%> <p>
                   <!--ПАРОЛЬ: < %out.print("<input id=\"passw\" name=\"passw\" type=\"password\">");%--> <p>   
               
                    <input  type="submit" id="go" name="go" value="               Войти               "  style="font-family: Times New Roman; background: #ccc; padding: 6px 35px; font-size: 16px; text-align: center; border: outset 2px #aaaaaa;cursor: pointer; ">     
            </form>
        </div>
        <div id="footer" >© ОПФР по Забайкальскому краю от 01.05.2020 г </div>
    </body>
</html>
