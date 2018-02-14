function initMap() {
  var mtl = {
    lat: 45.5017,
    lng: -73.6200
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: mtl
  });
}
$(document)
  .ready(function () {
    $(".empty-panel,.select-panel")
      .bind("click", function () {
        $(".select-panel")
          .removeClass("select-panel")
          .addClass("empty-panel");
        $(this)
          .removeClass("empty-panel")
          .addClass("select-panel");
        if ($(this)
          .html() == "Carte des Stations") {
          $("#carte-station")
            .css("display", "flex");
          $("#liste-station")
            .css("display", "none")
        } else {
          $("#carte-station")
            .css("display", "none");
          $("#liste-station")
            .css("display", "flex")
        }

      })
  });