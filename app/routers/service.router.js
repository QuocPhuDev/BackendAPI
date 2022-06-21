module.exports = function (router) {
    // Khai báo controller
    var serviceController = require('../controllers/service.controller');

    // Gọi xử lý các controller tương ứng
    router.get('/service/list', serviceController.get_list);
    router.get('/service/details/:id', serviceController.details);
    router.post('/service/add', serviceController.add);
    router.delete('/service/delete/:id', serviceController.remove);
    router.put('/service/update', serviceController.update);
};