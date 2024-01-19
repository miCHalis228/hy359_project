package database.tables;

import com.google.gson.Gson;
import database.DB_Connection;
import mainClasses.Administrator;
import mainClasses.PetOwner;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class EditAdministratorTable {

    public void addAdministratorFromJSON(String json) throws ClassNotFoundException{
        Administrator user=jsonToAdministrator(json);
        addNewAdministrator(user);
    }

    public Administrator jsonToAdministrator(String json){
        Gson gson = new Gson();

        Administrator user = gson.fromJson(json, Administrator.class);
        return user;
    }

    public String administratorToJSON(Administrator user){
        Gson gson = new Gson();

        String json = gson.toJson(user, Administrator.class);
        return json;
    }


    public void createAdministratorTable() throws SQLException, ClassNotFoundException {

        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        String query = "CREATE TABLE administrators "
                + "(admin_id INTEGER not NULL AUTO_INCREMENT, "
                + "    username VARCHAR(30) not null unique,"
                + "    password VARCHAR(32) not null,"
                + " PRIMARY KEY (admin_id))";
        stmt.execute(query);
        stmt.close();
    }

    public void addNewAdministrator(Administrator user) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " administrators (username,password)"
                    + " VALUES ("
                    + "'" + user.getUsername() + "',"
                    + "'" + user.getPassword() + "'"
                    + ")";
            //stmt.execute(table);
            stmt.executeUpdate(insertQuery);
            System.out.println("# The administrator was successfully added in the database.");

            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditAdministratorTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }


    public String databaseAdministratorToJSON(String username) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM administrators WHERE username = '" + username + "'");
            if (rs.next()){
                String json = DB_Connection.getResultsToJSON(rs);
                return json;
            } else {
                return null;
            }
        } catch (Exception e) {
            System.err.println("Got an exception! " + e.getMessage());
        }
        return null;
    }
    public String databaseAdministratorToJSON(String username, String password) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM administrators WHERE username = '" + username + "' AND password='" + password + "'");
            if (rs.next()){
                String json = DB_Connection.getResultsToJSON(rs);
                return json;
            } else {
                return null;
            }
        } catch (Exception e) {
            System.err.println("Got an exception! " + e.getMessage());
        }
        return null;
    }

}
