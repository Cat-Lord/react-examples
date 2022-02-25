const express = require('express');

const app = new express();

app.get("/", (_request, response) => {
  response.send("<h1>Cats are love !</h1>");
});

const port = 3000;
app.listen(port);

console.log(`Server listening on port ${port}`);