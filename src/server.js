const express = require('express');
const path = require('path');
const hbs = require('../src/config/hbsHelper');
const connectDB = require('./config/connectDB');
const webRouter = require('./routes/web.router');
const apiRouter = require('./routes/api.router');

connectDB();
hbs;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public'))); // use bootstrap

// Website
app.use('/', webRouter);

// Api
app.use('/api', apiRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});
