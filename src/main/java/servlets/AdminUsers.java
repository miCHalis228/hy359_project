package servlets;

import database.tables.EditPetKeepersTable;
import database.tables.EditPetOwnersTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import mainClasses.PetKeeper;
import mainClasses.PetOwner;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(name = "AdminUsers", value = "/AdminUsers")
public class AdminUsers extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        try (PrintWriter out = response.getWriter()){
            EditPetOwnersTable epot = new EditPetOwnersTable();
            EditPetKeepersTable epkt = new EditPetKeepersTable();
            ArrayList<String> keepers = epkt.getKeepersAdmin("all");
            ArrayList<String> owners  = epot.getOwnersAdmin();
            for(String keeper: keepers){
                out.write(keeper);
            }
            for(String owner: owners){
                out.write(owner);
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
 
