package com.servlets;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.parser.ParseException;

import com.databasesdriver.RemoveTaskFromDb;

public class DeleteTask extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection conn=(Connection)getServletContext().getAttribute("Connection");
        try {
            response.getWriter().print(new RemoveTaskFromDb().deleteTask(conn,Integer.parseInt(request.getParameter("taskId"))));
        } catch (NumberFormatException | ParseException e) {
            e.printStackTrace();
        }
    }
}
