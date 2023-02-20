package com.servlets.user;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import com.databases.users.*;

public class RetrieveUsersFromProject extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection con =(Connection) request.getServletContext().getAttribute("Connection");
        String tid=request.getParameter("id");
        int id=Integer.parseInt(tid);
        response.getWriter().print(new RetrieveUser().getUserDetailByPid(con, id));
    }
}
