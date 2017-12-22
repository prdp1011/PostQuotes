Template.jokes.helpers({

    users(){
        console.log("-------------------->>>>>>>>>>>>",Meteor.users.find().fetch())
        return Meteor.users.find({});
    },
    jokeCount(){
        console.log("---->>>",this._id)
        return Jokes.find({userId:this._id}).count();
    },
    UserImages: function() {

        var URL = UserImages.findOne({userId: this._id});
        console.log(URL);
        return URL;
    }
})
Template.jokes.events({


});