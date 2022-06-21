var Tour = require('../models/tour.model')

// Khỏi tạo controller lấy dữ liệu danh sách
exports.get_list = function (req, res) {
    Tour.get_all(req.params.limit, function (response) {
        if (response) {
            res.send({ code: 200, message: "Success", results: response });
        } else {
            res.send({ code: 204, message: "Data not found", results: null });
        }
    });
}

// Khởi tạo controller lấy dữ liệu details
exports.details = function (req, res) {
    Tour.getById(req.params.id, function (response) {
        if (response) {
            res.send({ code: 200, message: "Success", results: response });
        } else {
            res.send({ code: 204, message: "Data not found", results: null });
        }
    });
}

exports.bystatus = function (req, res) {
    Tour.getByStatus(req.params.id, function (response) {
        if (response) {
            res.send({ code: 200, message: "Success", results: response });
        } else {
            res.send({ code: 204, message: "Data not found", results: null });
        }
    });
}

// Phương thức add new
exports.add = function (req, res) {
    // Lấy data từ request
    var data = req.body;
    // Phương thức thêm mới từ model
    Tour.create(data, function (response) {
        if (response) {
            res.send({ code: 200, message: "Success", results: response });
        } else {
            res.send({ code: 403, message: "Can't add data", results: null });
        }
    });
}

// Phương thức update
exports.update = function (req, res) {
    // Lấy data từ request
    var data = req.body;
    // Phương thức update từ model
    Tour.update(data, function (response) {
        if (response) {
            res.send({ code: 200, message: "Success", results: response });
        } else {
            res.send({ code: 403, message: "Can't update data", results: null });
        }
    });
}

// Phương thức delete
exports.remove = function (req, res) {
    var id = req.params.id;
    Tour.remove(id, function (response) {
        if (response) {
            res.send({ code: 200, message: "Success", results: response });
        } else {
            res.send({ code: 403, message: "Can't delete data", results: null });
        }
    });
}
