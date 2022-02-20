const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

// parse application/json
app.use(bodyParser.json())

const oauth = require('./routes/oauth');
const user = require('./routes/user');

app.use('/oauth', oauth);
app.use('/user', user);

module.exports.handler = serverless(app);