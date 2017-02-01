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
  let dances = mongoUtil.dances().find();
  let danceArray = dances.toArray((err, docs) => {
    let danceNames = docs.map(dance => dance.name);
    response.json(danceNames);
  });
});

app.get('/dances/:name', (request, response) => {
  let dance = mongoUtil.dances().find({name: request.params.name}).limit(1).next((err, doc) => {
    if(err) {
      response.sendStatus(400);
    }
    console.log('Dance document: ', doc);
    response.json(doc);
  });
});

app.get('*', (request, response) => {
   response.sendFile(PUBLIC_PATH)
});

app.listen(PORT, () => console.log('Listening on', PORT));
