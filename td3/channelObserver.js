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
      innerHtml += channelList[i].name + "'></i>" + channelList[i].name + "</div > "
      $("#channel-list").append(innerHtml)
    }
    $(".channel-container i").bind("click", this.choose(socket, user))
  }

  choose(socket, user) {
    var chnlObs = this
    return function (e) {
      var name
      if (chnlObs.currentChannel.id != "") {
        var msgOut = new Message("onLeaveChannel", chnlObs.currentChannel.id, null, user.name, Date.now())
        socket.send(JSON.stringify(msgOut))
        name = this.getAttribute("href")
      } else {
        name = "Général"
        chnlObs.currentChannel.copy(chnlObs.channels[name])
        return
      }
      chnlObs.currentChannel.copy(chnlObs.channels[name])
      $("#message-zone .header").text("Current Channel : " + chnlObs.currentChannel.name)
      var msgIn = new Message("onJoinChannel", chnlObs.currentChannel.id, null, user.name, Date.now())
      socket.send(JSON.stringify(msgIn))
    }
  }
}