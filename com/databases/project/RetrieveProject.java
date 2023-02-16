package com.databases.project;

import java.sql.*;
import org.json.simple.*;

import com.databases.users.RetrieveUser;

/**
 * This class contains methods to retrieve projects.
 */
public class RetrieveProject {
    /**
     * This method is used to return the percentage of the give project 
     * @param con Used to connect to the DB
     * @param pid The project id for which the percentage needed
     * @param uid This is for getting percentage for that given person id
     * @return Returns the percentage as an int
     */
    public int returnPercentage(Connection con,int pid,int uid) {
        int result=0;
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select status from tasks where pid = "+pid);

            int completedCount=0;
            int totalCount=0;
            while (rs.next()) {
                if (rs.getString("status").equals("Completed")){
                    completedCount++;
                }
                totalCount++;
            }

            if (totalCount!=0){
                result = (completedCount*100)/totalCount;
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
    /**
     * This method is to retrieve projects
     * @param con Used to connect to the DB
     * @param uid Used to get projects of the particular user
     * @return returns a JSONArray contains all projects of the given user
     */
    public JSONArray retrieveProject(Connection con, int uid) {
        JSONArray jsArr = new JSONArray();
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from project_relation inner join projects on project_relation.pid = projects.pid where project_relation.uid ="+ uid);

            while (rs.next()) {
                JSONObject jsonObject = new JSONObject();
                int pid = rs.getInt("pid");
                new UpdateProject().changeProjectStatus(con, pid);
                jsonObject.put("id", pid);
                jsonObject.put("projectName", rs.getString("pname"));
                jsonObject.put("status", rs.getString("status"));
                jsonObject.put("fromDate", rs.getString("fromdate"));
                jsonObject.put("toDate", rs.getString("todate"));
                jsonObject.put("users", new RetrieveUser().getUserDetailByPid(con, pid));
                jsonObject.put("createdBy", rs.getInt("created_by"));
                jsonObject.put("projectDesc", rs.getString("comment"));
                jsonObject.put("percentage", returnPercentage(con, pid, uid));
                jsArr.add(jsonObject);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsArr;
    }

    /*For retriving the pid from tid */
    public int retrieveTidByPid(Connection con,int tid) {
        int result=0;
        try {
            Statement stmt=con.createStatement();
            ResultSet rs=stmt.executeQuery("select pid from tasks where tid="+tid);
            rs.next();
            result=rs.getInt("pid");
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        return result;
    }
}
