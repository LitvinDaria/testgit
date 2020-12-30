package comlib;

import java.sql.*;
import javax.sql.*;
import java.io.*;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/*****************************************************************************/
public class DBConnection {
  private boolean    connected;               
  private Connection connection;              
  private String     dataSource;              
  private Statement  statement1;
  private Statement  statement2;
  private Statement  statement3;
  private static PrintStream _ps = null;      
  private static DataInputStream _dis = null; 
  /*String host = "10.85.0.16:50001";
  String base="TECHDB";
  String uname= "db2inst2";//
  String upass ="db2inst"; 
  */
/*String host = "localhost:50001";
String base="";
public String uname="Dashenka";
public String upass ="123";
public String path = "jdbc:db2://" + host + "/" + base;*/
/*String host = "10.85.5.74:50001";
String base="";
public String uname="000805";
public String upass ="afhxbyntk";
public String path = "jdbc:db2://" + host + "/" + base;*/
  private static DBConnection self = null;
public DBConnection(){
     super();
    connection = null;
    dataSource = null;
    connected = false;
    self = this;
  }
  public static synchronized DBConnection getInstance(){
      return (self == null) ? new DBConnection() : self;
    }
/*****************************************************************************/
  public String getDataSource() {
    return dataSource;
  }
/*****************************************************************************/
  public Connection getConnection(){
    return connection;
  }
  /***************************************************************************/
   public String getCookies(HttpServletRequest request, String name){
        Cookie[] cookes = request.getCookies();
        int len = cookes.length;
        String result = "";
        if(len > 0){
            for (int i = 0; i < len; i++){
                if(cookes[i].getName().equals(name))
                    result = cookes[i].getValue();
            }
        }
        return result;
    }
/*****************************************************************************/
  public boolean isConnected() {
    try {
      ResultSet rs = OpenQuery("SELECT * FROM TABLE( VALUES(CURRENT_TIMESTAMP)) AS T");
      rs.close();
      return true;
    } catch (Exception ex) {
      ex.printStackTrace();
      return false;
    }
  }

public Connection Open(boolean logged)
throws ClassNotFoundException, NamingException, SQLException {
    Close();
    Context ctx = new InitialContext();
    logged = false;
    if (logged) DriverManager.setLogStream(System.out);
    connection = ((DataSource) ctx.lookup("java:comp/env/jdbc/RKS")).getConnection();
    connected = true;
    return connection;
  }

  public void Close(){  
    try {
      if (connected) {
        connected = false;
        connection.close();
        dataSource = "";
      }
    } catch (Exception e){
      e.printStackTrace();
    }
  }
  public ResultSet Execute (String sql) throws SQLException {
    Statement st = connection.createStatement();
    return st.execute(sql) ? st.getResultSet() : null;
  }
  public ResultSet OpenQuery(String sql) throws SQLException{
    return connection.createStatement().executeQuery(sql);
  }
  public int UpdateQuery(String sql) throws SQLException{
    return connection.createStatement().executeUpdate(sql);
  }
}
