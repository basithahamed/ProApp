package com.databasesdriver;

import java.io.IOException;
import java.sql.Connection;
import java.sql.Statement;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@MultipartConfig
public class UpdateUserDetails {
    public void updateUser(HttpServletRequest request, HttpServletResponse response, Connection con) throws IOException {
        JSONObject resultObject = new JSONObject();
        try {
            JSONObject jsonObject = (JSONObject) new JSONParser().parse(request.getParameter("userUpdateData"));
            String newFirstName = (String) jsonObject.get("newFirstName");
            String newLastName = (String) jsonObject.get("newLastName");
            String newEmailId = (String) jsonObject.get("newEmailId");
            String newPassword = (String) jsonObject.get("newPassword");
            Long uid = (Long) jsonObject.get("uid");

            Statement stmt = con.createStatement();
            stmt.executeUpdate("update users set uname = '"+newFirstName+"', firstname = '"+newFirstName+"', lastname = '"+newLastName+"', emailid = '"+newEmailId+"', password = '"+newPassword+"' where uid = "+uid);

            resultObject.put("result", "Success");
            response.getWriter().print(resultObject);
            
        } catch (Exception e) {
            resultObject.put("result", "Error");
            response.getWriter().print(resultObject);
            e.printStackTrace();
        }
    }
}
