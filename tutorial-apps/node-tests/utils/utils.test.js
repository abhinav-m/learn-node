//utils.test.js tells mocha to run files with .test.js name structure for testing purposes.
const utils = require("./utils");
const expect = require("expect");

describe("Utils", () => {
  //Tests behaviour (behaviour driven development.)

  //common syntax for testing method
  //describe blocks can be nested.
  describe("#add", () => {
    it("should add two numbers", () => {
      var res = utils.add(33, 11);
      expect(res)
        .toBe(44)
        .toBeA("number");
    });
  });

  it("should square a number", () => {
    var res = utils.square(7);
    expect(res)
      .toBe(49)
      .toBeA("number");
  });

  it("should set first name and last name", () => {
    let user = {
      age: 25,
      occupation: "engineer"
    };
    var res = utils.setName(user, "Abhinav mishra");
    expect(res).toInclude({
      firstName: "Abhinav",
      lastName: "mishra"
    });
  });

  // it("should expect some values", () => {
  //   //Deep equality check.
  //   expect({ name: "Abhinav" }).toEqual({ name: "Abhinav" });
  // });

  it("should async add two numbers", done => {
    utils.asyncAdd(4, 3, sum => {
      expect(sum)
        .toBe(7)
        .toBeA("number");
      done(); //For async tests, mocha needs a 'done' argument which is a callback function to be run when the tests have concluded.
    });
  });

  it("should async square a number", done => {
    utils.asyncSquare(4, square => {
      expect(square)
        .toBe(16)
        .toBeA("number");
      done();
    });
  });
});
