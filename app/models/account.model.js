const db = require('../common/connect');

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
    db.query("SELECT * FROM account", function (err, account) {
        if (err) {
            result(null);
        } else {
            result(account);
        }
    });
}

// Phương thức get details
Account.getById = function (id, result) {
    db.query("SELECT * FROM account WHERE UserID = ?", id, function (err, res) {
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
        result({ data: "not found" }, null);
    });
}

// Phương thức create
Account.create = function (newData, result) {
    db.query("INSERT INTO Account SET ?", newData, function (err, res) {
        if (err) {
            console.log("error: " + err);
            result(null);
            return;
        }
        result({ id: res.insertId, ...newData });
    });
}

// Phương thức update
Account.update = function (updateData, result) {
    db.query("UPDATE Account SET TypeID=?, UserName=?, DateOfBirth=?, Phone=?, Gender=?, Address=?, Email=?, Password=?, Status=?, Level=? WHERE UserID=?",
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
    db.query("DELETE FROM account WHERE UserID = ?", id, function (err, res) {
        if (err) {
            console.log("error: " + err);
            result(null);
            return;
        }
        result("Deleted data with id = " + id);
    });
}


module.exports = Account;