package servlets;

import database.tables.EditBookingsTable;
import database.tables.EditPetKeepersTable;
import database.tables.EditPetOwnersTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;

@WebServlet(name = "AdminRevenue", value = "/AdminRevenue")
public class AdminRevenue extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        try (PrintWriter out = response.getWriter()){
            EditBookingsTable editBookingsTable = new EditBookingsTable();
            Map<String, Float> revenue = editBookingsTable.getRevenue();
            for(Map.Entry<String, Float> entry : revenue.entrySet()){
                String keeper = entry.getKey();
                Float income = entry.getValue();
                String jsonString = String.format("{\"keeper_id\":\"%s\",\"keeper_income\":\"%.2f\",\"pet_care_income\":\"%.2f\"}",keeper,income*0.85, income*0.15);
                out.write(jsonString);
            }
        } catch (SQLException e) {
//            throw new RuntimeException(e);
            response.setStatus(500);
        } catch (ClassNotFoundException e) {
//            throw new RuntimeException(e);
            response.setStatus(500);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
 
