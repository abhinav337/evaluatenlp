var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
//dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
const aylien = require('aylien_textapi');

//env variables
const dotenv = require('dotenv');
dotenv.config();

// Aylien
const textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

//instance decl
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

//APIs
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/evaluate', function(req, res) {

    console.log(`provided link: ${req.body.url}`);
    textapi.sentiment({url: req.body.url},

    (error, response) => {

        if(error === null) {
            res.send(response);

        } else {
            res.status(404).json({validation: 'Input was not an Url'});
        }

    })

})

//server start
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Server is running on port " + port);
});