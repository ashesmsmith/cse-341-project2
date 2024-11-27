const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const mongodb = require('./data/database');
const routes = require('./routes/index');

const app = express();

app.use(bodyParser.json());

app.use(
    session({
        // express session initialization
        secret: 'secret', // name of cookie 'secret'
        resave: false,
        saveUninitialized: true
    })
);

app.use(passport.initialize()); // init passport on every route call

app.use(passport.session()); // allow passport to use express-session

app.use((req, res, next) => {
    res.setHeader('Allow-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-Width, Content-Type, Accept, z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }));

app.use(cors({ origin: '*' }));

app.use('/', routes);

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL
        },
        function (accessToken, refreshToken, profile, done) {
            //User.findOrCreate({ githubId: profile.id}, function(err, user) {
            return done(null, profile);
            //});
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {
    res.send(
        req.session.user !== undefined
            ? `Logged in as ${req.session.user.displayName}`
            : 'Logged Out'
    );
});

app.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/api-docs',
        session: false
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

/* ***************
 * ERROR HANDLING
 *************** */
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

/* ***************
 * LOCAL SERVER & DATABASE INFORMATION
 *************** */
const port = process.env.PORT || 8080;

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node running on port: ${port}`);
        });
    }
});
