let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../../../../app");

// Assertion Style
chai.should();
chai.use(chaiHttp);


describe("Add Fee Specification API", () => {

    describe("post /fees", () => {
        it("It should fail if FeeConfigurationSpec required body parameter is not supplied", (done) => {
            chai.request(app)
                .post("/fees")
                .end((err, response) => {
                    if (err) done(err);
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    response.body.status.should.equal("error");
                    done();
                });
        });
        it("It should return ok if FeeConfigurationSpec processed and added spec successfully", (done) => {
            let requestBody = {
                FeeConfigurationSpec: "LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55"
            };
            chai.request(app)
                .post("/fees")
                .send(requestBody)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.status.should.equal("ok");
                    done();
                })
        });
    })
});

