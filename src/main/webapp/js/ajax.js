var globalUserJson;

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
    $("ajaxContent").html("");
}

function showPetForm(){
    // $('#main-page-container').();
    $("#ajaxContent").html("");
    // window.open('http://localhost:8080/A3_csd4773_war_exploded/getPets', '_blank');
    window.open('http://localhost:8080/A3_csd4773_war_exploded/client.html', '_self');
    // $('html').load("Javascript_Client/client.html");
}

function goBackToMain(){
    window.open('http://localhost:8080/A3_csd4773_war_exploded/', '_self');
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

function getLoggedUserData(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#active-user-data").append(createTableFromJSON(JSON.parse(xhr.responseText)));
            $('#active-user-data').show();
            $('#user-fields-container').hide();
            $("#welcome-message").html("");
            // not sure if needed the below let them because it works
            $("#login-topnav").hide();
            $("#activeSession-topnav").show();
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
            $("#ajaxContent").html("Welcome again " + JSON.parse(xhr.responseText)["username"]);
            // $("#ajaxContent").append(createTableFromJSON(JSON.parse(xhr.responseText)));
            $("#logged-user").load("activeSession.html", function () {
                setChoicesForLoggedUser(JSON.parse(xhr.responseText));
                $("#welcome-message").html("<h2>Welcome again " + JSON.parse(xhr.responseText)["username"] + "</h2>");
                $("#user-fields-container").hide();
                $("#form-container").empty();
            });
            $("#login-topnav").hide();
            $("#activeSession-topnav").show();
            $("#form-container").empty();
        } else if (xhr.status === 201) {
            $('#main-page-container').load('main-page.html');
            $('#main-page-container').show();
            // $("#form-container").load("login.html");
            //alert('Request failed. Returned status of ' + xhr.status);
        } else if (xhr.status !== 200) {
            $('#main-page-container').load('main-page.html');
            $('#main-page-container').show();
            // $("#form-container").load("login.html");
            //alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.open('GET', 'Login');
    xhr.send();
}

function login() {
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

$(document).ready(function () {
    $('.debug-container').hide();
    $('#activeSession-topnav').hide();
    isLoggedIn();
    // showLogin();
    // getTheme();
});
