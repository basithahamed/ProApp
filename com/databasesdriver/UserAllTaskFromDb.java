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
            UserAllTaskFromDb uallTask=new UserAllTaskFromDb();

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
                jsonObject.put("percentage", uallTask.taskStatus(con,rs.getInt("tid")));
                jsonObject.put("isCompleted", uallTask.isCompleted(con, uid,rs.getInt("tid")));
                jsonArray.add(jsonObject);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        finally{
            
        }
        return jsonArray;
    }

    public int taskStatus(Connection con, int tid) {
        int status = 0;
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from task_relation where tid=" + tid);
            int trueCount = 0;
            int totalCount = 0;
            while (rs.next()) {
                if (rs.getString("IsCompleted").equals("true")) {
                    trueCount++;
                }
                totalCount++;
            }
            if (totalCount != 0) {
                status = (trueCount * 100) / totalCount;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return status;

    }

    public boolean isCompleted(Connection con,int uid,int tid)
    {
        boolean result=false;
        try {
            Statement stmt=con.createStatement();
            ResultSet rs=stmt.executeQuery("select * from task_relation where tid="+tid+" and uid="+uid);
            rs.next();
            if(rs.getString("IsCompleted").equals("true"))
            {
                result=true;
            }
            // result=rs.getString("IsCompleted");

        } catch (Exception e) {
            e.printStackTrace();

        }
        return result;

    }

}
