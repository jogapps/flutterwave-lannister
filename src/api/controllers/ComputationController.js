const Sequelize = require("sequelize");
const { FCS } = require("../models");
const { errorMessage, errorData } = require("../utils/response/error");
const { successData } = require("../utils/response/success");
const Op = Sequelize.Op;

exports.compute = (req, res) => {
    let payload = req.body;
    
    FCS.findAll({
        where: {
            [Op.and]: [
                { fee_currency: payload.Currency },
                {
                    [Op.or]: [
                        { fee_locale: payload.CurrencyCountry === payload.PaymentEntity.Country ? "LOCL" : "INTL" },
                        { fee_locale: '*' },
                    ]
                },
                {
                    [Op.or]: [
                        { fee_entity: payload.PaymentEntity.Type },
                        { fee_entity: '*' },
                    ]
                },
                {
                    [Op.or]: [
                        { entity_property: payload.PaymentEntity.Brand },
                        { entity_property: payload.PaymentEntity.Issuer },
                        { entity_property: '*' },
                    ]
                }
            ]
        }
    })
        .then(specifications => {
            if (specifications.length > 0) {
                specifications.forEach((spec, index) => {
                    if (spec.fee_locale != "*") specifications = [specifications[index]];
                    else if (spec.fee_entity != "*") specifications = [specifications[index]];
                    else if (spec.entity_property != "*") specifications = [specifications[index]];
                });

                let appliedSpec = specifications[0];
                let appliedFeeID = appliedSpec.fee_id;
                let appliedFeeValue;
                let chargeAmount;
                let settlementAmount;
                if (appliedSpec.fee_type == "FLAT")
                    appliedFeeValue = Math.round(Number(appliedSpec.fee_value));
                else if (appliedSpec.fee_type == "PERC")
                    appliedFeeValue = Math.round((Number(appliedSpec.fee_value) / 100) * payload.Amount);
                else {
                    const feeValues = appliedSpec.fee_value.split(":");
                    // appliedFeeValue = flat + perc 
                    appliedFeeValue = Math.round(parseFloat(feeValues[0]) + (parseFloat(feeValues[1] / 100)) * payload.Amount);
                }

                if (payload.Customer.BearsFee)
                    chargeAmount = payload.Amount + appliedFeeValue;
                else chargeAmount = payload.Amount;

                settlementAmount = chargeAmount - appliedFeeValue;
                successData(res, {
                    AppliedFeeID: appliedFeeID,
                    AppliedFeeValue: appliedFeeValue,
                    ChargeAmount: chargeAmount,
                    SettlementAmount: settlementAmount
                });
            } else {
                errorMessage(res, payload.Currency);
            }
        })
        .catch(error => errorData(res, `${error.message}`));
}