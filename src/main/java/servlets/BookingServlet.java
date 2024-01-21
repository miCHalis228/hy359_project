package servlets;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import database.tables.EditBookingsTable;
import database.tables.EditPetOwnersTable;
import database.tables.EditPetsTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import mainClasses.JSON_Converter;
import mainClasses.Pet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;

@WebServlet(name = "BookingServlet", value = "/BookingServlet")
public class BookingServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int owner_id = Integer.parseInt(request.getParameter("owner_id"));
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        try (PrintWriter out = response.getWriter()){
            ArrayList<String> bookings;

            EditBookingsTable editBookingsTable = new EditBookingsTable();
            bookings = editBookingsTable.databaseToBookingOwner(owner_id);
            if (!bookings.isEmpty()){
                for (String booking: bookings){
                    out.write(booking);
                }
            } else{
                out.write("No bookings");
            }
        } catch (SQLException e) {
            response.setStatus(500);
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            response.setStatus(501);
            throw new RuntimeException(e);
        }

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSON_Converter json = new JSON_Converter();
        String data = json.getJSONFromAjax(request.getReader());
        JsonObject bookingJson = JsonParser.parseString(data).getAsJsonObject();
        bookingJson.addProperty("status", "requested");
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);

        String fromDate = bookingJson.get("fromDate").toString();
        String toDate = bookingJson.get("toDate").toString();
        String owner_id = bookingJson.get("owner_id").toString();

        if(checkDate(fromDate, toDate) == 1){
            EditPetsTable editPetsTable = new EditPetsTable();
            EditBookingsTable editBookingsTable = new EditBookingsTable();
            try {
                String pet_id = editPetsTable.petOfOwner(owner_id);
                if (pet_id == null){
                    throw new ClassNotFoundException("No pet for owner");
                }
                bookingJson.addProperty("pet_id", pet_id);
                String jsonString = bookingJson.toString();
                editBookingsTable.addBookingFromJSON(jsonString);
                response.getWriter().write("Booking added successfully");
            } catch (ClassNotFoundException | SQLException e) {
                response.getWriter().write(e.getMessage());
            }
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
