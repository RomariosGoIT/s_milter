$(function() {
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

  var api = $('#my-menu').data('mmenu');
  api
    .bind('opened', function() {
      $('.hamburger').addClass('is-active');
    })
    .bind('closed', function() {
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
      var ths = $(this);
      var thsth = ths.find('.carousel-services-content').outerHeight();
      ths.find('.carousel-services-image').css('min-height', thsth);
    });
  }
  carouselServices();

  $('.carousel-reviews').owlCarousel({
    loop: true,
    items: 1,
    smartSpeed: 700,
    nav: false,
  });

  $('.carousel-partners').owlCarousel({
    loop: true,
    smartSpeed: 700,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>',
    ],
    navElement: 'div',
    responsiveClass: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  });
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

  //E-mail Ajax Send
  $('form.callback').submit(function() {
    //Change
    var th = $(this);
    $.ajax({
      type: 'POST',
      url: '/mail.php', //Change
      data: th.serialize(),
    }).done(function() {
      $(th)
        .find('.success')
        .addClass('active')
        .css('display', 'flex')
        .hide()
        .fadeIn();
      setTimeout(function() {
        $(th)
          .find('.success')
          .removeClass('active')
          .fadeOut();
        th.trigger('reset');
      }, 3000);
    });
    return false;
  });
});
