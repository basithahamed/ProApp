package com.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.databasesdriver.CurrentUser;

public class GetCurrentUser extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // String name=(String)request.getSession().getAttribute("userName");

        response.getWriter().print(new CurrentUser().whoami(request));
    }
}
