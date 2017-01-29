"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 8000;
const PUBLIC_PATH = __dirname + '/../public';
const express = require('express');
const app = express();
let mongoUtil = require('./mongo_util');

mongoUtil.connect();

app.use(express.static(PUBLIC_PATH));

app.get('/dances', (request, response) => {
    dances = mongoUtil.dances().find();
    danceArray = dances.toArray((err, docs) => {
        let danceNames = docs.map(dance => dance.name);
        response.json(danceNames);
    });
});

app.get('*', (request, response) => {
    response.sendFile(PUBLIC_PATH)
});

app.listen(PORT, () => console.log('Listening on', PORT));
