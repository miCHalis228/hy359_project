const showPassword = document.querySelectorAll(".password-icon");
const passwordField = document.querySelector("#password");
const passwordFieldConfirm = document.querySelector("#password-confirm");

showPassword[0].addEventListener("click", function(){
    this.classList.toggle("fa-eye-slash");
    const type = passwordField.getAttribute("type") 
    === "password"? "text":"password";
    passwordField.setAttribute("type",type);
})

showPassword[1].addEventListener("click", function(){
    this.classList.toggle("fa-eye-slash");
    const type = passwordFieldConfirm.getAttribute("type") 
    === "password"? "text":"password";
    passwordFieldConfirm.setAttribute("type",type);
})
$(document).ready( function(){
    $('#password, #password-confirm').on('keyup', function () {
        if($('#password').val() !== ''){
            if ($('#password').val() === $('#password-confirm').val()) {
                $('#message').html('<i class="fa fa-fw fa-check" ></i> Correct <i class="fa fa-fw fa-check" ></i><br>').css({'color': 'green', 'display':'flex', 'width':'100%', 'justify-content':'center'});
            } else {
                $('#message').html('<i class="fa fa-fw fa-exclamation"></i>Not Matching<i class="fa fa-fw fa-exclamation"></i><br>').css({'color':'red', 'display':'flex', 'width':'100%', 'justify-content':'center'});
            }
        } else{
            let $div = $('<div></div>').html(" ").append('<br />');
            $('#message').html($div) ;
        }
    });
});

// password weak control
let passwordChecklist = document.querySelectorAll('.list-item');
let disallowedWords = ['cat','dog','gata','skulos']
let validationRegex = [
    { regex: /.{8,}/ }, // min 8 letters,
    { regex: /[0-9]/ }, // numbers from 0 - 9
    { regex: /[a-z]/ }, // letters from a - z (lowercase)
    { regex: /[A-Z]/}, // letters from A-Z (uppercase),
    { regex: /[^A-Za-z0-9]/}, // special characters
    { regex: new RegExp(
        `^(?!.*(${disallowedWords.join('|')})).*$`,
        'i' // 'i' for case-insensitive match
    )}   
]

// Define an enum for password strength levels
const PasswordStrength = {
    WEAK: 0,
    MEDIUM: 1,
    STRONG: 2,
};

// Function to check password strength and return a strength level
function checkPasswordStrength(password) {
    if (password.length < 8) {
      return PasswordStrength.WEAK;
    } else if (password.length < 12) {
      return PasswordStrength.MEDIUM;
    } else {
      return PasswordStrength.STRONG;
    }
}

passwordField.addEventListener('keyup', () => {
    validationRegex.forEach((item, i) => {

        let isValid = item.regex.test(passwordField.value);

        if(isValid) {
            passwordChecklist[i].classList.add('checked');
        } else{
            passwordChecklist[i].classList.remove('checked');
        }

    })
});

// Add an event listener to the form for form submission
$('#registration-form').on('submit', function (event) {
    // Get the password input value
    var password = passwordField.value;
    const strengthLevel = checkPasswordStrength(password);
    switch (strengthLevel) {
        case PasswordStrength.WEAK:
            console.log('Password is weak.');
            // Password is weak, prevent form submission
            alert('Password is weak. Please choose a stronger password.');
            event.preventDefault(); // Prevent the form from submitting
            break;
        case PasswordStrength.MEDIUM:
            console.log('Password is of medium strength.');
            break;
        case PasswordStrength.STRONG:
            console.log('Password is strong.');
            break;
    }
});