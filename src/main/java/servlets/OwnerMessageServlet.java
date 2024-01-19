package servlets;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import database.tables.EditMessagesTable;
import database.tables.EditReviewsTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import mainClasses.JSON_Converter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@WebServlet(name = "OwnerMessageServlet", value = "/OwnerMessageServlet")
public class OwnerMessageServlet extends HttpServlet {
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

        bookingJson.addProperty("sender", "owner");
        bookingJson.addProperty("datetime", formattedDateTime);
        String jsonString = bookingJson.toString();
        System.out.println(jsonString);

        EditMessagesTable editMessagesTable = new EditMessagesTable();
        try {
            editMessagesTable.addMessageFromJSON(jsonString);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        response.getWriter().write("Message send successfully");
    }
}
