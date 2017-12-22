Router.onBeforeAction(function() {

        this.next();

});

Router.configure({
    layoutTemplate: 'main_layout'
});

Router.map(function() {
    // Jokes
    this.route('page1', {
        path: '/',
        template: 'page1'
    });
    this.route('signUp', {
        path: '/signUp',
        template: 'signUp'
    });

    this.route('jokes', {
        path: '/jokes',
        template: 'jokes'
    });
    this.route('profile', {
        path: '/profile',
        template: 'profile'
    });
    this.route('login', {
        path: '/login',
        template: 'login'
    });
    this.route('form', {
        path: '/form',
        template: 'form'
    });
});

