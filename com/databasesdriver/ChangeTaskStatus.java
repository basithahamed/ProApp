package com.databasesdriver;

import java.sql.Connection;
import java.sql.Statement;

public class ChangeTaskStatus {
    public boolean taskStatusChanger(int tid, Connection con, int uid) {
        boolean result = false;

        try {
            Statement stmt = con.createStatement();
            stmt.executeUpdate("update tasks set status = 'Completed' where tid = " + tid);
            stmt.executeUpdate("delete from task_relation where tid = " + tid + " and uid = " + uid);

            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
