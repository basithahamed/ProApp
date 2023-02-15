package com.servlets.project;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.databases.project.*;

public class GetAllProjects extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection con=(Connection)request.getServletContext().getAttribute("Connection");
        response.getWriter().print(new RetrieveProject().retrieveProject(con,(Integer) request.getSession().getAttribute("uid")));
    }

}
