package com.databasesdriver;

import java.io.IOException;
import java.sql.Connection;
import java.sql.Statement;

import javax.servlet.annotation.MultipartConfig;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@MultipartConfig
public class UpdateUserDetailsDb {
    public JSONObject updateUser(Connection con, String updatedUserData) throws IOException {
        JSONObject resultObject = new JSONObject();
        try {
            JSONObject jsonObject = (JSONObject) new JSONParser().parse(updatedUserData);
            String newFirstName = (String) jsonObject.get("newFirstName");
            String newLastName = (String) jsonObject.get("newLastName");
            String newEmailId = (String) jsonObject.get("newEmailId");
            Long uid = (Long) jsonObject.get("uid");

            Statement stmt = con.createStatement();
            stmt.executeUpdate("update users set uname = '" + newFirstName + "', firstname = '" + newFirstName
                    + "', lastname = '" + newLastName + "', emailid = '" + newEmailId + "' where uid = " + uid);

            resultObject.put("result", "Success");

        } catch (Exception e) {
            resultObject.put("result", "Error");
            e.printStackTrace();
        }
        return resultObject;
    }
}
