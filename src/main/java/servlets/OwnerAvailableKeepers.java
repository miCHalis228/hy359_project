package servlets;

import database.tables.EditPetKeepersTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(name = "OwnerAvailableKeepers", value = "/OwnerAvailableKeepers")
public class OwnerAvailableKeepers extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        try (PrintWriter out = response.getWriter()){
            EditPetKeepersTable epkt = new EditPetKeepersTable();
            ArrayList<String> keepers = epkt.getAvailableKeepers("all");
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
 
