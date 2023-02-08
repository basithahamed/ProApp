package com.chatserver;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.util.Set;

@ServerEndpoint(value="/proapp")
public class WebServer {
    // private Set<User> users;
    @OnOpen
    public void userConnected(Session s) {
        System.out.println("OnOpen hitted");
        System.out.println(s.getQueryString());
        String[] queryString = s.getQueryString().split("=");
        JSONParser parser = new JSONParser();
        try{
            JSONObject object = (JSONObject) parser.parse(queryString[1]);
            // User u = new User(Integer.parseInt(String.valueOf(object.get("userId"))), (String) object.get("userName"), s);
            // users.add(u);
            System.out.println(object.get("userName") + " connected successfully");
            s.getAsyncRemote().sendText("Connected successfully");
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Currently this method is only used for sending messages to all who are in live connection.
     * @param s
     * @param message
     */
    // @OnMessage
    // public void handleMessage(Session s, String message){
    //     try{
    //         JSONObject clientRequest = (JSONObject) new JSONParser().parse(message);
    //         String messageType = (String) clientRequest.get("messageType");
    //         if(messageType.equals("directMessage")){
    //             for(User u : users){
    //                 if(u.getUserId() == Integer.parseInt(String.valueOf(clientRequest.get("toId")))){
    //                     JSONObject userMessageData = (JSONObject)clientRequest.get("message");
    //                     u.getSession().getAsyncRemote().sendText(userMessageData.toJSONString());
                        
    //                 }
    //             }
    //         }

    //     }
    //     catch(Exception e){
    //         e.printStackTrace();
    //     }
    // }
}
