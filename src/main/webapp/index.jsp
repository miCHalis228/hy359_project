<!doctype html>
<html lang="en" class="no-js">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="hy359, tsitsipas, foo, bar, michalis, csd, 3o etos">
        <meta name="description" content="Assiginment 3 hy359">
        <meta name="author" content="Michalis Ierodiakonou - csd4773">
        <link rel="stylesheet" href="css/form.css">
        <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v7.2.2/ol.css">
        <script src="https://cdn.jsdelivr.net/npm/ol@v7.2.2/dist/ol.js"></script>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script src="js/ajax.js" defer></script>
        <script src="js/utilities.js" defer></script>
        <link rel="stylesheet" href="css/cssExamples.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="http://www.openlayers.org/api/OpenLayers.js"></script>
        <title>miCHalis DB</title>
        <!-- <script src="jquery-3.7.1.min.js"></script> -->
    </head>
    <body>
        <div class="topnav" id="topnav">
            <a class="active" onclick="showMain()">Main</a>
            <a id="login-topnav" onclick="showLogin()">Login</a>
            <div id="activeSession-topnav">
                ea id="active-user-topnav" onclick="showUser()">Profile</a>
                <a onclick="showUserFields()">Update Profile</a>
                <a onclick="showPetForm()">Pets</a>
                <a class="active debug" onclick="logout()">Logout</a>
            </div>
            <a class="debug" onclick="toggleDebug()">Debug</a>
        </div>
        <div class="debug-container">
            <div class="row">
                <div class="column column1Width" id="choices" style="background-color:#ADD8E6;">
                    <button class="test button" onclick="initDB()">Initialize Database</button><!-- comment -->
                    <button class="test button" onclick="deleteDB()">Delete Database</button><!-- comment -->
                    <br><br>
                    <button class="test button" id="PetOwnerAdder" onclick="addPetOwners()">AddNewPetOwner</button>
                    <button class="test button" id="PetKeeperAdder" onclick="addPetKeepers()">AddNewPetKeeper</button>
                    <button class="test button" id="generateUserJSON" onclick="generateUserJSON()">User JSON</button>
                    <button class="test button" id="Login" onclick="getUser()">getUserInfo</button>
                    <br><br>
                    <button class="test button" id="showLogin" onclick="showLogin()" style="color: red">Login</button>
                    <button class="test button" id="showRegistration" onclick="showRegistrationForm()" style="color: red">
                        Register
                    </button>
                    <br><br>
<%--                    <div id="form-container"--%>
<%--                         class="form-container"></div>--%>
                </div>
                <div class="column column2Width" id="output" style="background-color:#fffff0;">
                    <h2>Output</h2>
                    <div id="ajaxContent"></div>
                </div>
            </div>
        </div>
        <div id="main-page-container"></div>
        <div id="logged-user"></div>
        <div id="register-message" class="register-msg"></div>
        <div id="form-container" class="form-container"></div>
        <div id="error-checking" style="display: none" class=""></div>
        <br>
        <div id="error-message" class="error error-message"></div>
    </body>
    <script src="js/form.js" defer></script>
    <script src="js/map.js" defer></script>
</html>