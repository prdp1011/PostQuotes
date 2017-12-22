Template.navbarr.rendered = function(){

}

Template.navbarr.events({
    "click .logout": function(event){
        console.log("logout called");
        Meteor.logout(function(err){
            if(err) {
                sweetAlert(err.reason);
            } else {
                Router.go('/login');
                sweetAlert("you Are Now Logged Out");
            }
        });
    },
});