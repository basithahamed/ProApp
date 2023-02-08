package com.servlets;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.databasesdriver.RemoveProjectFromDb;

public class DeleteProject extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection conn=(Connection)getServletContext().getAttribute("Connection");
        try {
            response.getWriter().print(new RemoveProjectFromDb().deleteProject(conn,Integer.parseInt(request.getParameter("projectId"))));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
