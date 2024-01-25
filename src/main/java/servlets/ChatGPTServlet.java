package servlets;

import com.Pets.ChatGPT;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import database.tables.EditPetsTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import mainClasses.JSON_Converter;

import java.io.IOException;
import java.io.Writer;

@WebServlet(name = "ChatGPTServlet", value = "/ChatGPTServlet")
public class ChatGPTServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);

        JSON_Converter json = new JSON_Converter();
        String data = json.getJSONFromAjax(request.getReader());
        JsonObject messageObject = JsonParser.parseString(data).getAsJsonObject();

        String answer;
        String question = messageObject.get("message").getAsString();
        String pet_id = messageObject.get("pet_id").getAsString();
        String action = messageObject.get("action").getAsString();

        EditPetsTable editPetsTable = new EditPetsTable();

        Writer out = response.getWriter();
        try {
            switch (action){
                case "type":
                    String type = editPetsTable.getPetType(pet_id);
                    if (type != null){
                        question = "How do I take care of a " + type + "?" ;
                    }
                    else {
                        response.setStatus(502);
                        out.write("Couldnt find pet's type");
                    }
                    break;
                case "breed":
                    String breed = editPetsTable.getPetBreed(pet_id);
                    if (breed != null){
                        question = "Can you give me more information on " + breed + "?" ;
                    }
                    else {
                        response.setStatus(503);
                        out.write("Couldnt find pet's breed");
                    }
                    break;
                case "normal":
                    break;
                default:
                    response.setStatus(500);
                    out.write("Error with Request Action");
                    break;
            }
            System.out.println(question);
            ChatGPT chatGPT = new ChatGPT();
            answer = chatGPT.AskChat(question);
            System.out.println(answer);
            String jsonString = String.format("{\"message\":\"%s\",\"response\":\"%s\"}",question,answer);
            System.out.println(jsonString);
            out.write(jsonString);
        } catch (Exception e) {
            response.setStatus(501);
            out.write("Error with ChatGPT");
            out.write(e.getMessage());
        }
    }
}
