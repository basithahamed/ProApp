package com.databasesdriver;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;

public class ChangeProjectStatus {
    public void projectStatusChanger(int pid, Connection con, int uid) {
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select status from tasks where pid = "+pid);
            while (rs.next()) {
                if (rs.getString("status").equals("Completed")){
                    stmt.executeUpdate("update projects set status = 'Completed' where pid = "+pid);
                }
                else{
                    
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
