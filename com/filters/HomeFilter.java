package com.filters;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.servlet.FilterChain;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.authorize.IsExsist;

public class HomeFilter extends HttpFilter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res=(HttpServletResponse)response;
        HttpSession session = req.getSession();
 
        Connection con=null;
       
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con= DriverManager.getConnection("jdbc:mysql://localhost:3306/proapp", "vicky", "vi99g@NESH");
        } catch (ClassNotFoundException | SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
            
        
        Integer uid = (Integer)session.getAttribute("uid");
        if(uid==null)
        {
                res.setContentType("text/html");  

                System.out.println("form login if");
                // RequestDispatcher rd=req.getRequestDispatcher("assets/html/login.html");
                // rd.forward(req, res);

                res.sendRedirect("Login");  
                System.out.println("i am form temp ");
        }
        else
        {
            // System.out.println("from else home");
            
            // System.out.println("id:"+uid);
            // try {
            //     System.out.println("res:"+new IsExsist().checker(con, uid,(String) session.getAttribute("emailId"),(String) session.getAttribute("password")));
            // } catch (SQLException e) {
            //     // TODO Auto-generated catch block
            //     e.printStackTrace();
            // }
            // uid = Integer.parseInt(temp);
            // String mail=(String) session.getAttribute("emailId");
            // String pass=(String) session.getAttribute("password");
            // System.out.println("email:"+mail);
            // System.out.println("pass:"+pass);
            try {
                if (new IsExsist().checker(con, uid,(String) session.getAttribute("emailId"),(String) session.getAttribute("password"))) {
                    System.out.println("homeSucess");
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
        // System.out.print("temp"+temp);
       
        
    }
}
