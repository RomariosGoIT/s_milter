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

  $('.carousel-services')
    .owlCarousel({
      // loop: true,
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
    })
    .on('changed.owl.carousel', function() {
      carouselServices();
    });

  function onResize() {
    return $('.carousel-services-content').equalHeights();
  }
  onResize();

  function carouselServices() {
    $('.carousel-services-item').each(function() {
      let ths = $(this);
      let thsth = ths.find('.carousel-services-content').outerHeight();
      ths.find('.carousel-services-image').css('min-height', thsth);
    });
  }
  carouselServices();

  // Selectize

  $('select').selectize({
    create: false,
    sortField: 'text',
    createFilter: null,
    persist: false,
    onFocus: function() {
      var input = 'selectize-input input',
        wrapper = 'selectize-input';
      $('.' + input).attr('readonly', true);
      $('.' + input + ', .' + wrapper).css('cursor', 'pointer');
    },
  });
});
