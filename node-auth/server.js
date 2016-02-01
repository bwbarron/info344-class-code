'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

var ghConfig = require('./secret/oauth-github.json');
ghConfig.callbackURL = 'http://localhost:8080/signin/github/callback';

var ghStrategy = new GithubStrategy(
    ghConfig,
    function (accessToken, refreshToken, profile, done) {
        console.log('authentication successful');
        console.dir(profile);
        done(null, profile);
    }
);

var cookieSigSecret = process.env.COOKIE_SIG_SECRET;
if (!cookieSigSecret) {
    console.error('please set COOKIE_SET_SECRET');
    process.exit(1);
}

passport.use(ghStrategy);
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session({
    secret: cookieSigSecret,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore()
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/signin/github', passport.authenticate('github'));
app.get(
    '/signin/github/callback',
    passport.authenticate('github'),
    function (req, res) {
        res.redirect('/secure.html');
    }
);

app.get('/signout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.use(express.static(__dirname + '/static/public'));
app.use(function (req, res, next) {
    // check if user is authenticated before giving access to /secure
    // use req.isAuthenticated()
    next();
});
app.use(express.static(__dirname + '/static/secure'));

app.listen(80, function () {
    console.log('server is listening');
});