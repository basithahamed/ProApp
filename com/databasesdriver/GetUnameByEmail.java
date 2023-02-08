package com.databasesdriver;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


public class GetUnameByEmail {
    // method for returning the username by emailid
    public String returnUname(Connection c,String email) throws SQLException  {
        Statement stmt=c.createStatement();  
        ResultSet rs=stmt.executeQuery("select uname from users where emailid='"+email+"'");
        rs.next();
        return rs.getString("uname");
    }
}
