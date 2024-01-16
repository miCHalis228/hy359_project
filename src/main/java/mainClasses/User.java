package mainClasses;

import com.google.gson.JsonObject;
import database.DB_Connection;
import servlets.GetPetKeeper;
import servlets.GetPetOwner;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class User {

    /**
     * Checks tables Pet_Keeper and Pet_Owner for a user with the given attribute
     * @param entryTOCheck User Identifier either username or email
     * @param value the corresponding value of the above entry
     * @return The JSON object with the values of the user
     * @throws Exception when something goes wrong with the DB
     */
    public String getUser(String entryTOCheck, String value) throws Exception {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        boolean user_exists = false;
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM petkeepers WHERE " + entryTOCheck + " = '" + value + "'");
        } catch (Exception e) {
            System.err.println("Got an exception in pet Keepers!");
            System.err.println(e.getMessage());
            throw new Exception("petKeepers *_*");
        }
        try {
            rs = stmt.executeQuery("SELECT * FROM petkeepers WHERE " + entryTOCheck + " = '" + value + "'");
//            rs = stmt.executeQuery("SELECT * FROM petowners WHERE username = '" + username + "'");
        } catch (Exception e) {
            System.err.println("Got an exception in pet Owners!");
            System.err.println(e.getMessage());
            throw new Exception("petOwners *_*");
        }
        return null;
    }
}
