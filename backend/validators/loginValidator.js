const { checkSchema } = require('express-validator');

module.exports = checkSchema({
  password: {
    isEmpty: false,
    isStrongPassword: true,
    errorMessage: 'Password not strong enough',
  },
  email: {
    isEmail: true
  }
});