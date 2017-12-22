Tracker.autorun(function(){
    if(!Meteor.userId()){
        Router.go("/signUp");
    }
});

Template.login.rendered = function() {

}

Template.login.events({
    "submit #login-form": function(event){
        var email = trimInput(event.target.email.value);
        var password = trimInput(event.target.password.value);

        if(isNotEmpty(email) &&
            isNotEmpty(password) &&
            isEmail(email) &&
            isValidPassword(password)){

            Meteor.loginWithPassword(email, password, function(err){
                if(err) {
                    sweetAlert(err.reason);
                    return false;
                } else {
                    Router.go("/");
                    sweetAlert("You are now logged in");
                }
            });

        }

        return false // Prevent Submit
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