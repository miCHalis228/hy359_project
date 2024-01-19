package servlets;

import database.tables.EditAdministratorTable;
import database.tables.EditPetKeepersTable;
import database.tables.EditPetOwnersTable;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "AdminLogin", value = "/AdminLogin")
public class AdminLogin extends HttpServlet {


    /* INFO check if thereisActive user in session (already works in Login Get servlet) */

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setStatus(200);
        response.setContentType("text/html;charset=UTF-8");

        String username=request.getParameter("username");
        String password=request.getParameter("password");
        HttpSession session=request.getSession();
        try (PrintWriter out = response.getWriter()) {

            EditAdministratorTable editAdministratorTable = new EditAdministratorTable();
            String adminJson = editAdministratorTable.databaseAdministratorToJSON(username,password);
            /* Check PetOwners for user */
            if(adminJson!=null){
                System.out.println("Admin = " + adminJson);
                out.println(adminJson);
            } else{
                response.setStatus(403);
                System.out.println("user not found");
                return;
            }

            session.setAttribute("loggedIn",username);
            System.out.println(session);
            System.out.println("loggedin: " + session.getAttribute("loggedIn"));

            int activeUsers=0;
            if(request.getServletContext().getAttribute("activeUsers")!=null)
                activeUsers=(int) request.getServletContext().getAttribute("activeUsers");
            request.getServletContext().setAttribute("activeUsers",activeUsers+1);
            response.setStatus(200);

        } catch (SQLException ex) {
            Logger.getLogger(GetPetKeeper.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(GetPetKeeper.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
 
