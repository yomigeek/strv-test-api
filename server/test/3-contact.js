import {describe, it} from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

const should = chai.should();

chai.use(chaiHttp);

let token;

// Test add contact API/functions
describe("User Add Contact API Tests", () => {
  it("should login a user account on /api/v1/auth/login POST", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "yomi@example.com",
        password: "12345678",
      })
      .end((err, res) => {
        token = res.body.data.token;
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.should.have.property("data");
        res.body.data.should.have.property("token");
        res.body.status.should.equal("success");
        done();
      });
  });
  it("should signup a user account on /api/v1/contact/add POST", (done) => {
    chai
      .request(app)
      .post("/api/v1/contact/add")
      .set("x-access-token", token)
      .send({
        firstName: "yom",
        lastName: "ola",
        phone: "123456709089",
        address: "Lagos, nigeria",
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.status.should.equal("success");
        done();
      });
  });
});
