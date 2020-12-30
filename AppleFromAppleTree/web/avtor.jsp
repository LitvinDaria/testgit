<%@page import="java.sql.SQLException"%>
<%@page import="comlib.DBConnection"%>
<%@page import="java.sql.ResultSet"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
request.setCharacterEncoding("UTF-8");
response.setContentType("text/html;charset=UTF-8");
//session.invalidate();  // завершение предыдущей сессии, чтобы данные были корректны
String l = request.getParameter( "login");
//String p = request.getParameter( "passw");

Cookie logc, idc;//, fiok; хранит в себе кук имени домена(под которым зашли)
String nd = "" /*имя домена*/, fio = ""/*фио доменного пользователя*/, k_answer = ""/*количество верных ответов результата*/, id = "", sql = ""; 

/*
ResultSet rs;
DBConnection db = DBConnection.getInstance();
if( !db.isConnected())db.Open( true );


  try {
//проверяем участвовал ли раньше данный домен
        sql = "select distinct ID, NAME_DOMAIN, K_ANSW from PM.RESULT where NAME_DOMAIN = '" + l + "'";
        rs = db.OpenQuery(sql);
        while (rs.next()) {
            id = rs.getString("ID");
            k_answer = rs.getString("K_ANSW");
        }
        rs.close();

        if (id != null && !id.trim().equals("")) { //ЕСДИ ЗНАЧЕНИЕ ЕСТЬ, ТО ВЫВОДИМ СООБЩЕНИЕ ЧТО РЕЗУЛЬТАТЫ УЖЕ ЕСТЬ
            out.print("Вы уже приняли участия, вы прекрасно справились с задачей! Ваши результаты: " + k_answer);
            out.print("<br/><a href=\"index.jsp\">Вернуться</a><br/> ");
        } else {
            try {
                //Берем данные из таблице юзерс с полем Имя_домена и забираем данные, такие как id, чтобы вставить в новую таблицу PM.RESULT
                sql = "select distinct ID, NAME_DOMAIN from PROV_TER_ORG.USERS where NAME_DOMAIN = '" + l + "'";
                rs = db.OpenQuery(sql);
                while (rs.next()) {
                    id = rs.getString("ID"); 
                    nd = rs.getString("NAME_DOMAIN");
                }
                rs.close();
            } catch (SQLException e) {
                out.print("Ошибка подключения к БД пользователей!");
            }
            / ****************данные для тестирования*************/
                        id = "2100777";
                        nd =l;// "LitvinchukDS"
/**************************************/
            if (id != null && !id.trim().equals("")) {
                idc = new Cookie("ID", id);
                response.addCookie(idc);
                logc = new Cookie("NAME_DOMAIN", nd);//доменное имя  
                response.addCookie(logc);
            %>
            <script><%out.print("location.href = \"mainprj.jsp\"");%></script>
            <%
            } else {
                out.print("Что-то нет такого доменного имени...попробуйте еще раз)!");
                out.print("<br/><a href=\"index.jsp\">Вернуться</a><br/> ");
            }

 
  /*     }

} catch (SQLException e) {
        out.print("Ошибка подключения к БД!");
    }
  */
%>