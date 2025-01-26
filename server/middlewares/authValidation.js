const Joi = require("joi");

const emailValidation = Joi.string().email().required().messages({
  "string.empty": "Email is required.",
  "string.email": "Invalid email format.",
});

const passwordValidation = Joi.string()
  .min(4)
  .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{4,}$"))
  .required()
  .messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 4 characters long.",
    "string.pattern.base": "Password must contain both letters and numbers.",
  });

const signupValidationSchema = Joi.object({
  name: Joi.string().min(4).required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 4 characters long.",
  }),
  email: emailValidation,
  password: passwordValidation,
});

const loginValidationSchema = Joi.object({
  email: emailValidation,
  password: passwordValidation,
});

const validateUserInput = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({message: 'Bad request', error})
  }
  next();
};

module.exports = {
  validateSignup: validateUserInput(signupValidationSchema),
  validateLogin: validateUserInput(loginValidationSchema),
};

