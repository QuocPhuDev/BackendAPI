module.exports = function (router) {
    // Khai báo controller
    var tourController = require('../controllers/tour.controller');

    // Gọi xử lý các controller tương ứng
    router.get('/tour/list/:limit', tourController.get_list);
    router.get('/tour/details/:id', tourController.details);
    router.get('/tour/bystatus/:id', tourController.bystatus);
    router.post('/tour/add', tourController.add);
    router.delete('/tour/delete/:id', tourController.remove);
    router.put('/tour/update', tourController.update);
};