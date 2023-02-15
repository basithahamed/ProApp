package com.databases.project;

import java.sql.*;

/**
 * This class contains methods to update project details
 */
public class UpdateProject {
    /**
     * This method is used to delete a user from the project
     * @param uid To delete this particular user
     * @param pid To select the particular project
     * @param con Used to connect to DB
     * @return returns a boolean indicates the proccess result 
     */
    public boolean deleteUserFromProject(long uid, int pid, Connection con){
        boolean result = false;
        try{
            Statement stmt = con.createStatement();
            stmt.executeUpdate("delete from project_relation where uid = "+uid+" and pid = "+pid);
            result = true;
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return result;
    }
    /**
     * This method is used to change the status of the project
     * @param con Used to connect to the DB
     * @param pid Used to change status of the particular user's project 
     */
    public void changeProjectStatus(Connection con, int pid) {
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
            //System.out.println("completedCount:" + completedCount + "totalCount:" + totalCount +"on progress ="+onProgressCount);
            if (totalCount == completedCount) {
                stmt.executeUpdate("update projects set status = 'Completed' where pid = " + pid);
            } else if (completedCount > 0) {
                stmt.executeUpdate("update projects set status = 'On Progress' where pid = " + pid);
            } else if (onProgressCount > 0) {
                stmt.executeUpdate("update projects set status = 'On Progress' where pid = " + pid);
            } else if (completedCount == 0) {
                stmt.executeUpdate("update projects set status = 'Yet To Start' where pid = " + pid);
            } 
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
