package com.databasesdriver;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class GetUidByEmail {
    // method for returning the uid using eamilid
    public int returnid(Connection c,String email) throws SQLException  {
        Statement stmt=c.createStatement();
        ResultSet rs=stmt.executeQuery("select uid from users where emailid='"+email+"'");
        rs.next();
        int uid=0;
        uid=rs.getInt("uid");
        return uid;
    }
}
