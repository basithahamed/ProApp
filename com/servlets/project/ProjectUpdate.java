package com.servlets.project;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.databases.project.UpdateProject;

@MultipartConfig
public class ProjectUpdate extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            JSONObject result = new JSONObject();
            Connection con = (Connection) request.getServletContext().getAttribute("Connection");
            JSONObject jsonObject = (JSONObject) new JSONParser().parse(request.getParameter("updateProjectData"));
            if (new UpdateProject().updateProjectData(con, jsonObject)){
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
