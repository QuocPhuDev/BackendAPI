module.exports = function (router) {
    // Khai báo controller
    var accountController = require('../controllers/account.controller');

    // Gọi xử lý các controller tương ứng
    router.get('/acc/list', accountController.get_list);
    router.get('/acc/details/:id', accountController.details);
    router.post('/acc/add', accountController.add_account);
    router.delete('/acc/delete/:id', accountController.remove_account);
    router.put('/acc/update', accountController.update_account);
};