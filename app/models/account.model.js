const db = require('../database/connect');
const TBT = require('../database/table')

// Khởi tạo đối tượng
const Account = function (account) {
    this.userId = account.UserID;
    this.typeId = account.TypeID;
    this.userName = account.UserName;
    this.dateOfBirth = account.DateOfBirth;
    this.phone = account.Phone;
    this.gender = account.Gender;
    this.address = account.Address;
    this.email = account.Email;
    this.password = account.Password;
    this.status = account.Status;
    this.level = account.Level;
}

// Phương thức get all
Account.get_all = function (result) {
    db.query("SELECT * FROM " + TBT.ACCOUNT, function (err, account) {
        if (err) {
            result(null);
        } else {
            result(account);
        }
    });
}

// Phương thức get details
Account.getById = function (id, result) {
    db.query("SELECT * FROM " + TBT.ACCOUNT + " WHERE UserID = ?", id, function (err, res) {
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
Account.create = function (newData, result) {
    var newId;
    // Lấy UserID lớn nhất hiện tại + 1
    db.query("SELECT MAX(CAST(MID(UserID,4,5) as unsigned)) AS MaxUser FROM " + TBT.ACCOUNT, function (err, res) {
        if (err || res.length == 0) {
            newId = "Acc1";
        } else {
            let numId = Number(res[0].MaxUser) + 1;
            newId = "Acc" + numId;
        }
        newData.UserID = newId;

        // Thêm dữ liệu mới
        db.query("INSERT INTO " + TBT.ACCOUNT + " SET ?", newData, function (err, res) {
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
Account.update = function (updateData, result) {
    db.query("UPDATE " + TBT.ACCOUNT + " SET TypeID=?, UserName=?, DateOfBirth=?, Phone=?, Gender=?, Address=?, Email=?, Password=?, Status=?, Level=? WHERE UserID=?",
        [updateData.TypeID, updateData.UserName, updateData.DateOfBirth, updateData.Phone, updateData.Gender, updateData.Address, updateData.Email, updateData.Password, updateData.Status, updateData.Level, updateData.UserID],
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
Account.remove = function (id, result) {
    db.query("SELECT * FROM " + TBT.ACCOUNT + " WHERE UserID = ?", id, function (err, res) {
        if (err || res.length == 0) {
            console.log("error: " + err);
            result(null);
            return;
        } else {
            db.query("DELETE FROM " + TBT.ACCOUNT + " WHERE UserID = ?", id, function (err, res) {
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

// Kiểm tra đăng nhập
Account.check_login = function (data, result) {
    db.query("SELECT * FROM " + TBT.ACCOUNT + " WHERE UserID = ? AND Password = ?", [data.UserID, data.Password], function (err, res) {
        if (err) {
            console.log("error: " + err);
            result(null);
            return;
        }
        if (res.length) {
            result(res);
            return;
        }
        // not found, return
        result(null);
    });
}

module.exports = Account;