package com.databasesdriver;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;

public class CurrentUser {
    // method for returning the current user
    public JSONObject whoami(ServletRequest request) {
        HttpServletRequest req=(HttpServletRequest) request;
        HttpSession sess=req.getSession();
        JSONObject jsonObject=new JSONObject();
        jsonObject.put("currentUserId", sess.getAttribute("uid"));
        jsonObject.put("currentUserName", sess.getAttribute("userName"));
        // 
        Connection con = (Connection) request.getServletContext().getAttribute("Connection");
        String imagePath = new SaveImageDb().getImagePath((int) sess.getAttribute("uid"), con);
        jsonObject.put("imagePath", imagePath);
        
        return jsonObject;
    }
}
