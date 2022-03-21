let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../../../../app");

// Assertion Style
chai.should();
chai.use(chaiHttp);


describe("Fee Computation API", () => {

    describe("post /compute-transaction-fee", () => {
        
        it("It should fail if required body parameters is not supplied", (done) => {
            chai.request(app)
                .post("/compute-transaction-fee")
                .end((err, response) => {
                    if (err) done(err);
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    response.body.status.should.equal("error");
                    done();
                });
        });
        
        it("It should return status 200 with correct calculations if a specification is applied.", (done) => {
            let requestBody = {
                ID: 91203,
                Amount: 5000,
                Currency: "NGN",
                CurrencyCountry: "NG",
                Customer: {
                    ID: 2211232,
                    EmailAddress: "anonimized29900@anon.io",
                    FullName: "Abel Eden",
                    BearsFee: true
                },
                PaymentEntity: {
                    ID: 2203454,
                    Issuer: "GTBANK",
                    Brand: "MASTERCARD",
                    Number: "530191******2903",
                    SixID: 530191,
                    Type: "CREDIT-CARD",
                    Country: "NG"
                }
            };
            
            chai.request(app)
                .post("/compute-transaction-fee")
                .send(requestBody)
                .end((err, response) => {
                    if (err) done(err);
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.AppliedFeeID.should.equal("LNPY1223");
                    response.body.AppliedFeeValue.should.equal(120);
                    response.body.ChargeAmount.should.equal(5120);
                    response.body.SettlementAmount.should.equal(5000);
                    done();
                })
        });

        it("It should return status 500 with error message if a specification is not applied.", (done) => {
            let requestBody = {
                ID: 91204,
                Amount: 3500,
                Currency: "USD",
                CurrencyCountry: "US",
                Customer: {
                    ID: 4211232,
                    EmailAddress: "anonimized292200@anon.io",
                    FullName: "Wenthorth Scoffield",
                    BearsFee: false
                },
                PaymentEntity: {
                    ID: 2203454,
                    Issuer: "WINTERFELLWALLETS",
                    Brand: "",
                    Number: "AX0923******0293",
                    SixID: "AX0923",
                    Type: "WALLET-ID",
                    Country: "NG"
                }
            };
            chai.request(app)
                .post("/compute-transaction-fee")
                .send(requestBody)
                .end((err, response) => {
                    if (err) done(err);
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    done();
                })
        });
    })
});

