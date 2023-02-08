package com.databasesdriver;

import java.io.IOException;
import java.sql.Connection;
import java.sql.Statement;

import javax.servlet.annotation.MultipartConfig;

import org.json.simple.parser.ParseException;

@MultipartConfig
public class RemoveTaskFromDb {
    public String deleteTask(Connection con,int tid) throws IOException, ParseException {
        // JSONObject jsonObject = (JSONObject) new JSONParser().parse(request.getParameter("taskData"));
        String result="";
        try {
            Statement stmt = con.createStatement();
            stmt.executeUpdate("delete from task_relation where tid = "+tid);
            stmt.executeUpdate("delete from tasks where tid = "+tid);
            result="Success";
        } 
        catch (Exception e) {
            e.printStackTrace();
            result="Invalid Task id ,!!! ID AH olung kuda Da";
        }
        return result;
    }   
}
