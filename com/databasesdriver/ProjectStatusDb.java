package com.databasesdriver;

import java.sql.Connection;
import java.sql.Statement;



import java.sql.ResultSet;
import java.sql.SQLException;

public class ProjectStatusDb {
    public  int returnPercentage(Connection con,int pid,int uid) throws ClassNotFoundException, SQLException {
        int result=0;
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select status from tasks where pid = "+pid);

            int j=0;
            int total=0;
            while (rs.next()) {
                if (rs.getString("status").equals("Completed")){
                    j++;
                }
                total++;
            }
            System.out.println("j:"+j+"total:"+total);
            if(total==j)
            {
                stmt.executeUpdate("update projects set status = 'Completed' where pid = "+pid);
            }


            result = (j/total)*100;
            // jsobj.put("percentage",percentage );
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

}
