const express = require('express');
const path = require('path');
const hbs = require('../src/config/hbsHelper');
const connectDB = require('./config/connectDB');
const indexRouter = require('./routes/web/index');
const usersRouter = require('./routes/web/users.web');
const eduPolyApiRouter = require('./routes/api/edu-poly.api');
const usersApiRouter = require('./routes/api/users.api');
const favoritesApiRouter = require('./routes/api/favorites.api');
const reportsApiRouter = require('./routes/api/reports.api');

connectDB();
hbs;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(__dirname + '/public')); // use bootstrap

// Website
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Api
app.use('/api', eduPolyApiRouter);
app.use('/api/users', usersApiRouter);
app.use('/api/favorites', favoritesApiRouter);
app.use('/api/reports', reportsApiRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});
