package com.databases.users;

import java.sql.*;
import org.json.simple.JSONObject;

/**
 * This class is used to update user details.
 */
public class UpdateUser {
    /**
     * This method is used to update existing user detail
     * @param con Used to connect to the DB
     * @param updatedUserData contains newFirstName, newLastName, newEmailId, uid
     * @return returns success or failed in a JSONObject
     */
    public JSONObject updateUser(Connection con, JSONObject updatedUserData) {
        JSONObject resultObject = new JSONObject();
        try {
            String newFirstName = (String) updatedUserData.get("newFirstName");
            String newLastName = (String) updatedUserData.get("newLastName");
            String newEmailId = (String) updatedUserData.get("newEmailId");
            Long uid = (Long) updatedUserData.get("uid");

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
