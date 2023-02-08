// login logic
package com.servlets;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.*;

@MultipartConfig
public class Login extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // System.out.print("Login sersvlet");
        
        request.getRequestDispatcher("/assets/html/login.html").forward(request, response);
    }
}