package com.servlets;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.databasesdriver.UserProjectRelation;

public class RetrieveProjectRelation extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection con =(Connection) request.getServletContext().getAttribute("Connection");
        String tid=request.getParameter("id");
        int id=Integer.parseInt(tid);
        response.getWriter().print(new UserProjectRelation().GetUidByPid(con, id));
    }
   
}
