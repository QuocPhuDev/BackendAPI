let isAuth = async function (req, res, next) {
    var _JWT = require('../common/_JWT');
    var _token = req.headers.authorization;
    if (_token) {
        try {
            var authData = await _JWT.check(_token);
            req.auth = authData;
            next();
        } catch (error) {
            return res.send({ code: 204, message: "Token is invalid", results: null });
        }
    } else {
        return res.send({ code: 403, message: "Please send token", results: null });
    }
}

module.exports = {
    isAuth: isAuth
}