const express = require("express");
const app = express();
const userController = require("./controllers/userController.js");
const homeController = require("./controllers/homeController.js");
const path = require('path');
const pg = require('pg');

const config = {
    host: 'john.db.elephantsql.com',
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: 'unsjmswb',     
    password: 'Myo0dN8PiMa5P-kYiKZ53bAhYYvlH5Lm',
    database: 'unsjmswb',
    port: 5432,
    ssl: true
};

const client = new pg.Client(config);

client.connect(err => {
    if (err) throw err;
    else {
 //       queryDatabase();
        const query = `SELECT * FROM users WHERE user_id = '1'`;
        client.query(query)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                console.log(`Read: ${JSON.stringify(row)}`);
            });

            process.exit();
        })
        .catch(err => {
            console.log(err);
        });
    }
});

function queryDatabase() {
    const query = `
        DROP TABLE IF EXISTS inventory;
        CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
        INSERT INTO inventory (name, quantity) VALUES ('banana', 150);
        INSERT INTO inventory (name, quantity) VALUES ('orange', 154);
        INSERT INTO inventory (name, quantity) VALUES ('apple', 100);
    `;

    client
        .query(query)
        .then(() => {
            console.log('Table created successfully!');
            client.end(console.log('Closed client connection'));
        })
        .catch(err => console.log(err))
        .then(() => {
            console.log('Finished execution, exiting now');
            process.exit();
        });
}


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