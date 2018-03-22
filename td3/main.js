$(document)
  .ready = function () {}
var bill = new User("billy", "test123", "PimpBoy345")
var jacob = new User("jacob", "test123", "jacob")
var active_user = new Observable(bill)
var b = new Observable(jacob)

function envoyer_message() {
  var content = document.getElementById("input");
  var m = new Message("onMessage", active_user.channel.id,
    content.value, active_user.user.name, Date.now());
  active_user.socket.send(JSON.stringify(m));
  content.value = "";
}