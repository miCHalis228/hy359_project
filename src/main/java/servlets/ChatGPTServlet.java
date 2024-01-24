package servlets;

import com.Pets.ChatGPT;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import mainClasses.JSON_Converter;

import java.io.IOException;

@WebServlet(name = "ChatGPTServlet", value = "/ChatGPTServlet")
public class ChatGPTServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSON_Converter json = new JSON_Converter();
        String data = json.getJSONFromAjax(request.getReader());
        System.out.println(data);
        String answer;
        ChatGPT chatGPT = new ChatGPT();

        try {
            answer = chatGPT.AskChat(data);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        response.getWriter().write(answer);
    }
}
