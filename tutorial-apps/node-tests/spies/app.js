var db = require("./db.js");

//Spies let us fake a function by swapping out a real function.
module.exports.handleSignup = (email, password) => {
  db.saveUser({ email, password });
};
