package com.databasesdriver;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class UserAllTaskFromDb {
    public JSONArray retrieveTask(Connection con, int uid) {
        JSONArray jsonArray = new JSONArray();
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from task_relation inner join tasks on task_relation.tid = tasks.tid where task_relation.uid ="+uid);
            while (rs.next()) {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("tname", rs.getString("tname"));
                jsonObject.put("tid", rs.getInt("tid"));
                jsonObject.put("users", new UserProjectRelation().GetUidByTid(con, rs.getInt("tid")));
                jsonObject.put("status",rs.getString("status"));
                jsonObject.put("fromDate", rs.getString("fromdate"));
                jsonObject.put("toDate", rs.getString("todate"));
                jsonObject.put("createdBy", rs.getInt("created_by"));
                jsonObject.put("projectId",rs.getInt("pid"));
                jsonObject.put("description", rs.getString("description"));
                jsonArray.add(jsonObject);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        finally{
            
        }
        return jsonArray;
    }
}
