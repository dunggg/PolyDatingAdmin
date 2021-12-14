(function () {
  'use strict'; // Start of use strict

  let sidebar = document.querySelector('.sidebar');
  let sidebarToggles = document.querySelectorAll(
    '#sidebarToggle, #sidebarToggleTop',
  );

  if (sidebar) {
    let collapseElementList = [].slice.call(
      document.querySelectorAll('.sidebar .collapse'),
    );
    let sidebarCollapseList = collapseElementList.map(function (collapseEl) {
      return new bootstrap.Collapse(collapseEl, { toggle: false });
    });

    for (let toggle of sidebarToggles) {
      // Toggle the side navigation
      toggle.addEventListener('click', function (e) {
        document.body.classList.toggle('sidebar-toggled');
        sidebar.classList.toggle('toggled');

        if (sidebar.classList.contains('toggled')) {
          for (let bsCollapse of sidebarCollapseList) {
            bsCollapse.hide();
          }
        }
      });
    }

    // Close any open menu accordions when window is resized below 768px
    window.addEventListener('resize', function () {
      let vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0,
      );

      if (vw < 768) {
        for (let bsCollapse of sidebarCollapseList) {
          bsCollapse.hide();
        }
      }
    });
  }

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over

  let fixedNaigation = document.querySelector('body.fixed-nav .sidebar');

  if (fixedNaigation) {
    fixedNaigation.on('mousewheel DOMMouseScroll wheel', function (e) {
      let vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0,
      );

      if (vw > 768) {
        let e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });
  }

  let scrollToTop = document.querySelector('.scroll-to-top');

  if (scrollToTop) {
    // Scroll to top button appear
    window.addEventListener('scroll', function () {
      let scrollDistance = window.pageYOffset;

      //check if user is scrolling up
      if (scrollDistance > 100) {
        scrollToTop.style.display = 'block';
      } else {
        scrollToTop.style.display = 'none';
      }
    });
  }

})(); // End of use strict
