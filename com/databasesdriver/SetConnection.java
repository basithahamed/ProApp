package com.databasesdriver;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class SetConnection implements ServletContextListener{
    public void contextInitialized(ServletContextEvent event){
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection c = DriverManager.getConnection("jdbc:mysql://10.52.0.190:3306/proapp", "todoadmins", "todo@111");
            event.getServletContext().setAttribute("Connection", c);
            System.out.println("Connection attribute setted");
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
    public void contextDestroyed(ServletContextEvent event){
        Connection c = (Connection) event.getServletContext().getAttribute("Connection");
        try {
            c.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        finally{
            event.getServletContext().setAttribute("Connection", "");
        }
    }
}
