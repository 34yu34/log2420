var data;
var tags = [];

/*********************************************************************
 *  Fonction qui effectue la demande des informations
 *********************************************************************/
function getdata() {
  let req = new XMLHttpRequest();
  //req.responseType = 'json';
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.responseText);
      stationDataUpdate();
    }
  }
  req.open('GET', 'https://secure.bixi.com/data/stations.json', true);
  req.send();
}

/*********************************************************************
 *  Fonction pour la datatable
 *********************************************************************/
function dataTable() {
  $('#table2')
    .DataTable({

    });
}
/*********************************************************************
 *  Fonction qui fait la map
 *********************************************************************/
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
/*********************************************************************
 *  Fonction qui permet d'afficher les couleurs des stations
 *********************************************************************/
function updateStation() {
  $(".bubble")
    .each(
      function () {
        if (this.id == "suspendu" || this.id == "bloquee" || this.id == "hors-service") {
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
function stationDataUpdate() {
  console.log(data)
  for (let i = 0; i < data.stations.length; i++) {
    tags[i] = data.stations[i].s;
  }
  $(function () {
    $("#autocomplete-input")
      .autocomplete({
        source: tags
      });
  });
}

$(document)
  .ready(function () {
    updateStation();
    $("#liste-station")
      .css("display", "none")
    getdata();
    dataTable();
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
  });