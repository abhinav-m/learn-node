const request = require("supertest");
const expect = require("expect");

var app = require("./server").app;

describe("Server", () => {
  describe("GET /", () => {
    it("should include the error response", done => {
      request(app)
        .get("/")
        .expect(200)
        .expect(res => {
          expect(res.body).toInclude({ error: "page not found" });
        })
        .end(done);
    });
  });

  describe("GET /users", () => {
    it("should return user object", done => {
      request(app)
        .get("/users")
        .expect(200)
        .expect(res => {
          expect(res.body).toInclude({ name: "Akash", age: 25 });
        })
        .end(done);
    });
  });
});
