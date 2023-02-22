package com.databases.task;

import java.sql.*;
import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.databases.project.RetrieveProject;
import com.databases.project.UpdateProject;
import com.mysql.cj.xdevapi.JsonArray;

/**
 * This class contains the methods to update tasks.
 */
public class UpdateTask {
    /**
     * This method is used to change the status in task_relation table
     * 
     * @param con This connection object is used to connect to DB
     * @param tid This is used to change the status of the particular task.
     * @param uid This is used to change the status of the particular user
     * @return returns a boolean value indicates the change result status.
     */
    public boolean taskRelationStatusChanger(Connection con, int tid, int uid) {
        boolean result = false;
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt
                    .executeQuery("select IsCompleted from task_relation where uid = " + uid + " and tid = " + tid);

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
     * 
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
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * This method is used to delete the user from the task
     * 
     * @param con Used to connect to the DB
     * @param uid Used to delete the particular user
     * @param tid Used to delete from the particular project
     * @return returns a boolean value indicates the deletion status
     */
    public boolean deleteUserFromTask(Connection con, int uid, int tid) {
        boolean result = false;
        try {
            Statement stmt = con.createStatement();
            stmt.executeUpdate("delete from task_relation where uid = " + uid + " and tid=" + tid);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }


    // for checking with already exsist users and compare the result
    public boolean updateTaskUserData(Connection con, JSONObject jsonObject) {
        boolean result = false;
        try {
            int projectId = Integer.parseInt(String.valueOf(jsonObject.get("projectId")));
            JSONArray newUser = (JSONArray) jsonObject.get("users");

            System.out.println("connection : " + con);
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(
                    "select tasks.tid,uid from tasks inner join task_relation on tasks.tid=task_relation.tid where pid = "
                            + projectId);
            ArrayList<String> oldUser = new ArrayList<>();
            int tid=0;
            while (rs.next()) {
                oldUser.add(rs.getString("uid"));
                tid = rs.getInt("tid");
            }
            System.out.println("oldUserlist:" + oldUser);
            System.out.println("json:" + newUser);
      
            for(String oldUserObj:oldUser)
            {
                
                if(!newUser.contains(oldUserObj))
                {
                    deleteUserFromTask(con, Integer.parseInt(oldUserObj), tid);
                    // stmt.executeUpdate("delete from task_relation where tid = " + tid + " and uid = " + oldUserObj);
                    System.out.println("Not Present:"+oldUserObj);
                }
            }
            result=true;
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("resutl"+result);
        return result;
    }


    // for updating data in the task
    public boolean updateTaskData(Connection con,JSONObject jsonObject)
    {
        boolean result=false;
        try
        {

            String taskName = (String) jsonObject.get("taskName");
            int taskId = Integer.parseInt(String.valueOf(jsonObject.get("taskId")));
            String fromDate = (String) jsonObject.get("fromDate");
            String toDate = (String) jsonObject.get("toDate");
            String taskDesc = (String) jsonObject.get("taskDesc");
            
            
            JSONArray users = (JSONArray) jsonObject.get("users");


            Statement stmt=con.createStatement();
            Statement stmt2=con.createStatement();
            stmt.executeUpdate("update tasks set tname='"+taskName+"',fromdate='"+fromDate+"',todate='"+toDate+"',description='"+taskDesc+"') where tid="+taskId );
            for (Object userObj : users) {
                stmt2.executeUpdate("update task_relation set uid="+userObj+"where tid="+taskId);
            }
            new UpdateProject().changeProjectStatus(con,new RetrieveProject().retrieveTidByPid(con, taskId));
            result=true;
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        return result;
    }
}
