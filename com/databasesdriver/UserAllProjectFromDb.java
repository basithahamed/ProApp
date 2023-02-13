package com.databasesdriver;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class UserAllProjectFromDb {
    public JSONArray retrieveProject(Connection con, int uid) {
        JSONArray jsArr = new JSONArray();
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(
                    "select * from project_relation inner join projects on project_relation.pid = projects.pid where project_relation.uid ="
                            + uid);

            ProjectStatusDb psdb = new ProjectStatusDb();
            while (rs.next()) {
                JSONObject jsonObject = new JSONObject();
                int pid = rs.getInt("pid");
                ProjectStatusChanger(con, pid);
                jsonObject.put("id", pid);
                jsonObject.put("projectName", rs.getString("pname"));
                jsonObject.put("status", rs.getString("status"));
                jsonObject.put("fromDate", rs.getString("fromdate"));
                jsonObject.put("toDate", rs.getString("todate"));
                jsonObject.put("users", new UserProjectRelation().GetUidByPid(con, pid));
                jsonObject.put("createdBy", rs.getInt("created_by"));
                jsonObject.put("projectDesc", rs.getString("comment"));
                jsonObject.put("percentage", psdb.returnPercentage(con, pid, uid));
                jsArr.add(jsonObject);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsArr;
    }

    public static void ProjectStatusChanger(Connection con, int pid) {
        // boolean result = false;
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select status from tasks where pid = " + pid);

            int completedCount = 0;
            int onProgressCount = 0;
            int totalCount = 0;
            while (rs.next()) {
                if (rs.getString("status").equals("Completed")) {
                    completedCount++;
                } else if (rs.getString("status").equals("On Progress")) {
                    onProgressCount++;
                }
                totalCount++;
            }
            System.out.println("completedCount:" + completedCount + "totalCount:" + totalCount +"on progress ="+onProgressCount);
            if (totalCount == completedCount) {
                stmt.executeUpdate("update projects set status = 'Completed' where pid = " + pid);

            } else if (completedCount > 0) {
                stmt.executeUpdate("update projects set status = 'On Progress' where pid = " + pid);

            }
            else if (onProgressCount > 0) {
                stmt.executeUpdate("update projects set status = 'On Progress' where pid = " + pid);
            } 
            else if (completedCount == 0) {
                
                stmt.executeUpdate("update projects set status = 'Yet To Start' where pid = " + pid);

            } 
        } catch (Exception e) {
            e.printStackTrace();
        }
        // return result;
    }

    
}
