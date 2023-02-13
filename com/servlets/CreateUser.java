// for registering a user in db
package com.servlets;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.*;

import com.databasesdriver.AddUserDataToDb;

@MultipartConfig
public class CreateUser extends HttpServlet {

    @Override
    
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/assets/html/404.html").forward(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        AddUserDataToDb insertUser=new AddUserDataToDb();
        try {
            insertUser.insertUserData(request,response);    
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }
}