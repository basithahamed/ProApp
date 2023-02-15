package com.servlets.user;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.databases.users.*;

public class GetUsers extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection c=(Connection)getServletContext().getAttribute("Connection");
        RetrieveUser getUser = new RetrieveUser();
        if(request.getParameter("id").equalsIgnoreCase("all")){
            response.getWriter().print(getUser.getAllUser(c));
        }
        else{
            response.getWriter().print(getUser.getUserDetails(c,request.getParameter("id")));
        }        

    }
}
