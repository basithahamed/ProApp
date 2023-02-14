package com.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.databasesdriver.UpdateUserDetailsDb;
import java.sql.*;

@MultipartConfig
public class UpdateUserDetails extends HttpServlet{

   @Override
   protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Connection c=(Connection)getServletContext().getAttribute("Connection");
        try{
            System.out.println("updated:"+req.getParameter("updatedUserData"));
            resp.getWriter().print(new UpdateUserDetailsDb().updateUser(c,req.getParameter("updatedUserData")));
        }
        catch(Exception e){
            e.printStackTrace();
        }
    
   }
}
