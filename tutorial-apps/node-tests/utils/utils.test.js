//utils.test.js tells mocha to run files with .test.js name structure for testing purposes.
const utils = require("./utils");
//Test behaviour (behaviour driven development.)
it("should add two numbers", () => {
  var res = utils.add(33, 11);
  if (res !== 44) throw new Error(`Expected 44, but got ${res}`);
});

it("should square a number", () => {
  var res = utils.square(7);
  if (res !== 49) throw new Error(`Expected 49, but got ${res}`);
});
