import Utils from '../Utils';

class HangModel {
  constructor(duration) {
    this.id = Utils.guid();
    this.date = new Date();
    this.duration = duration || 0;
  }
}

module.exports = HangModel;
