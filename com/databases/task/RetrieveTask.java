package com.databases.task;

import java.sql.*; 
import org.json.simple.*;

/**
 * This class is used to retrieve tasks data
 */
public class RetrieveTask {
    /**
     * This method is used get status of the task
     * @param con This is used connect to the DB
     * @param tid This is used to get status of that particular task.
     * @return returns a int represents the percentage.
     */
    private int taskStatus(Connection con, int tid) {
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
    /**
     * This method is used to retrieve tasks.
     * @param con This is used connect to the DB
     * @param uid This is used to get the tasks of the particular user.
     * @return returns a JSONArray contains all tasks of the given user
     */
    public JSONArray retrieveTask(Connection con, int uid) {
        JSONArray jsonArray = new JSONArray();
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from task_relation inner join tasks on task_relation.tid = tasks.tid where task_relation.uid ="+uid);
            com.databases.users.RetrieveUser uallTask = new com.databases.users.RetrieveUser();

            while (rs.next()) {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("tname", rs.getString("tname"));
                jsonObject.put("tid", rs.getInt("tid"));
                jsonObject.put("users", uallTask.getUserDetailByTid(con, rs.getInt("tid")));
                jsonObject.put("status",rs.getString("status"));
                jsonObject.put("fromDate", rs.getString("fromdate"));
                jsonObject.put("toDate", rs.getString("todate"));
                jsonObject.put("createdBy", rs.getInt("created_by"));
                jsonObject.put("projectId",rs.getInt("pid"));
                jsonObject.put("description", rs.getString("description"));
                jsonObject.put("percentage", taskStatus(con,rs.getInt("tid")));
                jsonObject.put("isCompleted", isCompleted(con, uid,rs.getInt("tid")));
                jsonArray.add(jsonObject);
            }
        } 
        catch (SQLException e) {
            e.printStackTrace();
        }
        return jsonArray;
    }

    /**
     * This is a helper method for retrieveTask() method
     * @param con Used to connect to Db
     * @param uid Used to get the task of given user id 
     * @param tid Used to get the given Task
     * @return returns boolean on basis  
     */
    private boolean isCompleted(Connection con,int uid,int tid) {
        boolean result=false;
        try {
            Statement stmt=con.createStatement();
            ResultSet rs=stmt.executeQuery("select * from task_relation where tid="+tid+" and uid="+uid);
            rs.next();
            if(rs.getString("IsCompleted").equals("true"))
            {
                result=true;
            }
        } catch (Exception e) {
            e.printStackTrace();

        }
        return result;

    }
}
