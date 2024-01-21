package servlets;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import database.tables.EditBookingsTable;
import database.tables.EditReviewsTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import mainClasses.JSON_Converter;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

@WebServlet(name = "ReviewBookingServlet", value = "/ReviewBookingServlet")
public class ReviewBookingServlet extends HttpServlet {
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

        EditReviewsTable editReviewsTable = new EditReviewsTable();
        PrintWriter out = response.getWriter();
        try {
            editReviewsTable.addReviewFromJSON(jsonString);
            out.write("Succesful Review! Thank you!");
        } catch (ClassNotFoundException e) {
            out.write(e.getMessage());
            response.setStatus(500);
        }

        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        response.getWriter().write("Review ended successfully");
    }
}
