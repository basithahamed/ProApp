package com.databasesdriver;

import java.sql.Connection;
import java.sql.Statement;

public class RemoveUserFromTask {
    public boolean deleteUserFromTask(Connection con, int uid, int tid) {
        boolean result = false;
        try {
            Statement stmt = con.createStatement();
            stmt.executeUpdate("delete from task_relation where uid = "+uid+" and tid="+tid);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result ;
    }
}
