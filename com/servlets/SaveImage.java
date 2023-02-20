package com.servlets;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.databasesdriver.SaveImageDb;

@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 40,
 maxFileSize = 1024 * 1024 * 80,
 maxRequestSize = 1024 * 1024 * 100)

public class SaveImage extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection con=(Connection)getServletContext().getAttribute("Connection");
        // System.out.println(request.getParameter("imageType"));
        response.getWriter().println(new SaveImageDb().savePhoto(con,request.getParts(),request.getParameter("uid"),request.getParameter("imageType")));
    }
}
