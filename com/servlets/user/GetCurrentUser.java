package com.servlets.user;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import com.databases.users.*;

public class GetCurrentUser extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().print(new RetrieveUser().getCurrentUser(request));
    }
}
