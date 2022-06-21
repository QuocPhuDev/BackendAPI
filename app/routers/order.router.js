module.exports = function (router) {
    // Khai báo controller
    var orderController = require('../controllers/order.controller');

    // Gọi xử lý các controller tương ứng
    router.get('/order/list', orderController.get_list);
    router.get('/order/byid/:id', orderController.byid);
    router.get('/order/byuserid/:id', orderController.getByUserId);
    router.get('/order/details/:id', orderController.details);
    router.post('/order/add', orderController.add);
    router.put('/order/update', orderController.update);
    router.delete('/order/delete/:id', orderController.remove);
};