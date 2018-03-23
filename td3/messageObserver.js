/**
 * @description Contains function to print and send message
 * @author Billy Bouchard et Jacob Dorais
 * @copyright Ecole Polytechnique de Montreal & Course LOG2420
 * @version 1.0.0
 */
class MessageObserver {
  read(message, user) {
    var line = document.createElement('div')
    if (message.sender == user.name) {
      line.className = "rline"
      var par = document.createElement('div')
      par.className = "user-bubble"
      par.innerHTML = message.data
      line.appendChild(par)
    } else {
      line.className = "lline"
      var par = document.createElement('div')
      par.className = "sender-bubble"
      par.innerHTML = message.sender + ": " + message.data
      line.appendChild(par)
      var audio = new Audio('notif.mp3');
      audio.play();
    }
    $('#text-log')
      .append(line)
    return message.data
  }

  sendMessage(socket, channel, user) {
    var msg = document.getElementById("message-writer");
    if (msg.value != "") {
      var message = new Message("onMessage", channel.id, msg.value, user.name, Date.now());
      socket.send(JSON.stringify(message));
      msg.value = "";
    }
  }
}