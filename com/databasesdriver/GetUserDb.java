package com.databasesdriver;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;


public class GetUserDb {
    // method for returning all the users in db 
    public JSONArray returnAllUser(Connection c) {
        JSONArray jsonArray=new JSONArray();
        try {
            ResultSet rs;
            Statement statement=c.createStatement();
            rs=statement.executeQuery("select * from users");
            while(rs.next()){
                JSONObject jsonObject=new JSONObject();
                jsonObject.put("userId", rs.getInt("uid"));
                jsonObject.put("userName", rs.getString("uname"));
                jsonArray.add(jsonObject);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonArray;
    }

    // method for returning users by the given uid
    public JSONObject returnUserId(Connection c,String val) {
        int uid=Integer.parseInt(val);
        // //System.out.println("uid:"+uid);
        JSONObject jsonObject=new JSONObject();
        try {
            ResultSet rs;
            Statement statement=c.createStatement();
            rs=statement.executeQuery("select * from users where uid="+uid);
            rs.next();

            jsonObject.put("userId", rs.getInt("uid"));
            jsonObject.put("userName", rs.getString("uname"));
            
            
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
        return jsonObject;
    }
}
