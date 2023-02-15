package com.databases.project;

import java.sql.*;
import org.json.simple.*;

/**
 * This class contains methods to add and delete project.
 */
public class Project {
    /**
     * This method is used to insert a Project.
     * @param data A JSON object contains --> projectName, fromDate, toDate, projectDesc, createdBy, users(A JSONArray).
     * @param con Used to connect to the DB
     * @return returns the added JSONObject project id.
     */
    public JSONObject insertProject(JSONObject data, Connection con)  { 
        JSONObject resJsObj=new JSONObject();
        try {
            Statement stmt = con.createStatement();

            String pname = (String) data.get("projectName");
            String fromdate = (String) data.get("fromDate");
            String todate = (String) data.get("toDate");
            String comment = (String) data.get("projectDesc");
            long createdBy = (long) data.get("createdBy");
            JSONArray users = (JSONArray) data.get("users");
            JSONArray userDetails = new JSONArray();

            // inserting the given project data
            stmt.executeUpdate("insert into projects(pname,fromdate,todate,comment,created_by) values('" + pname + "','" + fromdate + "','" + todate + "','" + comment + "','" + createdBy + "')");
            ResultSet rs = stmt.executeQuery("select * from projects order by pid desc limit 1");
            rs.next(); 
            int pid = Integer.parseInt(rs.getString("pid"));//getting the latest pid to add in project_relation table

            Statement stmt2 = con.createStatement();
            ResultSet rs2;
            for (int i = 0; i < users.size(); i++) {
                // adding the jsonarray of users by iterating
                Long uid = Long.parseLong(String.valueOf(users.get(i)));
                stmt.executeUpdate("insert into project_relation (pid,uid) values(" + pid + "," + uid + ")");
                rs2 = stmt2.executeQuery("select * from users where uid = "+uid);
                while(rs2.next()){
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("userId",rs2.getInt("uid"));
                    jsonObject.put("userName",rs2.getString("uname"));
                    userDetails.add(jsonObject);
                }         
            }

            // storing the added data in jsonobject and returning it
            resJsObj.put("id", pid);
            resJsObj.put("projectName", pname);
            resJsObj.put("projectDesc", comment);
            resJsObj.put("fromDate", fromdate);
            resJsObj.put("toDate", todate);
            resJsObj.put("createdBy", createdBy);
            resJsObj.put("users", userDetails);
        } 
        catch (Exception e) {
            e.printStackTrace();
        } 
        return resJsObj;
    }
    /**
     * This method is to delete a project
     * @param con Used connect to the DB
     * @param pid Used to delete that particular project
     * @return returns the String contains the status of deletion.
     */
    public String deleteProject(Connection con,int pid) {
        String result;
        ResultSet rs = null;
        try {
            Statement stmt = con.createStatement();
            stmt.executeUpdate("delete from project_relation where pid = "+pid);
            Statement st = con.createStatement();
            rs = st.executeQuery("select tid from tasks where pid = "+pid);
            while (rs.next()) {
                int tid = rs.getInt("tid");
                stmt.executeUpdate("delete from task_relation where tid = "+tid);
            }
            stmt.executeUpdate("delete from tasks where pid = "+pid);
            stmt.executeUpdate("delete from projects where pid = "+pid);
            
            result="Success";
        } 
        catch (Exception e) {
            e.printStackTrace();
            result="Invalid Project id";
        }
        return result;
    }
}
