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

// Phương thức get by id
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

Order.getByUserId = function (id, result) {
    db.query("SELECT * FROM " + TBT.ORDER + " WHERE UserID = ?", id, function (err, res) {
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

// Phương thức get details
Order.getDetails = function (id, result) {
    db.query("SELECT O.OID, UserID, OrderTime, TourID, SID, OrderedSlot, BeginDate, EndDate, Amount, TotalAmount, O.Status FROM "
        + TBT.ORDER + " O LEFT JOIN " + TBT.ORDER_DETAIL + " D ON O.OID = D.OID WHERE O.OID = ?"
        , id, function (err, res) {
            console.log(res);
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
        var dateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        // Thêm dữ liệu mới cho bảng order
        db.query("INSERT INTO " + TBT.ORDER + " VALUES (?,?,?,?,?)", [newData.OID, newData.UserID, dateTime, newData.TotalAmount, 0], function (err, res) {
            if (err) {
                console.log("error: " + err);
                result(null);
                return;
            } else {
                // Thêm dữ liệu mới cho bảng order details
                db.query("INSERT INTO " + TBT.ORDER_DETAIL + " VALUES (?,?,?,?,?,?,?)",
                    [newData.TourID, newData.SID, newData.OID, newData.OrderedSlot, newData.Amount, newData.BeginDate, newData.EndDate], function (err, res) {
                        if (err) {
                            console.log("error: " + err);
                            result(null);
                            return;
                        } else {
                            result({ ...newData });
                        }
                    });
            }
        });
    });
}

// Phương thức update
Order.update = function (updateData, result) {
    var dateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    db.query("UPDATE " + TBT.ORDER + " SET UserID=?, OrderTime=?, TotalAmount=?, Status=? WHERE OID=?",
        [updateData.UserID, dateTime, updateData.TotalAmount, updateData.Status, updateData.OID], function (err, res) {
            if (err) {
                console.log("error: " + err);
                result(null);
                return;
            } else {
                // Thêm dữ liệu mới cho bảng order details
                db.query("UPDATE " + TBT.ORDER_DETAIL + " SET TourID=?, SID=?, OrderedSlot=?, Amount=?, BeginDate=?, EndDate=? WHERE OID = ?",
                    [updateData.TourID, updateData.SID, updateData.OrderedSlot, updateData.Amount, updateData.BeginDate, updateData.EndDate, updateData.OID], function (err, res) {
                        if (err) {
                            console.log("error: " + err);
                            result(null);
                            return;
                        } else {
                            result({ ...updateData });
                        }
                    });
            }
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
            db.query("DELETE FROM " + TBT.ORDER_DETAIL + " WHERE OID = ?", id, function (err, res) {
                if (err) {
                    console.log("error: " + err);
                    result(null);
                    return;
                } else {
                    db.query("DELETE FROM " + TBT.ORDER + " WHERE OID = ?", id, function (err, res) {
                        if (err) {
                            console.log("error: " + err);
                            result(null);
                            return;
                        } else {
                            result("Deleted data with id = " + id);
                        }
                    });
                }
            });
        }
    });
}


module.exports = Order;