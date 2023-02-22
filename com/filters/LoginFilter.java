package com.filters;

import java.io.IOException;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import com.authorize.LoginChecker;
import com.databases.users.RetrieveUser;

/**
 * Login Filter Is to Evaluate user Email and password
 */

@MultipartConfig
public class LoginFilter extends HttpFilter{

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        String userData = request.getParameter("userData");
        try {
            
            JSONObject jsObj = (JSONObject) new JSONParser().parse(userData);
            String email = (String) jsObj.get("emailId");
            String password = (String) jsObj.get("password");
            LoginChecker loginChecker = new LoginChecker();

            try {
                if (loginChecker.validater(email, password)) {
                    HttpServletRequest sessionVar = (HttpServletRequest) request; // changing the servlet Requet to http // servelt Request
                    HttpSession session = sessionVar.getSession(); // making a session Var
                    session.setAttribute("emailId", email);
                    session.setAttribute("password", password);
                    // //System.out.println("from lpgin");
                    RetrieveUser ru = new RetrieveUser();
                    Class.forName("com.mysql.cj.jdbc.Driver");
                    Connection conn= DriverManager.getConnection("jdbc:mysql://10.52.0.131:3306/proapp", "todoadmins", "todo@111");
                    session.setAttribute("uid", ru.getUidByEmail(conn, email));
                    session.setAttribute("userName", ru.getUnameByEmail(conn, email));
                    response.getWriter().append("Success");
                }
                else{
                    response.getWriter().append("Invalid Email or Password");

                }
            } 
            catch (Exception e) {
                e.printStackTrace();
            }
        } 
        catch (Exception e) {
            e.printStackTrace();
        }

    }

}