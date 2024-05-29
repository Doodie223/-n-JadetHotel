const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
require("dotenv").config();
const path = require('path');

const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const connection = require("../src/config/database");
const routerApi = require("../src/routers/api");
const indexRouter = require("../src/routers/indexRouter");
const adminRouter = require("../src/routers/adminRouter");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("view engine", ".hbs");
app.set("views", "./src/views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware xử lý 404
// app.use((req, res, next) => {
//   res.status(404).render("404");
// });

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use("/api", routerApi);
app.use("/", indexRouter);
app.use("/admin", adminRouter);

app.listen(port, async () => {
  try {
    await connection();
    console.log(`Example app listening at port ${port}`);
  } catch (error) {
    console.log("error when server start: ", error);
  }
});
