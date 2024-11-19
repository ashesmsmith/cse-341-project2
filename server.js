const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Allow-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-Width, Content-Type, Accept, z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', routes);

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
