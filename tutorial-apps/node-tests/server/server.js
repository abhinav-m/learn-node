const express = require("express");

var app = express();

app.get("/", (req, res) => {
  res.send({ error: "page not found", name: "App v1.0" });
});

app.get("/users", (req, res) => {
  var users = [
    { name: "Abhinav", age: 25 },
    { name: "Dhruv", age: 25 },
    { name: "Akash", age: 25 }
  ];
  res.send(users);
});

app.listen(3000);

module.exports.app = app;
