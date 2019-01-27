// Docs at http://simpleweatherjs.com
$(document).ready(function() {

  Weather.setApiKey("186a4121f9d2a98d277362cd4add0547");

  Weather.getCurrent("Queens", function(current) {

    var w = Weather.kelvinToFahrenheit(current.temperature());
    $("#weather").html(Math.round(w) + "&#176; F");
    // console.log(w);

  });

  // Weather.getForecast("Kansas City", function(forecast) {
  //   console.log("forecast high: " + forecast.high());
  //   console.log("forecast low: " + forecast.low());
  // });


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
