const petObject = {
    // pet_id: "1000112314",
    pet_id: "1001001001",
    owner_id: "5",
    name: "Fluffy",
    type: "Cat",
    breed: "Siamese",
    gender: "Female",
    birthyear: 2019,
    weight: 8.5,
    description: "A lovely and playful cat",
    photo: "path/to/photo.jpg"
};


function goBackToMain(){
    window.open('http://localhost:8080/hy359_project_war_exploded/', '_self');
}
function createTableFromJSON(data, i) {
    var html = "<h4>Pet " + i + "</h4><table><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {
        var category = x;
        var value = data[x];
        html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
    }
    html += "</table><br>";
    return html;

}

/**
 * DONE
 */
function getPets() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            const obj = JSON.parse(xhr.responseText);
            var i = 1;
            var count = Object.keys(obj.data).length;
            document.getElementById("msg").innerHTML = "<h3>" + count + " Pets</h3>";
            for (id in obj.data) {
                document.getElementById("msg").innerHTML += createTableFromJSON(obj.data[id], i);
                i++;
            }
        } else if (xhr.status !== 200) {
            document.getElementById('msg')
                .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>";

        }
    };

    xhr.open("GET", "http://localhost:4567/pets/");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

/**
 * DONE
 */
function getPetsOfType_Breed() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            const obj = JSON.parse(xhr.responseText);
            var i = 1;
            var count = Object.keys(obj.data).length;
            document.getElementById("msg").innerHTML = "<h3>" + count + " Pets</h3>";
            for (id in obj.data) {
                document.getElementById("msg").innerHTML += createTableFromJSON(obj.data[id], i);
                i++;

            }
        } else if (xhr.status !== 200) {
            document.getElementById('msg')
                .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>"
                + JSON.stringify(xhr.responseText);
        }
    };

    var type = document.getElementById("type2");
    var breed = document.getElementById("breed2");
    if (type === null || breed === null) {
        document.getElementById("msg").innerHTML = "Error with request - js";
        return;
    }
    if (type.value === "") {
        document.getElementById("msg").innerHTML = "Type was empty";
        return;
    }
    if (breed.value === "") {
        document.getElementById("msg").innerHTML += "Breed was empty so selected all";
        breed.value = "all"
    }
    let data = type.value + "/" + breed.value;
    xhr.open("GET", "http://localhost:4567/pets/" + data);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

/**
 * DONE
 */
function getPetsWithWeight() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const obj = JSON.parse(xhr.responseText);
            var i = 1;
            var count = Object.keys(obj.data).length;
            document.getElementById("msg").innerHTML = "<h3>" + count + " Pets</h3>";
            for (id in obj.data) {
                document.getElementById("msg").innerHTML += createTableFromJSON(obj.data[id], i);
                i++;
            }
        } else if (xhr.status !== 200) {
            document.getElementById('msg')
                .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>"
                + JSON.stringify(xhr.responseText);
        }
    };

    var type = document.getElementById("type3");
    var breed = document.getElementById("breed3");
    if (type === null || breed === null) {
        document.getElementById("msg").innerHTML = "Error with request - js";
        return;
    }
    if (type.value === "") {
        document.getElementById("msg").innerHTML = "Type was empty";
        return;
    }
    if (breed.value === "") {
        document.getElementById("msg").innerHTML += "Breed was empty so selected all";
        breed.value = "all"
    }
    let data = type.value + "/" + breed.value;

    var fromWeight = document.getElementById("from-weight3");
    var toWeight = document.getElementById("to-weight3");
    if (fromWeight === null || toWeight === null) {
        document.getElementById("msg").innerHTML = "Error with request (weight)- js";
        return;
    }
    let from = fromWeight.value;
    let to = toWeight.value;

    if (to <= 0 || from <= 0 || to <= from) {
        document.getElementById("msg").innerHTML = "Error with request (Invalid weight)- js";
        return;
    }
    let weight = "fromWeight=" + from + "&toWeight=" + to;
    xhr.open("GET", "http://localhost:4567/pets/" + data + "/WithWeight?" + weight);
    console.log("http://localhost:4567/pets/" + data + "/WithWeight?" + weight);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function updatePet() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('msg').innerHTML="Successful update";
            // document.getElementById('msg').innerHTML=JSON.stringify(xhr.responseText);
        } else if (xhr.status !== 200) {
            document.getElementById('msg')
                .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>"
                + JSON.stringify(xhr.responseText);
        }
    };
    var pet_id = document.getElementById("pet_id2");
    var new_weight = document.getElementById("new_weight");
    if (pet_id === null || new_weight === null) {
        document.getElementById("msg").innerHTML = "Error with request - js";
        return;
    }
    if (pet_id.value === "") {
        document.getElementById("msg").innerHTML = "Type was empty";
        return;
    }
    if (new_weight.value === "") {
        document.getElementById("msg").innerHTML += "Breed was empty so selected all";
        new_weight.value = "all"
    }
    if (!isWeightValid(new_weight.value)) {
        document.getElementById("msg").innerHTML = "Error with request (Invalid weight <= 0)- js";
        return;
    }
    let data = pet_id.value + "/" + new_weight.value;
    xhr.open("PUT", "http://localhost:4567/pets/petWeight/" + data);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function deletePet() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('msg').innerHTML="Successful deletion";
            // document.getElementById('msg').innerHTML=JSON.stringify(xhr.responseText);
        } else if (xhr.status !== 200) {
            document.getElementById('msg')
                .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>"
                + JSON.stringify(xhr.responseText);
        }
    };

    var pet_id = document.getElementById("pet_id3");
    if (pet_id === null){
        document.getElementById("msg").innerHTML = "Error with request - js";
        return;
    }
    if (pet_id.value === "") {
        document.getElementById("msg").innerHTML = "ID was empty";
        return;
    }
    let data = pet_id.value;
    xhr.open("DELETE", "http://localhost:4567/pets/petDeletion/" + data);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function addPet() {
    let myForm = document.getElementById('myForm');
    let formData = new FormData(myForm);
    const data = {};

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('msg').innerHTML = "Pet added succesfully, its data";
            document.getElementById('msg').innerHTML += JSON.stringify(xhr.responseText);

        } else if (xhr.status !== 200) {
            document.getElementById('msg')
                .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>" +
                JSON.stringify(xhr.responseText);

        }
    };

    formData.forEach((value, key) => (data[key] = value));
    var jsonData = JSON.stringify(data);

    const weight = data["weight"];
    if (!isWeightValid(weight)) {
        document.getElementById("msg").innerHTML = "Error with request (Invalid weight <= 0)- js";
        return;
    }

    const birthyear = data["birthyear"];
    if (!isBirthyearValid(birthyear)) {
        document.getElementById("msg").innerHTML = "Error with request (Invalid birthyear <= 2000)- js";
        return;
    }

    const photoPath = data["photo"];
    if (!isPhotoPathValid(photoPath)) {
        document.getElementById("msg").innerHTML = "Error with request (Invalid photo path, must start with http)- js";
        return;
    }


    xhr.open('POST', 'http://localhost:4567/pets/newPet');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}

function isWeightValid(weight) {
    return weight > 0;
}

function isBirthyearValid(birthyear) {
    return birthyear > 2000;
}

function isPhotoPathValid(photoPath) {
    return photoPath.startsWith("http");
}
