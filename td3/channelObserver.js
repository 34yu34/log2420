/**
 * @description Contains function to navigate trough channel
 * @author Billy Bouchard et Jacob Dorais
 * @copyright Ecole Polytechnique de Montreal & Course LOG2420
 * @version 1.0.0
 */
class ChannelObserver {
  constructor() {
    this.channels = {}
    this.currentChannel = new Channel("", "", true, [""], 1)
  }

  push(channel) {
    this.channels[channel.name] = channel
  }

  update(channelList) {
    for (var i in channelList) {
      this.push(channelList[i])
    }
  }

  choose(socket, name, user) {
    if (this.currentChannel.id != "") {
      var msgOut = new Message("onLeaveChannel", this.currentChannel.id, null, user.name, Date.now())
      socket.send(JSON.stringify(msgOut))
    }
    this.currentChannel = this.channels[name]
    var msgIn = new Message("onJoinChannel", this.currentChannel.id, null, user.name, Date.now())
    socket.send(JSON.stringify(msgIn))
  }

}