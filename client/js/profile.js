Template.profile.rendered = function() {

}

Session.setDefault('firsttime', true);

Template.profile.helpers({

    jokesList(){
        console.log(Jokes.find().fetch());
        return Jokes.find({userId:Meteor.userId()}, {sort:{createdAt:-1}});
    },
    jokeCount(){

        return Jokes.find({userId:Meteor.userId()}).count();
    },
    count(){
      return "";
    },
    users(){
        return Meteor.users.findOne({_id:Meteor.userId()});
    },
    UserImages: function() {
        var username = Meteor.user().username;
        var userId = Meteor.userId();
        var URL = UserImages.findOne({username: username}, {userId: userId});
        console.log(URL);
        return URL;
    }


})
Template.profile.events({
    'click .removePost'() {
        if (confirm("Are You Sure"))
            Meteor.call('remove', this._id);
    },
    'click .image1'(){

        let imageId = this._id;
        let imageUId = this.userId;
        // console.log("show the id", this.userId);
        var input =  $(document.createElement("input"))

        input.attr("type", "file");
        input.attr("id", "profileImage");
        input.trigger("click");


        input.change(function () {

            //var fileName = $(this).val();
            var file = input.get(0).files[0];

            console.log(input.get(0).files[0]);
            // console.log("filename"+ input);

            if (file) {

                console.log("1");
                fsFile = new FS.File(file);
                console.log("2");
                ProfileImages.insert(fsFile, function(err, result){
                    console.log("3");
                    if (err) {
                         throw new Meteor.Error(err);
                    } else {

                        var imageLoc = '/cfs/files/ProfileImages/'+result._id;


                        console.log("4", imageLoc);
                        console.log("5", this._id);

                        if(UserImages.find({}).fetch().length && Meteor.userId()== imageUId) {

                                console.log("secondTime", imageLoc);

                                UserImages.update({_id: imageId}, {$set: {image: imageLoc}});

                        }
                        else{
                            UserImages.insert({
                                userId: Meteor.userId(),
                                username: Meteor.user().username,
                                image: imageLoc,
                            });

                        }
                        sweetAlert("Profile Update Successful!");

                        location.reload(true);


                    }
                });

            }
            else{
                console.log("Error on upload")
            }

        });
    }
})

