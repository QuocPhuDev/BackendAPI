var Account = require('../models/account.model')
var JWT = require('../common/_JWT')

// Phương thức đăng nhập
exports.login = function (req, res) {
    // Lấy data từ request
    var data = req.body;
    Account.check_login(data, async function (response) {
        if (response) {
            const _token = await JWT.make(response);
            res.send({ code: 200, message: "Success", results: _token });
        } else {
            res.send({ code: 404, message: "User or password incorrect", results: null });
        }
    });
}