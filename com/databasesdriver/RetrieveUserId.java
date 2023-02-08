package com.databasesdriver;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import org.json.simple.JSONObject;

public class RetrieveUserId {
    protected JSONObject GetUidByPid(long pid,Connection con) throws SQLException {
        
        Statement stmt = null;
        ResultSet rs = null;
        JSONObject jsonObject = new JSONObject();
        ArrayList<Integer> array =  new ArrayList<>();
        try {
            stmt = con.createStatement();
            
            rs = stmt.executeQuery("select * from project_relation where pid = "+pid);
            
            while (rs.next()) {
                array.add(rs.getInt("uid"));
            }
            jsonObject.put("uids", array);
            
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
        
        return jsonObject;
    }
    protected int GetUidByTid(int tid,Connection con) throws SQLException {
        
        Statement stmt = null;
        ResultSet rs = null;
        int uid = 0;
        try {
            stmt = con.createStatement();
            
            rs = stmt.executeQuery("select * from task_relation where tid = "+tid);
            rs.next();
            uid = rs.getInt("uid");
            
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
       
        return uid;
    }
}
