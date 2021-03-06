let express = require('express');
let cookieParser = require('cookie-parser');
let path = require('path');
let hbs = require('../src/config/hbsHelper');
let connectDB = require('./config/connectDB');
let webRouter = require('./routes/web.router');
let apiRouter = require('./routes/api.router');
let getTimeZone = require('./middlewares/getTime');

connectDB();
hbs;

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public'))); // use bootstrap

// Get Time Zone
app.use(getTimeZone);

// Api
app.use('/api', apiRouter);

// Website
app.use(cookieParser());
app.use('/', webRouter);

// 404 Not Found
app.use((req, res, next) => {
  res.sendStatus(404);
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});
