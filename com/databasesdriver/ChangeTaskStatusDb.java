package com.databasesdriver;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class ChangeTaskStatusDb {
    public boolean  taskStatusChanger(Connection con,int tid, int uid) {
        boolean result = false;

        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from task_relation where uid = "+uid +" and tid = "+tid);
            // System.out.println("rs:"+rs);
            while (rs.next()) {
                // System.out.println(!Boolean.parseBoolean(rs.getString("IsCompleted")));
                stmt.executeUpdate("update task_relation set IsCompleted = 'True' where tid = "+tid+" and uid = "+uid);
            }
            Statement stmt2 = con.createStatement();
            ResultSet rs2 = stmt2.executeQuery("select * from tasks where tid = "+tid);
            ProjectStatusDb psobj = new ProjectStatusDb();
            while (rs2.next()) {
                psobj.returnPercentage(con, rs2.getInt("pid"), uid);
            }
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
