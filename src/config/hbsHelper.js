const hbs = require('hbs');

hbs.registerHelper({
  eq: (v1, v2) => v1 === v2,
  ne: (v1, v2) => v1 !== v2,
  lt: (v1, v2) => v1 < v2,
  gt: (v1, v2) => v1 > v2,
  lte: (v1, v2) => v1 <= v2,
  gte: (v1, v2) => v1 >= v2,
  and() {
    return Array.prototype.every.call(arguments, Boolean);
  },
  or() {
    return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
  },
});

hbs.registerHelper('compare', function (index, object) {
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
  const page = object.data.root.page;
  return page === index
    ? isSearch
      ? `<li class="page-item active"><a class="page-link" href="/users/page/${index}${
          facilitiesParams ? `?facilities=${facilitiesParams}` : '?'
        }${specializedParams ? `&specialized=${specializedParams}` : ''}${
          courseParams ? `&course=${courseParams}` : ''
        }${genderParams ? `&gender=${genderParams}` : ''}${
          reportParmas ? `&report=${reportParmas}` : ''
        }${statusParams ? `&status=${statusParams}` : ''}${
          searchParams ? `&email=${searchParams}` : ''
        }">${index}</a></li>`
      : `<li class="page-item active"><a class="page-link" href="/users/page/${index}">${index}</a></li>`
    : isSearch
    ? `<li class="page-item"><a class="page-link" href="/users/page/${index}${
        facilitiesParams ? `?facilities=${facilitiesParams}` : '?'
      }${specializedParams ? `&specialized=${specializedParams}` : ''}${
        courseParams ? `&course=${courseParams}` : ''
      }${genderParams ? `&gender=${genderParams}` : ''}${
        reportParmas ? `&report=${reportParmas}` : ''
      }${statusParams ? `&status=${statusParams}` : ''}${
        searchParams ? `&email=${searchParams}` : ''
      }">${index}</a></li>`
    : `<li class="page-item"><a class="page-link" href="/users/page/${index}">${index}</a></li>`;
});

hbs.registerHelper('optionReport', function (any, value, object) {
  const reportParmas = object?.data?.root.reportParmas;
  const valOption = value === 'Báo cáo' ? '' : value;
  return reportParmas === value
    ? `<option selected value=${valOption}>${value}</option>`
    : `<option value=${valOption}>${value}</option>`;
});

hbs.registerHelper('optionGender', function (any, value, object) {
  const genderParams = object.data.root.genderParams;
  const valOption = value === 'Giới tính' ? '' : value;
  return genderParams === value
    ? `<option selected value=${valOption}>${value}</option>`
    : `<option value=${valOption}>${value}</option>`;
});

hbs.registerHelper('optionSpecialized', function (any, value, object) {
  const specializedParams = object.data.root.specializedParams;
  return specializedParams === value
    ? "<option selected value='" + value + "'>" + value + '</option>'
    : "<option value='" + value + "'>" + value + '</option>';
});

hbs.registerHelper('optionCourse', function (any, value, object) {
  const courseParams = object.data.root.courseParams;
  return courseParams === value
    ? "<option selected value='" + value + "'>" + value + '</option>'
    : "<option value='" + value + "'>" + value + '</option>';
});

hbs.registerHelper('optionFacilities', function (any, value, object) {
  const facilitiesParams = object.data.root.facilitiesParams;
  return facilitiesParams === value
    ? "<option selected value='" + value + "'>" + value + '</option>'
    : "<option value='" + value + "'>" + value + '</option>';
});

hbs.registerHelper('optionStatus', function (any, value, object) {
  const statusParams = object?.data?.root.statusParams;
  var val = '';
  if (value === 'Kích hoạt') {
    val = 'true';
  } else if (value === 'Chặn') {
    val = 'false';
  } else {
    val = '';
  }
  return statusParams === val
    ? `<option selected value=${val}>${value}</option>`
    : `<option value=${val}>${value}</option>`;
});

module.exports = hbs;
