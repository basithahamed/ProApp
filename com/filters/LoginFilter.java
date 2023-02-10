package com.filters;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.authorize.LoginChecker;
import com.databasesdriver.GetUidByEmail;
import com.databasesdriver.GetUnameByEmail;


@MultipartConfig
public class LoginFilter extends HttpFilter{

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        String userData = request.getParameter("userData");
                // System.out.println("i am form login filter");
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
                    // System.out.println("from lpgin");
                    Class.forName("com.mysql.cj.jdbc.Driver");
                    Connection conn= DriverManager.getConnection("jdbc:mysql://192.168.103.32:3306/proapp", "todoadmins", "todo@111");
                    session.setAttribute("uid", new GetUidByEmail().returnid(conn, email));
                    session.setAttribute("userName", new GetUnameByEmail().returnUname(conn, email));
                    response.getWriter().append("Success");
                }
                else{
                    response.getWriter().append("Invalid Email or Password");

                }
            } catch (Exception e) {
                // System.out.println("i am from Login Filter Exception");
                e.printStackTrace();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}