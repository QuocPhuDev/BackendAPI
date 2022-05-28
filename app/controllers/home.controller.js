// Khỏi tạo controller home
exports.home = function(req, res) {
    res.sendFile(__dirname.replace('app\\controller','') + '/index.html');
}
// Khởi tạo controller about
exports.about = function(req, res) {
    res.send("Hello about page");
}