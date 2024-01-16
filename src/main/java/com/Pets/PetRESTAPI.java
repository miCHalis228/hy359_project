package com.Pets;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import database.tables.EditPetsTable;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Objects;

import static spark.Spark.*;

public class PetRESTAPI {
    static String apiPath = "pets/";

    public static void main(String[] args) {
        enableCORS("*", "GET, POST, OPTIONS, PUT, DELETE", "Content-Type");

        options("/*", (request, response) -> {
            // Handle CORS preflight requests
//            response.header("Access-Control-Allow-Origin", "http://localhost:4567");
            response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            response.header("Access-Control-Allow-Headers", request.headers("Access-Control-Request-Headers"));
            return "";
        });

        get(apiPath, (request, response) -> {
            EditPetsTable ept = new EditPetsTable();
            ArrayList<mainClasses.Pet> pets = new ArrayList<mainClasses.Pet>();
            response.status(200);
            response.type("application/json");
            try {
                pets = ept.databaseToPets();
                return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(pets)));
            } catch (SQLException e) {
                response.status(400);
                return new Gson().toJson(new StandardResponse(new Gson()
                        .toJson("Error: Dog  not exists")));
            } catch (ClassNotFoundException e) {
                response.status(400);
                return new Gson().toJson(new StandardResponse(new Gson()
                        .toJson("Error: Dog  not exists")));
            }
        });

        get(apiPath + "/:type/:breed", (request, response) -> {
            EditPetsTable ept = new EditPetsTable();
            ArrayList<mainClasses.Pet> pets = new ArrayList<mainClasses.Pet>();
            response.status(200);
            response.type("application/json");
            String breed = request.params(":breed");
            String type = request.params(":type");
            try {
                if (Objects.equals(breed, "all")){
                    pets = ept.databaseToPets(type);
                } else {
                    pets = ept.databaseToPets(type, breed);
                }
            } catch (SQLException | ClassNotFoundException e) {
                response.status(400);
                throw new RuntimeException(e);
            }
            return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(pets)));

        });

        get(apiPath + "/:type/:breed/WithWeight/", (request, response) -> {
            EditPetsTable ept = new EditPetsTable();
            ArrayList<mainClasses.Pet> pets = new ArrayList<mainClasses.Pet>();
            response.status(200);
            response.type("application/json");
            String breed = request.params(":breed");
            String type = request.params(":type");
            String fromWeight = (request.queryParams("fromWeight"));
            String toWeight = (request.queryParams("toWeight"));
            try {
                if (Objects.equals(breed, "all")){
                    pets = ept.databaseToPetsWeight(type,Float.valueOf(fromWeight),Float.valueOf(toWeight));
                } else {
                    pets = ept.databaseToPetsWeight(type, breed, Float.valueOf(fromWeight),Float.valueOf(toWeight));
                }
            } catch (SQLException | ClassNotFoundException e) {
                response.status(400);
                throw new RuntimeException(e);
            }
            return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(pets)));

        });

        post(apiPath + "/newPet", (request, response) -> {
            response.status(200);
            response.type("application/json");
            if (request.body() == null){
                response.status(400);
                return new Gson().toJson(new StandardResponse(new Gson()
                        .toJson("Error: Dog  not exists")));
            }

            JsonObject petObject = JsonParser.parseString(request.body()).getAsJsonObject();
            JsonElement ownerJson = petObject.get("owner_id");
            String owner_id = ownerJson.getAsString();
            ownerJson = petObject.get("pet_id");
            String pet_id = ownerJson.getAsString();


            EditPetsTable ept = new EditPetsTable();
            try {
//                ept.petOfOwner()
//                ept.addPetFromJSON();
//                return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(pets)));
                if (ept.checkOwnerExists(owner_id)){
                    if (ept.petOfOwner(owner_id) == null){
                        if (!ept.checkPetExists(pet_id)){
                            ept.addPetFromJSON(request.body());
                            return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(request.body())));
                        } else {
                            response.status(403);
                            return new Gson().toJson(new StandardResponse(new Gson()
                                    .toJson("Error: Pet already exists with this ID")));
                        }
                    } else {
                        response.status(403);
                        return new Gson().toJson(new StandardResponse(new Gson()
                                .toJson("Error: Owner already has pet")));
                    }
                } else {
                    response.status(403);
                    return new Gson().toJson(new StandardResponse(new Gson()
                            .toJson("Error: Owner with id: " + owner_id + "does not exist")));
                }
//                return request.body();
            } catch (ClassNotFoundException e) {
                response.status(400);
                return new Gson().toJson(new StandardResponse(new Gson()
                        .toJson("Error: Pet not exists")));
            }
        });

        put(apiPath + "/petWeight/:pet_id/:weight", (request, response) -> {
            response.status(200);
            response.type("application/json");
            String pet_id = request.params(":pet_id");
            String weight = request.params(":weight");
            if (request.body() == null){
                response.status(400);
                return new Gson().toJson(new StandardResponse(new Gson()
                        .toJson("Error: Request error")));
            }

            EditPetsTable ept = new EditPetsTable();
            try {
                if (ept.checkPetExists(pet_id)){
                    ept.updatePet(pet_id, weight);
//                    ept.addPetFromJSON(request.body());
                    return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(request.body())));
                } else {
                    response.status(403);
                    return new Gson().toJson(new StandardResponse(new Gson()
                                    .toJson("Error: Pet does not exist with this ID")));
                }
            } catch (ClassNotFoundException e) {
                System.err.println(e.getMessage());
                response.status(400);
                return new Gson().toJson(new StandardResponse(new Gson()
                        .toJson("Error: SQL Exception")));
            }
        });

        delete(apiPath + "petDeletion/:pet_id", (request, response) -> {
            response.status(200);
            response.type("application/json");
            String pet_id = request.params(":pet_id");
            if (request.body() == null){
                response.status(400);
                return new Gson().toJson(new StandardResponse(new Gson()
                        .toJson("Error: Request error")));
            }

            EditPetsTable ept = new EditPetsTable();
            try {
                if (ept.checkPetExists(pet_id)){
                    ept.deletePet(pet_id);
//                    ept.addPetFromJSON(request.body());
                    return new Gson().toJson(new StandardResponse(new Gson().toJsonTree(request.body())));
                } else {
                    response.status(403);
                    return new Gson().toJson(new StandardResponse(new Gson()
                            .toJson("Error: Pet does not exist with this ID")));
                }
            } catch (ClassNotFoundException e) {
                System.err.println(e.getMessage());
                response.status(400);
                return new Gson().toJson(new StandardResponse(new Gson()
                        .toJson("Error: SQL Exception")));
            }
        });
    }


    private static void enableCORS(final String origin, final String methods, final String headers) {
        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", origin);
            response.header("Access-Control-Allow-Methods", methods);
            response.header("Access-Control-Allow-Headers", headers);
            response.type("application/json");
        });
    }

}
