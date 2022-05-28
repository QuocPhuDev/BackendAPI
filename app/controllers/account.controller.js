var Account = require('../models/account.model')

// Khỏi tạo controller lấy dữ liệu danh sách
exports.get_list = function (req, res) {
    Account.get_all(function (data) {
        res.send({ msCode: 200, results: data });
    });
}

// Khởi tạo controller lấy dữ liệu details
exports.details = function (req, res) {
    Account.getById(req.params.id, function (data) {
        res.send({ result: data });
    });
}

// Phương thức add new
exports.add_account = function (req, res) {
    // Lấy data từ request
    var data = req.body;
    // Phương thức thêm mới từ model
    Account.create(data, function (response) {
        res.send({ result: response });
    });
}

// Phương thức update
exports.update_account = function (req, res) {
    // Lấy data từ request
    var data = req.body;
    // Phương thức update từ model
    Account.update(data, function (response) {
        res.send({ result: response });
    });
}

// Phương thức delete
exports.remove_account = function (req, res) {
    var id = req.params.id;
    Account.remove(id, function (response) {
        res.send({ result: response });
    });
}