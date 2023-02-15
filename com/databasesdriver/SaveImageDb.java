package com.databasesdriver;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.sql.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Collection;

import javax.servlet.http.Part;



public class SaveImageDb {

    public boolean  savePhoto(Connection c, Part part, int uid,String imageType) {
        boolean result=false;
        try {
            Statement st = c.createStatement();
            Statement st2 = c.createStatement();
            st.execute("use proapp");

            InputStream in = part.getInputStream();
            File f = new File("/home/vigneshwaran/ApacheTerminal/apache-tomcat-8.5.84/webapps/ProApp/assets/images/usersImages/" + uid + imageType);
    
            FileOutputStream out = new FileOutputStream(f);
            int readingValue = 0;
            byte[] b = new byte[1024];

            while((readingValue = in.read(b)) != -1){
                out.write(b, 0, readingValue);
            }
            out.close();

            st2.executeUpdate("update images set imagePath = '" + uid + imageType + "' where uid = " + uid);
            result=true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    protected String getImagePath(int uid, Connection con){
        String path = "";
        try {
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("select imagePath from images where uid = " + uid);
            rs.next();
            path = rs.getString(1);
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
        return path;
    }
}