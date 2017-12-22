if (Meteor.isServer) {
    Meteor.methods({

        insertJoke: function(jokeName, jokePost) {
            console.log("djhfld;lfk;ld");
            if(!Meteor.userId()) {
                throw new Meteor.Error('not authorized');
                return false;
            } else {

                var username = Meteor.user().username;
                var year = new Date().getFullYear();
                var month = new Date().getMonth() + 1;
                var day = new Date().getDate();
                var date = (month + "/" + day + "/" + year).toString();

                Jokes.insert({
                    jokeName: jokeName,
                    jokePost: jokePost,
                    author: username,
                    date: date,
                    createdAt: new Date(),
                    likeScore: 0,
                    dislikeScore: 0,
                    loveScore: 0,
                    voted: [username],
                    userId: Meteor.userId(),
                });
            }
        },
        remove:function(id){

                Jokes.remove({_id:id});
        },
        dislikeCount:function(id){

            Jokes.update(id,  { $inc: { dislikeScore: +1} });
        },
        likeCount:function(id){

            Jokes.update(id,  { $inc: { likeScore: +1} });
        },

        countVote:function (thisJoke, Name) {

                if(!Meteor.userId()) {
                    throw new Meteor.Error('not authorized');
                    this.stop();
                    return false;
                } else {
                    Jokes.update(thisJoke, { $addToSet: { voted: Name}});
                }
            },
        loveCount: function(jokeAuthor) {
            if(!Meteor.userId()) {
                throw new Meteor.Error('not authorized');
                this.stop();
                return false;
            } else {
                Jokes.update(jokeAuthor, { $inc: {loveScore: +1}});
            }
        },

        cmttextAdd:function (id, cmt, username, userId) {

            var today = new Date();
            var time = ((today.getHours() < 10)?"0":"") + ((today.getHours()>12)?(today.getHours()-12):today.getHours()) +":"+ ((today.getMinutes() < 10)?"0":"") + today.getMinutes()+" " + ((today.getHours()>12)?('PM'):'AM');

            let details ={cmt: cmt, username:username, userId:userId, time: time, likeVisited:[], likeCount:0, _id:Random.id(), jokeId:id};


            Jokes.update({_id:id}, {$push: {cmt: details }});
        },

        userlikeCount: function(jokeAuthor) {

            Meteor.users.update(jokeAuthor, { $inc: {'profile.likeScore': +1}});

        },
        userUnlikeCount: function(jokeAuthor) {

            Meteor.users.update(jokeAuthor, { $inc: {'profile.unlikeScore': +1}});

        },
        userloveCount: function(jokeAuthor) {

            Meteor.users.update(jokeAuthor, { $inc: {'profile.loveScore': +1}});

        },
        cmtlikeCount:function (id, jokeId,visitedUser) {

            Jokes.update( {_id:jokeId,'cmt._id' : id}, {$inc: {'cmt.$.likeCount': +1}});
            Jokes.update( {_id:jokeId,'cmt._id' : id}, {$addToSet: {'cmt.$.likeVisited': visitedUser}});

        }






    })
}