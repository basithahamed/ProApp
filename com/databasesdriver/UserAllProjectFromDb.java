package com.databasesdriver;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class UserAllProjectFromDb {
    public JSONArray retrieveProject(Connection con, int uid) {
        JSONArray jsArr=new JSONArray();
        try {
            Statement stmt = con.createStatement(); 
            ResultSet rs = stmt.executeQuery("select * from project_relation inner join projects on project_relation.pid = projects.pid where project_relation.uid ="+ uid);
            
            int pid;
            while(rs.next()){
                JSONObject jsonObject=new JSONObject();
                pid = rs.getInt("pid");
                jsonObject.put("id", pid);
                jsonObject.put("projectName",rs.getString("pname"));
                jsonObject.put("status", rs.getString("status"));
                jsonObject.put("fromDate", rs.getString("fromdate"));
                jsonObject.put("toDate", rs.getString("todate"));
                jsonObject.put("users", new UserProjectRelation().GetUidByPid(con, pid));
                jsonObject.put("createdBy", rs.getString("created_by"));
                jsonObject.put("projectDesc", rs.getString("comment"));
                jsArr.add(jsonObject);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsArr;
    }
}


