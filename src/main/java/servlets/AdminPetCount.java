package servlets;

import database.tables.EditPetKeepersTable;
import database.tables.EditPetOwnersTable;
import database.tables.EditPetsTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(name = "AdminPetCount", value = "/AdminPetCount")
public class AdminPetCount extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        try (PrintWriter out = response.getWriter()){
            EditPetsTable editPetsTable = new EditPetsTable();
            int catCount = 0;
            int dogCount = 0;
            catCount = editPetsTable.getCatCount();
            dogCount = editPetsTable.getDogCount();
            String jsonString = String.format("{\"Cats\":\"%d\",\"Dogs\":%d}",catCount,dogCount);
            out.write(jsonString);
        } catch (SQLException e) {
//            throw new RuntimeException(e);
            response.setStatus(500);
        } catch (ClassNotFoundException e) {
//            throw new RuntimeException(e);
            response.setStatus(500);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
 
