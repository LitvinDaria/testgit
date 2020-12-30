/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package comlib;
import com.ibm.db2.jcc.a.db;
import com.ibm.db2.jcc.a.i;
import  comlib.DBConnection; 
import  java.sql.ResultSetMetaData;
//import  comlib.Common;
import java.io.IOException;
import  java.sql.ResultSet;
import  java.lang.String;
import java.sql.Connection;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.NamingException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspWriter;
import org.apache.catalina.connector.Request;
import org.apache.catalina.startup.SetContextPropertiesRule;
import org.apache.tomcat.jni.Global;

import sun.misc.Cleaner;

//import 



/**
 *
 * @author 000805
 */
public class ConnDB 
{
         /*   String host = "127.0.0.1:50000";
            String base="TECHDB";
            String username="000805";
            String password ="afhxbyntk";
    public  String host = "10.85.0.16:50001";
    public  String base="TECHDB";//"TECHTEST";
    public  String username= "db2inst2";//
    public  String password ="db2inst"; 
    public  String paths = "jdbc:db2://" + host + "/" + base; */

    public ConnDB() {
          
             
    }
    /**
     *
     * @param db
     */


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
 
}
   


