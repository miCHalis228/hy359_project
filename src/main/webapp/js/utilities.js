function createTableFromJSON(data) {
    var html = "<table><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {
        var category = x;
        var value = data[x];
        html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
    }
    html += "</table>";
    return html;

}

function getUser() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#ajaxContent").html(createTableFromJSON(JSON.parse(xhr.responseText)));
            //  $("#ajaxContent").html("Successful Login");
        } else if (xhr.status !== 200) {
            $("#ajaxContent").html("User not exists or incorrect password");
        }
    };
    var data = $('#loginForm').serialize();
    xhr.open('GET', 'GetKeeper?'+data);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}

function initDB() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#ajaxContent").html("Successful Initialization");
        } else if (xhr.status !== 200) {
            $("#ajaxContent").html("Error Occured");
        }
    };

    xhr.open('GET', 'InitDB');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}

function deleteDB() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#ajaxContent").html("Successful Deletion");
        } else if (xhr.status !== 200) {
            $("#ajaxContent").html("Error Occured");
        }
    };

    xhr.open('GET', 'DeleteDB');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}

function generateUserJSON(){
    const user = {
        "username": document.querySelector("input[name='username']").value,
        "email": document.querySelector("input[name='email']").value,
        "password": document.querySelector("input[name='password']").value,
        "firstname": document.querySelector("input[name='firstname']").value,
        "lastname": document.querySelector("input[name='lastname']").value,
        "birthdate": document.querySelector("input[name='birthdate']").value,
        "gender": document.querySelector("input[name='gender']:checked").value,
        "country": document.getElementById("country").value,
        "city": document.querySelector("input[name='city']").value,
        "address": document.querySelector("input[name='street']").value + " " + document.querySelector("input[name='street-number']").value,
        "personalpage": document.querySelector("input[name='personalpage']").value,
        "job": document.querySelector("input[name='job']").value,
        "telephone": document.querySelector("input[name='telephone']").value,
    };

    const result = getCoordinates();
    if (result === undefined){
        alert("user needs to verify and have valid coordinates");
        return undefined;
    }
    // const result = {lat: 40.7128, lon: -74.0060};
    user.lat = result.lat;
    user.lon = result.lon;

    /* For Pet Keeper */
    if (document.querySelector("input[name='type']:checked").value === "Pet Keeper") {
        user.property = document.querySelector("input[name='property']").value;
        user.propertydescription = document.querySelector("textarea[name='propertydescription']").value;
        const catkeeper = $('#cat').prop('checked');
        user.catkeeper = catkeeper;
        if (catkeeper === true)
            user.catprice = document.querySelector("input[name='catprice']").value;
        else
            user.catprice = 0;
        const dogkeeper = $('#dog').prop('checked');
        user.dogkeeper = dogkeeper;
        if (dogkeeper === true)
            user.dogprice = document.querySelector("input[name='dogprice']").value;
        else
            user.dogprice = 0;
    }
    console.assert(user !== {});
    return user;
}

function addNewUser(userObject){
    var xhr = new XMLHttpRequest();
    let new_user = generateUserJSON();

    if(userObject !== undefined)
        new_user = userObject;
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#ajaxContent").append("<br>User Added");
        } else if (xhr.status === 500) {
            $("#ajaxContent").html("Server Problem");
        } else if (xhr.status !== 200) {
            $("#ajaxContent").html("Error Occured");
        }
    };

    /*check if new user is Pet Keeper or Owner*/
    action = document.querySelector("input[name='type']:checked").value;
    if (action === "Pet Keeper"){
        new_user.ACTION = "add_pet_keeper";
    } else {
        new_user.ACTION = "add_pet_owner";
    }
    xhr.open('POST', 'Register');
    xhr.setRequestHeader('Content-type','application/JSON');
    xhr.send(JSON.stringify(new_user) );
}

function addPetOwners(){
    const userObject = {
        "username": "michalis22",
        "email": "mixalisier@gmail.com",
        "password": "1234ASDFghjk!",
        "firstname": "Michalis",
        "lastname": "Ierodiakonou",
        "birthdate": "2002-08-22",
        "gender": "Male",
        "country": "Greece",
        "city": "Heraklion",
        "address": "Anogion 22",
        "lat": 0,
        "lon": 0,
        "telephone": 1234567890,
        "job": "student",
        "personalpage": "https://www.csd.uoc.gr/"
    };
    const userObject1 = {
        "username": "john_doe",
        "email": "john.doe@example.com",
        "password": "P@ssw0rd123",
        "firstname": "John",
        "lastname": "Doe",
        "birthdate": "1990-03-15",
        "gender": "Male",
        "country": "USA",
        "city": "New York",
        "address": "123 Main Street",
        "lat": 40.7128,
        "lon": -74.0060,
        "telephone": 5551234567,
        "job": "Software Engineer",
        "personalpage": "https://www.johndoe.com/"
    };

    const userObject2 = {
        "username": "alice_smith",
        "email": "alice.smith@example.com",
        "password": "SecurePass456",
        "firstname": "Alice",
        "lastname": "Smith",
        "birthdate": "1985-09-22",
        "gender": "Female",
        "country": "Canada",
        "city": "Toronto",
        "address": "456 Oak Street",
        "lat": 43.6532,
        "lon": -79.3832,
        "telephone": 4169876543,
        "job": "Marketing Manager",
        "personalpage": "https://www.alicesmith.com/"
    };

    const userObject3 = {
        "username": "sam_jackson",
        "email": "sam.jackson@example.com",
        "password": "StrongP@ss789",
        "firstname": "Sam",
        "lastname": "Jackson",
        "birthdate": "1988-11-10",
        "gender": "Male",
        "country": "Australia",
        "city": "Sydney",
        "address": "789 Pine Avenue",
        "lat": -33.8688,
        "lon": 151.2093,
        "telephone": 6123456789,
        "job": "Graphic Designer",
        "personalpage": "https://www.samjackson.com/"
    };

    const userObject4 = {
        "username": "lily_wang",
        "email": "lily.wang@example.com",
        "password": "SecretP@ss987",
        "firstname": "Lily",
        "lastname": "Wang",
        "birthdate": "1993-07-05",
        "gender": "Female",
        "country": "China",
        "city": "Beijing",
        "address": "987 Maple Street",
        "lat": 39.9042,
        "lon": 116.4074,
        "telephone": 8612345678901,
        "job": "Product Manager",
        "personalpage": "https://www.lilywang.com/"
    };

    const userObject5 = {
        "username": "alex_turner",
        "email": "alex.turner@example.com",
        "password": "RockStarP@ss",
        "firstname": "Alex",
        "lastname": "Turner",
        "birthdate": "1986-01-06",
        "gender": "Male",
        "country": "United Kingdom",
        "city": "Sheffield",
        "address": "10 Abbey Road",
        "lat": 53.3811,
        "lon": -1.4701,
        "telephone": 441234567890,
        "job": "Musician",
        "personalpage": "https://www.arcticmonkeys.com/"
    };

    addNewUser(userObject);
    addNewUser(userObject1);
    addNewUser(userObject2);
    addNewUser(userObject3);
    addNewUser(userObject4);
    addNewUser(userObject5);

}

function addPetKeepers(){
    const userObject1 = {
        "username": "user1",
        "email": "user1@example.com",
        "password": "Passw0rd!1",
        "firstname": "John",
        "lastname": "Doe",
        "birthdate": "1995-04-20",
        "gender": "Male",
        "country": "USA",
        "city": "New York",
        "address": "123 Oak Street",
        "personalpage": "https://www.user1.com/",
        "job": "Software Developer",
        "telephone": "5551112233",
        "lat": 40.7128,
        "lon": -74.0060,
        "property": "House",
        "propertydescription": "Modern apartment with a view",
        "catkeeper": true,
        "dogkeeper": false,
        "catprice": 50,
        "dogprice": 0
    };

    const userObject2 = {
        "username": "user2",
        "email": "user2@example.com",
        "password": "SecurePass!2",
        "firstname": "Alice",
        "lastname": "Smith",
        "birthdate": "1988-09-15",
        "gender": "Female",
        "country": "Canada",
        "city": "Toronto",
        "address": "456 Pine Avenue",
        "personalpage": "https://www.user2.com/",
        "job": "Marketing Specialist",
        "telephone": "4162223344",
        "lat": 43.6532,
        "lon": -79.3832,
        "property": "Apartment",
        "propertydescription": "Cozy downtown loft",
        "catkeeper": false,
        "dogkeeper": true,
        "catprice": 0,
        "dogprice": 75
    };

    const userObject3 = {
        "username": "user3",
        "email": "user3@example.com",
        "password": "StrongPass!3",
        "firstname": "Sam",
        "lastname": "Johnson",
        "birthdate": "1992-11-10",
        "gender": "Male",
        "country": "Australia",
        "city": "Sydney",
        "address": "789 Maple Street",
        "personalpage": "https://www.user3.com/",
        "job": "Graphic Designer",
        "telephone": "6123334455",
        "lat": -33.8688,
        "lon": 151.2093,
        "property": "House",
        "propertydescription": "Family home with a garden",
        "catkeeper": true,
        "dogkeeper": true,
        "catprice": 30,
        "dogprice": 40
    };

    const userObject4 = {
        "username": "user4",
        "email": "user4@example.com",
        "password": "SecretPass!4",
        "firstname": "Lily",
        "lastname": "Wang",
        "birthdate": "1985-07-05",
        "gender": "Female",
        "country": "China",
        "city": "Beijing",
        "address": "987 Cedar Street",
        "personalpage": "https://www.user4.com/",
        "job": "Product Manager",
        "telephone": "861234567890",
        "lat": 39.9042,
        "lon": 116.4074,
        "property": "Apartment",
        "propertydescription": "Spacious city flat",
        "catkeeper": true,
        "dogkeeper": false,
        "catprice": 20,
        "dogprice": 0
    };

    const userObject5 = {
        "username": "user5",
        "email": "user5@example.com",
        "password": "RandomP@ss5",
        "firstname": "Alex",
        "lastname": "Turner",
        "birthdate": "1990-01-06",
        "gender": "Male",
        "country": "United Kingdom",
        "city": "London",
        "address": "10 Abbey Road",
        "personalpage": "https://www.user5.com/",
        "job": "Musician",
        "telephone": "4422333444",
        "lat": 51.5074,
        "lon": -0.1278,
        "property": "House",
        "propertydescription": "Classic Victorian residence",
        "catkeeper": false,
        "dogkeeper": true,
        "catprice": 0,
        "dogprice": 60
    };

    const userObject6 = {
        "username": "user6",
        "email": "user6@example.com",
        "password": "SecureP@ss6",
        "firstname": "Elena",
        "lastname": "Gomez",
        "birthdate": "1987-12-18",
        "gender": "Female",
        "country": "Spain",
        "city": "Barcelona",
        "address": "321 Elm Street",
        "personalpage": "https://www.user6.com/",
        "job": "Architect",
        "telephone": "3466677888",
        "lat": 41.3851,
        "lon": 2.1734,
        "property": "Apartment",
        "propertydescription": "Modern urban living space",
        "catkeeper": true,
        "dogkeeper": true,
        "catprice": 25,
        "dogprice": 35
    };

    addNewUser(userObject1);
    addNewUser(userObject2);
    addNewUser(userObject3);
    addNewUser(userObject4);
    addNewUser(userObject5);
    addNewUser(userObject6);
}
