var bill = new User("billy", "test123", "PimpBoy345")
var jacob = new User("jacob", "test123", "jacob")
var active_user //= new Observable(bill)

$(document)
  .ready(function () {
    var name = prompt("YOUR NAME:", "")
    if (name == null || name == "") {
      name = "no_name"
    }
    bill = new User("billy", "test123", name);
    active_user = new Observable(bill);
    $("#message-sender").bind("click", active_user.sendMessage())
    $("#message-liker").bind("click", active_user.sendLike())
    $('#message-writer').keypress(function (e) {
      if (e.which == 13) {
        active_user.sendMessage()(e);
      }
    })
    $(".fa-bell").bind("click", function () {
      $(this).addClass('hidden');
      $(".fa-bell-slash").removeClass('hidden');
      isSoundActive = false;
    })
    $(".fa-bell-slash").bind("click", function () {
      $(this).addClass('hidden');
      $(".fa-bell").removeClass('hidden');
      isSoundActive = true;
    })
  })