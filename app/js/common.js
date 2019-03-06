$(() => {
  $('#my-menu').mmenu({
    extensions: [
      'widescreen',
      'theme-black',
      'effect-menu-slide',
      'pagedim-black',
    ],
    navbar: {
      title: '<img src="img/logo-1.svg" alt="Салон красоты Смитлер">',
    },
    offCanvas: {
      position: 'right',
    },
  });

  let api = $('#my-menu').data('mmenu');
  api
    .bind('opened', () => {
      $('.hamburger').addClass('is-active');
    })
    .bind('closed', () => {
      $('.hamburger').removeClass('is-active');
    });

  $('.carousel-services').owlCarousel({
    loop: true,
    nav: true,
    smartSpeed: 700,
    navText: [
      '<i class="fas fa-angle-double-left"></i>',
      '<i class="fas fa-angle-double-right"></i>',
    ],
    navElement: 'div',
    responsiveClass: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      800: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  });
});
