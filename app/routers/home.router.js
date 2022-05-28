module.exports = function (router) {
    // Khai báo controller
    var homeController = require('../controllers/home.controller');

    // Gọi xử lý các controller tương ứng
    router.get('/', homeController.home);
    router.get('/about', homeController.about);
};