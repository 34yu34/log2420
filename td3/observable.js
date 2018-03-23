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
    var updateScroll = this.updateScroll
    return function (event) {
      var msg = JSON.parse(event.data)
      console.log(msg)
      if (msg.eventType == "updateChannelsList") {
        chnObs.update(msg.data)
        if (chnObs.currentChannel.id == "") {
          chnObs.choose(this, "Général", user)
        }
      } else if (msg.eventType == "onMessage") {
        msgObs.read(msg, user)
        updateScroll()
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
      console.log(currChannel)
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
}