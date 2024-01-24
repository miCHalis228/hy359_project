package servlets;

import database.tables.EditBookingsTable;
import database.tables.EditReviewsTable;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(name = "KeeperReviews", value = "/KeeperReviews")
public class KeeperReviews extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String keeper_id =request.getParameter("keeper_id");
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(200);
        PrintWriter out = response.getWriter();
        try {
            ArrayList<String> reviews;

            EditReviewsTable editReviewsTable = new EditReviewsTable();
            reviews = editReviewsTable.databaseToKeeperReviewsStrings(keeper_id);
            if (!reviews.isEmpty()){
                for (String review: reviews){
                    out.write(review);
                }
            } else{
                out.write("No Reviews");
            }
        } catch (SQLException | ClassNotFoundException e) {
            out.write(e.getMessage());
            response.setStatus(500);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
 
