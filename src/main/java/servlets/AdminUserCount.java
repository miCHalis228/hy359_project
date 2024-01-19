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
import java.util.Map;

@WebServlet(name = "AdminUserCount", value = "/AdminUserCount")
public class AdminUserCount extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        try (PrintWriter out = response.getWriter()){
            EditPetOwnersTable editPetOwnersTable = new EditPetOwnersTable();
            EditPetKeepersTable editPetKeepersTable = new EditPetKeepersTable();
            int keepers=0;
            int owners=0;

            keepers = editPetKeepersTable.getKeepersCountAdmin();
            owners = editPetOwnersTable.getOwnersCountAdmin();
            if (keepers == -1 || owners == -1){
                response.setStatus(500);
                return;
            }
            String jsonString = String.format("{\"keeperCount\":\"%d\",\"ownerCount\":%d}",keepers,owners);
            out.write(jsonString);
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
 
