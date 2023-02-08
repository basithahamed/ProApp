

package com.authorize;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class IsExsist {
    public Boolean checker(Connection c, Integer id,String mail,String password) throws SQLException  {
        boolean result=false;

        try (
            Statement stmt = c.createStatement();
            ResultSet rs = stmt.executeQuery("select * from users where uid =" + id)) {
            rs.next();
            String emailid=rs.getString("emailid");
            String passwordVar=rs.getString("password");
            
            
            if(emailid.equals(mail) && passwordVar.equals(passwordVar)){
                result=true;
            }

        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }finally
        {
            c.close();
        }
        return result;

    }
    

}
