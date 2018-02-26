const Authentication = require('./controllers/authentication');
const passPortService = require('./services/passport');
const passport = require('passport');

//To not allow cookie based session , session:false.
//this middleware will be used to authenticate using jwt.
const requireAuth = passport.authenticate('jwt',{session:false});
//this middleware will be used to authenticate using local email and password.
const requireSignin = passport.authenticate('local',{session:false});

module.exports = function(app) {
  app.get('/',requireAuth,function(req,res){
    res.send({message :'Super secret code is abc123'});
  });

  app.post('/signup', Authentication.signup);

  //requiresignin is our middleware here. to authenticate on route /signin.
  app.post('/signin',requireSignin,Authentication.signin);
}
