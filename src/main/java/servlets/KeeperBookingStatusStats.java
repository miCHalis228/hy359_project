package servlets;

import database.tables.EditBookingsTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

@WebServlet(name = "KeeperBookingStatusStats", value = "/KeeperBookingStatusStats")
public class KeeperBookingStatusStats extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        String keeper_id = request.getParameter("keeper_id");
        try (PrintWriter out = response.getWriter()){
            EditBookingsTable editBookingsTable = new EditBookingsTable();
            int accepted=0;
            int rejected=0;

            accepted = editBookingsTable.getNumberOfBookingsForKeeper(keeper_id,"accepted");
            System.out.println("accepted "+ accepted);
            rejected = editBookingsTable.getNumberOfBookingsForKeeper(keeper_id,"rejected");
            System.out.println("rejected "+ rejected);
            if (accepted == -1 || rejected == -1){
                response.setStatus(500);
                return;
            }
            String jsonString = String.format("{\"accepted\":\"%d\",\"rejected\":%d}",accepted,rejected);
            out.write(jsonString);
        } catch (SQLException | ClassNotFoundException e) {
            response.setStatus(500);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
 
