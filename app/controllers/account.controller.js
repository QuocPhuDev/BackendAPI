var Account = require('../models/account.model')
var JWT = require('../common/_JWT')

// Khỏi tạo controller lấy dữ liệu danh sách
exports.get_list = function (req, res) {
    Account.get_all(function (response) {
        if (response) {
            res.send({ code: 200, message: "Success", results: response });
        } else {
            res.send({ code: 204, message: "Data not found", results: null });
        }
    });
}

// Khởi tạo controller lấy dữ liệu details
exports.details = function (req, res) {
    Account.getById(req.params.id, function (response) {
        if (response) {
            res.send({ code: 200, message: "Success", results: response });
        } else {
            res.send({ code: 204, message: "User not found", results: null });
        }
    });
}

// Phương thức add new
exports.add_account = function (req, res) {
    // Lấy data từ request
    var data = req.body;
    // Phương thức thêm mới từ model
    Account.create(data, function (response) {
        if (response) {
            res.send({ code: 200, message: "Success", results: response });
        } else {
            res.send({ code: 403, message: "Can't add account", results: null });
        }
    });
}

// Phương thức update
exports.update_account = function (req, res) {
    // Lấy data từ request
    var data = req.body;
    // Phương thức update từ model
    Account.update(data, function (response) {
        if (response) {
            res.send({ code: 200, message: "Success", results: response });
        } else {
            res.send({ code: 403, message: "Can't update account", results: null });
        }
    });
}

// Phương thức delete
exports.remove_account = function (req, res) {
    var id = req.params.id;
    Account.remove(id, function (response) {
        if (response) {
            res.send({ code: 200, message: "Success", results: response });
        } else {
            res.send({ code: 403, message: "Can't delete account, account does not exist", results: null });
        }
    });
}