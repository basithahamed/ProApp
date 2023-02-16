package com.listener;

import java.sql.*;
import javax.servlet.*;

/**
 * This class contains the listener for database connectivity
 */
public class SetConnection implements ServletContextListener{
    /**
     * This method is used for creating a database connection and store it in the ServletContext Attribute.
     */
    public void contextInitialized(ServletContextEvent event){
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection c = DriverManager.getConnection("jdbc:mysql://10.52.0.126:3306/proapp", "todoadmins", "todo@111");
            event.getServletContext().setAttribute("Connection", c);
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
    /**
     * This method is used for deleting a database connection in the ServletContext Attribute.
     */
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
