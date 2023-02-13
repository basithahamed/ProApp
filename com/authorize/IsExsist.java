

package com.authorize;

import java.sql.Connection;
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
            
            
            if(emailid.equals(mail) && passwordVar.equals(password)){
                result=true;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally{
            c.close();
        }
        return result;
    }
    public String IsRegisteredDetailsExists(Connection con ,String mail, String userName) {
        String result = "";
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from users");
            while (rs.next()) {
                if (rs.getString("emailid").equals(mail)) {
                    result = "Email Id Already Exsist";
                }
                else if(rs.getString("uname").equals(userName))
                {
                    result = "Username Already Exsist";
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
