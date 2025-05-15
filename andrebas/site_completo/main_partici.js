$(document).ready(function () {
  const $sliderFor = $(".slider-for");
  const $sliderNav = $(".slider-nav");

  // Slider principal
  $sliderFor.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: ".slider-nav",
  });

  // Navegação lateral (miniaturas)
  $sliderNav.slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: false,
    arrows: false,
    focusOnSelect: true,
    vertical: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          slidesToShow: 3, // Reduzido para melhor visibilidade em telas menores
        },
      },
      {
        breakpoint: 480,
        settings: {
          vertical: false,
          slidesToShow: 2,
        },
      }
    ],
  });
});
