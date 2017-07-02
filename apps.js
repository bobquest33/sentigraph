// apps.js
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

const index = require('./controllers/index');

const port = 80;
const debug = false;


// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');

// use res.render to load up an ejs view file
app.get('/', index.main);
app.get('/api', index.api);
app.post('/store-sentences', index.store_sentences);
app.post('/store-hashtags', index.store_hashtags);

if(debug){
    port = 8000;
    console.log("Running in debug mode");
}
else
{
    console.log("Running in normal mode");

    var privateKey  = fs.readFileSync('../certs/key.pem', 'utf8');
    var certificate = fs.readFileSync('../certs/cert.pem', 'utf8');
    var credentials = {key: privateKey, cert: certificate};
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(443);
}

app.listen(port);


