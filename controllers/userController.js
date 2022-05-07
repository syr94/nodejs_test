exports.addUser = function (request, response){
    /*
        Создание пользователя по телу request

        INSERT INTO users values(req.body.name, request.mail, request.password)
    */
    response.send("Добавление пользователя");
};
exports.getUsers = function(request, response){

    /*
        users = cursor.exec('SELECT * FROM users')
    */
    //jsx
    response.send("Список пользователей");
};