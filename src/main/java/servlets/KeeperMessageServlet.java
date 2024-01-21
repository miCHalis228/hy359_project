package servlets;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import database.tables.EditMessagesTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import mainClasses.JSON_Converter;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@WebServlet(name = "KeeperMessageServlet", value = "/KeeperMessageServlet")
public class KeeperMessageServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSON_Converter json = new JSON_Converter();
        String data = json.getJSONFromAjax(request.getReader());
        JsonObject bookingJson = JsonParser.parseString(data).getAsJsonObject();

        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = currentDateTime.format(formatter);

        bookingJson.addProperty("sender", "keeper");
        bookingJson.addProperty("datetime", formattedDateTime);
        String jsonString = bookingJson.toString();
        System.out.println(jsonString);

        PrintWriter out = response.getWriter();
        EditMessagesTable editMessagesTable = new EditMessagesTable();
        try {
            editMessagesTable.addMessageFromJSON(jsonString);
            out.write("Message Sent!");
        } catch (ClassNotFoundException e) {
            out.write(e.getMessage());
        }

        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        response.getWriter().write("Message send successfully");
    }
}
 
