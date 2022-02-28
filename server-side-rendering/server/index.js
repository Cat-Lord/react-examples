// plain javascript
// const express = require('express');

// test es6 syntax within babel-node server
import express from 'express'
import { readFileSync } from 'fs';

const app = new express();

app.use(express.static("dist"));

app.get("/", async (_request, response) => {
  
  // load file statically and send it to the client.
  const index = readFileSync(`public/index.html`, `utf8`);

  response.send(index);

});

const port = 3000;
app.listen(port);

console.log(`Server listening on port ${port}`);