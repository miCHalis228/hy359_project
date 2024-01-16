package servlets;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import database.DB_Connection;
import database.tables.EditPetKeepersTable;
import database.tables.EditPetOwnersTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import mainClasses.JSON_Converter;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Objects;
import java.util.logging.Level;
import java.util.logging.Logger;


@WebServlet(name = "DuplicateChecker", value = "/DuplicateChecker")
public class DuplicateChecker extends HttpServlet {

    private boolean userExists(String entryTOCheck, String value) throws Exception {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        boolean user_exists = false;
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM petkeepers WHERE " + entryTOCheck + " = '" + value + "'");
            if (rs.next())
                user_exists = true;
        } catch (Exception e) {
            System.err.println("Got an exception in pet Keepers!");
            System.err.println(e.getMessage());
            throw new Exception("petKeepers *_*");
        }
        try {
            rs = stmt.executeQuery("SELECT * FROM petowners WHERE " + entryTOCheck + " = '" + value + "'");
//            rs = stmt.executeQuery("SELECT * FROM petowners WHERE username = '" + username + "'");
            if (rs.next())
                user_exists = true;
        } catch (Exception e) {
            System.err.println("Got an exception in pet Owners!");
            System.err.println(e.getMessage());
            throw new Exception("petOwners *_*");
        }
        return user_exists;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String action = request.getParameter("ACTION");
        System.out.println(username + " " + email + " " + action);
        boolean user_exists;
        try {
            JsonObject jo = new JsonObject();
            if (Objects.equals(action, "check_username")) {
                user_exists = userExists("username", username);
                if (user_exists) {
                    response.setStatus(403);
                    jo.addProperty("error", "Username already Taken");
                } else {
                    response.setStatus(200);
                }
            } else if (Objects.equals(action, "check_email")) {
                user_exists = userExists("email", email);
                if (user_exists) {
                    response.setStatus(403);
                    jo.addProperty("error", "Email already Taken");
                } else {
                    response.setStatus(200);
                }
            } else {
                response.setStatus(400);
                jo.addProperty("error", "Invalid Request to DuplicateChecker: " + action);
            }
            if(jo.toString()!= null)
                response.getWriter().write(jo.toString());
        } catch (Exception ex) {
            response.setStatus(500);
            Logger.getLogger(GetPetKeeper.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /*get data from Ajax request*/
        JSON_Converter json = new JSON_Converter();
        String data = json.getJSONFromAjax(request.getReader());
        /*get action from json*/
        JsonObject object = JsonParser.parseString(data).getAsJsonObject();
        JsonElement JSONaction = object.remove("ACTION");
        if (JSONaction != null){
            System.out.println(JSONaction.getAsString());
        } else {
            System.out.println("didnt find it");
        }
        try {
            assert JSONaction != null;
            if (Objects.equals(JSONaction.getAsString(), "add_pet_keeper")) {
                EditPetKeepersTable editPetKeepersTable = new EditPetKeepersTable();
                editPetKeepersTable.addPetKeeperFromJSON(data);
            } else {
                EditPetOwnersTable editPetOwnersTable = new EditPetOwnersTable();
                editPetOwnersTable.addPetOwnerFromJSON(data);
            }
        } catch (ClassNotFoundException e) {
            response.setStatus(500);
            throw new RuntimeException(e);
        } catch (Exception ex) {
            response.setStatus(500);
        }
    }
}
 
