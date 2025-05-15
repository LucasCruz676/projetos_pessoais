$(document).ready(function () {
  const $sliderMain = $(".slider-for");
  const $sliderThumbs = $(".slider-nav");

  // Slider principal (imagem grande)
  $sliderMain.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: ".slider-nav", // Conecta com o slider de miniaturas
  });

  // Slider de miniaturas (navegação lateral)
  $sliderThumbs.slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: ".slider-for", // Conecta com o slider principal
    dots: false,
    arrows: false,
    focusOnSelect: true,
    vertical: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          slidesToShow: 3, // Ajuste para tablets
        },
      },
      {
        breakpoint: 480,
        settings: {
          vertical: false, // Miniaturas horizontais no mobile
          slidesToShow: 2, // Ajuste para smartphones
        },
      },
    ],
  });
});
