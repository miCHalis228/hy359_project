/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package database.tables;

import com.google.gson.Gson;
import mainClasses.PetKeeper;
import database.DB_Connection;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * @author Mike
 */
public class EditPetKeepersTable {

    public void addPetKeeperFromJSON(String json) throws ClassNotFoundException, SQLException{
        PetKeeper user = jsonToPetKeeper(json);
        addNewPetKeeper(user);
    }

    public PetKeeper jsonToPetKeeper(String json) {
        Gson gson = new Gson();

        PetKeeper user = gson.fromJson(json, PetKeeper.class);
        return user;
    }

    public String petKeeperToJSON(PetKeeper user) {
        Gson gson = new Gson();

        String json = gson.toJson(user, PetKeeper.class);
        return json;
    }

    public void updatePetKeeper(String username, String entryToUpdate, String updatedValue) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String update = "UPDATE petkeepers SET " + entryToUpdate + "='" + updatedValue + "' WHERE username = '" + username + "'";
        stmt.executeUpdate(update);
    }

    public void printPetKeeperDetails(String username, String password) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM petkeepers WHERE username = '" + username + "' AND password='" + password + "'");
            while (rs.next()) {
                System.out.println("===Result===");
                DB_Connection.printResults(rs);
            }

        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
    }

    public PetKeeper databaseToPetKeepers(String username, String password) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM petkeepers WHERE username = '" + username + "' AND password='" + password + "'");
            rs.next();
            String json = DB_Connection.getResultsToJSON(rs);
            Gson gson = new Gson();
            PetKeeper user = gson.fromJson(json, PetKeeper.class);
            return user;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public ArrayList<String> getAvailableKeepers(String type) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<String> keepers = new ArrayList<String>();
        ResultSet rs = null;
        try {
            //if(type=="catkeeper")
            if ("all".equals(type))
                rs = stmt.executeQuery(String.format("SELECT keeper_id,lastname,telephone,catkeeper, catprice ,dogkeeper, dogprice FROM `petKeepers` WHERE  `petKeepers`.`keeper_id` not in (select keeper_id from `bookings` where `status`='requested' or  `status`='accepted')"));
            else if ("catKeepers".equals(type))
                rs = stmt.executeQuery(String.format("SELECT keeper_id,lastname,telephone,catkeeper, catprice ,dogkeeper, dogprice FROM `petKeepers` WHERE `petKeepers`.`catkeeper`='true' AND `petKeepers`.`keeper_id` not in (select keeper_id from `bookings` where `status`='requested' or  `status`='accepted')"));
            else if ("dogKeepers".equals(type))
                rs = stmt.executeQuery(String.format("SELECT keeper_id,lastname,telephone,catkeeper, catprice ,dogkeeper, dogprice FROM `petKeepers` WHERE `petKeepers`.`dogkeeper`='true' AND `petKeepers`.`keeper_id` not in (select keeper_id from `bookings` where `status`='requested' or  `status`='accepted')"));


            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                keepers.add(json);
            }
            return keepers;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public ArrayList<PetKeeper> getKeepers(String type) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<PetKeeper> keepers = new ArrayList<PetKeeper>();
        ResultSet rs = null;
        try {
            if("all".equals(type))
                rs = stmt.executeQuery("SELECT * FROM petkeepers");
            else if ("catkeeper".equals(type))
                rs = stmt.executeQuery("SELECT * FROM petkeepers WHERE catkeeper= '" + "true" + "'");
            else if ("dogkeeper".equals(type))
                rs = stmt.executeQuery("SELECT * FROM petkeepers WHERE dogkeeper= '" + "true" + "'");


            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                PetKeeper keeper = gson.fromJson(json, PetKeeper.class);
                keepers.add(keeper);
            }
            return keepers;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public ArrayList<String> getKeepersAdmin(String type) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<String> keepers = new ArrayList<String>();
        ResultSet rs = null;
        try {
            if("all".equals(type))
                rs = stmt.executeQuery("SELECT keeper_id,username,lastname,telephone FROM petkeepers");
            else if ("catkeeper".equals(type))
                rs = stmt.executeQuery("SELECT keeper_id,username,lastname,telephone FROM petkeepers WHERE catkeeper= '" + "true" + "'");
            else if ("dogkeeper".equals(type))
                rs = stmt.executeQuery("SELECT keeper_id,username,lastname,telephone FROM petkeepers WHERE dogkeeper= '" + "true" + "'");


            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                keepers.add(json);
            }
            return keepers;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public int getKeepersCountAdmin() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        int keepers = 0;
        ResultSet rs = null;
        try {
            rs = stmt.executeQuery("SELECT COUNT(keeper_id) as keeperCount FROM petkeepers");
            if (rs.next()) {
                keepers = rs.getInt("keeperCount");
            }
            return keepers;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return -1;
    }

    public String databasePetKeeperToJSON(String username, String password) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM petkeepers WHERE username = '" + username + "' AND password='" + password + "'");
            if (rs.next()){
                String json = DB_Connection.getResultsToJSON(rs);
                return json;
            }
        } catch (Exception e) {
            System.err.println("Got an exception! " + e.getMessage());
        }
        return null;
    }

    public String databasePetKeeperUsernameToJSON(String username) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM petkeepers WHERE username = '" + username + "'");

            if (rs.next()){
                String json = DB_Connection.getResultsToJSON(rs);
                return json;
            }
        } catch (Exception e) {
            System.err.println("Got an exception! " + e.getMessage());
        }
        return null;
    }

    public void createPetKeepersTable() throws SQLException, ClassNotFoundException {

        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        String query = "CREATE TABLE petkeepers "
                + "(keeper_id INTEGER not NULL AUTO_INCREMENT, "
                + "    username VARCHAR(30) not null unique,"
                + "    email VARCHAR(50) not null unique,	"
                + "    password VARCHAR(32) not null,"
                + "    firstname VARCHAR(30) not null,"
                + "    lastname VARCHAR(30) not null,"
                + "    birthdate DATE not null,"
                + "    gender  VARCHAR (7) not null,"
                + "    country VARCHAR(30) not null,"
                + "    city VARCHAR(50) not null,"
                + "    address VARCHAR(50) not null,"
                + "    personalpage VARCHAR(200) not null,"
                + "    job VARCHAR(200) not null,"
                + "    telephone VARCHAR(14),"
                + "    lat DOUBLE,"
                + "    lon DOUBLE,"
                + "    property VARCHAR(10) not null,"
                + "    propertydescription VARCHAR(200),"
                + "    catkeeper VARCHAR(10) not null,"
                + "    dogkeeper VARCHAR(10) not null,"
                + "    catprice INTEGER,"
                + "    dogprice INTEGER,"
                + " PRIMARY KEY (keeper_id))";
        stmt.execute(query);
        stmt.close();
    }

    /**
     * Establish a database connection and add in the database.
     *
     * @throws ClassNotFoundException
     */
    public void addNewPetKeeper(PetKeeper user) throws ClassNotFoundException, SQLException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " petkeepers (username,email,password,firstname,lastname,birthdate,gender,country,city,address,personalpage,"
                    + "job,telephone,lat,lon,property,propertydescription,catkeeper,dogkeeper,catprice,dogprice)"
                    + " VALUES ("
                    + "'" + user.getUsername() + "',"
                    + "'" + user.getEmail() + "',"
                    + "'" + user.getPassword() + "',"
                    + "'" + user.getFirstname() + "',"
                    + "'" + user.getLastname() + "',"
                    + "'" + user.getBirthdate() + "',"
                    + "'" + user.getGender() + "',"
                    + "'" + user.getCountry() + "',"
                    + "'" + user.getCity() + "',"
                    + "'" + user.getAddress() + "',"
                    + "'" + user.getPersonalpage() + "',"
                    + "'" + user.getJob() + "',"
                    + "'" + user.getTelephone() + "',"
                    + "'" + user.getLat() + "',"
                    + "'" + user.getLon() + "',"
                    + "'" + user.getProperty() + "',"
                    + "'" + user.getPropertydescription() + "',"
                    + "'" + user.getCatkeeper() + "',"
                    + "'" + user.getDogkeeper() + "',"
                    + "'" + user.getCatprice() + "',"
                    + "'" + user.getDogprice() + "'"
                    + ")";
            //stmt.execute(table);
            System.out.println(insertQuery);
            stmt.executeUpdate(insertQuery);
            System.out.println("# The pet keeper was successfully added in the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditPetKeepersTable.class.getName()).log(Level.SEVERE, null, ex);
            throw new SQLException("no database");
        }
    }


    public void deleteKeeper(String id) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        int success;
        try {
            success = stmt.executeUpdate(String.format("DELETE FROM messages WHERE booking_id IN(SELECT booking_id FROM bookings WHERE keeper_id=%s)", id));
            System.out.println(1);
            if (success == 0){
                System.out.print("failed to delete keeeper from messages with ID: " + id);
            }
            success = stmt.executeUpdate("DELETE FROM bookings WHERE keeper_id='" + id + "'");
            System.out.println(2);
            if (success == 0){
                System.out.print("failed to delete keeeper from bookings with ID: " + id);
            }
            success = stmt.executeUpdate("DELETE FROM reviews WHERE keeper_id='" + id + "'");
            System.out.println(3);
            if (success == 0){
                System.out.print("failed to delete keeeper from reviews with ID: " + id);
            }
            success = stmt.executeUpdate("DELETE FROM petkeepers WHERE keeper_id='" + id + "'");
            System.out.println(4);
            if (success == 0){
                throw new ClassNotFoundException("failed to delete from petkeepers");
            }
        } catch (Exception e) {
            System.err.println("Got an exception! User Delete ");
            System.err.println(e.getMessage());
        }
        stmt.close();
        con.close();
    }
}
