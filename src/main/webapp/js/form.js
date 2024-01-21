function fillForm() {
    document.getElementById("username").setAttribute("value", "mike1234");
    document.getElementById("email").setAttribute("value", "csd473@csd.uoc.gr");
    document.getElementById("password").setAttribute("value", "12!@mikeA");
    document.getElementById("password-confirm").setAttribute("value", "12!@mikeA");
    document.getElementById("firstname").setAttribute("value", "Michalis");
    document.getElementById("lastname").setAttribute("value", "Ierodiakou");
    document.getElementById("birthdate").setAttribute("value", "1993-12-12");
    document.getElementById("male").setAttribute("checked", true);
    document.getElementById("Pet_Owner").setAttribute("checked", true);
    document.getElementById("city").setAttribute("value", "Heraklion");
    document.getElementById("street").setAttribute("value", "anogion");
    document.getElementById("street-number").setAttribute("value", 22);
    document.getElementById("zip-code").setAttribute("value", "71304");
    document.getElementById("personalpage").setAttribute("value", "C:\\Users\\maria\\Desktop\\uni\\hy359\\A2_csd4773\\form.html");
    document.getElementById("job").setAttribute("value", "csd student");
    document.getElementById("telephone").setAttribute("value", "1234567890");
    document.getElementById("terms-and-conditions").setAttribute("checked", true);
}

function emptyForm() {
    document.getElementById("username").setAttribute("value", "");
    document.getElementById("email").setAttribute("value", "");
    document.getElementById("password").setAttribute("value", "");
    document.getElementById("password-confirm").setAttribute("value", "");
    document.getElementById("firstname").setAttribute("value", "");
    document.getElementById("lastname").setAttribute("value", "");
    document.getElementById("birthdate").setAttribute("value", "");
    document.getElementById("male").setAttribute("checked", false);
    document.getElementById("Pet_Keeper").setAttribute("checked", false);
    document.getElementById("city").setAttribute("value", "");
    document.getElementById("street").setAttribute("value", "");
    document.getElementById("street-number").setAttribute("value", '');
    document.getElementById("zip-code").setAttribute("value", "");
    document.getElementById("personalpage").setAttribute("value", "");
    document.getElementById("job").setAttribute("value", "");
    document.getElementById("telephone").setAttribute("value", "");
    document.getElementById("terms-and-conditions").setAttribute("checked", false);
}

function togglePassword(passField, caller) {
    const field = document.getElementById(passField);
    field.type = (field.type === "password") ? "text" : "password";
    caller.classList.toggle("fa-eye-slash");
}

function checkPasswords() {
    if ($('#password').val() !== '') {
        if ($('#password').val() === $('#password-confirm').val()) {
            passwordMatching = true;
            $('#matching-message').html('<i class="fa fa-fw fa-check" ></i> Matching <i class="fa fa-fw fa-check" ></i><br>').css({
                'color': 'lightgreen',
                'display': 'flex',
                'width': '100%',
                'justify-content': 'right'
            });
        } else {
            passwordMatching = false;
            $('#matching-message').html('<i class="fa fa-fw fa-exclamation"></i>Not Matching<i class="fa fa-fw fa-exclamation"></i><br>').css({
                'color': 'black',
                'display': 'flex',
                'width': '100%',
                'justify-content': 'right'
            });
        }
    } else {
        let $div = $('<div></div>').html(" ").append('<br />');
        $('#matching-message').html($div);
    }
}

function showCheckList() {
    const popup = document.getElementById("password-checklist");
    popup.style.visibility = "visible";
}

function hideChechkList() {
    const popup = document.getElementById("password-checklist");
    popup.style.visibility = "hidden";
}

// Define an enum for password strength levels
const PasswordStrength = {
    WEAK: 0,
    MEDIUM: 1,
    STRONG: 2,
};

var passwordStrength = 0;
var passwordMatching = false;

function printStrength() {
    switch (passwordStrength) {
        case PasswordStrength.STRONG:
            $('#strength-message').html('Strong Password <br>').css({
                'color': 'lightgreen',
                'display': 'flex',
                'width': '100%',
                'justify-content': 'right'
            });
            break;
        case PasswordStrength.MEDIUM:
            $('#strength-message').html('Medium Strength Password <br>').css({
                'color': 'yellow',
                'display': 'flex',
                'width': '100%',
                'justify-content': 'right'
            });
            break;
        case PasswordStrength.WEAK:
            $('#strength-message').html('Weak Password <br>').css({
                'color': 'red',
                'display': 'flex',
                'width': '100%',
                'justify-content': 'right'
            });
            break;
        default:
            $('#strength-message').html('<br>');
            break;
    }
}

function countNumbersInString(inputString) {
    let count = 0;
    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];
        if (!isNaN(char)) {
            count++;
        }
    }
    return count;
}

function checkPasswordStrength(password) {
    passwordStrength = PasswordStrength.STRONG;
    const m_pass = document.getElementById(password);
    let passwordChecklist = document.querySelectorAll('.list-item');
    let disallowedWords = ['cat', 'dog', 'gata', 'skulos']
    let validationRegex = [
        {regex: /[0-9]/}, // numbers from 0 - 9
        {regex: /[a-z]/}, // letters from a - z (lowercase)
        {regex: /[A-Z]/}, // letters from A-Z (uppercase),
        {regex: /[^A-Za-z0-9]/} // special character
    ];
    let isValid;
    validationRegex.forEach((item, i) => {
        isValid = item.regex.test(m_pass.value);
        let j = i + 2;
        if (isValid) {
            passwordChecklist[j].classList.remove('unchecked');
            passwordChecklist[j].classList.add('checked');
        } else {
            passwordChecklist[j].classList.remove('checked');
            passwordChecklist[j].classList.add('unchecked');
            passwordStrength = PasswordStrength.MEDIUM;
        }
    });
    isValid = true;
    disallowedWords.forEach(s => {
        if (m_pass.value.toLowerCase().includes(s))
            isValid = false;
    });
    if (isValid) {
        passwordChecklist[0].classList.remove('unchecked');
        passwordChecklist[0].classList.add('checked');
    } else {
        passwordChecklist[0].classList.remove('checked');
        passwordChecklist[0].classList.add('unchecked');
        passwordStrength = PasswordStrength.WEAK;
    }

    if (countNumbersInString(m_pass.value) / m_pass.value.length < 0.5) {
        passwordChecklist[1].classList.remove('unchecked');
        passwordChecklist[1].classList.add('checked');
    } else {
        passwordChecklist[1].classList.remove('checked');
        passwordChecklist[1].classList.add('unchecked');
        passwordStrength = PasswordStrength.WEAK;
    }

    printStrength();
}

function hideExtraFields() {
    $('#pet_keeper_extra_fields').hide();
    $('#property').prop('required', false);
}

function showExtraFields() {
    $('#pet_keeper_extra_fields').show();
    // $('#pet_keeper_extra_fields').html('<i className="icon fa fa-fw fa-paw"></i><label className="radio-label">*Pet Stays:</label><br><div className="housing-div"><div><label className="label-input" htmlFor="Indoor_Housing">Indoor_Housing</label><input type="radio" id="Indoor_Housing" name="housing" value="Indoor_Housing" required onChange="addCatOption()"></div><div><label className="label-input" htmlFor="Outdoor_Housing">Outdoor_Housing</label><input type="radio" id="Outdoor_Housing" name="housing" value="Outdoor_Housing" required onChange="removeCatOption()"></div><div><label className="label-input" htmlFor="Both">Both</label><input type="radio" id="Both" name="housing" value="Both" required onChange="addCatOption()"> </div> </div> <i className="icon fa fa-fw fa-paw"></i> <label className="radio-label">*Kind of Pet:</label> <br> <div className="cat-or-dog-div"> <div> <label className="label-input" htmlFor="cat">Cat</label> <input type="checkbox" id="cat" name="type" value="cat" onChange="showCatExtraFields()" required> <div id="cat-extra-field"> <label className="label-input" htmlFor="cat-price">Cat Price</label> <input type="number" id="cat-price" name="type" value="8" min="0" max="15" required> </div> </div> <div> <label className="label-input" htmlFor="dog">Dog</label> <input type="checkbox" id="dog" name="type" value="dog" onChange="showDogExtraFields()"> <br> <div id="dog-extra-field"> <label className="label-input" htmlFor="dog-price">Dog Price</label> <input type="number" id="dog-price" name="type" value="10" min="0" max="20" required> </div> </div> </div> <i className="icon fa fa-fw fa-home"></i> <label className="radio-label">*House Description:</label> <textarea id="house-desc" name="house-desc"></textarea><br>');
    $('#property').prop('required', true);
    $('#cat-extra-field').hide();
    $('#dog-extra-field').hide();
}

function toggleCatExtraFields() {
    $('#cat-extra-field').toggle();
}

function toggleDogExtraFields() {
    $('#dog-extra-field').toggle();
}

function updateCatPrice(){
    if(!document.querySelector("input[name='catkeeper']").checked){
        document.getElementById("catprice").setAttribute("value", 0);
    }
}

function updateDogPrice(){
    if(!document.querySelector("input[name='dogkeeper']").checked){
        document.getElementById("dogprice").setAttribute("value", 0);
    }
}
function addCatOption() {
    $("#cat").attr("disabled", false);
}

function removeCatOption() {
    $("#cat").attr("disabled", true);
    $("#cat").prop('checked', false);
    $('#cat-extra-field').hide();
}

// $(document).ready(checkPasswords());
// $(document).ready(function () {
//     showLogin();
// });

function validateRegisterForm() {
    checkPasswordStrength('password');
    checkPasswords();
    if (passwordStrength === PasswordStrength.WEAK) {
        alert('weak password');
        return false;
    }
    if (passwordMatching === false) {
        alert('Passwords NOT matching');
        return false;
    }
    if ($('#Pet_Keeper').is(":checked")) {
        if ($('#Outdoor').is(":checked") === false && $('#Indoor').is(":checked") === false && $('#Both').is(":checked") === false) {
            alert('Must select where pet will stay');
            return false;
        }
        if ($('#cat').is(":checked") === false && $('#dog').is(":checked") === false) {
            alert('Must select kind of pet');
            return false;
        }
    }
    checkUsernameExists();
    checkEmailExists();
    if ($('#error-checking').hasClass('error-username')){
        alert("Invalid username");
        return false;
    }
    if ($('#error-checking').hasClass('error-email')){
        alert("Invalid email");
        return false;
    }
    if(getCoordinates() === undefined){
        alert("user needs to verify and have valid coordinates");
        return false;
    }

    registerPOST();
    return false;
}

function validateLoginForm(){
    login();
    return false;
}

function validateAdminLoginForm(){
    adminLogin();
    return false;
}

function showUser(){
    getLoggedUserData();
    $("#welcome-message").html("");
}

function showOwner(){
    getLoggedOwnerData();
    $("#welcome-message").html("");
}
function showUserFields(){
    $('#user-fields-container').show();
    $('#active-user-data').hide();
    $("#welcome-message").html("");
}

function showOwnerFields(){
    $('#owner-user-fields-container').show();
    $('#owner-active-user-data').hide();
    $("#welcome-message").html("");
}

function showMain() {
    $('#main-page-container').load('main-page.html');
    $('#main-page-container').show();
    $('#error-message').empty();
    $('#logged-user').empty();
    $('#form-container').empty();
    $('#error-checking').empty();
}


function showBookings(){
    $('#owner-active-user-data').show();
    $("#welcome-message").hide();
    const container = document.getElementById("owner-active-user-data");
    container.innerHTML="<button type='button' onclick='showMyBookings()'>My Bookings</button>" +
        "<button type='button' onclick='showNewBookingForm()'>Create Booking</button>" +
        "<div id='booking-data'></div>";
}
function toggleDebug(){
    $('.debug-container').toggle();
}