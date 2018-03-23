var bill = new User("billy", "test123", "PimpBoy345")
var jacob = new User("jacob", "test123", "Admin")
var active_user = new Observable(jacob)

$(document)
  .ready(function () {
    $("#message-sender").bind("click", active_user.sendMessage())
    $('#message-writer').keypress(function (e) {
      if (e.which == 13) {
        active_user.sendMessage()(e);
      }
    })
  })