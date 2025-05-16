$(document).ready(function () {
  const $sliderMain = $(".slider-for");
  const $sliderThumbs = $(".slider-nav");

  
  $sliderMain.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: ".slider-nav", 
  });

  
  $sliderThumbs.slick({
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
          slidesToShow: 3, 
        },
      },
      {
        breakpoint: 480,
        settings: {
          vertical: false, 
          slidesToShow: 2, 
        },
      },
    ],
  });
});
