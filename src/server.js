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

hbs.registerHelper('compare', function (object) {
  const s1 = Number(object.data.root.page);
  const s2 = object.data.index + 1;
  const isSearch = object.data.root.isSearch;
  const facilitiesParams = object.data.root.facilitiesParams;
  const specializedParams = object.data.root.specializedParams;
  const courseParams = object.data.root.courseParams;
  const genderParams = object.data.root.genderParams;
  const statusParams = object.data.root.statusParams;
  const reportParmas = object.data.root.reportParmas;
  const searchParams = object.data.root.searchParams;
  return s1 === s2
    ? isSearch
      ? `<li class="page-item active"><a class="page-link" href="/users/page/${s1}${facilitiesParams ? `?facilities=${facilitiesParams}` : '?'
      }${specializedParams ? `&specialized=${specializedParams}` : ''}${courseParams ? `&course=${courseParams}` : ''
      }${genderParams ? `&gender=${genderParams}` : ''}${reportParmas ? `&report=${reportParmas}` : ''
      }${statusParams ? `&status=${statusParams}` : ''}${searchParams ? `&email=${searchParams}` : ''
      }">${s1}</a></li>`
      : `<li class="page-item active"><a class="page-link" href="/users/page/${s1}">${s1}</a></li>`
    : isSearch
      ? `<li class="page-item"><a class="page-link" href="/users/page/${s2}${facilitiesParams ? `?facilities=${facilitiesParams}` : '?'
      }${specializedParams ? `&specialized=${specializedParams}` : ''}${courseParams ? `&course=${courseParams}` : ''
      }${genderParams ? `&gender=${genderParams}` : ''}${reportParmas ? `&report=${reportParmas}` : ''
      }${statusParams ? `&status=${statusParams}` : ''}${searchParams ? `&email=${searchParams}` : ''
      }">${s2}</a></li>`
      : `<li class="page-item"><a class="page-link" href="/users/page/${s2}">${s2}</a></li>`;
});

hbs.registerHelper('option', function (object, value, a) {
  console.log(object, value, a);
});

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
