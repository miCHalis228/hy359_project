package servlets;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import database.tables.EditPetKeepersTable;
import database.tables.EditPetOwnersTable;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import mainClasses.JSON_Converter;

import java.io.IOException;
import java.util.*;

@WebServlet(name = "UpdateUser", value = "/UpdateUser")
public class UpdateUser extends HttpServlet {

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
        JsonObject userObject = JsonParser.parseString(data).getAsJsonObject();
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);

//------------------------------------------------------------------------------------------------------------
        Map<String, Object> attributes = new HashMap<String, Object>();
        Set<Map.Entry<String, JsonElement>> entrySet = userObject.entrySet();
        for(Map.Entry<String,JsonElement> entry : entrySet){
            attributes.put(entry.getKey(), userObject.get(entry.getKey()).getAsString());
        }
        String username = (String) attributes.remove("username");
//------------------------------------------------------------------------------------------------------------
        try {
            EditPetKeepersTable editPetKeepersTable = new EditPetKeepersTable();
            Iterator<String> iterator = attributes.keySet().iterator();
            while (iterator.hasNext()) {
                String key = iterator.next();
                editPetKeepersTable.updatePetKeeper(username, key, (String) attributes.get(key));
            }
            response.getWriter().write(userObject.toString());
        } catch (Exception ex) {
            response.setStatus(500);
            System.err.println(ex.getMessage());
        }
    }
}
 
