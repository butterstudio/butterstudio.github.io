// Docs at http://simpleweatherjs.com
$(document).ready(function() {
  $.simpleWeather({
    location: 'Brooklyn, NY',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      html = weather.temp+'&deg; F / '+weather.alt.temp+'&deg; C';
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html(error);
    }
  });

  // $('.popup-slider').on('init', function(event, slick){
  //     $("#news").hide();
  // });

  $(".popup-slider").slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    adaptiveHeight: true
  });

  $(".dot").mouseenter(function() {
    $(this).addClass("dot-hovered");
  });

});

document.addEventListener("touchstart", function(){}, true);

function openPopup(element) {
  $(".dots").addClass("hidden");
  $(element).removeClass("hidden");
}

function closePopup() {
  $(".dots").removeClass("hidden");
  $(".popup").addClass("hidden");
}
