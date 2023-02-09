package com.databasesdriver;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.IOException;
import java.sql.*;

@MultipartConfig
public class AddTaskToDb {
    public JSONObject taskAdd(Connection con, HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException {
        Statement stmt = con.createStatement();
        ResultSet rs = null;
        JSONObject jsObj=new JSONObject();

        try {
            JSONObject taskData = (JSONObject) new JSONParser().parse(request.getParameter("taskData"));
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
            rs = stmt.executeQuery("select * from tasks where pid = "+projectId + " order  by tid desc limit 1");
            rs.next();
            int tid = rs.getInt("tid");
            
            Statement stmt2 = con.createStatement();
            ResultSet rs2;
            for(int i=0;i<users.size();i++){
                // inserting each uid into task_relation table by iterating 
                Long uid = Long.parseLong(String.valueOf(users.get(i)));
                stmt.executeUpdate("insert into task_relation (tid,uid) values(" + tid + "," + uid + ")");
                rs2 = stmt2.executeQuery("select * from users where uid = "+uid);
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
            jsObj.put("tid", tid);
            
        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().println("Unsuccess");
        } 
        return jsObj;
    }
}
