package servlets;

import database.tables.EditPetKeepersTable;
import database.tables.EditPetOwnersTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(name = "OwnerAvailableKeepersWithPrices", value = "/OwnerAvailableKeepersWithPrices")
public class OwnerAvailableKeepersWithPrices extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        try (PrintWriter out = response.getWriter()){
            String type;
            String owner_id= request.getParameter("owner_id");
            EditPetOwnersTable editPetOwnersTable = new EditPetOwnersTable();
            type = editPetOwnersTable.findOwnersPetType(owner_id);
            System.out.println(type);

            int duration = Integer.parseInt(request.getParameter("duration"));
            EditPetKeepersTable epkt = new EditPetKeepersTable();
            ArrayList<String> keepers = epkt.getAvailableKeepersForOwnerWithPrices(type,duration);
            for(String keeper: keepers){
                out.write(keeper);
            }
        } catch (SQLException e) {
            response.setStatus(500);
        } catch (ClassNotFoundException e) {
            response.setStatus(500);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
 
