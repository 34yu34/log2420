/**
 * @description this class
 * @author Billy Bouchard et Jacob Dorais
 * @copyright Ecole Polytechnique de Montreal & Course LOG2420
 * @version 1.0.0
 */
class Observable {

  constructor(user) {
    this.socket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username=" + user.name)
    this.user = user
    this.channelObserver = new ChannelObserver()
    this.messageObserver = new MessageObserver()
    this.socket.onopen = function (event) {}
    this.socket.onmessage = this.onMessage()
  }
  /*********************************************************************
   *
   *********************************************************************/
  onMessage() {
    var user = this.user
    var msgObs = this.messageObserver
    var chnObs = this.channelObserver
    var socket = this.socket
    var updateScroll = this.updateScroll
    return function (event) {
      var msg = JSON.parse(event.data)
      console.log(msg)
      if (msg.eventType == "updateChannelsList") {
        chnObs.update(msg.data, socket, user)
        if (chnObs.currentChannel.id == "") {
          chnObs.choose(this, user)()
        }
      } else if (msg.eventType == "onMessage" || msg.eventType == "onError") {
        msgObs.read(msg, user)
        updateScroll()

      } else if (msg.eventType == "onGetChannel" && msg.channelId == chnObs.currentChannel.id) {
        for (var i = 0; i < msg.data.messages.length; i++) {
          msgObs.read(msg.data.messages[i], user);
        }
      }
    }
  }
  /*********************************************************************
   * send
   *********************************************************************/
  sendMessage() {
    var msgObs = this.messageObserver
    var currChannel = this.channelObserver.currentChannel
    var user = this.user
    var socket = this.socket
    return function (event) {
      msgObs.sendMessage(socket, currChannel, user, "")
    }
  }
  /*********************************************************************
   *  Like
   *********************************************************************/
  sendLike() {
    var msgObs = this.messageObserver
    var currChannel = this.channelObserver.currentChannel
    var user = this.user
    var socket = this.socket
    return function (event) {
      msgObs.sendMessage(socket, currChannel, user, "like")
    }

  }
  /*********************************************************************
   *  Permet de garder le scroll en bas lors de la reception des messages
   *********************************************************************/
  updateScroll() {
    var element = document.getElementById("text-log");
    element.scrollTop = element.scrollHeight;
  }

  /*********************************************************************
   *  Permet de créer nouveaux cannaux
   *********************************************************************/
  createChannel() {
    var name = prompt("name of new channel:", "");
    if (name == null || name == "") {
      name = "no name";
    }
    active_user.channelObserver.createChannel(name);
  }
}