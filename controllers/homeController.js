const path = require('path');

exports.index = function (request, response) {
    response.sendFile(path.join(__dirname, '../public/index.html'));
};
exports.about = function (request, response) {
    response.send("О сайте");
};