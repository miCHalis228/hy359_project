package servlets;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import database.tables.EditBookingsTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import mainClasses.JSON_Converter;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

@WebServlet(name = "KeeperUpdateBooking", value = "/KeeperUpdateBooking")
public class KeeperUpdateBooking extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSON_Converter json = new JSON_Converter();
        String data = json.getJSONFromAjax(request.getReader());
        JsonObject bookingJson = JsonParser.parseString(data).getAsJsonObject();

        PrintWriter out = response.getWriter();
        EditBookingsTable editBookingsTable = new EditBookingsTable();
        int id = bookingJson.get("booking_id").getAsInt();
        String status = bookingJson.get("status").getAsString();
        try {
            editBookingsTable.updateBooking(id, status);
            out.write("Booking with id = " + id + " is " + status + "!");
        } catch (ClassNotFoundException | SQLException e) {
            out.write(e.getMessage());
        }

        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        response.getWriter().write("Booking " + status + " successfully");

    }
}
 
