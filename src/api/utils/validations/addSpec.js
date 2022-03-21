const joi = require("joi");
const { errorData } = require("../response/error");


exports.addSpecMiddleware = async (req, res, next) => {

    const addSpecSchema = joi.object({
        FeeConfigurationSpec : joi.string().required(),
    });

    const payload = {
        FeeConfigurationSpec: req.body.FeeConfigurationSpec
    };

    const { error } = addSpecSchema.validate(payload);
    if (error) {
        return errorData(res, `${error.message}`);
    } else {
        next();
    }
};