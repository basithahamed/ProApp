package com.servlets.task;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import com.databases.task.*;

public class GetAllTasks extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection con=(Connection)request.getServletContext().getAttribute("Connection");
        response.getWriter().print(new RetrieveTask().retrieveTask(con,(Integer) request.getSession().getAttribute("uid")));
    }
}
