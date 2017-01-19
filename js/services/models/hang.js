import Utils from '../Utils';

class HangModel {
  constructor(date, duration) {
    this.id = Utils.guid();
    this.date = date;
    this.duration = duration || 0;
  }
}

module.exports = HangModel;
