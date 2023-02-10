package com.databasesdriver;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class UserAllProjectFromDb {
    public static JSONArray retrieveProject(Connection con, int uid) {
        JSONArray jsArr = new JSONArray();
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(
                    "select * from project_relation inner join projects on project_relation.pid = projects.pid where project_relation.uid ="
                            + uid);

            int pid;
            while (rs.next()) {
                JSONObject jsonObject = new JSONObject();
                pid = rs.getInt("pid");
                ProjectStatusChanger(con,pid);
                jsonObject.put("id", pid);
                jsonObject.put("projectName", rs.getString("pname"));
                jsonObject.put("status", rs.getString("status"));
                jsonObject.put("fromDate", rs.getString("fromdate"));
                jsonObject.put("toDate", rs.getString("todate"));
                jsonObject.put("users", new UserProjectRelation().GetUidByPid(con, pid));
                jsonObject.put("createdBy", rs.getString("created_by"));
                jsonObject.put("projectDesc", rs.getString("comment"));
                // jsonObject.put("percentage", new ProjectStatusDb().returnPercentage(con, pid, uid));
                jsArr.add(jsonObject);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsArr;
    }

    public static String ProjectStatusChanger(Connection con,int pid) {
        String result="";
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select status from tasks where pid = " + pid);
            int j = 0;
            int total = 0;
            while (rs.next()) {
                if (rs.getString("status").equals("Completed")) {
                    j++;
                }
                total++;
            }
            System.out.println("j:" + j + "total:" + total + "pid: "+pid);
            if (j == 0) {
                stmt.executeUpdate("update projects set status = 'Yet To Start' where pid = " + pid);
                result="Yet To Start";
            } else if (total == j) {
                stmt.executeUpdate("update projects set status = 'Completed' where pid = " + pid);
                result="Completed";
            } else if (j > 0) {
                stmt.executeUpdate("update projects set status = 'On Progress' where pid = " + pid);
                result="On Progress";
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
    // public static void main(String[] args) throws ClassNotFoundException, SQLException {
    //     Class.forName("com.mysql.cj.jdbc.Driver");
    //     Connection c = DriverManager.getConnection("jdbc:mysql://192.168.103.32:3306/proapp", "todoadmins", "todo@111");
    //     System.out.println(retrieveProject(c, 2));
    // }
}

