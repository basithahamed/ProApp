package com.servlets;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



import com.databasesdriver.saveImageDb;
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 40,
 maxFileSize = 1024 * 1024 * 80,
 maxRequestSize = 1024 * 1024 * 100)
public class saveImage extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        Connection c=(Connection)getServletContext().getAttribute("Connection");
        response.getWriter().println(new saveImageDb().savePhoto(c,request.getParts(),Integer.parseInt(request.getParameter("uid")),request.getParameter("imageType")));

    }

}
