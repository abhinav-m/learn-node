const expect = require("expect");
const rewire = require("rewire");

//Make rewired version of app.
var app = rewire("./app");

describe("App", () => {
  //Create new db object with saveUser function as spy.
  var db = {
    saveUser: expect.createSpy()
  };
  //Set spy object in rewired app.
  app.__set__("db", db);

  it("should call the spy correctly", () => {
    var spy = expect.createSpy();
    spy("Abhinav", 25);
    expect(spy).toHaveBeenCalledWith("Abhinav", 25);
  });

  it("should call saveUser with user object", () => {
    var email = "abhinav_m@hhh.com",
      password = "123abc";
    //use rewired app with spy object inserted to call saveUser.
    app.handleSignup(email, password);
    //Use assertions on rewired function.
    expect(db.saveUser).toHaveBeenCalledWith({ email, password });
  });
});
