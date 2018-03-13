var channel = ""
var username = "kdpkdewkd"
var socket
$(document)
  .ready(function () {
    socket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username=" + username)
    socket.onopen = function (event) {}
    socket.onmessage = function (event) {
      console.log(event)
      if (event.data[0] == '{') {
        var msg = JSON.parse(event.data)
        if (msg.eventType == "updateChannelsList") {
          channel = msg.data[0].id
          var m = new Message("onMessage", channel, "hello there \nGeneral kenobi", username, Date.now())
          socket.send(JSON.stringify(m))
        } else if (msg.eventType == "onMessage") {
          console.log(msg.data)
        }
      } else {
        console.log(event.data)
      }

    }
  })