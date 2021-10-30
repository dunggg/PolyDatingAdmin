const express = require('express');
const path = require('path');
const hbs = require('hbs');
const connectDB = require('./config/connectDB');
const indexRouter = require('./routes/web/index');
const usersRouter = require('./routes/web/user.web');
const usersApiRouter = require('./routes/api/users.api');
const eduPolyApiRouter = require('./routes/api/edu-poly.api');

connectDB();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(__dirname + '/public')); // use bootstrap

hbs.registerHelper('compare', function (object) {
  const s1 = Number(object.data.root.page);
  const s2 = object.data.index + 1;
  return s1 === s2
    ? `<li class="page-item active "><a class="page-link" href="/users/page/${s1}">${s1}</a></li>`
    : `<li class="page-item"><a class="page-link" href="/users/page/${s2}">${s2}</a></li>`;
});

// Website
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Api
app.use('/api/users', usersApiRouter);
app.use('/api', eduPolyApiRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});
