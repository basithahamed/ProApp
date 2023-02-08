package com.databasesdriver;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


import org.json.simple.parser.ParseException;

public class RemoveProjectFromDb {
    public String deleteProject(Connection con,int pid) throws SQLException, IOException, ParseException {
        String result;
        ResultSet rs = null;
        try {
            Statement stmt = con.createStatement();
            stmt.executeUpdate("delete from project_relation where pid = "+pid);
            Statement st = con.createStatement();
            rs = st.executeQuery("select * from tasks where pid = "+pid);
            while (rs.next()) {
                int tid = rs.getInt("tid");
                stmt.executeUpdate("delete from task_relation where tid = "+tid);
            }
            stmt.executeUpdate("delete from tasks where pid = "+pid);
            stmt.executeUpdate("delete from projects where pid = "+pid);
            
            result="Success";
        } 
        catch (Exception e) {
            e.printStackTrace();
            result="Invalid Project id";
        }
        return result;
    }
}
