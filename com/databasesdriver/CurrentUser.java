package com.databasesdriver;

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
        jsonObject.put("imagePath", sess.getAttribute("uid")+".png");
        return jsonObject;
    }
}
