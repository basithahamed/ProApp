package com.databasesdriver;

import java.sql.*;

public class RemoveUserFromProject{
    public boolean deleteUserFromProject(long uid, int pid, Connection con){
        boolean result = false;
        try{
            Statement stmt = con.createStatement();
            stmt.executeUpdate("delete from project_relation where uid = "+uid+"    and pid = "+pid);
            result = true;
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
