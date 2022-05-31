const jwt = require('jsonwebtoken');
const _APP = require('./_APP')

// Tạo mã token
let make = function (user) {
    return new Promise(function (resolve, reject) {
        jwt.sign(
            { data: user },
            _APP.ACCESS_TOKEN,
            {
                algorithm: "HS256",
                expiresIn: _APP.TOKEN_TIME_LIFE,
            },
            function (err, _token) {
                if (err) {
                    return reject(err);
                }
                return resolve(_token);
            });
    });
};

// Kiểm tra xác thực: đúng, sai, hết hạn
let check = function (token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, _APP.ACCESS_TOKEN, function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
};


module.exports = {
    make: make,
    check: check
}