const Joi = require("joi");

const validateUser = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    
    return schema.validate(data);
};

module.exports = validateUser;
