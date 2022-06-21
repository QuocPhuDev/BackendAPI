module.exports = function (router) {
    // Khai báo controller
    var feedbackController = require('../controllers/feedback.controller');

    // Gọi xử lý các controller tương ứng
    router.get('/feedback/list', feedbackController.get_list);
    router.get('/feedback/details/:id', feedbackController.details);
    router.post('/feedback/add', feedbackController.add);
    router.delete('/feedback/delete/:id', feedbackController.remove);
    router.put('/feedback/update', feedbackController.update);
};