let specialized = document.getElementById('specialized');
let facilities = document.getElementById('facilities');
let course = document.getElementById('course');
let gender = document.getElementById('gender');
let report = document.getElementById('report');
let status = document.getElementById('status');
let search = document.getElementById('search');
let specializedInput = document.querySelector('input[name=specialized]');
let courseInput = document.querySelector('input[name=course]');
let genderInput = document.querySelector('input[name=gender]');
let reportInput = document.querySelector('input[name=report]');
let statusInput = document.querySelector('input[name=status]');
let facilitiesInput = document.querySelector('input[name=facilities]');
let searchInput = document.querySelector('input[name=email]');
let form = document.getElementById('form');
let btnSearch = document.getElementById('btn-search');

btnSearch.addEventListener('click', () => {
  facilitiesInput.value = facilities.value;
  specializedInput.value = specialized.value;
  courseInput.value = course.value;
  genderInput.value = gender.value;
  reportInput.value = report.value;
  statusInput.value = status.value;
  searchInput.value = search.value;
  if (facilities.value === 'Lựa chọn cơ sở') {
    facilitiesInput.name = '';
  }
  if (specialized.value === 'Lựa chọn ngành học') {
    specializedInput.name = '';
  }
  if (course.value === 'Lựa chọn khóa học') {
    courseInput.name = '';
  }
  if (gender.value === '') {
    genderInput.name = '';
  }
  if (report.value === '') {
    reportInput.name = '';
  }
  if (status.value === '') {
    statusInput.name = '';
  }
  if (status.value === '') {
    statusInput.name = '';
  }
  if (search.value === '') {
    searchInput.name = '';
  }
  form.submit();
});