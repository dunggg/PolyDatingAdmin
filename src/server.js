const express = require('express');
const path = require('path');
const connectDB = require('./config/connectDB');
const indexRouter = require('./routes/index');
const usersApiRouter = require('./routes/api/users.api.router');
const hbs = require('hbs');

connectDB();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerHelper('compare', function (object) {
  const s1 = Number(object.data.root.page);
  const s2 = object.data.index + 1;
  console.log(s1, s2);
  return s1 === s2
    ? `<li class="page-item active "><a class="page-link" href="/users/page/${s1}">${s1}</a></li>`
    : `<li class="page-item"><a class="page-link" href="/users/page/${s2}">${s2}</a></li>`;
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(__dirname + '/public')); // use bootstap

// Website
app.use('/', indexRouter);

// Api
app.use('/api/users', usersApiRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});
