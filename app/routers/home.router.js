module.exports = function (router) {
    // Khai báo controller
    var homeController = require('../controllers/home.controller');
    var JWT = require('../common/_JWT')

    // Gọi xử lý các controller tương ứng
    router.get('/', homeController.home);
    router.get('/about', homeController.about);


    router.get('/token', async function (req, res) {
        var user = {
            name: "admin",
            email: "admin@gmail.com",
        };
        const _token = await JWT.make(user);
        res.send({ token: _token });
    });

    router.get('/check_token', async function (req, res) {
        try {
            var _token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIn0sImlhdCI6MTY1MzcyNjM5MCwiZXhwIjoxNjUzNzI5OTkwfQ.vvuPxvFagF2jKphRC6dsa-MyLzY-Z65NmTCUvg4yyZQ";
            const data = await JWT.check(_token);
            res.send({ data: data });
        } catch (error) {
            res.send({ data: "Token incorrect" });
        }
    });
};
