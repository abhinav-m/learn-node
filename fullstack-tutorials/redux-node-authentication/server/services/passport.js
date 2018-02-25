const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Passport is more of an ecosystem which has authentication helpers for all major sites.(including fb etc.) We use it's jwt feature here.
//Purpose of passport is to check ahead of time if user is authenticated with correct values in JWT token.
//Strategy is a method of authentication of user, can be multiple.


//Setup options for LocalStrategy (email and password.)
const localOptions = {usernameField:'email'};

const localLogin = new LocalStrategy(localOptions, function(email,password,done){
 //Verify email and password, call done if correct.
 //Otherwise call done with false.
 User.findOne({ email:email }, function(err,user){
   if(err) {return done(err);}

   if(!user) {return done(null,false);}

   //Compare passwords - is `password ` equal to user.password(encrypted);
   user.comparePassword(password,function(err,isMatch){

    if(err) {return done(err);}

    if(!isMatch) { return done(null,false);}

    return done(null,user);
   });
 });
});



//Setup options for JWT strategy.
//Where to look for the JWT token in request.('authorization' header in this case)
//The secret or key.
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//Create JWT strategy.
//payload -> decoded jwt token which we created earlier, done ->callback function called when we successfully authenticate or not.
const  jwtLogin = new JwtStrategy(jwtOptions,function(payload,done){
//See if user id in payload exists in our database
//If it does, call 'done' with that User
//otherwise, call without a user object.
User.findById(payload.sub,function(err,user){
if(err) {return done(err,false)};
if(user) {
  done(null,user);
} else {
  done(null,false);
}

});
});

passport.use(jwtLogin);
passport.use(localLogin);
//Tell passport to use this strategy.
