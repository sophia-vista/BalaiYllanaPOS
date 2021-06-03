const { check } = require('express-validator');

const validation = {

	signupValidation : function () {
		var validation = [
			check ('username', 'Invalid username. Minimum of 4 characters and maximum of 20 characters.')
			.isLength ({min: 4, max: 20}).custom((value,{req, loc, path}) => {
			value = value.split ("-").join ("").split ("_").join ("").split (".").join ("");
            if (!value.match (/^[a-z0-9]+$/i)) {
                throw new Error("Invalid username. Use valid characters only.");
            } else {
                return value;
            }
        }),
			check ('password', 'Invalid password. Minimum of 4 characters and maximum of 20 characters.')
			.isLength ({min: 4, max: 20}).custom((value,{req, loc, path}) => {
            if (!value) {
                throw new Error("Invalid password.");
            } else {
                return value;
            }
        }),
			check ('email', 'Invalid email.').isEmail (),
		]

		return validation;
	},

    loginValidation: function () {
        var validation = [
            check('username', 'Please input your username.').notEmpty(),
            check('password', 'Please input your password.').notEmpty()          
        ];

        return validation;
    },

    editProfileValidation: function () {
        var validation = [
            check ('username', 'Invalid username. Minimum of 4 characters and maximum of 20 characters.').optional ({nullable: true, checkFalsy: true})
            .isLength ({min: 4, max: 20}).custom((value,{req, loc, path}) => {
                value = value.split ("-").join ("").split ("_").join ("").split (".").join ("");
                if (!value.match (/^[a-z0-9]+$/i)) {
                    throw new Error("Invalid username. Use valid characters only.");
                } else {
                    return value;
                }
            }),
            
            check('email', 'Please input an email.').isEmail().optional ({nullable: true, checkFalsy: true}), 
           
            check ('new_password').optional ({nullable: true, checkFalsy: true})
            .custom((value,{req, loc, path}) => {
                if (!(value.length == 0 || (value.length >= 4 && value.length <= 20))) 
                    throw new Error("Invalid password. Minimum of 4 characters and maximum of 20 characters.");
                if (value !== req.body.edit_password)
                    throw new Error("Passwords don't match.");
                else 
                    return value;
            })                            
        ];

        return validation;
    }

}

module.exports = validation;