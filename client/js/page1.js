
Session.setDefault("showCreatePost", false);
Template.page1.rendered = function(){


}
Template.page1.onCreated(function(){

    this.shwTxtArea = new ReactiveVar(false);
});

Template.page1.helpers({
    showCreatePost(){
      return Session.get('showCreatePost')
    },
    jokesList(){
        console.log(Jokes.find().fetch());
        return Jokes.find({}, {sort: {createdAt: -1}});
    },
    chkText(){
        let chk = Template.instance().shwTxtArea.get();
        return chk;
    },
    owner(){
        return Meteor.userId()===this.userId;
    },
    imageFind(){
        
        let URL = UserImages.findOne({username: this.username});

        return URL;

    },
    imageprofileFind(){
         
        let URL = UserImages.findOne({username: this.author});

        return URL;

    }

});

Template.page1.events({
    "click #createPost": function(event){

        Session.set("showCreatePost", !Session.get('showCreatePost'));

    },
    "click .btn-register"(){
            

    },

    "submit #joke"(event){
        event.preventDefault();

        let title = event.target.title.value;
        let brief = event.target.brief.value;
        // console.log(data.title);
        Meteor.call('insertJoke', title,  brief);
        event.target.title.value="";
        event.target.brief.value="";

    },
    "submit .cmtSubmit"(event){
        event.preventDefault();



        let cmttext = event.target.cmttext.value;

        event.target.cmttext.value="";
        let username = Meteor.user().username;
        let userId = Meteor.userId();

        Meteor.call("cmttextAdd", this._id, cmttext, username, userId)


    },
    "click .closeJoke"(){

        Session.set("showCreatePost", !Session.get('showCreatePost'));
    },
    'click .cmtClick'(event, template){


        // console.log(curr)

         template.shwTxtArea.set(!template.shwTxtArea.get());
        var id = ".s"+this._id;
        var slideId =id;

        $(slideId).slideToggle();

    },

    'click .likeClick'(){

        var thisUser = Meteor.userId();
        var thisJoke = Jokes.findOne({_id: this._id})._id;
        var jokeAuthor = Jokes.findOne({_id: this._id}).userId;
        var Name = Meteor.user().username;
        var thisJokesVotes = Jokes.findOne({_id: this._id}, {voted: {$in: Name}}).voted;

        if (thisJokesVotes.indexOf(Name) > -1) {
            sweetAlert("Can't More than one ");
            // In the array!, meaning user has voted
        } else {

            Meteor.call("countVote", thisJoke, Name);
            Meteor.call("likeCount", thisJoke);
            Meteor.call("userlikeCount", jokeAuthor);


        }

        if (Name == thisJokesVotes) {
            sweetAlert("Can't voted own post");
        }


    },
    'click .dislikesClick'(){
        var thisUser = Meteor.userId();
        var thisJoke = Jokes.findOne({_id: this._id})._id;
        var jokeAuthor = Jokes.findOne({_id: this._id}).userId;
        var Name = Meteor.user().username;
        var thisJokesVotes = Jokes.findOne({_id: this._id}, {voted: {$in: Name}}).voted;

        if (thisJokesVotes.indexOf(Name) > -1) {
            sweetAlert("Can't More than one ");
            // In the array!, meaning user has voted
        } else {

            Meteor.call("countVote", thisJoke, Name);
            Meteor.call("dislikeCount", thisJoke);
            Meteor.call('userUnlikeCount' , jokeAuthor);

        }

        if (Name == thisJokesVotes) {
            sweetAlert("Can't voted own post");
        }




    },
    'click .loveClick'(){

        var thisUser = Meteor.userId();
        var thisJoke = Jokes.findOne({_id: this._id})._id;
        var jokeAuthor = Jokes.findOne({_id: this._id}).userId;
        var Name = Meteor.user().username;
        var thisJokesVotes = Jokes.findOne({_id: this._id}, {voted: {$in: Name}}).voted;

        if (thisJokesVotes.indexOf(Name) > -1) {
            sweetAlert("Can't More than one ");
            // In the array!, meaning user has voted
        } else {

            Meteor.call("countVote", thisJoke, Name);
             Meteor.call("loveCount", thisJoke);
            Meteor.call('userloveCount' , jokeAuthor);

        }

        if (Name == thisJokesVotes) {
            sweetAlert("Can't voted own post");
        }




    },

    'click .cmtlikeClick'(){



         let currentJoke = Jokes.findOne({_id:this.jokeId}).cmt;



        console.log("cccc",currentJoke);

        var clickId = this._id;
        var jokeId=this.jokeId;
        var username=Meteor.user().username;
        console.log("UserName ofMeteor", username)

        currentJoke.forEach(function(chk){
            console.log(chk.jokeId ,clickId)

            if(chk._id == clickId){

                console.log(chk.likeVisited);
                if(chk.likeVisited.indexOf(username)>-1){

                    sweetAlert("Can't More than one");
                }
                else{
                    Meteor.call('cmtlikeCount', clickId, jokeId, username);
                }
            }
        })



    }
});
