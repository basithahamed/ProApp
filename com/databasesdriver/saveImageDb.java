package com.databasesdriver;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Collection;

import javax.servlet.http.Part;



public class saveImageDb {

    public boolean  savePhoto(Connection c, Collection<Part> parts, int uid,String imageType) {
        boolean result=false;
        try {
            Statement st = c.createStatement();
            PreparedStatement ps = c.prepareStatement("update images set imagePath = ? where imageId = ?");
            st.execute("use proapp");

            for (Part p : parts) {
                p.write("/opt/tomcat/apache-tomcat-8.5.84/webapps/ProApp/assets/images/usersImages/" + uid+imageType);
            }
            ps.setString(1, String.valueOf(uid) + imageType);
            ps.setInt(2, uid);
            ps.execute();
            result=true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}