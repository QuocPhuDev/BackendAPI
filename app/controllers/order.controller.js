var Order = require('../models/order.model')

// Khỏi tạo controller lấy dữ liệu danh sách
exports.get_list = function (req, res) {
    Order.get_all(function (response) {
        if (response) {
            res.send({ code: 200, message: "Success", results: response });
        } else {
            res.send({ code: 204, message: "Data not found", results: null });
        }
    });
}

// Khởi tạo controller lấy dữ liệu details
exports.byid = function (req, res) {
    Order.getById(req.params.id,function (response) {
        if (response) {
            res.send({ code: 200, message: "Success", results: response });
        } else {
            res.send({ code: 204, message: "Data not found", results: null });
        }
    });
}

exports.getByUserId = function (req, res) {
    Order.getByUserId(req.params.id, function (response) {
        if (response) {
            res.send({ code: 200, message: "Success", results: response });
        } else {
            res.send({ code: 204, message: "Data not found", results: null });
        }
    });
}

// Khởi tạo controller lấy dữ liệu details
exports.details = function (req, res) {
    Order.getDetails(req.params.id, function (response) {
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
    Order.create(data, function (response) {
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
    Order.update(data, function (response) {
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
    Order.remove(id, function (response) {
        if (response) {
            res.send({ code: 200, message: "Success", results: response });
        } else {
            res.send({ code: 403, message: "Can't delete data", results: null });
        }
    });
}
