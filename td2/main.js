/*********************************************************************
 *  Fonction qui fait la map
 *********************************************************************/
function initMap() {
  var mtl = {
    lat: 45.5017,
    lng: -73.6200
  };
  var map = new google.maps.Map($('#map'), {
    zoom: 13,
    center: mtl
  });
}
/*********************************************************************
 *  Fonction qui permet d'afficher les couleurs des stations
 *********************************************************************/
function updateStation() {

  $(".bubble")
    .each(
      function () {
        if (this.id == "suspendu") {
          if (this.innerHTML == "-") {
            this.style.background = "#c7c7c7"
          } else if (this.innerHTML == "non" || this.innerHTML == "0") {
            this.style.background = '#00ff00'
          } else {
            this.style.background = '#ff0000'
          }
        } else {
          if (this.innerHTML == "non" || this.innerHTML == '0') {
            this.style.background = "#ff0000"
          } else if (this.innerHTML == "-" || this.id == "id-station") {
            this.style.background = '#c7c7c7'
          } else {
            this.style.background = "#00ff00"
          }
        }
      })
}
/*********************************************************************
 *  Fonction qui permet l'autocomplete
 *********************************************************************/
$(function () {
  var tags = [
    "blah",
    "bleh",
    "bellette",
    "hello",
    "cool"
  ];
  $("#autocomplete-input")
    .autocomplete({
      source: tags
    });
});
$(document)
  .ready(function () {
    $("#liste-station")
      .css("display", "none")
    /*********************************************************************
     *  Fonction pour la datatable
     *********************************************************************/
    var data = [
      [
        "Tiger Nixon",
        "System Architect",
        "Edinburgh",
        "5421",
        "2011/04/25",
        "$3,120"
      ],
      [
        "Garrett Winters",
        "Director",
        "Edinburgh",
        "8422",
        "2011/07/25",
        "$5,300"
      ]
    ]
    $('#table2')
      .DataTable()
    /*********************************************************************
     * La fonction Onclick qui permet de changer la vue entre
     * la carte et la liste
     *********************************************************************/
    $(".empty-panel,.select-panel")
      .bind("click", function () {
        $(".select-panel")
          .removeClass("select-panel")
          .addClass("empty-panel")
        $(this)
          .removeClass("empty-panel")
          .addClass("select-panel")
        if ($(this)
          .html() == "Carte des Stations") {
          $("#carte-station")
            .css("display", "flex")
          $("#liste-station")
            .css("display", "none")
        } else {
          $("#carte-station")
            .css("display", "none")
          $("#liste-station")
            .css("display", "flex")
        }
      })
    updateStation();
    /*********************************************************************
     *  Fonction pour le autocomplete
     *********************************************************************/
    /*********************************************************************
     *  Fonction pour les infos de la station
     *********************************************************************/
  });