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
});
