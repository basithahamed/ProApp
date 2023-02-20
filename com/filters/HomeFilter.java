package com.filters;

import java.io.IOException;
import java.sql.*;

import javax.servlet.*;
import javax.servlet.http.*;

import com.authorize.IsExist;

/**
 * Home Filter Will be Called When we enter the Home Page
 * It won't let the user in without the session 
 */
public class HomeFilter extends HttpFilter {
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res=(HttpServletResponse)response;
        HttpSession session = req.getSession();
 
        Connection con=null;
       
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con= DriverManager.getConnection("jdbc:mysql://10.52.0.126:3306/proapp", "todoadmins", "todo@111");
        } catch (Exception e) {
            e.printStackTrace();
        }
            
        
        Integer uid = (Integer)session.getAttribute("uid");
        if(uid==null)
        {
                res.setContentType("text/html");  
                res.sendRedirect("login");  
        }
        else
        {
            try {
                if (new IsExist().checker(con, uid,(String) session.getAttribute("emailId"),(String) session.getAttribute("password"))) {
                    //System.out.println("homeSucess");
                    RequestDispatcher rd=request.getRequestDispatcher("home");
                    rd.forward(request, response);
                }
                else{
                    RequestDispatcher rd=request.getRequestDispatcher("Login");
                    rd.forward(request, response);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }        
    }
}
