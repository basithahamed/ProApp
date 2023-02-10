package com.databasesdriver;

import java.sql.Connection;
import java.sql.Statement;

public class ChangeTaskStatus {
    public boolean taskStatusChanger(int tid, int uid, Connection con) {
        boolean result = false;

        try {
            Statement stmt = con.createStatement();
            stmt.executeUpdate("update tasks set status = 'Completed' where tid = "+tid);
             
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
