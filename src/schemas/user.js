import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  terms_privacy: Joi.boolean().valid(true).required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*\\d)[a-zA-Z0-9!@#$%^&*]{6,30}$"))
    .required(),
});

export default userSchema;
