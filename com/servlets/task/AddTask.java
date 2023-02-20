package com.servlets.task;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.*;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.databases.task.*;

@MultipartConfig
public class AddTask extends HttpServlet{

    @Override
    
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/assets/html/404.html").forward(req,resp);    
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection con=(Connection)getServletContext().getAttribute("Connection");
        try {
            JSONObject object = (JSONObject) new JSONParser().parse(request.getParameter("taskData"));
            response.getWriter().print(new Task().taskAdd(con, object));
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
