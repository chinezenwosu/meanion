"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 8000;
const PUBLIC_PATH = __dirname + '/../public';
const express = require('express');
const app = express();

app.use(express.static(PUBLIC_PATH));

app.get('*', (request, response) => {
    response.sendFile(PUBLIC_PATH)
});

app.listen(PORT, () => console.log('Listening on', PORT));
