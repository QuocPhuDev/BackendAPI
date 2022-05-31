var express = require('express');
var app = express();

// Cấu hình body-parser
var bodyParser = require('body-parser');
const _AuthMiddleWare = require('./app/common/_AuthMiddleWare');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Khai báo các router
require('./app/routers/home.router')(app);
require('./app/routers/login.router')(app);
// Check token trước khi thực hiện các api
app.use(_AuthMiddleWare.isAuth)
require('./app/routers/account.router')(app);
require('./app/routers/account_type.router')(app);
require('./app/routers/tour.router')(app);
require('./app/routers/order.router')(app);

// Khởi tạo port server
app.listen(3100, function () {
    console.log("Server listening on 3100")
});