/**
 * @description this class
 * @author Billy Bouchard et Jacob Dorais
 * @copyright Ecole Polytechnique de Montreal & Course LOG2420
 * @version 1.0.0
 */
class Observable {

  constructor(username) {
    this.socket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username=" + username)
    this.username = username
    //this.channelObserver = ChannelObserver()
    //this.messageObserver = MessageObserver()
    this.socket.onopen = function (event) {}
    this.socket.onmessage = this.update
  }

  update(event) {
    console.log(event)
    if (event.data[0] == '{') {
      var msg = JSON.parse(event.data)
      if (msg.eventType == "updateChannelsList") {
        this.channel = msg.data[0].id
        var m = new Message("onMessage", this.channel, "hello there \nGeneral kenobi", this.username, Date.now())
        this.send(JSON.stringify(m))
      } else if (msg.eventType == "onMessage") {
        console.log(msg.data)
      }
    } else {
      console.log(event.data)
    }
  }

}

var a = new Observable("bob")