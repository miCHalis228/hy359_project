var globalUserJson;

function setChoicesForLoggedAdmin(userJson) {
    document.getElementById("username").setAttribute("value", userJson.username || "");
    document.getElementById("password").setAttribute("value", userJson.password || "");
    globalUserJson = userJson;
}
function setChoicesForLoggedOwner(userJson) {
    document.getElementById("username").setAttribute("value", userJson.username || "");
    document.getElementById("email").setAttribute("value", userJson.email || "");
    document.getElementById("password").setAttribute("value", userJson.password || "");
    document.getElementById("firstname").setAttribute("value", userJson.firstname || "");
    document.getElementById("lastname").setAttribute("value", userJson.lastname || "");
    document.getElementById("birthdate").setAttribute("value", userJson.birthdate || "");

    // Assuming the gender property in userJson is either "male" or "female"
    if (userJson.gender === "Male") {
        document.getElementById("male").setAttribute("checked", true);
        document.getElementById("female").removeAttribute("checked");
    } else if (userJson.gender === "Female") {
        document.getElementById("female").setAttribute("checked", true);
        document.getElementById("male").removeAttribute("checked");
    }

    const country =  userJson.country;
    // document.getElementById("country").setAttribute("value", userJson.country || "GR");
    document.getElementById("country").value = country;
    document.getElementById("city").setAttribute("value", userJson.city || "");
    document.getElementById("address").setAttribute("value", userJson.address || "");
    document.getElementById("personalpage").setAttribute("value", userJson.personalpage || "");
    document.getElementById("job").setAttribute("value", userJson.job || "");
    document.getElementById("telephone").setAttribute("value", userJson.telephone || "");

    globalUserJson = userJson;
}
function setChoicesForLoggedUser(userJson) {
    document.getElementById("username").setAttribute("value", userJson.username || "");
    document.getElementById("email").setAttribute("value", userJson.email || "");
    document.getElementById("password").setAttribute("value", userJson.password || "");
    document.getElementById("firstname").setAttribute("value", userJson.firstname || "");
    document.getElementById("lastname").setAttribute("value", userJson.lastname || "");
    document.getElementById("birthdate").setAttribute("value", userJson.birthdate || "");

    // Assuming the gender property in userJson is either "male" or "female"
    if (userJson.gender === "Male") {
        document.getElementById("male").setAttribute("checked", true);
        document.getElementById("female").removeAttribute("checked");
    } else if (userJson.gender === "Female") {
        document.getElementById("female").setAttribute("checked", true);
        document.getElementById("male").removeAttribute("checked");
    }

    const country =  userJson.country;
    // document.getElementById("country").setAttribute("value", userJson.country || "GR");
    document.getElementById("country").value = country;
    document.getElementById("city").setAttribute("value", userJson.city || "");
    document.getElementById("address").setAttribute("value", userJson.address || "");
    document.getElementById("personalpage").setAttribute("value", userJson.personalpage || "");
    document.getElementById("job").setAttribute("value", userJson.job || "");
    document.getElementById("telephone").setAttribute("value", userJson.telephone || "");


    let userProperty = userJson.property || "";

// Select the radio button with the matching value
    let propertyRadioButton = document.querySelector('input[name="property"][value="' + userProperty + '"]');

// Check the selected radio button
    if (propertyRadioButton) {
        propertyRadioButton.setAttribute("checked", true);
    }
    // Pet Keeper shi
    // document.getElementById("property").setAttribute("value", userJson.property || "");
    const propertydesc =  userJson.propertydescription;
    document.getElementById("propertydescription").value = propertydesc;

    const catKeeperValue = userJson.catkeeper || false;
    const catKeeperCheckbox = document.getElementById("cat");
    if (catKeeperCheckbox) {
        catKeeperCheckbox.checked = catKeeperValue;
        document.getElementById("catprice").setAttribute("value", userJson.catprice || "");
    } else {
        document.getElementById("catprice").setAttribute("value", 0);
        // document.getElementById("catprice").setAttribute("disabled", true);
    }
    const dogKeeperValue = userJson.dogkeeper || false;
    const dogKeeperCheckbox = document.getElementById("dog");
    if (dogKeeperValue) {
        dogKeeperCheckbox.checked = dogKeeperValue;
        document.getElementById("dogprice").setAttribute("value", userJson.dogprice || "");
    } else {
        document.getElementById("dogprice").setAttribute("value", 0);
        document.getElementById("dogprice").setAttribute("disabled", true);
    }
    globalUserJson = userJson;
}

function checkUsernameExists() {
    const action = "&ACTION=check_username";
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#ajaxContent").html("").removeClass('error');
            $("#error-checking").removeClass("error-username");
        } else if (xhr.status === 403) {
            $("#ajaxContent").html("username already in use please change").addClass("error")
            $("#error-checking").addClass("error-username");
        } else if (xhr.status === 500) {
            $("#ajaxContent").html("Smomething went wrong (check database)");
        } else if (xhr.status !== 200) {
            $("#ajaxContent").html("User not exists or incorrect password");
        }
    };
    var data = $('#username').serialize();
    if (data === null)
        return;
    xhr.open('GET', 'DuplicateChecker?' + data + action);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function checkEmailExists() {
    const action = "&ACTION=check_email";
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#error-checking").removeClass("error-email");
        } else if (xhr.status === 403) {
            $("#ajaxContent").html("email already in use please change").addClass("error");
            $("#error-checking").addClass("error-email");
        } else if (xhr.status === 500) {
            $("#ajaxContent").html("Smomething went wrong (check database)");
        } else if (xhr.status !== 200) {
            $("#ajaxContent").html("User not exists or incorrect password");
        }
    };
    var data = $('#email').serialize();
    if (data === null)
        return;
    xhr.open('GET', 'DuplicateChecker?' + data + action);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function showLogin() {
    $('#main-page-container').hide();
    $('#register-message').hide();
    $("#form-container").load("login.html");
    // isLoggedIn();
    $("#ajaxContent").html("");
}

function showAdminLogin(){
    $('#main-page-container').hide();
    $('#register-message').hide();
    $("#form-container").load("admin-login.html");
    $("#ajaxContent").html("");
}

function showPetForm(){
    $("#ajaxContent").html("");
    window.open('http://localhost:8080/hy359_project_war_exploded/client.html', '_self');
}


function showRegistrationForm() {
    $("#form-container").load("registration.html", function () {
        drawMap('Map');
        $('#pet_keeper_extra_fields').hide();
    });
}

function registerPOST() {
    var xhr = new XMLHttpRequest();
    let new_user = generateUserJSON();

    //TODO check new_user

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            $('#registration-form').hide();
            // $("#form-container").load("login.html");
            $('#register-message').html("Successful Registration. Now please log in!<button onclick='showLogin()'>Login</button><br>").removeClass('error');
            $('#register-message').show();
            // $('#registration-form').append(createTableFromJSON(responseData));
            $('#ajaxContent').html("Successful Registration. Now please log in!<button onclick='showLogin()'>Login</button><br> Your Data ").removeClass('error');
            $('#ajaxContent').append(createTableFromJSON(responseData));
            // $("#ajaxContent").append("<br>User Added");
        } else if (xhr.status !== 200) {
            $("#error-message").html("Cannot Register user - Unexpected Error please try again");
            $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
            const responseData = JSON.parse(xhr.responseText);
            if (responseData !== "")
                for (const x in responseData) {
                    $('#ajaxContent').append("<p style='color:red'>" + x + "=" + responseData[x] + "</p>");
                }
        }
    };

    /*check if new user is Pet Keeper or Owner*/
    action = document.querySelector("input[name='type']:checked").value;
    if (action === "Pet Keeper") {
        new_user.ACTION = "add_pet_keeper";
    } else {
        new_user.ACTION = "add_pet_owner";
    }
    xhr.open('POST', 'Register');
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send(JSON.stringify(new_user));
}
function getLoggedOwnerData(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#owner-active-user-data").html(createTableFromJSON(JSON.parse(xhr.responseText)));
            $('#owner-active-user-data').show();
            $('#owner-user-fields-container').hide();
            $("#welcome-message").html("");
            // not sure if needed the below let them because it works
            $("#login-topnav").hide();
            $("#owner-activeSession").show();
            // $("#activeSession-topnav").show();
            $("#form-container").empty();
        } else if (xhr.status === 201) {
            $("#error-message").html("error with the get request if it persists reload page or try again later");
        } else if (xhr.status !== 200) {
            $("#error-message").html("error with the get request - cannot get user data");
            // $("#form-container").load("login.html");
            //alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.open('GET', 'Register');
    xhr.send();
}

function getLoggedUserData(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#active-user-data").html(createTableFromJSON(JSON.parse(xhr.responseText)));
            $('#active-user-data').show();
            $('#user-fields-container').hide();
            $("#welcome-message").html("");
            // not sure if needed the below let them because it works
            $("#login-topnav").hide();
            // $("#activeSession-topnav").show();
            $("#form-container").empty();
        } else if (xhr.status === 201) {
            $("#error-message").html("error with the get request if it persists reload page or try again later");
        } else if (xhr.status !== 200) {
            $("#error-message").html("error with the get request - cannot get user data");
            // $("#form-container").load("login.html");
            //alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.open('GET', 'Register');
    xhr.send();
}

function isLoggedIn() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // $("#ajaxContent").html("Welcome again " + JSON.parse(xhr.responseText)["username"]);
            // $("#ajaxContent").append(createTableFromJSON(JSON.parse(xhr.responseText)));
            if(document.baseURI.includes("admin-login.html")){
                if (xhr.responseText.includes("admin_id")) {
                    $("#logged-user").load("activeSession.html", function () {
                        setChoicesForLoggedAdmin(JSON.parse(xhr.responseText));
                        $("#welcome-message").html("<h2>Welcome again admin " + JSON.parse(xhr.responseText)["username"] + "</h2>");
                        $("#user-fields-container").hide();
                        $("#form-container").empty();
                        $("#admin-activeSession-topnav").show();
                    });
                } else {
                    $("#logged-user").html("<h2>USER ALREADY LOGGED IN (must logout from main website)</h2>");
                    // location.reload();
                }
            } else {
                if (xhr.responseText.includes("owner_id")){
                    $("#logged-user").load("activeOwnerSession.html", function () {
                        setChoicesForLoggedOwner(JSON.parse(xhr.responseText));
                        $("#welcome-message").html("<h2>Welcome again Owner " + JSON.parse(xhr.responseText)["username"] + "</h2>");
                        $("#owner-user-fields-container").hide();
                        $("#form-container").empty();
                        $("#owner-activeSession-topnav").show();
                    });
                } else if (xhr.responseText.includes("keeper_id")){
                    $("#logged-user").load("activeSession.html", function () {
                        setChoicesForLoggedUser(JSON.parse(xhr.responseText));
                        $("#welcome-message").html("<h2>Welcome again Keeper " + JSON.parse(xhr.responseText)["username"] + "</h2>");
                        $("#user-fields-container").hide();
                        $("#form-container").empty();
                        $("#activeSession-topnav").show();
                    });
                } else {
                    // location.reload();
                }
            }
            $("#login-topnav").hide();
            $("#form-container").empty();
        } else if (xhr.status !== 200) {
            $('#main-page-container').load('main-page.html');
            $('#main-page-container').show();
            // $("#form-container").load("login.html");
            //alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.open('GET', 'Login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function adminLogin() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // $("#ajaxContent").html("Successful Login").removeClass('error');
            // $("#ajaxContent").append(createTableFromJSON(JSON.parse(xhr.responseText)));
            $("#logged-user").load("activeSession.html", function () {
                //TODO check this
                setChoicesForLoggedAdmin(JSON.parse(xhr.responseText));
                $("#user-fields-container").hide();
                $("#welcome-message").html("<h2>Welcome Admin, " + JSON.parse(xhr.responseText)["username"] + "</h2>");
            });
            $("#login-topnav").hide();
            $("#admin-activeSession-topnav").show();
            $("#form-container").empty();
        } else if (xhr.status !== 200) {
            $("#error").html("Wrong Credentials").addClass('error');
            //('Request failed. Returned status of ' + xhr.status);
        }
    };
    var data = $('#admin-loginForm').serialize();
    xhr.open('POST', 'AdminLogin');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
}

/*Login dependend on user type*/
function login() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if(xhr.responseText.includes("nothing")){
                return;
            } else if (xhr.responseText.includes("petkeeper")){
                console.log("logging keeper")
                loginKeeper();
            } else if (xhr.responseText.includes("petowner")){
                console.log("logging owner")
                loginOwner();
            }
        } else if (xhr.status !== 200) {
            $("#error").html("Wrong Credentials").addClass('error');
            //('Request failed. Returned status of ' + xhr.status);
        }
    };
    var data = $('#username').serialize();
    xhr.open('GET', 'UserType?' + data);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}
function loginKeeper() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // $("#ajaxContent").html("Successful Login").removeClass('error');
            // $("#ajaxContent").append(createTableFromJSON(JSON.parse(xhr.responseText)));
            $("#logged-user").load("activeSession.html", function () {
                setChoicesForLoggedUser(JSON.parse(xhr.responseText));
                $("#user-fields-container").hide();
                $("#welcome-message").html("<h2>Welcome, " + JSON.parse(xhr.responseText)["username"] + "</h2>");
            });
            $("#login-topnav").hide();
            $("#activeSession-topnav").show();
            $("#form-container").empty();
        } else if (xhr.status !== 200) {
            $("#error").html("Wrong Credentials").addClass('error');
            //('Request failed. Returned status of ' + xhr.status);
        }
    };
    var data = $('#loginForm').serialize();
    xhr.open('POST', 'Login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
}
function loginOwner() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // $("#ajaxContent").html("Successful Login").removeClass('error');
            // $("#ajaxContent").append(createTableFromJSON(JSON.parse(xhr.responseText)));
            $("#logged-user").load("activeOwnerSession.html", function () {
                setChoicesForLoggedOwner(JSON.parse(xhr.responseText));
                $("#owner-user-fields-container").hide();
                $("#welcome-message").html("<h2>Welcome, " + JSON.parse(xhr.responseText)["username"] + "</h2>");
            });
            $("#login-topnav").hide();
            $("#owner-activeSession-topnav").show();
            $("#form-container").empty();
        } else if (xhr.status !== 200) {
            $("#error").html("Wrong Credentials").addClass('error');
            //('Request failed. Returned status of ' + xhr.status);
        }
    };
    var data = $('#loginForm').serialize();
    xhr.open('POST', 'Login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
}

function logout() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // not sure if needed the below let them because it works
            $("#login-topnav").show();
            $("#activeSession-topnav").hide();

            $("#ajaxContent").html("Successful Logout");
            $("#form-container").load("login.html");
            $("#logged-user").empty();
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.open('POST', 'Logout');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function logoutOwner() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // not sure if needed the below let them because it works
            $("#login-topnav").show();
            $("#owner-activeSession-topnav").hide();

            $("#ajaxContent").html("Successful Owner Logout");
            $("#form-container").load("login.html");
            $("#logged-user").empty();
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.open('POST', 'Logout');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function logoutAdmin() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // not sure if needed the below let them because it works
            // $("#login-topnav").show();
            // $("#admin-activeSession-topnav").hide();
            location.reload(true);
            $("#ajaxContent").html("Successful Admin Logout");
            // $("#form-container").load("admin-login.html");
            // $("#logged-user").empty();
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.open('POST', 'Logout');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function updateOwnerFields(userJson) {
    updateOwner();
    return false;
}
function updateOwner() {
    var xhr = new XMLHttpRequest();
    let updateForm = document.getElementById('owner-user-fields-form');
    let formData = new FormData(updateForm);

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            $('#owner-user-fields-container').html("Data updated Successfully. Reload to see it")
            $('#ajaxContent').html("Successful Owner update. New data").removeClass('error');
            $('#ajaxContent').append(createTableFromJSON(responseData));
        } else if (xhr.status !== 200) {
            $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
        }
    };
    const updated_owner = {};
    formData.forEach((value, key) => {
        if (globalUserJson[key] !== value) {
            updated_owner[key] = value;
        }
    });
    if (Object.entries(updated_owner).length === 0){
        $('#ajaxContent').html("Nothing to be updated").addClass('error');
        return;
    } else if (updated_owner["address"] !== undefined){
        if(getCoordinates() === undefined){
            alert("user needs to verify and have valid coordinates");
            return false;
        }
    }
    updated_owner["username"] = globalUserJson["username"];

    xhr.open('POST', 'UpdateOwner');
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send(JSON.stringify(updated_owner));
}
function updateUserFields(userJson) {
    updateUser();
    return false;
}

function updateUser() {
    var xhr = new XMLHttpRequest();
    let updateForm = document.getElementById('user-fields-form');
    let formData = new FormData(updateForm);

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            $('#user-fields-container').html("Data updated Successfully. Reload to see it")
            $('#ajaxContent').html("Successful update. New data").removeClass('error');
            $('#ajaxContent').append(createTableFromJSON(responseData));
        } else if (xhr.status !== 200) {
            $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
            const responseData = JSON.parse(xhr.responseText);
            if (responseData !== "")
                for (const x in responseData) {
                    $('#ajaxContent').append("<p style='color:red'>" + x + "=" + responseData[x] + "</p>");
                }
        }
    };
    formData.set("catkeeper", document.querySelector("input[name='catkeeper']").checked);
    formData.set("dogkeeper", document.querySelector("input[name='dogkeeper']").checked);
    const updated_user = {};
    formData.forEach((value, key) => {
        if (globalUserJson[key] !== value) {
            updated_user[key] = value;
        }
    });
    if (Object.entries(updated_user).length === 0){
        $('#ajaxContent').html("Nothing to be updated").addClass('error');
        return;
    } else if (updated_user["address"] !== undefined){
        if(getCoordinates() === undefined){
            alert("user needs to verify and have valid coordinates");
            return false;
        }
    }
    updated_user["username"] = globalUserJson["username"];

    xhr.open('POST', 'UpdateUser');
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send(JSON.stringify(updated_user));
}

function showAllUsers() {
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const parsedObjects = [];
            // $('#active-user-data').html("Database Users")
            // $("#active-user-data").append(xhr.responseText);
            // Split the response text into an array of JSON strings
            var jsonStrings = xhr.responseText.split('}{');

            // Iterate over each JSON string, parse it, and add to the array
            jsonStrings.forEach(function (jsonString, index) {
                // Add back the missing curly brace for all but the first string
                if (index > 0) {
                    jsonString = '{' + jsonString;
                }

                // Add back the missing curly brace for all but the last string
                if (index < jsonStrings.length - 1) {
                    jsonString = jsonString + '}';
                }

                // Parse the JSON string
                var jsonObject = JSON.parse(jsonString);

                // Add the parsed object to the array
                parsedObjects.push(jsonObject);
            });

            createKeeperOwnerTables(parsedObjects);

            $('#active-user-data').show();
            $('#user-fields-container').hide();
            $("#welcome-message").html("");
            // not sure if needed the below let them because it works
            // $("#login-topnav").hide();
            // $("#activeSession-topnav").show();
            // $("#form-container").empty();
            // const responseData = JSON.parse(xhr.responseText);
            // $('#user-fields-container').append(xhr.responseText);
            $('#ajaxContent').html("Successful retrieval.").removeClass('error');
            $('#ajaxContent').append(xhr.responseText);
        } else if (xhr.status !== 200) {
            $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
            const responseData = JSON.parse(xhr.responseText);
            if (responseData !== "")
                for (const x in responseData) {
                    $('#ajaxContent').append("<p style='color:red'>" + x + "=" + responseData[x] + "</p>");
                }
        }
    };

    xhr.open('GET', 'AdminUsers');
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send();
}

function showCatsAndDogs() {
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // $('#active-user-data').html(xhr.responseText)
            $('#active-user-data').show();
            $('#user-fields-container').hide();
            $("#welcome-message").html("");
            createPetChart(xhr.responseText);
            $('#ajaxContent').html("Successful retrieval.").removeClass('error');
            $('#ajaxContent').append(xhr.responseText);
        } else if (xhr.status !== 200) {
            $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
            const responseData = JSON.parse(xhr.responseText);
            if (responseData !== "")
                for (const x in responseData) {
                    $('#ajaxContent').append("<p style='color:red'>" + x + "=" + responseData[x] + "</p>");
                }
        }
    };

    xhr.open('GET', 'AdminPetCount');
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send();
}

function showPetCareRevenue() {
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // $('#active-user-data').html(xhr.responseText)
            console.log(xhr.responseText);
            // console.log(JSON.parse(xhr.responseText));
            $('#active-user-data').show();
            $('#user-fields-container').hide();
            $("#welcome-message").html("");

            createRevenueChart(xhr.responseText);
            $('#ajaxContent').html("Successful retrieval.").removeClass('error');
            $('#ajaxContent').append(xhr.responseText);
        } else if (xhr.status !== 200) {
            $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
            const responseData = JSON.parse(xhr.responseText);
            if (responseData !== "")
                for (const x in responseData) {
                    $('#ajaxContent').append("<p style='color:red'>" + x + "=" + responseData[x] + "</p>");
                }
        }
    };

    xhr.open('GET', 'AdminRevenue');
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send();
}

function showUserCount() {
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#active-user-data').show();
            $('#user-fields-container').hide();
            createUserCountChart(xhr.responseText);
            $("#welcome-message").html("");
            $('#ajaxContent').html("Successful retrieval.").removeClass('error');
            $('#ajaxContent').append(xhr.responseText);
        } else if (xhr.status !== 200) {
            $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
            $('#ajaxContent').append(xhr.responseText);
        }
    };

    xhr.open('GET', 'AdminUserCount');
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send();
}

function deleteUser(userType, id){

    var userConfirmed = confirm("Are you sure you want to continue?");

    if (userConfirmed) {
        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                $('#ajaxContent').html("Successful deletion.").removeClass('error');
                $('#ajaxContent').append(xhr.responseText);
                showAllUsers();
            } else if (xhr.status !== 200) {
                $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
            }
        };
        const params = "user="+userType+"&id="+id;
        xhr.open('GET', 'AdminDeleteUser?'+params);
        xhr.setRequestHeader('Content-type', 'application/JSON');
        xhr.send();
    }
}

function createUsersTable(containerId, headers, rows) {
    const container = document.getElementById(containerId);
    if (container===undefined) {console.log("returning");return;}
    // Create table element
    const table = document.createElement('table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    //Delete header
    const th = document.createElement('th');
    th.textContent = "Delete Users";
    headerRow.appendChild(th);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header] || '';
            tr.appendChild(td);
        });
        const td = document.createElement('td');
        td.innerHTML="<a onclick='deleteUser(\"" + headers[0] + "\" ," + row[headers[0]] + ")'>Delete " + row[headers[0]];
        tr.appendChild(td);
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // Append the table to the container
    container.appendChild(table);
}

function createKeeperOwnerTables(data){
    const container = document.getElementById("active-user-data");
    container.innerHTML="<div id='petKeepersTable'></div><div id='petOwnersTable'></div>";
    // Headers for Pet Keepers table
    const petKeeperHeaders = ['keeper_id', 'username', 'lastname', 'telephone'];

    // Filter data for Pet Keepers
    const petKeeperData = data.filter(item => 'keeper_id' in item);

    // Create Pet Keepers table
    createUsersTable('petKeepersTable', petKeeperHeaders, petKeeperData);

    // Headers for Pet Owners table
    const petOwnerHeaders = ['owner_id', 'username', 'lastname', 'telephone'];

    // Filter data for Pet Owners
    const petOwnerData = data.filter(item => 'owner_id' in item);

    // Create Pet Owners table
    createUsersTable('petOwnersTable', petOwnerHeaders, petOwnerData);
}

function createKeeperHtmlTable(containerId, headers, rows) {
    const container = document.getElementById(containerId);
    if (container===undefined) return;
    // Create table element
    const table = document.createElement('table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header] || '';
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // Append the table to the container
    container.appendChild(table);
}

function createKeeperTable(data) {
    const container = document.getElementById("main-page-users");

    if (container === undefined) {return;}
    container.innerHTML = "<button type='button' onClick='$(\"#main-page-users\").hide();'>Close!</button><div id='main-petKeepersTable' style='border: 1px solid black'></div>";
    // Headers for Pet Keepers table
    const petKeeperHeaders = ['keeper_id', 'username', 'lastname', 'telephone'];

    // Filter data for Pet Keepers
    const petKeeperData = data.filter(item => 'keeper_id' in item);

    // Create Pet Keepers table
    createKeeperHtmlTable('main-petKeepersTable', petKeeperHeaders, petKeeperData);
    $("#main-page-users").show();
}

function showKeepers() {
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const parsedObjects = [];
            var jsonStrings = xhr.responseText.split('}{');

            jsonStrings.forEach(function (jsonString, index) {
                if (index > 0) {
                    jsonString = '{' + jsonString;
                }
                if (index < jsonStrings.length - 1) {
                    jsonString = jsonString + '}';
                }
                var jsonObject = JSON.parse(jsonString);
                parsedObjects.push(jsonObject);
            });
            createKeeperTable(parsedObjects);

            $('#active-user-data').show();
            $('#user-fields-container').hide();
            $("#welcome-message").html("");
            $('#ajaxContent').html("Successful retrieval.").removeClass('error');
            $('#ajaxContent').append(xhr.responseText);
        } else if (xhr.status !== 200) {
            $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
        }
    };

    xhr.open('GET', 'AdminUsers');
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send();
}

// Function to add distance and drive time properties to each object in the array
async function addDriveTimeProperty(objectsArray) {
    const apiKey = 'fddeaf7166msh673ea9fc0bd5067p1cd0fejsn15aa102a192d';

    const originString = `${globalUserJson.lat},${globalUserJson.lon}`;

    // Create a comma-separated list of destination coordinates
    const destinationString = objectsArray.map(dest => `${dest.lat},${dest.lon}`).join(';');

    // Construct the TrueWay API URL
    const Url = `https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix?origins=${originString};&destinations=${destinationString};`;
    let apiUrl = Url.replace(/,/g, '%2C').replace(/;/g, '%3B');

try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'trueway-matrix.p.rapidapi.com',
                'X-RapidAPI-Key': apiKey
            }
        });

        const data = await response.json();

        return objectsArray.map((obj,index) => {
            const number = data.durations[0][index];
            return { ...obj, 'timeByCar':number };
        });
        // Accessing driving times for each destination
        // const drivingTimes = data.map(destination => destination.time);
        // console.log(drivingTimes);

        // return drivingTimes;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Earth radius in kilometers

    const toRadians = (angle) => angle * (Math.PI / 180);

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
}
function addDistanceProperty(objectsArray) {
    const globalLat = parseFloat(globalUserJson.lat);
    const globalLon = parseFloat(globalUserJson.lon);

    return objectsArray.map((obj) => {
        const { lat, lon } = obj;
        const distance = calculateDistance(globalLat, globalLon, parseFloat(lat), parseFloat(lon));
        return { ...obj, "distance":distance.toFixed(2) };
    });
}
async function calculateExtraDataForKeepers(data){
    globalKeeperObject = addDistanceProperty(data);
    globalKeeperObject = await addDriveTimeProperty(globalKeeperObject);

    return globalKeeperObject;
    // return updatedData;
}

function sortKeepersByPrice(){
    globalKeeperObject.sort((a,b)=>a.price-b.price);
    createKeeperPricesTable(globalKeeperObject)
}

function sortKeepersByDistance(){
    globalKeeperObject.sort((a,b)=>a.distance-b.distance);
    createKeeperPricesTable(globalKeeperObject)
}

function sortKeepersByTimeByCar(){
    globalKeeperObject.sort((a,b)=>a.timeByCar-b.timeByCar);
    createKeeperPricesTable(globalKeeperObject)
}

function createKeeperPricesTable(data){
    const petKeeperHeaders = ['keeper_id',  'lastname', 'telephone', 'price', 'lat','lon', 'distance','timeByCar'];
    const updatedData = globalKeeperObject;
    const container = document.getElementById('keeper-prices');
    if (container !== undefined && container != null){
        container.innerHTML="";
        createKeeperPriceHtmlTable('keeper-prices', petKeeperHeaders, updatedData);
    } else {
        const container = document.getElementById("owner-active-user-data");
        container.innerHTML="<h3>Sort Keepers</h3>" +
            "<button onclick='sortKeepersByDistance()'>By Distance</button>" +
            "<button onclick='sortKeepersByPrice()'>By Price</button>" +
            "<button onclick='sortKeepersByTimeByCar()'>By Time By Car</button>" +
            "<br>" +
            "<div id='owner-petKeepersTable' style='border: 1px solid black'></div>";
        createKeeperHtmlTable('owner-petKeepersTable', petKeeperHeaders, updatedData);
    }
}
function createKeeperPriceHtmlTable(containerId, headers, rows) {
    const container = document.getElementById(containerId);
    if (container===undefined) {console.log("returning");return;}
    // Create table element
    const table = document.createElement('table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    //Delete header
    const th1 = document.createElement('th');
    th1.textContent = "Book";
    headerRow.appendChild(th1);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header] || '';
            tr.appendChild(td);
        });
        const td1 = document.createElement('td');
        td1.innerHTML="<a href='#' class='userHref' onclick='addBooking(" + globalUserJson.owner_id + " ," + row[headers[0]] + "," + row[headers[3]] + ")'>Book ";
        tr.appendChild(td1);

        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // Append the table to the container
    container.appendChild(table);
}

/*------------------------AVAILABLE USERS--------------------------*/
function createRevenueChart(data) {
    const container = document.getElementById("active-user-data");
    container.innerHTML = "<div id='chart' style=\"width: 900px; height: 500px;\"></div>";

    const parsedObjects = [];
    // $('#active-user-data').html("Database Users")
    // $("#active-user-data").append(xhr.responseText);
    // Split the response text into an array of JSON strings
    var jsonStrings = data.split('}{');

    // Iterate over each JSON string, parse it, and add to the array
    jsonStrings.forEach(function (jsonString, index) {
        // Add back the missing curly brace for all but the first string
        if (index > 0) {
            jsonString = '{' + jsonString;
        }

        // Add back the missing curly brace for all but the last string
        if (index < jsonStrings.length - 1) {
            jsonString = jsonString + '}';
        }

        // Parse the JSON string
        var jsonObject = JSON.parse(jsonString);

        let floatStringValue = jsonObject.keeper_income;
        floatStringValue = floatStringValue.replace(',', '.');
        jsonObject.keeper_income = parseFloat(floatStringValue);

        floatStringValue = jsonObject.pet_care_income;
        floatStringValue = floatStringValue.replace(',', '.');
        jsonObject.pet_care_income = parseFloat(floatStringValue);

        parsedObjects.push(jsonObject);
    });
    console.log(parsedObjects)
    const chart_data = new google.visualization.DataTable();
    chart_data.addColumn('string', 'Keeper');
    chart_data.addColumn('number', 'Income');
    chart_data.addColumn('number', 'Pet Care Profit');

    parsedObjects.forEach(lambdaData => {
        chart_data.addRow([
            lambdaData["keeper_id"],
            lambdaData['keeper_income'],
            lambdaData['pet_care_income'],
        ]);
    });
    const options = {
        title: 'Revenue of Pet Care per user',
        bars: 'horizontal', // Required for Material Bar Charts.
        legend: { position: 'top', maxLines: 3 },
    };
    var chart = new google.visualization.BarChart(document.getElementById('chart'));
    chart.draw(chart_data, options);
}
function createUserCountChart(data) {
    const container = document.getElementById("active-user-data");
    container.innerHTML = "<div id='chart' style=\"width: 900px; height: 500px;\"></div>";

    console.log(JSON.parse(data));
    jsonData = JSON.parse(data);

    const chart_data = google.visualization.arrayToDataTable([
        ['User Type', 'Count'],
        ['Pet Keepers',     parseInt(jsonData["keeperCount"])],
        ['Pet Owners',     parseInt(jsonData["ownerCount"])],
    ]);
    const options = {
        title: 'Users Per Type'
    };
    const chart = new google.visualization.PieChart(document.getElementById('chart'));
    chart.draw(chart_data, options);
}
function createPetChart(data) {
    const container = document.getElementById("active-user-data");
    container.innerHTML = "<div id='chart' style=\"width: 900px; height: 500px;\"></div>";

    console.log(JSON.parse(data));
    jsonData = JSON.parse(data);

    const chart_data = google.visualization.arrayToDataTable([
        ['Pet Type', 'Count'],
        ['Cats',     parseInt(jsonData["Cats"])],
        ['Dogs',     parseInt(jsonData["Dogs"])],
    ]);
    const options = {
        title: 'Pet Count per Type'
    };
    const chart = new google.visualization.PieChart(document.getElementById('chart'));
    chart.draw(chart_data, options);
}

$(document).ready(function () {
    google.charts.load('current', {'packages':['corechart']});
    $('.debug-container').hide();
    $('#activeSession-topnav').hide();
    $('#owner-activeSession-topnav').hide();
    $('#admin-activeSession-topnav').hide();
    isLoggedIn();
    // showLogin();
    // getTheme();
});

function createMyBookingsTable(data){
    const container = document.getElementById("owner-active-user-data");
    container.innerHTML="<h2>Requested</h2><div id='requested'></div>" +
        "<h2>Finished</h2><div id='finished'></div>" +
        "<h2>Accepted</h2><div id='accepted'></div>";
    // Headers for Pet Keepers table
    const bookingsHeader = ['booking_id','owner_id', 'pet_id', 'keeper_id', 'fromDate', 'toDate', 'status', 'price'];

    // Filter data for Pet Keepers
    const requested = data.filter(item => item.status === "requested");

    // Create Pet Keepers table
    createRequestedTable('requested', bookingsHeader, requested);

    const finished = data.filter(item => item.status === "finished");
    createCompletedTable('finished', bookingsHeader, finished);

    const accepted = data.filter(item => item.status === "accepted");
    createAcceptedTable('accepted', bookingsHeader, accepted);
}

function createRequestedTable(containerId, headers, rows) {
    const container = document.getElementById(containerId);
    if (container===undefined) {console.log("returning");return;}
    // Create table element
    const table = document.createElement('table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header] || '';
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // Append the table to the container
    container.appendChild(table);
}

function showReviewPage(owner_id, keeper_id){
    $('#owner-active-user-data').load("review.html", function (){
        $('input[name="owner_id"]').val(owner_id);
        $('input[name="keeper_id"]').val(keeper_id);
    });
}

function showMessagePage(booking_id){
    $('#owner-active-user-data').load("owner-message.html", function (){
        $('input[name="booking_id"]').val(booking_id);
    });
}

function createCompletedTable(containerId, headers, rows) {
    const container = document.getElementById(containerId);
    if (container===undefined) {console.log("returning");return;}
    // Create table element
    const table = document.createElement('table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    //Delete header
    const th = document.createElement('th');
    th.textContent = "Review Keeper";
    headerRow.appendChild(th);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header] || '';
            tr.appendChild(td);
        });
        const td = document.createElement('td');
        td.innerHTML="<a href='#' class='userHref' onclick='showReviewPage(" + row[headers[1]] + " ," + row[headers[3]] + ")'>Review Keeper</a>";
        tr.appendChild(td);
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // Append the table to the container
    container.appendChild(table);
}

function createAcceptedTable(containerId, headers, rows) {
    const container = document.getElementById(containerId);
    if (container===undefined) {console.log("returning");return;}
    // Create table element
    const table = document.createElement('table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    //Delete header
    const th = document.createElement('th');
    th.textContent = "Message Keeper";
    headerRow.appendChild(th);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header] || '';
            tr.appendChild(td);
        });
        const td = document.createElement('td');
        td.innerHTML="<a href='#' class='userHref' onclick='showMessagePage(" + row[headers[0]] + ")'>Message_Keeper</a>";
        tr.appendChild(td);
        const td2 = document.createElement('td');
        td2.innerHTML="<a href='#' class='userHref' onclick='endBooking(" + row[headers[0]] + ")'>Finish_Booking</a>";
        tr.appendChild(td2);
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // Append the table to the container
    container.appendChild(table);
}

function showMyBookings(){
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // $('#booking-data').html(xhr.responseText);
            const parsedObjects = [];
            var jsonStrings = xhr.responseText.split('}{');

            jsonStrings.forEach(function (jsonString, index) {
                if (index > 0) {
                    jsonString = '{' + jsonString;
                }
                if (index < jsonStrings.length - 1) {
                    jsonString = jsonString + '}';
                }
                var jsonObject = JSON.parse(jsonString);
                parsedObjects.push(jsonObject);
            });
            createMyBookingsTable(parsedObjects);
            $('#ajaxContent').html("Successful Booking.").removeClass('error');
            $('#ajaxContent').append(xhr.responseText);
        } else if (xhr.status !== 200) {
            // console.log(xhr.responseText);
            $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
        }
    };

    xhr.open('GET', 'BookingServlet?owner_id=' + globalUserJson.owner_id);
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send();
}

// function createBookingTable(data){
//     const container = document.getElementById("booking-data");
//     container.innerHTML="my bookings";
//
//     const bookingHeaders = ['booking_id',  'owner_id', 'keeper_id',  'fromDate',  'toDate',  'status',  'price'];
//
//     const bookings = data.filter(item => item.status === "requested" || item.status ==="completed");
//
//     createAvailableKeeperHtmlTable('bookingsTable', bookingHeaders, bookings);
//
//     const activeBooking = data.filter(item => item.status === "accepted");
//
//     createAvailableKeeperHtmlTable('activeBookingsTable', bookingHeaders, activeBooking);
// }

function showNewBookingForm(){
    const container = document.getElementById("booking-data");
    $('#booking-data').load("create-booking.html",function (){
        $('#booking-form').show();
        $('#keeper-prices-container').hide();
        $('#keeper-prices').html("");
    });
}

var globalKeeperObject = [];
function getAvailableKeepersPrices(duration = 0){
    var xhr = new XMLHttpRequest();

    xhr.onload = async function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            /*theoretically emptying keepers*/
            globalKeeperObject.splice(0, globalKeeperObject.length)
            var jsonStrings = xhr.responseText.split('}{');

            jsonStrings.forEach(function (jsonString, index) {
                if (index > 0) {
                    jsonString = '{' + jsonString;
                }
                if (index < jsonStrings.length - 1) {
                    jsonString = jsonString + '}';
                }
                var jsonObject = JSON.parse(jsonString);
                globalKeeperObject.push(jsonObject);
            });
            try {
                const updatedArray = await calculateExtraDataForKeepers(globalKeeperObject)
                createKeeperPricesTable(updatedArray);
                $('#owner-active-user-data').show();
                $('#owner-user-fields-container').hide();
                $("#welcome-message").html("");
                $('#booking-form').hide();
                $('#keeper-prices-container').show();
                $('#ajaxContent').html("Successful retrieval.").removeClass('error');
                $('#ajaxContent').append(xhr.responseText);
            } catch (error) {
                console.error('Error:', error);
            }
        } else if (xhr.status !== 200) {
            $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
        }
    };

    const params = new URLSearchParams();
    params.append('owner_id',globalUserJson.owner_id);
    if (duration === 0){
        const fromDateString = document.getElementById('fromDate').value;
        const toDateString = document.getElementById('toDate').value;
        if (fromDateString === undefined || fromDateString.length === 0
            || toDateString === undefined || toDateString.length === 0){
            alert('please select dates');
            return;
        }
        const fromDate =new Date(fromDateString);
        const toDate =new Date(toDateString);
        if (fromDate > toDate){
            alert('Choose later toDate');
            return;
        }
        const timeDifference = toDate - fromDate;
        const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
        params.append('duration',daysDifference);
    } else {
        params.append('duration',1);
    }
    const paramsString = params.toString();
    xhr.open('GET', 'OwnerAvailableKeepersWithPrices?' + paramsString);
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send();
}

function goBackToBookingForm(){
    $('#booking-form').show();
    $('#keeper-prices-container').hide();
    $('#keeper-prices').html("");
}

/*----------------------- Owner makes booking ------------------------------*/
function addBooking(owner_id,keeper_id,price){
    var xhr = new XMLHttpRequest();
    var bookingData = {
        owner_id: owner_id,
        keeper_id: keeper_id,
        fromDate: document.getElementById('fromDate').value,
        toDate:  document.getElementById('toDate').value,
        price: price
    };
    var jsonString = JSON.stringify(bookingData);

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#owner-active-user-data').html(xhr.responseText);
            $('#ajaxContent').html("Successful Booking.").removeClass('error');
            $('#ajaxContent').append(xhr.responseText);
        } else if (xhr.status !== 200) {
            // console.log(xhr.responseText);
            $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
        }
    };

    xhr.open('POST', 'BookingServlet');
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send(jsonString);
}

/*----------------------- Owner Ends booking ------------------------------*/
function endBooking(booking_id){
    var xhr = new XMLHttpRequest();
    var bookingData = {
        booking_id: booking_id
    };
    var jsonString = JSON.stringify(bookingData);

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#owner-active-user-data').html(xhr.responseText);
            $('#ajaxContent').html("Booking finished succesfully.").removeClass('error');
        } else if (xhr.status !== 200) {
            $('#ajaxContent').html('Request failed. Returned status of ' + xhr.status + "<br>");
        }
    };

    xhr.open('POST', 'FinishBookingServlet');
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send(jsonString);
}

/*----------------------- Owner Reviews booking ------------------------------*/
function reviewBooking(){
    var xhr = new XMLHttpRequest();
    const reviewText = document.getElementById('reviewText').value;
    const reviewScore = document.getElementById('reviewScore').value;
    if (reviewText === undefined || reviewText.length === 0
        || reviewScore === undefined || reviewScore.length === 0){
        alert('please fill out the fields');
        return;
    }
    var bookingData = {
        owner_id: document.getElementById('owner_id').value,
        keeper_id: document.getElementById('keeper_id').value,
        reviewText: reviewText,
        reviewScore: reviewScore
    };
    var jsonString = JSON.stringify(bookingData);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            $('#owner-active-user-data').html(xhr.responseText);
            $('#ajaxContent').html("Booking finished succesfully.").removeClass('error');
        } else if (xhr.status !== 200) {
            $('#ajaxContent').html('Request failed. Returned status of ' + xhr.status + "<br>");
        }
    };

    xhr.open('POST', 'ReviewBookingServlet');
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send(jsonString);
}

/*----------------------- Owner leaves message to keeper ------------------------------*/
function leaveMessageOwner() {
    var xhr = new XMLHttpRequest();
    var bookingData = {
        booking_id:  document.getElementById('booking_id').value,
        message:  document.getElementById('message').value
    };
    var jsonString = JSON.stringify(bookingData);

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#owner-active-user-data').html(xhr.responseText);
            $('#ajaxContent').html("Message send successfully.").removeClass('error');
        } else if (xhr.status !== 200) {
            $('#ajaxContent').html('Request failed. Returned status of ' + xhr.status + "<br>");
        }
    };

    xhr.open('POST', 'OwnerMessageServlet');
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send(jsonString);
}
/*----------------------- Owner leaves message to keeper ------------------------------*/
function leaveMessageKeeper() {
    var xhr = new XMLHttpRequest();
    var bookingData = {
        booking_id:  document.getElementById('booking_id').value,
        message:  document.getElementById('message').value
    };
    var jsonString = JSON.stringify(bookingData);

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#active-user-data').html(xhr.responseText);
            $('#ajaxContent').html("Message send successfully.").removeClass('error');
        } else if (xhr.status !== 200) {
            $('#ajaxContent').html('Request failed. Returned status of ' + xhr.status + "<br>");
        }
    };

    xhr.open('POST', 'KeeperMessageServlet');
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send(jsonString);
}

/*------------------------------------------KEEPER----------------------*/

function showKeeperBookings(){
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // $('#booking-data').html(xhr.responseText);
            $("#welcome-message").html('');
            $('#active-user-data').show();
            $('#user-fields-container').hide();
            console.log(xhr.responseText);
            const parsedObjects = [];
            var jsonStrings = xhr.responseText.split('}{');

            jsonStrings.forEach(function (jsonString, index) {
                if (index > 0) {
                    jsonString = '{' + jsonString;
                }
                if (index < jsonStrings.length - 1) {
                    jsonString = jsonString + '}';
                }
                var jsonObject = JSON.parse(jsonString);
                parsedObjects.push(jsonObject);
            });
            createKeeperBookingsTable(parsedObjects);
            $('#ajaxContent').html("Successful Booking.").removeClass('error');
            $('#ajaxContent').append(xhr.responseText);
        } else if (xhr.status !== 200) {
            // console.log(xhr.responseText);
            $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
        }
    };

    xhr.open('GET', 'KeeperBookingServlet?keeper_id=' + globalUserJson.keeper_id);
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send();
}
function createKeeperBookingsTable(data){
    const container = document.getElementById("active-user-data");
    container.innerHTML="<h2>Requested</h2><div id='requested'></div>" +
        "<h2>Finished</h2><div id='finished'></div>" +
        "<h2>Rejected</h2><div id='rejected'></div>" +
        "<h2>Accepted</h2><div id='accepted'></div>";
    // Headers for Pet Keepers table
    const bookingsHeader = ['booking_id', 'owner_id','pet_id', 'keeper_id', 'fromDate', 'toDate', 'status', 'price'];
    console.log(data)

    // Filter data for Pet Keepers
    const requested = data.filter(item => item.status === "requested");

    // Create Pet Keepers table
    createKeeperRequestedTable('requested', bookingsHeader, requested);

    const finished = data.filter(item => item.status === "finished");
    createKeeperCompletedTable('finished', bookingsHeader, finished);

    const accepted = data.filter(item => item.status === "accepted");
    createKeeperAcceptedTable('accepted', bookingsHeader, accepted);

    const rejected = data.filter(item => item.status === "rejected");
    createKeeperRejectedTable('rejected', bookingsHeader, rejected);
}

function createKeeperRequestedTable(containerId, headers, rows) {
    const container = document.getElementById(containerId);
    if (container===undefined) {console.log("returning");return;}
    // Create table element
    const table = document.createElement('table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    const th = document.createElement('th');
    th.textContent = "Accept";
    headerRow.appendChild(th);
    const th1 = document.createElement('th');
    th1.textContent = "Reject";
    headerRow.appendChild(th1);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header] || '';
            tr.appendChild(td);
        });
        const td = document.createElement('td');
        td.innerHTML="<a href='#' class='userHref' onclick='keeperUpdateBooking(" + row[headers[0]] + ",\"accepted\")'>Accept</a>";
        tr.appendChild(td);
        const td2 = document.createElement('td');
        td2.innerHTML="<a href='#' class='userHref' onclick='keeperUpdateBooking(" + row[headers[0]] + ",\"rejected\")'>Reject</a>";
        tr.appendChild(td2);
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // Append the table to the container
    container.appendChild(table);
}

function keeperUpdateBooking(booking_id, status){
    var xhr = new XMLHttpRequest();
    var bookingData = {
        booking_id: booking_id,
        status: status
    };
    var jsonString = JSON.stringify(bookingData);

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#active-user-data').html(xhr.responseText);
            $('#ajaxContent').html("Booking finished succesfully.").removeClass('error');
        } else if (xhr.status !== 200) {
            $('#ajaxContent').html('Request failed. Returned status of ' + xhr.status + "<br>");
        }
    };

    xhr.open('POST', 'KeeperUpdateBooking');
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send(jsonString);
}
function createKeeperCompletedTable(containerId, headers, rows) {
    const container = document.getElementById(containerId);
    if (container===undefined) {console.log("returning");return;}
    // Create table element
    const table = document.createElement('table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header] || '';
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // Append the table to the container
    container.appendChild(table);
}

function createKeeperAcceptedTable(containerId, headers, rows) {
    const container = document.getElementById(containerId);
    if (container===undefined) {console.log("returning");return;}
    // Create table element
    const table = document.createElement('table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    //Delete header
    const th = document.createElement('th');
    th.textContent = "Message_Owner";
    headerRow.appendChild(th);
    const th1 = document.createElement('th');
    th1.textContent = "Ask_ChatGPT";
    headerRow.appendChild(th1);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header] || '';
            tr.appendChild(td);
        });
        const td = document.createElement('td');
        td.innerHTML="<a href='#' class='userHref' onclick='showKeeperMessagePage(" + row[headers[0]] + ")'>Message Owner</a>";
        tr.appendChild(td);
        const td1 = document.createElement('td');
        td1.innerHTML="<a href='#' class='userHref' onclick='showKeeperChatMessage(" + row[headers[2]] + ")'>Ask ChatGPT</a>";
        tr.appendChild(td1);
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // Append the table to the container
    container.appendChild(table);
}

function showKeeperMessagePage(booking_id){
    $('#active-user-data').load("keeper-message.html", function (){
        $('input[name="booking_id"]').val(booking_id);
    });
}

function createKeeperRejectedTable(containerId, headers, rows) {
    const container = document.getElementById(containerId);
    if (container===undefined) {console.log("returning");return;}
    // Create table element
    const table = document.createElement('table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header] || '';
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // Append the table to the container
    container.appendChild(table);
}

//--------------------------KEEPER STATS----------------------------

function showKeeperStats(){
    const container = document.getElementById("active-user-data");
    container.innerHTML = "<h1>Booking Statistics:</h1>" +
        "<div id='chart-div' style=\"width: 900px; height: 500px;\"></div>" +
        "<h1>Reviews:</h1>"+
        "<div id='review-div'></div>"+
        "<h1>Accepted/Rejected Chart:</h1>"+
        "<div id='booking-chart-div' style=\"width: 900px; height: 500px;\"></div>";
    showKeeperNumberOfBookings();

}

function showKeeperNumberOfBookings() {
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#active-user-data').show();
            $('#user-fields-container').hide();
            $("#welcome-message").html("");
            createKeeperBookingsChart(xhr.responseText);
            $('#ajaxContent').html("Successful retrieval.").removeClass('error');
            $('#ajaxContent').append(xhr.responseText);
            //SECOND REQUEST
            showKeeperBookingStats();
        } else if (xhr.status !== 200) {
            $('#active-user-data').html(xhr.responseText);
            $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
            $('#ajaxContent').append(xhr.responseText);
        }
    };

    const data = "keeper_id=" + globalUserJson.keeper_id;
    xhr.open('GET', 'KeeperBookingStats?' + data);
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send();
}

function createKeeperBookingsChart(response_data){
    const data = JSON.parse(response_data);

    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('number', 'numberOfBookings');
    dataTable.addColumn('number', 'duration');

    // console.log(data['keeper_id'])
    console.log(data.numberOfBookings)
    console.log(data.duration)
    dataTable.addRow([data.numberOfBookings, data.duration]);

    // Set chart options
    var options = {
        title: globalUserJson.username + '\'s Statistics',
        hAxis: {title: 'Number Of Bookings'},
        vAxis: {title: 'Duration in Days'},
        chartArea: {width: "50%", height: "70%" },
        legend: {position:'none'}
    };

    // Instantiate and draw the chart
    var chart = new google.visualization.ColumnChart(document.getElementById('chart-div'));
    chart.draw(dataTable, options);
}
function showKeeperBookingStats() {
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // $('#active-user-data').append(xhr.responseText);
            $('#ajaxContent').append(xhr.responseText);
            createKeeperBookingsStatusChart(xhr.responseText);
            showKeeperReviews();
        } else if (xhr.status !== 200) {
            $('#active-user-data').html(xhr.responseText);
            $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
            $('#ajaxContent').append(xhr.responseText);
        }
    };

    const data = "keeper_id=" + globalUserJson.keeper_id;
    xhr.open('GET', 'KeeperBookingStatusStats?' + data);
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send();
}

function createKeeperBookingsStatusChart(data) {
    jsonData = JSON.parse(data);
    const chart_data = new google.visualization.arrayToDataTable([
        ['Booking Status', 'Count'],
        ['Accepted',     parseInt(jsonData["accepted"])],
        ['Rejected',     parseInt(jsonData["rejected"])],
    ]);
    const options = {
        title: 'Accepted/Rejected Chart'
    };
    const chart = new google.visualization.PieChart(document.getElementById('booking-chart-div'));
    chart.draw(chart_data, options);
}

function showKeeperReviews(){
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#ajaxContent').append(xhr.responseText);
            const parsedObjects = [];

            var jsonStrings = xhr.responseText.split('}{');
            jsonStrings.forEach(function (jsonString, index) {
                if (index > 0) {
                    jsonString = '{' + jsonString;
                }
                if (index < jsonStrings.length - 1) {
                    jsonString = jsonString + '}';
                }
                var jsonObject = JSON.parse(jsonString);
                parsedObjects.push(jsonObject);
            });
            createKeeperReviewTable(parsedObjects);
        } else if (xhr.status !== 200) {
            $('#active-user-data').html(xhr.responseText);
            $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
            $('#ajaxContent').append(xhr.responseText);
        }
    };

    const data = "keeper_id=" + globalUserJson.keeper_id;
    xhr.open('GET', 'KeeperReviews?' + data);
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send();
}

function createKeeperReviewTable(data){
    const container = document.getElementById('review-div');
    const headers = ['review_id', 'owner_id','keeper_id', 'reviewText', 'reviewScore'];
    const rows = data;
    console.log(rows);

    if (container===undefined) {console.log("returning");return;}

    const table = document.createElement('table');
    table.style.marginLeft = "auto";
    table.style.marginRight = "auto";

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header] || '';
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // Append the table to the container
    container.appendChild(table);
}

function showKeeperChatMessage(pet_id){
    $('#active-user-data').load("keeper-chat-message.html", function (){
        $('input[name="pet_id"]').val(pet_id);
        $('#ring').hide();
    });
}


function askChat(action) {
    if(action === undefined || action==="")
        return;
    var xhr = new XMLHttpRequest();
    const messageData = {
        pet_id:  document.getElementById('pet_id').value,
        action:  action,
        message:  document.getElementById('message').value
    };
    console.log(messageData);
    const jsonString = JSON.stringify(messageData);
    console.log(jsonString);
    // const question = "hello, how are you? Can you tell me what's a Fibonacci Number?";
    disableChatForm();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            let stringWithDoubleBackslashes = xhr.responseText.replace(/\\/g, '\\\\');

            const data = JSON.parse(stringWithDoubleBackslashes);
            console.log(data);
            enableChatForm();
            document.getElementById('message').value = data.message;
            document.getElementById('response').value = data.response;
            resizeResponse();


            // $('#chat-response').html(xhr.responseText);
        } else if (xhr.status !== 200) {
            $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
        }
    };

    xhr.open('POST', 'ChatGPTServlet');
    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send(jsonString);
}

function resizeResponse(){
    // Get the textarea element
    const textarea = document.getElementById('response');

    // Auto-adjust the height based on content
    textarea.style.height = 'auto';
    // textarea.style.width = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

function disableChatForm(){
    document.getElementById('message').disabled = true;
    $('#ring').show();
    $(':button').prop('disabled', true);
}

function enableChatForm(){
    document.getElementById('message').disabled = false;
    $('#ring').hide();
    $(':button').prop('disabled', false);
}