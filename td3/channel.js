/**
 * @description Channel, Represents a data transfert object, channel.
 * @author Tanga Mathieu KaborÃ©
 * @copyright Ecole Polytechnique de MontrÃ©al & Course LOG2420
 * @version 1.0.0
 */
class Channel {

  /**
   * Create a new channel.
   * @param {string} id - The unique id of the channel.
   * @param {string} name - The name of the channel.
   * @param {boolean} status - Since we are sending this DTO to the clients, it will help us to not send too more data
   *  True, if the end user joined this channel / False if not.
   * @param {Array<string>} messages - The list the of the messages in the channel.
   * @param {number} numberOfUsers - Count the users in the channel.
   */
  constructor(id = "", name = "", status = false, messages = [""], numberOfUsers = 1) {
    this.id = id;
    this.name = name;
    this.joinStatus = status;
    this.messages = messages;
    this.numberOfUsers = numberOfUsers;
  }

  copy(channel) {
    this.id = channel.id;
    this.name = channel.name;
    this.joinStatus = channel.status;
    this.messages = channel.messages;
    this.numberOfUsers = channel.numberOfUsers;
  }

}