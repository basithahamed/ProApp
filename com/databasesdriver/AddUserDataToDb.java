package com.databasesdriver;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@MultipartConfig
public class AddUserDataToDb {
    public void insertUserData(HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException {
        Connection con = (Connection) request.getServletContext().getAttribute("Connection");
        Statement stmt = null;
    
        try {
            JSONParser parser = new JSONParser();
            JSONObject jsonObject=(JSONObject) parser.parse(request.getParameter("userData")); 
            
            String uname =  (String)jsonObject.get("firstName");
            String firstname = (String)jsonObject.get("firstName"); 
            String lastname =  (String)jsonObject.get("lastName");
            String emailid = (String) jsonObject.get("emailId");
            String password = (String)jsonObject.get("password");
            
            stmt = con.createStatement();
            // inserting the userdata into users table
            stmt.executeUpdate("insert into users (uname,firstname,lastname,emailid,password) values(" + "'" + uname + "','" + firstname + "','" + lastname + "','" + emailid + "','" + password + "')");
            response.getWriter().println("success");
        } 
        catch (Exception e) {
            e.printStackTrace();
            response.getWriter().println("Error");
        } 
        
    }
}