// Getting a user info based on Project Id
package com.databasesdriver;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class UserProjectRelation {
    public JSONArray GetUidByPid(Connection con,int pid) {

        Statement stmt = null;
        ResultSet rs = null;

        JSONArray jsArr=new JSONArray();
        try {

            stmt = con.createStatement();
            
            rs = stmt.executeQuery("select * from project_relation inner join users on project_relation.uid=users.uid where pid ="+pid);
            
            while(rs.next()){
                JSONObject jsObject=new JSONObject();
                jsObject.put("userId",rs.getString("uid") );
                jsObject.put("userName",rs.getString("uname"));
                jsObject.put("imagePath", rs.getString("uid")+".png");
                jsArr.add(jsObject);
            }
            
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
        return jsArr;
    }
    public JSONArray GetUidByTid(Connection con , int tid){
        Statement stmt = null;
        ResultSet rs = null;

        JSONArray jsArr=new JSONArray();
        try {

            stmt = con.createStatement();
            
            rs = stmt.executeQuery("select * from task_relation inner join users on task_relation.uid=users.uid where tid ="+tid);
            
            while(rs.next()){
                JSONObject jsObject=new JSONObject();
                jsObject.put("userId",rs.getString("uid") );
                jsObject.put("userName",rs.getString("uname"));
                jsObject.put("imagePath", rs.getString("uid")+".png");
                jsArr.add(jsObject);
            }
            
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
        return jsArr;
    }
}