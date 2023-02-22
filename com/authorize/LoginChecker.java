package com.authorize;

import java.sql.*;

/**
 * This class contains method to validate the email and password
 */
public class LoginChecker {
    /**
     * This method is to validate the email and password
     * @param email Used for checking with DB
     * @param password Used for checking with DB
     * @return returns boolean with verification of the email and password
     */
    public boolean validater(String email, String password) {
        // creating a prepare statement
        boolean result = false;
        Connection connection = null;
        
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mysql://10.52.0.131:3306/proapp", "todoadmins",
                "todo@111");
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("select emailid,password from users");
            while (rs.next()) {
                if (rs.getString("emailid").equals(email) && rs.getString("password").equals(password)) {
                    //System.out.println("login access");
                    return true;
                }
            }

        } 
        catch (Exception e) {
            e.printStackTrace();
        } 
        finally {
            if(connection != null){
                try {
                    connection.close();
                } 
                catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

}