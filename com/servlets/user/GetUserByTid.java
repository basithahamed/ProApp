package com.servlets.user;

import java.sql.Connection;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.databases.users.RetrieveUser;

public class GetUserByTid extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        try {
            Connection con = (Connection) request.getServletContext().getAttribute("Connection");
            response.getWriter().println(new RetrieveUser().getUserDetailByTid(con, Integer.parseInt(request.getParameter("taskId"))));
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
