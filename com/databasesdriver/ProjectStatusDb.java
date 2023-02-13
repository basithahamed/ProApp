package com.databasesdriver;

import java.sql.Connection;
import java.sql.Statement;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ProjectStatusDb {
    public static int returnPercentage(Connection con,int pid,int uid) throws ClassNotFoundException, SQLException {
        int result=0;
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select status from tasks where pid = "+pid);

            int compltedCount=0;
            int totalCount=0;
            while (rs.next()) {
                if (rs.getString("status").equals("Completed")){
                    compltedCount++;
                }
                totalCount++;
            }

            if (totalCount!=0){
                result = (compltedCount*100)/totalCount;
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
