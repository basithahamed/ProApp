package com.servlets;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.databasesdriver.UserAllTaskFromDb;

public class GetAllTask extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        Connection con=(Connection)request.getServletContext().getAttribute("Connection");

        response.getWriter().print(new UserAllTaskFromDb().retrieveTask(con,(Integer) request.getSession().getAttribute("uid")));
    }

}
