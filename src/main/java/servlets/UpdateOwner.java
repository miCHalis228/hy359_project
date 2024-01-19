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
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

@WebServlet(name = "UpdateOwner", value = "/UpdateOwner")
public class UpdateOwner extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
            EditPetOwnersTable editPetOwnersTable = new EditPetOwnersTable();
            Iterator<String> iterator = attributes.keySet().iterator();
            while (iterator.hasNext()) {
                String key = iterator.next();
                editPetOwnersTable.updatePetOwner(username, key, (String) attributes.get(key));
            }
            response.getWriter().write(userObject.toString());
        } catch (Exception ex) {
            response.setStatus(500);
            System.err.println(ex.getMessage());
        }
    }
}
 
