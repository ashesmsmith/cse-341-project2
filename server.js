const express = require('express');
const bodyParser = require('body-parser');
const { auth, requiresAuth } = require('express-openid-connect');
const mongodb = require('./data/database');
const routes = require('./routes/index');
require('dotenv').config();

const app = express();
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

app
    .use(bodyParser.json())

    // auth router attaches /login, /logout, and /callback routes to the baseURL
    .use(auth(config))
    
    .use((req, res, next) => {
        res.setHeader('Allow-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-Width, Content-Type, Accept, z-Key'
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })

    .use('/', routes)

// Display user information if logged in
app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

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

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node running on port: ${port}`);
        });
    }
});
