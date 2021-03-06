'use strict';
/**
 * API Server Module - Authentication
 * @module src/middleware/auth
 */

const User = require('../model/user');

module.exports = (capability) => {

  return (request, response, next) => {

    try {
      let [authType, authString] = request.headers.authorization.split(/\s+/);

      switch (authType.toLowerCase()) {
      case 'basic':
        return _authBasic(authString);
      case 'bearer':
        return _authBearer(authString);
      default:
        return _authError();
      }

    } catch (error) {
      _authError(error);
    }

    /**
     * Function parses basic authentication
     * @method _authBasic
     * @param authString
     * @returns {Promise}
     */
    function _authBasic(authString) {
      let base64Buffer = Buffer.from(authString, 'base64');
      let bufferString = base64Buffer.toString();
      let [username, password] = bufferString.split(':');
      let auth = { username, password };

      return User.authenticateBasic(auth)
        .then(user => _authenticate(user))
        .catch(_authError);
    }

    /**
     * Function sends the authString to be authenticated, if a token
     * @method _authBearer
     * @param authString
     * @returns {Promise}
     */
    function _authBearer(authString) {
      return User.authenticateToken(authString)
        .then(user => _authenticate(user))
        .catch(_authError);
    }

    /**
     * Function assigns the user and token
     * @method _authenticate
     * @param user
     */
    function _authenticate(user) {
      if (user && (!capability || (user.can(capability)))) {
        request.user = user;
        request.token = user.generateToken();
        next();
      }
      else {
        _authError();
      }
    }

    /**
     * Function throws an error if the user ID or password is invalid
     * @private
     */
    function _authError() {
      next('Invalid User ID/Password');
    }
  };
};
