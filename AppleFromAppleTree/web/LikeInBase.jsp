<%@page import="java.sql.ResultSet"%>
<%@page import="comlib.DBConnection"%>
<%@page import="comlib.ConnDB"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.io.*"%>
<%@page import="comlib.Foto"%>
<%
request.setCharacterEncoding("UTF-8");
String spath = application.getRealPath("/"); 
String vid = request.getParameter( "vid");//Res - результат? Pred - самые отгадываемые
DBConnection db;
String sql = ""; ResultSet  rs;
ConnDB cdb = new ConnDB();
String id = cdb.getCookies(request, "ID");
String logc = cdb.getCookies(request, "NAME_DOMAIN");
Integer col=0;
//передаем логин 
String StrInsertData, filePath;
if (vid.equals("Res")){
    //запись результата в текстовый файлик
String NFLike = request.getParameter( "NFLike");//№ vibrannogo faila
String  npob = NFLike.replace("F", "");
  Foto foto = new Foto();
  filePath = spath + "result\\"+ logc +".txt";
  StrInsertData = logc + ";" + npob +"; "+System.lineSeparator();
  foto.AddInFileAndBaseInfo(filePath, StrInsertData);
//Запись результата в БАЗУ  
db = DBConnection.getInstance();
    if (!db.isConnected()) {
        db.Open(true);
    }

    sql = "select count(*) as kolich from PM.RESULT where NAME_DOMAIN = '" + logc + "' and id = " + id;
    rs = db.OpenQuery(sql);
    col = 0;
    while (rs.next()) {
        col = rs.getInt("kolich");
    }
    rs.close();

db = DBConnection.getInstance();
    if (!db.isConnected()) {
        db.Open(true);
    }

    if (col.equals(0)) {//добавление    
       // K_ANSW = Номер победителя
        sql = "insert into PM.RESULT (ID, NAME_DOMAIN, K_ANSW) "
                + "values (" + id + ", '" + logc + "', " + NFLike + ")";

        try {
            db.Execute(sql);
            out.print("принято!");
        } catch (Exception e) {
            out.print("При добавлении произошла ошибка!");
        }

    }
}
 
%>