package servlets;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import database.tables.EditBookingsTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import mainClasses.JSON_Converter;

import java.io.IOException;
import java.time.LocalDate;

@WebServlet(name = "BookingServlet", value = "/BookingServlet")
public class BookingServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSON_Converter json = new JSON_Converter();
        String data = json.getJSONFromAjax(request.getReader());
        JsonObject bookingJson = JsonParser.parseString(data).getAsJsonObject();
        bookingJson.addProperty("status", "requested");
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);

        String jsonString = bookingJson.toString();
        String fromDate = bookingJson.get("fromDate").toString();
        String toDate = bookingJson.get("toDate").toString();

        System.out.println(jsonString);

        if(checkDate(fromDate, toDate) == 1){
            System.out.println("in if");
            EditBookingsTable editBookingsTable = new EditBookingsTable();
            try {
                editBookingsTable.addBookingFromJSON(jsonString);
            } catch (ClassNotFoundException e) {
                throw new RuntimeException(e);
            }
            response.getWriter().write("Booking added successfully");
        } else {
            response.getWriter().write("Invalid date range");
        }
    }

    int checkDate(String fromDate, String toDate){
        LocalDate currentDate = LocalDate.now();
        if (fromDate == null || toDate == null) {
            return -1;
        } else if(fromDate.compareTo(toDate) > 0){ //fromDate greater than toDate
            return -1;
        } else if(fromDate.compareTo(String.valueOf(currentDate)) > 0) { //fromDate isn't greater than toDate
            return -1;
        }
        return 1;
    }
}
