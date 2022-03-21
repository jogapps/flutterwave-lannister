const joi = require("joi");
const { errorData } = require("../response/error");


exports.computeSpecMiddleware = async (req, res, next) => {

    const computeSpecSchema = joi.object({
        ID: joi.required(),
        Amount: joi.number().required(),
        Currency : joi.string(),
        CurrencyCountry: joi.string().required(),
        Customer: joi.object({ 
            ID: joi.required(), 
            EmailAddress: joi.string().email().required(),
            FullName: joi.string().required(),
            BearsFee: joi.boolean().required(),
        }),
        PaymentEntity: joi.object({
            ID: joi.required(),
           Issuer: joi.string(),
            Brand: joi.string(),
            Number: joi.string(),
            SixID: joi.number(),
            Type: joi.string(),
            Country: joi.string().required()
        })
    });

    const payload = {
        ID: req.body.ID,
        Amount: req.body.Amount,
        Currency: req.body.Currency,
        CurrencyCountry: req.body.CurrencyCountry,
        Customer: req.body.Customer,
        PaymentEntity: req.body.PaymentEntity
    };

    const { error } = computeSpecSchema.validate(payload);
    if (error) {
        return errorData(res, `${error.message}`);
    } else {
        next();
    }
};