let hbs = require('hbs');

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

hbs.registerHelper('newDate', (value) => {
  return value.toLocaleString();
});

hbs.registerHelper('compare', function (index, object) {
  let isSearch = object.data.root.isSearch;
  let facilitiesParams = object.data.root.facilitiesParams;
  let specializedParams = object.data.root.specializedParams;
  let courseParams = object.data.root.courseParams;
  let genderParams = object.data.root.genderParams;
  let statusParams = object.data.root.statusParams;
  let reportParmas = object.data.root.reportParmas;
  let searchParams = object.data.root.searchParams;
  let page = object.data.root.page;
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

hbs.registerHelper('optionFacilities', function (any, value, object) {
  let facilitiesParams = object?.data?.root?.facilitiesParams;
  return facilitiesParams === value
    ? "<option selected value='" + value + "'>" + value + '</option>'
    : "<option value='" + value + "'>" + value + '</option>';
});

hbs.registerHelper('optionReport', function (any, value, object) {
  let reportParmas = object?.data?.root.reportParmas;
  let valOption = value === 'Báo cáo' ? '' : value;
  return reportParmas === value
    ? `<option selected value=${valOption}>${value}</option>`
    : `<option value=${valOption}>${value}</option>`;
});

hbs.registerHelper('optionGender', function (any, value, object) {
  let genderParams = object.data.root.genderParams;
  let valOption = value === 'Giới tính' ? '' : value;
  return genderParams === value
    ? `<option selected value=${valOption}>${value}</option>`
    : `<option value=${valOption}>${value}</option>`;
});

hbs.registerHelper('optionSpecialized', function (any, value, object) {
  let specializedParams = object.data.root.specializedParams;
  return specializedParams === value
    ? "<option selected value='" + value + "'>" + value + '</option>'
    : "<option value='" + value + "'>" + value + '</option>';
});

hbs.registerHelper('optionCourse', function (any, value, object) {
  let courseParams = object.data.root.courseParams;
  return courseParams === value
    ? "<option selected value='" + value + "'>" + value + '</option>'
    : "<option value='" + value + "'>" + value + '</option>';
});

hbs.registerHelper('optionStatus', function (any, value, object) {
  let statusParams = object?.data?.root.statusParams;
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

hbs.registerHelper('optionTime', function (any, value, object) {
  let time = object?.data?.root.timeParams;
  let valTime = '';
  switch (value) {
    case 0:
      valTime = 'Ngày';
      break;
    case 1:
      valTime = 'Tháng';
      break;
    case 2:
      valTime = 'Năm';
      break;
    default:
      valTime = 'Ngày';
  }

  return time === value.toString()
    ? `<option selected value=${value}>${valTime}</option>`
    : `<option value=${value}>${valTime}</option>`;
});

module.exports = hbs;
