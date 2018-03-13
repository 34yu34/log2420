/**
 * @description Contains function to navigate trough channel
 * @author Billy Bouchard et Jacob Dorais
 * @copyright Ecole Polytechnique de Montreal & Course LOG2420
 * @version 1.0.0
 */
class ChannelObserver {
  constructor() {
    this.channels = []
  }

  push(channel) {
    this.channels.push(channel)
  }

}