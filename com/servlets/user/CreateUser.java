package com.servlets.user;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.*;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.databases.users.*;

@MultipartConfig
public class CreateUser extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/assets/html/404.html").forward(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            User insertUser = new User();
            JSONObject jsonObject = (JSONObject) new JSONParser().parse(request.getParameter("userData"));
            Connection c = (Connection) request.getServletContext().getAttribute("Connection");
            insertUser.insertUserData(c, jsonObject, request);    
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}