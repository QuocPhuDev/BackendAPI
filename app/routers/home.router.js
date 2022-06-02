module.exports = function (router) {
    // Khai báo controller
    var homeController = require('../controllers/home.controller');
    var JWT = require('../common/_JWT')

    // Gọi xử lý các controller tương ứng
    router.get('/', homeController.home);

};
