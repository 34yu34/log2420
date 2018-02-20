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
      updateStation();
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
var map
var center

function initMap() {
  center = {
    lat: 45.5017,
    lng: -73.6200
  };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: center
  });
  marker = new google.maps.Marker({
    position: center,
    map: map
  })
}
/*********************************************************************
 * La fonction Onclick qui permet de changer la vue entre
 * la carte et la liste
 *********************************************************************/
function panelSwitch() {
  $("#liste-station")
    .css("display", "none")
  $(".empty-panel,.select-panel")
    .bind("click", function () {
      $(".select-panel")
        .removeClass("select-panel")
        .addClass("empty-panel")
      $(this)
        .removeClass("empty-panel")
        .addClass("select-panel")
      if ($(this)
        .text() == "Carte des Stations") {
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
}
/*********************************************************************
 *  Fonction qui permet d'afficher les couleurs des stations
 *********************************************************************/
function updateStation() {
  $("#autocomplete-input")
    .bind('keypress', function (e) {
      if (e.which == 13) {
        let value = $("#autocomplete-input")
          .val()
        for (let i = 0; i < data.stations.length; i++) {
          if (value == data.stations[i].s) {
            center = {
              lat: data.stations[i].la,
              lng: data.stations[i].lo
            }
            map.setCenter(center)
            marker.setPosition(center)
            $("#localisation")
              .text(value)
            $("#id-station")
              .text(data.stations[i].n)
            $("#velo-dispo")
              .text(data.stations[i].ba)
            $("#velo-indispo")
              .text(data.stations[i].bx)
            $("#borne-dispo")
              .text(data.stations[i].da)
            $("#borne-indispo")
              .text(data.stations[i].dx)
            if (data.stations[i].b) {
              $("#bloquee")
                .text("oui")
            } else {
              $("#bloquee")
                .text("non")
            }
            if (data.stations[i].su) {
              $("#suspendu")
                .text("oui")
            } else {
              $("#suspendu")
                .text("non")
            }
            if (data.stations[i].m) {
              $("#hors-service")
                .text("oui")
            } else {
              $("#hors-service")
                .text("non")
            }
          }
        }
        updateColor()
      }
    })
}

/*********************************************************************
 *  Fonction pour mettre la couleur dans le table1
 *********************************************************************/
function updateColor() {
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
/*********************************************************************
 *  Fonction qui s'active une fois le document pret
 *  et qui appel les autres fonctions
 *********************************************************************/
$(document)
  .ready(function () {
    $("#liste-station")
      .css("display", "none")
    getdata();
    dataTable();
    panelSwitch();
  })