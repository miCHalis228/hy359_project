package servlets;

import database.DB_Connection;
import database.tables.EditPetKeepersTable;
import database.tables.EditPetOwnersTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import mainClasses.PetKeeper;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "Login", value = "/Login")
public class Login extends HttpServlet {


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session=request.getSession();
        response.setContentType("text/html;charset=UTF-8");
        if(session.getAttribute("loggedIn")!=null){
            response.setStatus(200);
            String username = session.getAttribute("loggedIn").toString();
            try (PrintWriter out = response.getWriter()){
                EditPetOwnersTable epot = new EditPetOwnersTable();
                String petOwnerJson = epot.databasePetOwnerUsernameToJSON(username);
                if (petOwnerJson != null){
//                    response.getWriter().write(username);
                    out.println(petOwnerJson);
                } else {
                    EditPetKeepersTable epkt = new EditPetKeepersTable();
                    String petKeeperJson = epkt.databasePetKeeperUsernameToJSON(username);
                    if(petKeeperJson != null){
//                        response.getWriter().write(username);
                        out.println(petKeeperJson);
                    } else {
                        response.setStatus(403);
                    }
                }
            } catch (SQLException e) {
                throw new RuntimeException(e);
            } catch (ClassNotFoundException e) {
                throw new RuntimeException(e);
            }
            //getUser
//            Person p=Resources.registeredUsers.get(session.getAttribute("loggedIn").toString());
//            response.getWriter().write(p.getUsername());
        }
        else{
            response.setStatus(201);
        }
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
        String username=request.getParameter("username");
        String password=request.getParameter("password");
        HttpSession session=request.getSession();
        try (PrintWriter out = response.getWriter()) {
            response.setContentType("text/html;charset=UTF-8");
            /* Check PetKeepers for user */
            EditPetKeepersTable epkt = new EditPetKeepersTable();
            String petKeeperJson = epkt.databasePetKeeperToJSON(username, password);

            /* Check PetOwners for user */
            EditPetOwnersTable epot = new EditPetOwnersTable();
            String petOwnerJson = epot.databasePetOwnerToJSON(username,password);
            if(petKeeperJson!=null){
                System.out.println("Pet keeper = " + petKeeperJson);
                out.println(petKeeperJson);
            } else if(petOwnerJson!=null){
                System.out.println("Pet Owner = " + petOwnerJson);
                out.println(petOwnerJson);
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
 
