package com.servlets.task;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.databases.task.*;

public class DeleteTask extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection conn=(Connection)getServletContext().getAttribute("Connection");
        try {
            response.getWriter().print(new Task().deleteTask(conn,Integer.parseInt(request.getParameter("taskId"))));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
