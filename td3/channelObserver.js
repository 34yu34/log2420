/**
 * @description Contains function to navigate trough channel
 * @author Billy Bouchard et Jacob Dorais
 * @copyright Ecole Polytechnique de Montreal & Course LOG2420
 * @version 1.0.0
 */
class ChannelObserver {
  constructor() {
    this.channels = {}
    this.currentChannel = new Channel()
  }

  push(channel) {
    this.channels[channel.name] = channel
  }

  update(channelList, socket, user) {
    $("#channel-list").empty()
    for (var i in channelList) {
      this.push(channelList[i])
      var innerHtml = "<div class='channel-container lline'><i class='fas fa-"
      innerHtml += (channelList[i].joinStatus ? "minus'" : "plus'") + " href='"
      innerHtml += channelList[i].name + "'></i>" + channelList[i].name
      innerHtml += "<div class='spacer'></div>" + channelList[i].numberOfUsers + " connecté"
      innerHtml += (channelList[i].numberOfUsers > 1 ? "s" : "") + "</div>"
      $("#channel-list").append(innerHtml)
    }
    $(".channel-container i").bind("click", this.choose(socket, user))
  }

  choose(socket, user) {
    var chnlObs = this
    return function (e) {
      var name
      if (chnlObs.currentChannel.id == "") {
        name = "Général"
        chnlObs.currentChannel.copy(chnlObs.channels[name])
        $("#message-zone .header").text("Current Channel : " + chnlObs.currentChannel.name)
        return
      } else if (chnlObs.currentChannel.name == this.getAttribute("href")) {
        $("#text-log").empty()
        name = "Général"
        var msgOut = new Message("onLeaveChannel", chnlObs.currentChannel.id, null, user.name, Date.now())
        socket.send(JSON.stringify(msgOut))
      } else {
        var msgOut = new Message("onLeaveChannel", chnlObs.currentChannel.id, null, user.name, Date.now())
        socket.send(JSON.stringify(msgOut))
        name = this.getAttribute("href")

      }
      chnlObs.currentChannel.copy(chnlObs.channels[name])
      $("#message-zone .header").text("Current Channel : " + chnlObs.currentChannel.name)
      var msgIn = new Message("onJoinChannel", chnlObs.currentChannel.id, null, user.name, Date.now())
      socket.send(JSON.stringify(msgIn))

      //core.clear
      document.getElementById("text-log").innerHTML = "";


      //show old messages
      var msgOut = new Message("onGetChannel",
        active_user.channelObserver.currentChannel.id,
        "", active_user.user.name, Date.now());
      active_user.socket.send(JSON.stringify(msgOut));
    }
  }

  /*********************************************************************
   *  Permet de créer nouveaux channels
   *********************************************************************/
  createChannel(name) {
    var msgOut = new Message("onCreateChannel",
      active_user.channelObserver.currentChannel.id,
      name, active_user.user.name, Date.now());
    active_user.socket.send(JSON.stringify(msgOut));
  }
}