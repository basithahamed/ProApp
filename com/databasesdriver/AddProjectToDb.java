package com.databasesdriver;

import java.sql.Connection;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@MultipartConfig
public class AddProjectToDb {

    public JSONObject insertProjects(HttpServletRequest request, HttpServletResponse response,Connection con) throws SQLException {

        ResultSet rs = null;
        Statement stmt = con.createStatement();
        JSONObject resJsObj=new JSONObject();
        try {
            JSONObject jsObj = (JSONObject) new JSONParser().parse(request.getParameter("data"));
            String pname = (String) jsObj.get("projectName");
            String fromdate = (String) jsObj.get("fromDate");
            String todate = (String) jsObj.get("toDate");
            String comment = (String) jsObj.get("projectDesc");
            long createdBy = (long) jsObj.get("createdBy");
            JSONArray users = (JSONArray) jsObj.get("users");
            JSONArray userDetails = new JSONArray();

            // inserting the given project data
            stmt.executeUpdate("insert into projects(pname,fromdate,todate,comment,created_by) values('" + pname + "','" + fromdate + "','" + todate + "','" + comment + "','" + createdBy + "')");
            rs = stmt.executeQuery("select * from projects order by pid desc limit 1");
            rs.next(); 
            int pid = Integer.parseInt(rs.getString("pid"));//getting the latest pid to add in project_relation table

            Statement stmt2 = con.createStatement();
            ResultSet rs2;
            for (int i = 0; i < users.size(); i++) {
                // //System.out.println(jsonArray.get(i));
                
                // adding the jsonarray of users by iterating
                Long uid = Long.parseLong(String.valueOf(users.get(i)));
                stmt.executeUpdate("insert into project_relation (pid,uid) values(" + pid + "," + uid + ")");
                rs2 = stmt2.executeQuery("select * from users where uid = "+uid);
                while(rs2.next()){
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("userId",rs2.getInt("uid"));
                    jsonObject.put("userName",rs2.getString("uname"));
                    userDetails.add(jsonObject);
                }         
            }

            // storing the added data in jsonobject and returning it
            resJsObj.put("id", pid);
            resJsObj.put("projectName", pname);
            resJsObj.put("projectDesc", comment);
            resJsObj.put("fromDate", fromdate);
            resJsObj.put("toDate", todate);
            resJsObj.put("createdBy", createdBy);
            resJsObj.put("users", userDetails);
        } 
        catch (Exception e) {
            e.printStackTrace();
        } 
        return resJsObj;
    }
}
