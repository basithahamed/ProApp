package com.databasesdriver;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Collection;

import javax.servlet.http.Part;

public class SaveImageDb {
    public boolean savePhoto(Connection con, Collection<Part> parts, String uid,String imageType) {
        boolean result=false;
        try {
            Statement st = con.createStatement();
            PreparedStatement ps = con.prepareStatement("update images set imagePath = ? where uid = ?");
            st.execute("use proapp");

            for (Part p : parts) {
                p.write("/home/bharath/Downloads/apache-tomcat-8.5.84/webapps/ProApp/assets/images/usersImages/" +uid+imageType);
            }
            ps.setString(1, uid + imageType);
            ps.setInt(2, Integer.parseInt(uid));
            ps.execute();
            result=true;
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
