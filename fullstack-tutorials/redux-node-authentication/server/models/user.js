const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define our model.
const userSchema = new Schema({
  email:{type:String,unique:true,lowercase:true},  //primary key, always saved as lower case.
  password:String
});

//On save hook, encrypt password.
// Before saing a model, this is run.
userSchema.pre('save', function(next) {
  //user is an instance here, referred to as this.
  const user = this;

//generate a salt , run callback.
  bcrypt.genSalt(10 , function(err,salt){
    if(err) {return next(err);}

 //hash/encrypt password using salt.
 //Salt + plain password = salt+hashed password.
    bcrypt.hash(user.password,salt,null,function(err,hash) {
      if(err) {return next(err);}
      user.password = hash;
      //execute callback passed to function to go ahead with process.
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword,callback) {
  bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
    if(err) { return callback(err);}

    callback(null,isMatch);
  });
}

// Create the model class.
const ModelClass = mongoose.model('user', userSchema);

//Export the model.
module.exports = ModelClass;
