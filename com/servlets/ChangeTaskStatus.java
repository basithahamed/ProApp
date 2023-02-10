package com.servlets;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.databasesdriver.ChangeTaskStatusDb;

@MultipartConfig
public class ChangeTaskStatus extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        try {
            JSONObject js=(JSONObject)new JSONParser().parse(request.getParameter("taskData"));
            int taskId = Integer.parseInt(String.valueOf(js.get("taskId")));
            int userId = Integer.parseInt(String.valueOf(js.get("userId")));
            response.getWriter().print(new ChangeTaskStatusDb().taskStatusChanger((Connection)getServletContext().getAttribute("Connection"), taskId, userId));

        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

}
