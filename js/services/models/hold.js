import Utils from '../Utils';

class HoldModel {
  constructor(name) {
    this.id = Utils.guid();
    this.name = name;
  }
}

module.exports = HoldModel;
