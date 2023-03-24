const { checkSchema } = require('express-validator');

module.exports = checkSchema({
  username: {
    isEmpty: false,
    isAlphanumeric: true,
    errorMessage: 'Username missing or not alphanumeric'
  },
  name: {
    isEmpty: false
  },
  password: {
    isEmpty: false,
    isStrongPassword: true,
    errorMessage: 'Password not strong enough',
  },
  email: {
    isEmail: true
  }
});