package com.servlets.user;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import com.databases.users.*;
import java.sql.*;

@MultipartConfig
public class UpdateUserDetails extends HttpServlet{

   @Override
   protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Connection c=(Connection)getServletContext().getAttribute("Connection");
        try{
            JSONObject jsonObject = (JSONObject) new JSONParser().parse(req.getParameter("updatedUserData"));
            resp.getWriter().print(new UpdateUser().updateUser(c, jsonObject));
        }
        catch(Exception e){
            e.printStackTrace();
        }
    
   }
}
