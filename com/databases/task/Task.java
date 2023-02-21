package com.databases.task;

import org.json.simple.*;

import com.databases.project.UpdateProject;

import java.sql.*;

/**
 * This class contains the method to add, delete tasks.
 */
public class Task {
    /**
     * This method is to add the task to DB
     * @param con This connection object is used to connect to DB
     * @param taskData This JSONObject is got from frontend (data that is to be added)
     * @return returns added JSONObject with task id.
     */
    public JSONObject taskAdd(Connection con, JSONObject taskData) {
        JSONObject jsObj=new JSONObject();
        try {
            Statement stmt = con.createStatement();

            String taskName = (String) taskData.get("taskName");
            String fromDate = (String) taskData.get("fromDate");
            String toDate = (String) taskData.get("toDate");
            String description=(String) taskData.get("description");
            long createdBy=(long) taskData.get("createdBy");
            long projectId = Long.parseLong(String.valueOf(taskData.get("projectId")));
            JSONArray users=(JSONArray)taskData.get("users");
            JSONArray userDetails = new JSONArray();

            // inserting the task data into tasks table 
            stmt.executeUpdate("insert into tasks (tname,fromdate,todate,pid,description,created_by) values('" + taskName + "','" + fromDate
                    + "','" + toDate + "'," + projectId +",'"+description+"',"+createdBy +")");

            // rendering the latest tid from tasks using pid
            ResultSet rs = stmt.executeQuery("select tid from tasks where pid = "+projectId + " order  by tid desc limit 1");
            rs.next();
            int tid = rs.getInt("tid");
            
            Statement stmt2 = con.createStatement();
            ResultSet rs2;
            for(int i=0;i<users.size();i++){
                // inserting each uid into task_relation table by iterating 
                Long uid = Long.parseLong(String.valueOf(users.get(i)));
                stmt.executeUpdate("insert into task_relation (tid,uid) values(" + tid + "," + uid + ")");
                rs2 = stmt2.executeQuery("select uid,uname from users where uid = "+uid);
                while(rs2.next()){
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("userId",rs2.getInt("uid"));
                    jsonObject.put("userName",rs2.getString("uname"));
                    userDetails.add(jsonObject);
                }
            }

            // storing the inserted data in jsonobject and returning it
            jsObj.put("tname", taskName);
            jsObj.put("createdBy", createdBy);
            jsObj.put("toDate", toDate);
            jsObj.put("fromDate", fromDate);
            jsObj.put("description", description);
            jsObj.put("projectId", projectId);
            jsObj.put("users",userDetails);
            jsObj.put("percentage", 0);
            jsObj.put("tid", tid);
            
            // new UpdateProject().changeProjectStatus(con, Integer.parseInt(String.valueOf(projectId)));
        } catch (Exception e) {
            e.printStackTrace();
        } 
        return jsObj;
    }
    /**
     * This method used to delete task.
     * @param con This connection object is used to connect to DB
     * @param tid This is used to delete the status of the particular task.
     * @return returns a String contains the status of the deletion proccess.
     */
    public String deleteTask(Connection con,int tid) {
        String result="";
        try {
            Statement stmt = con.createStatement();
            stmt.executeUpdate("delete from task_relation where tid = "+tid);
            stmt.executeUpdate("delete from tasks where tid = "+tid);
            result="Success";
        } 
        catch (Exception e) {
            e.printStackTrace();
            result="Invalid Task id ";
        }
        return result;
    }
}
