package com.databasesdriver;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;


import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.authorize.IsExsist;

@MultipartConfig
public class AddUserDataToDb {
    public void insertUserData(HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException {
        Connection con = (Connection) request.getServletContext().getAttribute("Connection");
        Statement stmt = null;
        JSONObject resultObject = new JSONObject();
        try {
            JSONParser parser = new JSONParser();
            JSONObject jsonObject=(JSONObject) parser.parse(request.getParameter("userData")); 
            
            String uname =  (String)jsonObject.get("firstName");
            String firstname = (String)jsonObject.get("firstName"); 
            String lastname =  (String)jsonObject.get("lastName");
            String emailid = (String) jsonObject.get("emailId");
            String password = (String)jsonObject.get("password");
            
            IsExsist isObj=new IsExsist();
            if(isObj.IsRegisteredDetailsExists(con, emailid, uname).equals("Email Id Already Exsist"))
            {
                resultObject.put("result", "Email Id Already Exsist");
                response.getWriter().print(resultObject);
            }
            else if(isObj.IsRegisteredDetailsExists(con, emailid, uname).equals("Username Already Exsist"))
            {
                resultObject.put("result", "Username Already Exsist");
                response.getWriter().print(resultObject);
            }
            else
            {
                stmt = con.createStatement();
                stmt.executeUpdate("insert into users (uname,firstname,lastname,emailid,password) values(" + "'" + uname + "','" + firstname + "','" + lastname + "','" + emailid + "','" + password + "')");
                resultObject.put("result", "Success");
                //System.out.println("suces form add user");
                //System.out.println(emailid + ", " + password);
                HttpSession session = request.getSession();
                session.setAttribute("emailId", emailid);
                session.setAttribute("password", password);
                session.setAttribute("uid", new GetUidByEmail().returnid(con, emailid));
                session.setAttribute("userName", new GetUnameByEmail().returnUname(con, emailid));
                response.getWriter().print(resultObject);
            }
        } 
        catch (Exception e) {
            e.printStackTrace();
            
            response.getWriter().println(resultObject);
        } 
    }
}
