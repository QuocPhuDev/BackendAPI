module.exports = function (router) {
    // Khai báo controller
    var logintController = require('../controllers/login.controller');

    // Gọi xử lý các controller tương ứng
    router.post('/user/login', logintController.login);
};