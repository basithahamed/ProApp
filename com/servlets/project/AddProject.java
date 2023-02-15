package com.servlets.project;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import com.databases.project.Project;

@MultipartConfig
public class AddProject extends HttpServlet{
    @Override 
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/assets/html/404.html").forward(req,resp);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection con =(Connection) request.getServletContext().getAttribute("Connection");

        try {
            JSONObject object = (JSONObject) new JSONParser().parse(request.getParameter("data"));
            JSONObject jsObject = new Project().insertProject(object, con);
            response.getWriter().println(jsObject);
        } 
        catch (Exception e) {
            e.printStackTrace();
        }    
    }
}
