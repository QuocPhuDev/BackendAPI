const db = require('../database/connect');
const TBT = require('../database/table')

// Khởi tạo đối tượng
const FeedBack = function (feedback) {
    this.fId = feedback.FID;
    this.tourID = feedback.OID;
    this.time = feedback.Time;
    this.vote = feedback.Vote;
    this.comments = feedback.Comments;

}

// Phương thức get all
FeedBack.get_all = function (result) {
    db.query("SELECT * FROM " + TBT.FEEDBACK, function (err, data) {
        if (err) {
            result(null);
        } else {
            result(data);
        }
    });
}

// Phương thức get details
FeedBack.getById = function (id, result) {
    db.query("SELECT * FROM " + TBT.FEEDBACK + " WHERE FID = ?", id, function (err, res) {
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
FeedBack.create = function (newData, result) {
    var newId;
    // Lấy UserID lớn nhất hiện tại + 1
    db.query("SELECT MAX(CAST(MID(FID,2,5) as unsigned)) AS MaxID FROM " + TBT.FEEDBACK, function (err, res) {
        if (err || res.length == 0) {
            newId = "F1";
        } else {
            let numId = Number(res[0].MaxID) + 1;
            newId = "F" + numId;
        }
        newData.FID = newId;
        console.log(newData);
        // Thêm dữ liệu mới
        db.query("INSERT INTO " + TBT.FEEDBACK + " SET ?", newData, function (err, res) {
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
FeedBack.update = function (updateData, result) {
    var dateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    db.query("UPDATE " + TBT.FEEDBACK + " SET Time=?, Vote=?, Comment=? WHERE FID=? AND TourID=? AND OID=?",
        [dateTime, updateData.Vote, updateData.Comment, updateData.FID, updateData.TourID, updateData.OID],
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
FeedBack.remove = function (id, result) {
    db.query("SELECT * FROM " + TBT.FEEDBACK + " WHERE FID = ?", id, function (err, res) {
        if (err || res.length == 0) {
            console.log("error: " + err);
            result(null);
            return;
        } else {
            db.query("DELETE FROM " + TBT.FEEDBACK + " WHERE FID = ?", id, function (err, res) {
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


module.exports = FeedBack;