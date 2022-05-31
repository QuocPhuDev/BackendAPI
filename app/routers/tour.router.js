module.exports = function (router) {
    // Khai báo controller
    var tourController = require('../controllers/tour.controller');

    // Gọi xử lý các controller tương ứng
    router.get('/tour/list', tourController.get_list);
    router.get('/tour/details/:id', tourController.details);
    router.post('/tour/add', tourController.add);
    router.delete('/tour/delete/:id', tourController.remove);
    router.put('/tour/update', tourController.update);
};