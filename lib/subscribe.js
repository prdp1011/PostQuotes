if (Meteor.isClient) {

    Meteor.subscribe('Users');
    Meteor.subscribe('jokesPub');
    Meteor.subscribe('ProfileImages');
    Meteor.subscribe('UserImages');

}