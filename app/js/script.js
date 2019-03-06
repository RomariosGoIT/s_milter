document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('.carousel-services-composition h3')
    .forEach(item => {
      const res = item.innerHTML.replace(/(\S+)\s*$/, '<span>$1</span>');
      return (item.innerHTML = res);
    });
});
