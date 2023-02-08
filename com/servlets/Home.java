// login logic
package com.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.*;

@MultipartConfig
public class Home extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("i am from home");
        // response.sendRedirect("https://www.google.co.in/");  
                request.getRequestDispatcher("assets/html/home/main.html").forward(request, response);
                // response.getWriter().print("response");

    }
}