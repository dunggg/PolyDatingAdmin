const express = require("express");
const path = require('path');
const connectDB = require("./config/connectDB");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user.router");
const usersApiRouter = require("./routes/api/users.api.router");
const eduPolyApiRouter = require("./routes/api/edu-poly.api.router");

connectDB();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(__dirname + "/public")) // use bootstap

// Website
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Api
app.use("/api/users", usersApiRouter);
app.use("/api", eduPolyApiRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});
