/**
 * @description Contains function to print and send message
 * @author Billy Bouchard et Jacob Dorais
 * @copyright Ecole Polytechnique de Montreal & Course LOG2420
 * @version 1.0.0
 */
class MessageObserver {
  read(message, user) {
    var overLine = document.createElement('div')
    var column = document.createElement('div')
    column.className = "column-message"
    var sender = document.createElement('div')
    sender.innerHTML = message.sender
    var msgLine = document.createElement('div')
    var par = document.createElement('div')
    par.innerHTML = (message.data == "like" ? "<i class='fas fa-thumbs-up'></i>" : message.data)
    var time = document.createElement('div')
    var date = new Date(message.timestamp)
    time.innerHTML = date.toLocaleTimeString() + " - " + date.toLocaleDateString()
    if (message.sender == user.name) {
      msgLine.className = "rline"
      overLine.className = "rline"
      time.className = "rline time-line"
      sender.className = "rline name-line"
      par.className = "user-bubble"
    } else if (message.sender == "Admin") {
      msgLine.className = "lline"
      par.className = "admin-bubble"
      var audio = new Audio('notif.mp3');
      audio.play();
      msgLine.appendChild(par)
      $('#text-log').append(msgLine)
      return message.data
    } else {
      msgLine.className = "lline"
      time.className = "lline time-line"
      sender.className = "lline name-line"
      overLine.className = "lline"
      par.className = "sender-bubble"
      var audio = new Audio('notif.mp3');
      audio.play();
    }
    msgLine.appendChild(par)
    column.appendChild(sender)
    column.appendChild(msgLine)
    column.appendChild(time)
    overLine.appendChild(column)
    $('#text-log').append(overLine)
    return message.data
  }

  sendMessage(socket, channel, user, text) {
    if (text != "") {
      var message = new Message("onMessage", channel.id, text, user.name, Date.now());
      socket.send(JSON.stringify(message));
      return
    }
    var msg = document.getElementById("message-writer");
    if (msg.value != "") {
      var message = new Message("onMessage", channel.id, msg.value, user.name, Date.now());
      socket.send(JSON.stringify(message));
      msg.value = "";
    }
  }

  isLike(messageData) {
    if (messageData == "like") {
      return "<i class='fas fa-thumbs-up></i>'"
    }
    return messageData
  }
}