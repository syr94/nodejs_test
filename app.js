const express = require("express");
const app = express();
const userController = require("./controllers/userController.js");
const homeController = require("./controllers/homeController.js");
const path = require('path');

const urlencodedParser = express.urlencoded({extended: false});

// определяем Router
const userRouter = express.Router();
const homeRouter = express.Router();
const registerRouter = express.Router();
  
// определяем маршруты и их обработчики внутри роутера userRouter
userRouter.use("/create", userController.addUser); // /users/create
userRouter.use("/", userController.getUsers); // /users
app.use("/users", userRouter);
 
// определяем маршруты и их обработчики внутри роутера homeRouter
homeRouter.get("/about", homeController.about); // /about
homeRouter.get("/", homeController.index); //  /
app.use("/", homeRouter);



//adding registration form
registerRouter.get("/", function(req, res) {
    console.log(req.body)
    res.sendFile(path.join(__dirname, './public/registration.html'));
})
registerRouter.post("/", urlencodedParser, function(req, res) {
    if(!req.body) return res.sendStatus(400);
    console.log(req.body)
    // Занести пользователя в базу данных
    res.redirect('/')
})
app.use("/register", registerRouter)

app.use(function (req, res, next) {
    res.status(404).send("Not Found PAGE!!!")
});
 
app.listen(3000); // 127.0.0.1:3000