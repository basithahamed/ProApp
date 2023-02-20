package com.servlets.task;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.*;

import org.json.simple.JSONObject;
import org.json.simple.parser.*;

import com.databases.task.*;

@MultipartConfig
public class ChangeTaskStatus extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            JSONObject js = (JSONObject) new JSONParser().parse(request.getParameter("taskData"));
            int taskId = Integer.parseInt(String.valueOf(js.get("taskId")));
            int userId = Integer.parseInt(String.valueOf(js.get("userId")));
            response.getWriter().print(new UpdateTask().taskRelationStatusChanger(
                    (Connection) getServletContext().getAttribute("Connection"), taskId, userId));

        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

}
