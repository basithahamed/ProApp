package com.databasesdriver;

import java.sql.Connection;
import java.sql.Statement;

public class AddImageToDb {
    public void insertImages(int uid,Connection con) {
        try {
            Statement stmt = con.createStatement();
            stmt.executeUpdate("insert into images (uid,imagePath) values("+uid+",'"+uid+".png')");

        } catch (Exception e) {
            e.printStackTrace();
        }
    } 
}