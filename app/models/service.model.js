const db = require('../database/connect');
const TBT = require('../database/table')

// Khởi tạo đối tượng
const Service = function (service) {
    this.sId = service.SID;
    this.serviceName = service.ServiceName;
    this.price = service.Price;
    this.slot = service.Slot;
    this.orderedSlot = service.OrderedSlot;
    this.availableDate = service.AvailableDate;
    this.endDate = service.EndDate;
    this.status = service.Status;

}

// Phương thức get all
Service.get_all = function (result) {
    db.query("SELECT * FROM " + TBT.SERVICE, function (err, data) {
        if (err) {
            result(null);
        } else {
            result(data);
        }
    });
}

// Phương thức get details
Service.getById = function (id, result) {
    db.query("SELECT * FROM " + TBT.SERVICE + " WHERE SID = ?", id, function (err, res) {
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
Service.create = function (newData, result) {
    var newId;
    // Lấy UserID lớn nhất hiện tại + 1
    db.query("SELECT MAX(CAST(MID(SID,2,5) as unsigned)) AS MaxID FROM " + TBT.SERVICE, function (err, res) {
        if (err || res.length == 0) {
            newId = "S1";
        } else {
            let numId = Number(res[0].MaxID) + 1;
            newId = "S" + numId;
        }
        newData.SID = newId;
        console.log(newData);
        // Thêm dữ liệu mới
        db.query("INSERT INTO " + TBT.SERVICE + " SET ?", newData, function (err, res) {
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
Service.update = function (updateData, result) {
    db.query("UPDATE " + TBT.SERVICE + " SET ServiceName=?, Price=?, Slot=?, OrderedSlot=?, AvailableDate=?, EndDate=?, Status=? WHERE SID=?",
        [updateData.ServiceName, updateData.Price, updateData.Slot, updateData.OrderedSlot, updateData.AvailableDate, updateData.EndDate, updateData.Status, updateData.SID],
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
Service.remove = function (id, result) {
    db.query("SELECT * FROM " + TBT.SERVICE + " WHERE SID = ?", id, function (err, res) {
        if (err || res.length == 0) {
            console.log("error: " + err);
            result(null);
            return;
        } else {
            db.query("DELETE FROM " + TBT.SERVICE + " WHERE SID = ?", id, function (err, res) {
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


module.exports = Service;