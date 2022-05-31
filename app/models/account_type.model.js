const db = require('../database/connect');
const TBT = require('../database/table')

// Khởi tạo đối tượng
const AccountType = function (account) {
    this.typeId = account.TypeID;
    this.typeName = account.TypeName;
}

// Phương thức get all
AccountType.get_all = function (result) {
    db.query("SELECT * FROM " + TBT.ACCOUNT_TYPE, function (err, data) {
        if (err) {
            result(null);
        } else {
            result(data);
        }
    });
}

// Phương thức get details
AccountType.getById = function (id, result) {
    db.query("SELECT * FROM " + TBT.ACCOUNT_TYPE + " WHERE TypeID = ?", id, function (err, res) {
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
AccountType.create = function (newData, result) {
    var newId;
    // Lấy UserID lớn nhất hiện tại + 1
    db.query("SELECT MAX(CAST(MID(TypeID,2,5) as unsigned)) AS MaxID FROM " + TBT.ACCOUNT_TYPE, function (err, res) {
        if (err || res.length == 0) {
            newId = "T1";
        } else {
            let numId = Number(res[0].MaxID) + 1;
            newId = "T" + numId;
        }
        newData.TypeID = newId;

        // Thêm dữ liệu mới
        db.query("INSERT INTO " + TBT.ACCOUNT_TYPE + " SET ?", newData, function (err, res) {
            if (err) {
                console.log("error: " + err);
                result(null);
                return;
            }
            result({...newData });
        });
    });
}

// Phương thức update
AccountType.update = function (updateData, result) {
    db.query("UPDATE " + TBT.ACCOUNT_TYPE + " SET TypeName=? WHERE TypeID=?",
        [updateData.TypeName, updateData.TypeID],
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
AccountType.remove = function (id, result) {
    db.query("SELECT * FROM " + TBT.ACCOUNT_TYPE + " WHERE TypeID = ?", id, function (err, res) {
        if (err || res.length == 0) {
            console.log("error: " + err);
            result(null);
            return;
        } else {
            db.query("DELETE FROM " + TBT.ACCOUNT_TYPE + " WHERE TypeID = ?", id, function (err, res) {
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


module.exports = AccountType;