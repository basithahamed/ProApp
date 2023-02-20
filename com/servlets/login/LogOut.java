package com.servlets.login;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.*;

public class LogOut extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {    
        request.getSession().invalidate();   
        response.setContentType("text/html");  
        response.sendRedirect("login"); 
    }
}