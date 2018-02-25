const User = require('../models/user')


exports.signup = function(req,res,next) {
  //Check if user with email exists.
const email = req.body.email;
const password = req.body.password;
//If a user with email doesn't exist, return error.
User.findOne({email: email}, function(err,existingUser){

})


  //If a user with emmail doesn't exist, create and save user record.


  //Respond to request.
  res.send({success: 'true'});
}
