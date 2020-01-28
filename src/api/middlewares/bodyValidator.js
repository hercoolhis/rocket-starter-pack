const { check } = require("express-validator"),
{ validationResult } = require("express-validator");

const validationRules = () => {
    return [
        check('name').exists().isLength({min: 5}).trim().escape().withMessage('Name must have more than 5 characters'),
        check('email').not().isEmpty().isEmail().withMessage('your email is not valid'),
        check('password').not().isEmpty().isLength({ min: 6 }).withMessage("password must be at least 6 characters")
    ]
}

const validateRequestWithRules = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
  }

module.exports = {
    validationRules,
    validateRequestWithRules
}