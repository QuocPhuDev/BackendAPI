module.exports = function (router) {
    // Khai báo controller
    var accountController = require('../controllers/account.controller');

    // Gọi xử lý các controller tương ứng
    router.post('/user/login', accountController.login);
    router.post('/user/add', accountController.add_account);
};