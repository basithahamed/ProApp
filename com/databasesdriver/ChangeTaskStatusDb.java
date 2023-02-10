package com.databasesdriver;

// import java.lang.Thread.State;
import java.sql.Connection;
// import java.sql.DriverManager;
import java.sql.ResultSet;
// import java.sql.SQLException;
import java.sql.Statement;

public class ChangeTaskStatusDb {
    public static boolean taskRelationStatusChanger(Connection con, int tid, int uid) {

        boolean result = false;
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from task_relation where uid = " + uid + " and tid = " + tid);

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

    public static void taskStatusChanger(Connection con, int tid) {
        // boolean result = false;
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
            System.out.println("j:" + j + "total:" + total);
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
        // return result;
    }

    // public static void main(String[] args) throws ClassNotFoundException,
    // SQLException {
    // Class.forName("com.mysql.cj.jdbc.Driver");
    // Connection c =
    // DriverManager.getConnection("jdbc:mysql://192.168.103.32:3306/proapp",
    // "todoadmins", "todo@111");
    // System.out.println("output:" + taskRelationStatusChanger(c, 15, 2));

    // }
}
