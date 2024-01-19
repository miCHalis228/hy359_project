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

@WebServlet(name = "AdminDeleteUser", value = "/AdminDeleteUser")
public class AdminDeleteUser extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        try (PrintWriter out = response.getWriter()){
            String user = request.getParameter("user");
            String id = request.getParameter("id");
            if("owner_id".equals(user)){
                EditPetOwnersTable epot = new EditPetOwnersTable();
                epot.deleteOwner(id);
                out.write("Succesfully Deleted Pet Owner");
            } else if ("keeper_id".equals(user)) {
                EditPetKeepersTable epkt = new EditPetKeepersTable();
                epkt.deleteKeeper(id);
                out.write("Succesfully Deleted Pet Keeper");
            } else {
                response.setStatus(400);
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
 
