var express = require('express');
var app = express();

// Cấu hình body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Khai báo các router
require('./app/routers/home.router')(app);
require('./app/routers/account.router')(app);

// Khởi tạo port server
app.listen(3100, function () {
    console.log("Server listening on 3100")
});