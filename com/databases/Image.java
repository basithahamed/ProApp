package com.databases;
import java.io.*;
import java.sql.*;
import java.util.Arrays;

import javax.servlet.http.Part;
/**
 * This class contains the methods to add, update profile photo.
 */
public class Image {

    /**
     * This method updates the existing profile photo.
     * @param c Connection object used to connect to the database.
     * @param part This is used to get and save images in DB
     * @param uid This id is used to save the image in DB for that particular user.
     * @param imageType like --> .jpg, .png etc,.
     * @param location only folder location ends with '/' to save the image
     * @return returns a boolean value, true if process completed successfully or false.
     */
    public boolean updatePhoto(Connection c, Part part, int uid,String imageType, String location) {
        boolean result=false;

        try {
            deletePreviousImage(uid, location);

            Statement st = c.createStatement();

            InputStream in = part.getInputStream();
            File f = new File(location + uid + imageType);
    
            FileOutputStream out = new FileOutputStream(f);
            int readingValue = 0;
            byte[] b = new byte[1024];

            while((readingValue = in.read(b)) != -1){
                out.write(b, 0, readingValue);
            }
            out.close();

            st.executeUpdate("update images set imagePath = '" + uid + imageType + "' where uid = " + uid);
            result=true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * This method is to find whether the image extension of a user is .png or .jpg etc, .
     * @param uid This is the user id used to find the particular user in DB.
     * @param con This Connection object used to connect to DB.
     * @return Returns the extension of the user's image.
     */
    public String getImagePath(int uid, Connection con){
        String path = "";
        try {
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("select imagePath from images where uid = " + uid);
            rs.next();
            path = rs.getString(1);
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
        return path;
    }

    /**
     * This method is used to add a user's image to DB
     * @param uid This id is used to add a image to the particular user to DB
     * @param con This Connection object is used to connect to DB
     */
    public void insertImage(int uid,Connection con) {
        try {
            Statement stmt = con.createStatement();
            stmt.executeUpdate("insert into images (uid) values("+uid+")");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    /**
     * This method is used to delete the previous image
     * @param id With this user id the image will be deleted
     * @param location Images in this location will be deleted
     */
    private void deletePreviousImage(int id, String location){
        try{
            File f = new File(location);
            if(f.isDirectory()){
                File[] allFiles = f.listFiles();
                for(File file : allFiles){
                    String[] splittedFileName = file.getName().split("\\.");
                    if(splittedFileName[0].equals(String.valueOf(id))){
                        file.delete();
                    } 
                }
            }
            else {
                System.out.println("Check the location path it is not a directory");
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}