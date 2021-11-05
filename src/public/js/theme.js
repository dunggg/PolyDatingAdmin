(function () {
  'use strict'; // Start of use strict

  var sidebar = document.querySelector('.sidebar');
  var sidebarToggles = document.querySelectorAll(
    '#sidebarToggle, #sidebarToggleTop',
  );

  if (sidebar) {
    var collapseEl = sidebar.querySelector('.collapse');
    var collapseElementList = [].slice.call(
      document.querySelectorAll('.sidebar .collapse'),
    );
    var sidebarCollapseList = collapseElementList.map(function (collapseEl) {
      return new bootstrap.Collapse(collapseEl, { toggle: false });
    });

    for (var toggle of sidebarToggles) {
      // Toggle the side navigation
      toggle.addEventListener('click', function (e) {
        document.body.classList.toggle('sidebar-toggled');
        sidebar.classList.toggle('toggled');

        if (sidebar.classList.contains('toggled')) {
          for (var bsCollapse of sidebarCollapseList) {
            bsCollapse.hide();
          }
        }
      });
    }

    // Close any open menu accordions when window is resized below 768px
    window.addEventListener('resize', function () {
      var vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0,
      );

      if (vw < 768) {
        for (var bsCollapse of sidebarCollapseList) {
          bsCollapse.hide();
        }
      }
    });
  }

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over

  var fixedNaigation = document.querySelector('body.fixed-nav .sidebar');

  if (fixedNaigation) {
    fixedNaigation.on('mousewheel DOMMouseScroll wheel', function (e) {
      var vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0,
      );

      if (vw > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });
  }

  var scrollToTop = document.querySelector('.scroll-to-top');

  if (scrollToTop) {
    // Scroll to top button appear
    window.addEventListener('scroll', function () {
      var scrollDistance = window.pageYOffset;

      //check if user is scrolling up
      if (scrollDistance > 100) {
        scrollToTop.style.display = 'block';
      } else {
        scrollToTop.style.display = 'none';
      }
    });
  }

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
})(); // End of use strict
