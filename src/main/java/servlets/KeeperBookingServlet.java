package servlets;

import database.tables.EditBookingsTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(name = "KeeperBookingServlet", value = "/KeeperBookingServlet")
public class KeeperBookingServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int keeper_id = Integer.parseInt(request.getParameter("keeper_id"));
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        try (PrintWriter out = response.getWriter()){
            ArrayList<String> bookings;

            EditBookingsTable editBookingsTable = new EditBookingsTable();
            bookings = editBookingsTable.databaseToBookingOwner(keeper_id);
            bookings = editBookingsTable.databaseToBookingKeeper(keeper_id);
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

    }
}
 
