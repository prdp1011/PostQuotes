Template.signUp.rendered = function() {

}

Template.signUp.events({
    "submit #reg-form": function(event){
        var username = trimInput(event.target.first_name.value);
        var email = trimInput(event.target.email.value);
        var password = trimInput(event.target.password.value);
        var password2 = trimInput(event.target.repassword.value);
        console.log(username)

        console.log(email)
        console.log(password)

        if(isNotEmpty(email) &&
            isNotEmpty(username) &&
            isNotEmpty(password) &&
            isEmail(email) &&
            areValidPasswords(password, password2)) {
            let mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

            let year = new Date().getFullYear();
            let month = new Date().getMonth();
            let day = new Date().getDate();
            let mnth = mS[month];
            let date = (day+ " " +mnth+ " " +year).toString();
            console.log("--->", date);

            Accounts.createUser({
                username: username,
                email: email,
                password: password,
                profile: {
                    joinedDate:date,
                    likeScore: 0,
                    unlikeScore: 0,
                    loveScore: 0,
                    voted: [],
                }
            }, function(err){
                if(err){
                    sweetAlert("Hello" + err);
                } else {
                    sweetAlert("Welcome");
                    Router.go("/login");

                }
            });

        }

        return false; // prevent submit

    }
});

// Validation Rules

// Trim Helper
var trimInput = function(val){
    return val.replace(/^\s*|\s*$/g, "");
};

var isNotEmpty = function(value){
    if (value && value !== ''){
        return true;
    }
    sweetAlert("Please fill in all fields");
    return false;
};

// Validate Email
isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(filter.test(value)) {
        return true;
    }
    sweetAlert("Please use a valid email address");
    return false;
};

// Check Password Field
isValidPassword = function(password){
    if(password.length <6) {
        sweetAlert("Password must be at least 6 characters");
        return false;
    }
    return true;
};

// Match Password
areValidPasswords = function(password, confirm) {
    if(!isValidPassword(password)) {
        return false;
    }
    if(password !== confirm) {
        sweetAlert("Passwords do not match");
        return false;
    }
    return true;
};











