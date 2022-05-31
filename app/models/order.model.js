const db = require('../database/connect');
const TBT = require('../database/table')

// Khởi tạo đối tượng
const Order = function (order) {
    this.oId = order.OID;
    this.userId = order.UserID;
    this.orderTime = order.OrderTime;
    this.totalAmount = order.TotalAmount;
    this.status = order.Status;
}

// Phương thức get all
Order.get_all = function (result) {
    db.query("SELECT * FROM " + TBT.ORDER, function (err, data) {
        console.log(data);
        if (err) {
            result(null);
        } else {
            result(data);
        }
    });
}

// Phương thức get details
Order.getById = function (id, result) {
    db.query("SELECT * FROM " + TBT.ORDER + " WHERE OID = ?", id, function (err, res) {
        if (err || res.length == 0) {
            console.log("error: " + err);
            result(null);
            return;
        }
        if (res.length) {
            result(res);
            return;
        }
    });
}

// Phương thức create
Order.create = function (newData, result) {
    var newId;
    // Lấy UserID lớn nhất hiện tại + 1
    db.query("SELECT MAX(CAST(MID(OID,2,5) as unsigned)) AS MaxID FROM " + TBT.ORDER, function (err, res) {
        if (err || res.length == 0) {
            newId = "O1";
        } else {
            let numId = Number(res[0].MaxID) + 1;
            newId = "O" + numId;
        }
        newData.OID = newId;
        console.log(newData);
        // Thêm dữ liệu mới
        db.query("INSERT INTO " + TBT.ORDER + " SET ?", newData, function (err, res) {
            if (err) {
                console.log("error: " + err);
                result(null);
                return;
            }
            result({ ...newData });
        });
    });
}

// Phương thức update
Order.update = function (updateData, result) {
    db.query("UPDATE " + TBT.ORDER + " SET UserID=?, OrderTime=?, TotalAmount=?, Status=? WHERE OID=?",
        [updateData.UserID, updateData.OrderTime, updateData.TotalAmount, updateData.Status, updateData.OID],
        function (err, res) {
            if (err) {
                console.log("error: " + err);
                result(null);
                return;
            }
            result(updateData);
        });
}

// Phương thức delete
Order.remove = function (id, result) {
    db.query("SELECT * FROM " + TBT.ORDER + " WHERE OID = ?", id, function (err, res) {
        if (err || res.length == 0) {
            console.log("error: " + err);
            result(null);
            return;
        } else {
            db.query("DELETE FROM " + TBT.ORDER + " WHERE OID = ?", id, function (err, res) {
                if (err) {
                    console.log("error: " + err);
                    result(null);
                    return;
                }
                result("Deleted data with id = " + id);
            });
        }
    });
}


module.exports = Order;