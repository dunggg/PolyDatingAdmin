const specialized = document.getElementById('specialized');
const facilities = document.getElementById('facilities');
const course = document.getElementById('course');
const gender = document.getElementById('gender');
const report = document.getElementById('report');
const status = document.getElementById('status');
const search = document.getElementById('search');
const specializedInput = document.querySelector('input[name=specialized]');
const courseInput = document.querySelector('input[name=course]');
const genderInput = document.querySelector('input[name=gender]');
const reportInput = document.querySelector('input[name=report]');
const statusInput = document.querySelector('input[name=status]');
const facilitiesInput = document.querySelector('input[name=facilities]');
const searchInput = document.querySelector('input[name=email]');
const form = document.getElementById('form');
const btnSearch = document.getElementById('btn-search');

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