package com.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.databasesdriver.AddProjectToDb;

@MultipartConfig
public class AddProject extends HttpServlet{
    @Override
    
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // TODO Auto-generated method stub
        req.getRequestDispatcher("/assets/html/404.html").forward(req,resp);
        

    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection con =(Connection) request.getServletContext().getAttribute("Connection");

        try {
            JSONObject jsObject = new AddProjectToDb().insertProjects(request,response,con);
            response.getWriter().println(jsObject);
        } catch (SQLException e) {
            e.printStackTrace();
        }    
    }
}
