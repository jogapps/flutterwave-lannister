const { errorData } = require("../utils/response/error");
const { FCS } = require("../models");
const { successMessage } = require("../utils/response/success");


exports.addFeeSpec = (req, res) => {
    const { FeeConfigurationSpec } = req.body;
    let feesArray = `${FeeConfigurationSpec}`.replaceAll("\\n", "\n").split("\n");
    let fees = [];
    for (let i = 0; i < feesArray.length; i++) {
        let eachFees = feesArray[i].split("(").join(" ").split(")").join(" ").split(" ");
        let fee = {
            fee_id: eachFees[0],
            fee_currency: eachFees[1],
            fee_locale: eachFees[2],
            fee_entity: eachFees[3],
            entity_property: eachFees[4],
            fee_type: eachFees[8],
            fee_value: eachFees[9],
        }
        fees.push(fee);
    }
    FCS.destroy({where: {}})
        .then(destroyedPrevious => {
            FCS.bulkCreate(fees)
                .then(created => successMessage(res))
                .catch(error => errorData(res, `${error.message}`));
        })
        .catch(error => errorData(res, `${error.message}`));
}