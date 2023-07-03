"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 8000;
const PUBLIC_PATH = __dirname + '/../public';
const express = require('express');
const app = express();
const mongoUtil = require('./mongo_util');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

mongoUtil.connect();

app.use(express.static(PUBLIC_PATH));

app.get('/dances', (request, response) => {
  const dances = mongoUtil.dances().find();
  const danceArray = dances.toArray((err, docs) => {
    const danceNames = docs.map(dance => dance.name);
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

app.post('/dances/:name/competitions', jsonParser, (request, response) => {
  const danceName = request.params.name;
  const competition = request.body.competition || {};

  const query = { name: danceName }
  const dances = mongoUtil.dances();
  const update = { $push: { competitions: competition } };

  dances.findOneAndUpdate(query, update, (err, res) => {
    if(err) {
      response.sendStatus(400);
    }
    console.log('Response', response);
    response.sendStatus(201);
  });
});

app.listen(PORT, () => console.log('Listening on', PORT));
