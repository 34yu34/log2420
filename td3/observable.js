/**
 * @description this class
 * @author Billy Bouchard et Jacob Dorais
 * @copyright Ecole Polytechnique de Montreal & Course LOG2420
 * @version 1.0.0
 */
class Observable {

  constructor(user) {
    this.socket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username=" + user.name)
    this.channel = new Channel("", "", true, [""], 9);
    this.user = user
    //this.channelObserver = ChannelObserver()
    this.messageObserver = new MessageObserver()
    this.socket.onopen = function (event) {}
    this.socket.onmessage = this.onMessage()
  }
  /*********************************************************************
   *
   *********************************************************************/
  onMessage() {
    var channel = this.channel
    var user = this.user
    var messageObserver = this.messageObserver
    return function (event) {
      var msg = JSON.parse(event.data)
      console.log(msg)
      if (msg.eventType == "updateChannelsList") {
        channel.id = msg.data[0].id
        var m = new Message("onMessage", channel.id, "hello there \nGeneral kenobi", user.name, Date.now())
        this.send(JSON.stringify(m))
      } else if (msg.eventType == "onMessage") {
        messageObserver.read(msg, user)
      }
    }
  }
}