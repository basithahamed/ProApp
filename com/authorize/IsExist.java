package com.authorize;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * This class contains methods to validate users.
 */
public class IsExist {
    /**
     * This method is used to verify user Data
     * @param con Connection object For communicating with db
     * @param id user id for verification
     * @param mail user email for verification
     * @param password user password for verification
     * @return returns a boolean value indicates the result wheather the details is valid or not
     */
    public Boolean checker(Connection con, int id,String mail,String password)  {
        boolean result=false;

        try (
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select emailid,password from users where uid =" + id)) {
            rs.next();
            String emailid=rs.getString("emailid");
            String passwordVar=rs.getString("password");
            
            
            if(emailid.equals(mail) && passwordVar.equals(password)){
                result=true;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally{
            try {
                con.close();
            } 
            catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return result;
    }
    /**
     * This method is used to check the user details available or not.
     * @param con Used to connect to the DB
     * @param mail This mail will be searched for availability.
     * @param userName This name will be searched for availability.
     * @return returns a String contains the result for availability.
     */
    public String isRegisteredDetailsExists(Connection con ,String mail, String userName) {
        String result = "";
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select emailid,uname from users");
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