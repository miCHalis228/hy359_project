/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package database.tables;

import com.google.gson.Gson;
import mainClasses.Booking;
import database.DB_Connection;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Mike
 */
public class EditBookingsTable {

    public void addBookingFromJSON(String json) throws ClassNotFoundException {
        System.out.println(json);
        Booking r = jsonToBooking(json);
        createNewBooking(r);
    }

    public Booking databaseToBooking(int id) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM bookings WHERE booking_id= '" + id + "'");
            rs.next();
            String json = DB_Connection.getResultsToJSON(rs);
            Gson gson = new Gson();
            Booking bt = gson.fromJson(json, Booking.class);
            return bt;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public ArrayList<String> databaseToBookingKeeper(int id) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<String> bookings = new ArrayList<>();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM bookings WHERE keeper_id= '" + id + "'");
            while(rs.next()){
                String json = DB_Connection.getResultsToJSON(rs);
                bookings.add(json);
            }
            return bookings;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
            throw new SQLException("keeper not found");
        }
    }
    public ArrayList<String> databaseToBookingOwner(int id) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<String> bookings = new ArrayList<>();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM bookings WHERE owner_id= '" + id + "'");
            while(rs.next()){
                String json = DB_Connection.getResultsToJSON(rs);
                bookings.add(json);
            }
            return bookings;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public Booking jsonToBooking(String json) {
        Gson gson = new Gson();
        Booking r = gson.fromJson(json, Booking.class);
        return r;
    }

    public String bookingToJSON(Booking r) {
        Gson gson = new Gson();

        String json = gson.toJson(r, Booking.class);
        return json;
    }
    public Map<String,Integer> getRevenue() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        Map<String, Integer> revenue = new HashMap<>();
        ResultSet rs = null;
        try {
            rs = stmt.executeQuery("SELECT SUM(price) as sum, keeper_id FROM Bookings GROUP BY keeper_id");
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                revenue.put(rs.getString("keeper_id"), rs.getInt("sum"));
            }
            return revenue;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public int getNumberOfBookingsForKeeper(String keeper_id, String status) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ResultSet rs = null;
        try {
            String query =String.format("SELECT COUNT(*) as total_rows FROM Bookings WHERE keeper_id='%s' AND status='%s'", keeper_id,status) ;
            System.out.println(query);
            rs = stmt.executeQuery(query);
            if (rs.next()) {
                return rs.getInt("total_rows");
            }
            return 0;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return -1;
    }

    public void updateBooking(int bookingID,  String status) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String updateQuery = "UPDATE bookings SET status='"+status+"' WHERE booking_id= '"+bookingID+"'";
        System.out.println(updateQuery);
        stmt.executeUpdate(updateQuery);
        stmt.close();
        con.close();
    }

    public void createBookingTable() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String sql = "CREATE TABLE bookings "
                + "(booking_id INTEGER not NULL AUTO_INCREMENT, "
                + " owner_id INTEGER not NULL, "
                + "  pet_id VARCHAR(10) not NULL, "
                + " keeper_id INTEGER not NULL, "
                + " fromDate DATE not NULL, "
                + " toDate DATE not NULL, "
                + " status VARCHAR(15) not NULL, "
                + " price INTEGER not NULL, "
                + "FOREIGN KEY (owner_id) REFERENCES petowners(owner_id), "
                + "FOREIGN KEY (pet_id) REFERENCES pets(pet_id), "
                + "FOREIGN KEY (keeper_id) REFERENCES petkeepers(keeper_id), "
                + " PRIMARY KEY (booking_id))";
        stmt.execute(sql);
        stmt.close();
        con.close();

    }

    /**
     * Establish a database connection and add in the database.
     *
     * @throws ClassNotFoundException
     */
    public void createNewBooking(Booking bor) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            if (hasExistingRequestedBooking(con, bor.getOwner_id())) {
                System.out.println("A booking with status 'requested' already exists for this owner.");
                throw new ClassNotFoundException("A booking with status 'requested' already exists for this owner.");
            }

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " bookings (owner_id,pet_id,keeper_id,fromDate,toDate,status,price)"
                    + " VALUES ("
                    + "'" + bor.getOwner_id() + "',"
                    + "'" + bor.getPet_id() + "',"
                     + "'" + bor.getKeeper_id()+ "',"
                    + "'" + bor.getFromDate() + "',"
                    + "'" + bor.getToDate() + "',"
                    + "'" + bor.getStatus() + "',"
                     + "'" + bor.getPrice() + "'"
                    + ")";
            //stmt.execute(table);
            System.out.println(insertQuery);
            stmt.executeUpdate(insertQuery);
            System.out.println("# The booking was successfully added in the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditBookingsTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private boolean hasExistingRequestedBooking(Connection con, int owner_id) throws SQLException {
        Statement stmt = con.createStatement();
        ResultSet rs = null;
        String query = "SELECT * FROM bookings WHERE owner_id = '" + owner_id + "' AND status = 'requested'";
        rs = stmt.executeQuery(query);
        if(rs.next()){
            return true;
        }
        return false;
    }
}
