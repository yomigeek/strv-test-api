import {describe, it} from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

const should = chai.should();

chai.use(chaiHttp);

// Test add contact API/functions
describe("User Add Contact API Tests", () => {
  it("should signup a user account on /api/v1/contact/add POST", (done) => {
    chai
      .request(app)
      .post("/api/v1/contact/add")
      .send({
        email: "yomi@example.com",
        password: "12345678",
        firstName: "yom",
        lastName: "ola",
        phone: "1234567",
        address: "Lagos",
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