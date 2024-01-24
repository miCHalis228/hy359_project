package servlets;

import com.google.gson.*;
import database.tables.EditPetKeepersTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

@WebServlet(name = "KeeperBookingStats", value = "/KeeperBookingStats")
public class KeeperBookingStats extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        String keeper_id = request.getParameter("keeper_id");
        PrintWriter out = response.getWriter();
        try {
            EditPetKeepersTable editPetKeepersTable = new EditPetKeepersTable();
            JsonObject json = editPetKeepersTable.getKeepersBookingStats(keeper_id);
            if (json != null){
//                out.write(json.getAsString());
                out.write(json.toString());
                System.out.println(json);
            } else {
                out.write("Nothing to Show");
            }
        } catch (SQLException | ClassNotFoundException e) {
            response.setStatus(500);
            out.write(e.getMessage());
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
 
