import {describe, it} from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

const should = chai.should();

chai.use(chaiHttp);

// Test user signup API/functions
describe("User SignUp API Tests", () => {
  it("should signup a user account on /api/v1/auth/signup POST", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        email: "yomi@example.com",
        password: "12345678",
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.should.have.property("data");
        res.body.data.should.have.property("token");
        res.body.status.should.equal("success");
        done();
      });
  });

  it("should not signup a if user account exist with the email on /api/v1/auth/signup POST", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        email: "yomi@example.com",
        password: "12345678",
      })
      .end((err, res) => {
        res.should.have.status(409);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.status.should.equal("error");
        done();
      });
  });

  it("should return fail on empty email on /api/v1/auth/signup POST", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        email: " ",
        password: "123456",
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.status.should.equal("error");
        done();
      });
  });

  it("should return fail on empty password on /api/v1/auth/signup POST", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        email: "yomi@gmail.com",
        password: " ",
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.status.should.equal("error");
        done();
      });
  });

  it("should return fail on bad email format on /api/v1/auth/signup POST", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        email: "yomi@",
        password: "123456",
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.should.have.property("message");
        res.body.status.should.equal("error");
        done();
      });
  });
});
