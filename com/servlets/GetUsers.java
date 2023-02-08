package com.servlets;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.databasesdriver.GetUserDb;

public class GetUsers extends HttpServlet{
    
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection c=(Connection)getServletContext().getAttribute("Connection");
        GetUserDb getUser=new GetUserDb();
        if(request.getParameter("id").equals("all")){
            response.getWriter().print(getUser.returnAllUser(c));
        }
        else{
            response.getWriter().print(getUser.returnUserId(c,request.getParameter("id")));
        }        

    }
}
