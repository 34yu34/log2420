var bill = new User("billy", "test123", "PimpBoy345")
var jacob = new User("jacob", "test123", "jacob")
var active_user = new Observable(bill)

$(document)
  .ready(function () {
    $("#message-sender").bind("click", active_user.sendMessage())
    $("#message-liker").bind("click", active_user.sendLike())
    $('#message-writer').keypress(function (e) {
      if (e.which == 13) {
        active_user.sendMessage()(e);
      }
    })
  })