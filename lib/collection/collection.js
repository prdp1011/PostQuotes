
Jokes = new Mongo.Collection("jokes");
Comments = new Mongo.Collection("comments");


ProfileImages = new FS.Collection("ProfileImages", {
    stores: [new FS.Store.GridFS("ProfileImages")]
});

ProfileImages.allow({
    insert: function(userId, doc){
        return true;
    },
    update: function(userId, doc, fields, modifier){
        return true;
    },
    download: function(){
        return true;
    }
});

UserImages = new Mongo.Collection("UserImages");
shareImages = new Mongo.Collection("shareImages");

UserImages.allow({
    insert: function(){
        return true;
    },
    update: function(userId, doc, fields, modifier){
        return true;
    }
});
//
// Jokes.allow({
//     insert:function (userId, doc) {
//         console.log(doc);
//         return !! userId;
//     }
// })
//
Schemas = new SimpleSchema({
    UserName: {
        type: String,
        label: "Username"
    },
    Email: {
        type: String,
        label: "Email"
    },
    password: {
        type: String,
        label: "Password"
    },
    rePassword: {
        type: String,
        label: "Re-Password",
    },
    createdAt:{
        type: Date,
        label:"createdAt",
        autoValue: function () {
            return new Date()
        },
        autoform:{
          type:"hidden"
        }


    },

    favoriteColor: {
        type: String,
        allowedValues: ['red', 'green', 'blue'],
        autoform: {
            options: {
                red: "Red",
                green: "Green",
                blue: "Blue"
            }
        }
    }

});

Comments.attachSchema(Schemas);
//

