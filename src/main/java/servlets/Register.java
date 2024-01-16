package servlets;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import database.tables.EditPetKeepersTable;
import database.tables.EditPetOwnersTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import mainClasses.JSON_Converter;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.Objects;

@WebServlet(name = "Register", value = "/Register")
public class Register extends HttpServlet {

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
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
                    out.println(petOwnerJson);
                    System.out.println("pet owner");
                } else {
                    EditPetKeepersTable epkt = new EditPetKeepersTable();
                    String petKeeperJson = epkt.databasePetKeeperUsernameToJSON(username);
                    if(petKeeperJson != null){
                        System.out.println(petKeeperJson);
                        out.write(petKeeperJson);
                    } else {
                        response.setStatus(403);
                    }
                }
            } catch (SQLException e) {
                throw new RuntimeException(e);
            } catch (ClassNotFoundException e) {
                throw new RuntimeException(e);
            }
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
        boolean userAlreadExists = false;
        assert(userAlreadExists);

        /*get data from Ajax request*/
        JSON_Converter json = new JSON_Converter();
        String data = json.getJSONFromAjax(request.getReader());
        /*get action from json*/
        JsonObject userObject = JsonParser.parseString(data).getAsJsonObject();
        JsonElement JSONaction = userObject.remove("ACTION");
        if (JSONaction != null){
            System.out.println(JSONaction.getAsString());
        } else {
            assert false;
            System.out.println("didnt find it");
        }
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        try {
            if (Objects.equals(JSONaction.getAsString(), "add_pet_keeper")) {
                EditPetKeepersTable editPetKeepersTable = new EditPetKeepersTable();
                editPetKeepersTable.addPetKeeperFromJSON(data);
            } else if (Objects.equals(JSONaction.getAsString(), "add_pet_owner")){
                EditPetOwnersTable editPetOwnersTable = new EditPetOwnersTable();
                editPetOwnersTable.addPetOwnerFromJSON(data);
            } else {
                userObject.addProperty("error", "Invalid Request to Register: " + JSONaction);
            }
            response.getWriter().write(userObject.toString());
            System.out.println(userObject);
        } catch (Exception ex) {
            response.setStatus(500);
            System.err.println(ex.getMessage());
        }
    }
}
 
