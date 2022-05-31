module.exports = function (router) {
    // Khai báo controller
    var accTypeController = require('../controllers/account_type.controller');

    // Gọi xử lý các controller tương ứng
    router.get('/acc_type/list', accTypeController.get_list);
    router.get('/acc_type/details/:id', accTypeController.details);
    router.post('/acc_type/add', accTypeController.add);
    router.delete('/acc_type/delete/:id', accTypeController.remove);
    router.put('/acc_type/update', accTypeController.update);
};