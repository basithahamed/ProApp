package com.databases.task;

import java.sql.*;

import com.databases.project.RetrieveProject;
import com.databases.project.UpdateProject;

/**
 * This class contains the methods to update tasks.
 */
public class UpdateTask {
    /**
     * This method is used to change the status in task_relation table
     * @param con This connection object is used to connect to DB
     * @param tid This is used to change the status of the particular task.
     * @param uid This is used to change the status of the particular user
     * @return returns a boolean value indicates the change result status.
     */
    public boolean taskRelationStatusChanger(Connection con, int tid, int uid) {
        boolean result = false;
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select IsCompleted from task_relation where uid = " + uid + " and tid = " + tid);

            rs.next();
            stmt.executeUpdate(
                    "update task_relation set IsCompleted = '" + !Boolean.parseBoolean(rs.getString("IsCompleted"))
                            + "' where tid = " + tid + " and uid = " + uid);

            taskStatusChanger(con, tid);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * This method is used to change the status of the task.
     * @param con This connection object is used to connect to DB
     * @param tid This is used to change the status of the particular task. 
     */
    public void taskStatusChanger(Connection con, int tid) {
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select IsCompleted from task_relation where tid = " + tid);

            int j = 0;
            int total = 0;
            while (rs.next()) {
                if (rs.getString("IsCompleted").equals("true")) {
                    j++;
                }
                total++;
            }
            
            if (j == 0) {
                stmt.executeUpdate("update tasks set status = 'Yet To Start' where tid = " + tid);
            } else if (total == j) {
                stmt.executeUpdate("update tasks set status = 'Completed' where tid = " + tid);
            } else if (j > 0) {
                stmt.executeUpdate("update tasks set status = 'On Progress' where tid = " + tid);
            }
            new UpdateProject().changeProjectStatus(con, new RetrieveProject().retrieveTidByPid(con, tid));
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
    }
    /**
     * This method is used to delete the user from the task
     * @param con Used to connect to the DB
     * @param uid Used to delete the particular user
     * @param tid Used to delete from the particular project
     * @return returns a boolean value indicates the deletion status
     */
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
