package servlets;

import database.tables.EditPetKeepersTable;
import database.tables.EditPetOwnersTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

@WebServlet(name = "UserType", value = "/UserType")
public class UserType extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session=request.getSession();
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);

        String username = request.getParameter("username");
        try (PrintWriter out = response.getWriter()){
            EditPetOwnersTable epot = new EditPetOwnersTable();
            String petOwnerJson = epot.databasePetOwnerUsernameToJSON(username);
            if (petOwnerJson != null){
                out.write("petowner");
            } else {
                EditPetKeepersTable epkt = new EditPetKeepersTable();
                String petKeeperJson = epkt.databasePetKeeperUsernameToJSON(username);
                if(petKeeperJson != null){
                    out.write("petkeeper");
                } else {
                    out.write("nothing");
                    response.setStatus(403);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
 
