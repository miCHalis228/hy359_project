package servlets;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.*;
import java.util.Arrays;

//@WebServlet(name = "getPets", value = "/getPets")
@WebServlet("/getPets")
public class getPets extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String filePath = "C:\\Users\\maria\\Desktop\\uni\\hy359\\A3_csd4773\\src\\main\\java\\com\\Javascript_Client\\client.html";
        File file = new File(filePath);

        response.setContentType("text/html");
        response.setHeader("Content-Disposition", "attachment; filename=" + file.getName());
        response.setStatus(200);

        // Copy file content to response output stream
        try (InputStream inputStream = new FileInputStream(file);
             OutputStream outputStream = response.getOutputStream()) {
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            System.out.println(Arrays.toString(buffer));
        } catch (Exception e){
            System.err.println(e.getMessage());
            response.setStatus(404);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
 
