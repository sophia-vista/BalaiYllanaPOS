$(document).ready(function () {

    function setInvalid(field, errormsg, errorfield) {
        field.css('background-color', '#FFB0B0');
        errorfield.text(errormsg);
        $('#editbtn').attr("disabled", true);
    }

    function setValid(field, errorfield) {
        field.css('background-color', '#FFFFFF');
        errorfield.text('');
        $('#editbtn').attr("disabled", false);
    }

    function checkIfValidUsername(username, errorfield) {
        if (!validator.isAlphanumeric(username.replaceAll("-", '').replaceAll("_", '').replaceAll(".", '')) && !validator.isEmpty(username))
            setInvalid($('#username'), 'Invalid username. Use Alphanumeric characters (A-Z, 0-9), dash (-), period (.), and underscore (_) only.', errorfield);
        else if (!validator.isLength(username, {min: 4, max: 20}) && !validator.isEmpty(username)) 
            setInvalid($('#username'), 'Invalid username. Minimum of 4 characters and maximum of 20 characters.', errorfield);
        else $.get('/getCheckUsername', {username: username}, function (result) {
            if(result.username == username) 
                setInvalid($('#username'), 'Username is taken!', errorfield);
            else setValid($('#username'), errorfield);
        });
    }

    function checkIfValidEmail(email, errorfield) {
        if (!validator.isEmail(email) && !validator.isEmpty(email)) 
            setInvalid($('#email'), 'Invalid email. Please use a valid format.', errorfield);
        else {
            validator.normalizeEmail(email);
            $.get('/getCheckEmail', {email: email}, function (result) {

                if(result.email == email) 
                    setInvalid($('#email'), 'Email is taken!', errorfield);
                else setValid($('#email'), errorfield);
            });
        }
    }

    function checkIfValidPassword(password, errorfield) {
        if (!validator.isAscii(password) && !validator.isEmpty(password))
            setInvalid($('#new_password'), 'Invalid password. Use ASCII characters only.', errorfield);
        else if (!validator.isLength(password, {min: 4, max: 20}) && !validator.isEmpty(password))
            setInvalid($('#new_password'), 'Invalid password. Minimum of 4 characters and maximum of 20 characters.', errorfield);
        else 
            setValid($('#new_password'), errorfield);
    }

    $('#username').keyup(function () {
        var username = validator.trim($('#username').val());
        checkIfValidUsername(username, $('#usernameError'));
    });

    $('#email').keyup(function () {
        var email = validator.trim($('#email').val());
        checkIfValidEmail(email, $('#emailError'));
    });

    $('#password').keyup(function () {
        var password = validator.trim($('#new_password').val());
        checkIfValidPassword(password, $('#passwordError'));
    });
});
