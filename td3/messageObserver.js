/**
 * @description Contains function to print and send message
 * @author Billy Bouchard et Jacob Dorais
 * @copyright Ecole Polytechnique de Montreal & Course LOG2420
 * @version 1.0.0
 */
class MessageObserver {
  read(message, user) {
    var par = document.createElement('div')
    if (message.sender == user.name) {
      par.className = "rline"
    } else {
      par.className = "lline"
    }
    par.innerHTML = message.data
    $('body').append(par)
    return message.data
  }

  send(msg, socket, channel, user) {
    message = new Message("onMessage", channel.id, msg, user, Date.now())
    socket.send(JSON.stringify(message))
  }
}