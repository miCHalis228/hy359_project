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

@WebServlet(name = "FinishBookingServlet", value = "/FinishBookingServlet")
public class FinishBookingServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSON_Converter json = new JSON_Converter();
        String data = json.getJSONFromAjax(request.getReader());
        JsonObject bookingJson = JsonParser.parseString(data).getAsJsonObject();
        String jsonString = bookingJson.toString();
        System.out.println(jsonString);

        PrintWriter out = response.getWriter();
        EditBookingsTable editBookingsTable = new EditBookingsTable();
        try {
            String status = "finished";
            int id = bookingJson.get("booking_id").getAsInt();
            editBookingsTable.updateBooking(id, status);
            out.write("Booking with id = " + id + " is finished!");
        } catch (ClassNotFoundException | SQLException e) {
            out.write(e.getMessage());
        }

        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        response.getWriter().write("Booking ended successfully");
    }
}
