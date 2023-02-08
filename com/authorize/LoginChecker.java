package com.authorize;

import java.sql.Connection;

import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LoginChecker {

    public boolean validater(String email, String password) throws SQLException {
        // creating a prepare statement
        boolean result = false;
        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/proapp", "vicky",
                "vi99g@NESH");
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            PreparedStatement ps;
            ResultSet rs;
            String sql = "select * from users";
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()) {
                if (rs.getString("emailid").equals(email) && rs.getString("password").equals(password)) {
                    System.out.println("login access");
                    return true;
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            connection.close();
        }

        return result;
    }

}