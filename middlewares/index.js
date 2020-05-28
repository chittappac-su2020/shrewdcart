const authJwt = require('../middlewares/authJwt.js');
const verifySignUp = require('../middlewares/verifySignUp');

module.exports = {
    authJwt,
    verifySignUp
};