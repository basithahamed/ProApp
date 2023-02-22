package com.servlets.task;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;


import com.databases.task.UpdateTask;

@MultipartConfig
public class TaskUpdate extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            JSONObject result = new JSONObject();
            Connection con = (Connection) request.getServletContext().getAttribute("Connection");
            JSONObject jsonObject = (JSONObject) new JSONParser().parse(request.getParameter("updateTaskData"));
            if (new UpdateTask().updateTaskData(con, jsonObject)){
                result.put("response", "Success");
            }
            else{
                result.put("response", "Unsucces");
            }
            response.getWriter().println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
