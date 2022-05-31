const db = require('../database/connect');
const TBT = require('../database/table')

// Khởi tạo đối tượng
const Tour = function (tour) {
    this.tourId = tour.TourID;
    this.tourName = tour.TourName;
    this.location = tour.Location;
    this.descriptions = tour.Descriptions;
    this.price = tour.Price;
    this.image = tour.Image;
    this.slot = tour.Slot;
    this.orderedSlot = tour.OrderedSlot;
    this.beginDate = tour.BeginDate;
    this.endDate = tour.EndDate;
    this.status = tour.Status;
}

// Phương thức get all
Tour.get_all = function (result) {
    db.query("SELECT * FROM " + TBT.TOUR, function (err, data) {
        if (err) {
            result(null);
        } else {
            result(data);
        }
    });
}

// Phương thức get details
Tour.getById = function (id, result) {
    db.query("SELECT * FROM " + TBT.TOUR + " WHERE TourID = ?", id, function (err, res) {
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
Tour.create = function (newData, result) {
    var newId;
    // Lấy UserID lớn nhất hiện tại + 1
    db.query("SELECT MAX(CAST(MID(TourID,2,5) as unsigned)) AS MaxID FROM " + TBT.TOUR, function (err, res) {
        if (err || res.length == 0) {
            newId = "T1";
        } else {
            let numId = Number(res[0].MaxID) + 1;
            newId = "T" + numId;
        }
        newData.TourID = newId;
        console.log(newData);
        // Thêm dữ liệu mới
        db.query("INSERT INTO " + TBT.TOUR + " SET ?", newData, function (err, res) {
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
Tour.update = function (updateData, result) {
    db.query("UPDATE " + TBT.TOUR + " SET TourName=?, Location=?, Descriptions=?, Price=?, Image=?, Slot=?, OrderedSlot=?, BeginDate=?, EndDate=?, Status=? WHERE TourID=?",
        [updateData.TourName, updateData.Location, updateData.Descriptions, updateData.Price, updateData.Image, updateData.Slot, updateData.OrderedSlot, updateData.BeginDate, updateData.EndDate, updateData.Status, updateData.TourID],
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
Tour.remove = function (id, result) {
    db.query("SELECT * FROM " + TBT.TOUR + " WHERE TourID = ?", id, function (err, res) {
        if (err || res.length == 0) {
            console.log("error: " + err);
            result(null);
            return;
        } else {
            db.query("DELETE FROM " + TBT.TOUR + " WHERE TourID = ?", id, function (err, res) {
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


module.exports = Tour;