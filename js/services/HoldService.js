import Realm from 'realm';
import HoldModel from './models/hold';
import HangModel from './models/hang';

const HangSchema = {
  name: 'Hang',
  properties: {
    date: 'date',
    duration: { type: 'int', default: 0 },
  }
};

const HoldSchema = {
  name: 'Hold',
  properties: {
    name: 'string',
    hangs: { type: 'list', objectType: 'Hang' },
    picture: { type: 'data', optional: true }, // optional property
  }
};

// Initialize a Realm with Hang and Hold models
var holdData = new Realm({
  schema: [HangSchema, HoldSchema],
  schemaVersion: 1,
  migration(oldRealm, newRealm) {
    // only apply this change if upgrading to schemaVersion 1
    if (oldRealm.schemaVersion < 1) {
      var oldObjects = oldRealm.objects('Hang');
      var newObjects = newRealm.objects('Hang');

      // loop through all objects and set the name property in the new schema
      for (var i = 0; i < oldObjects.length; i++) {
        newObjects[i].date = new Date(oldObjects[i].date);
      }
    }
  }
});

const HoldService = {
  findAll() {
    return holdData.objects('Hold');
  },

  save(hold) {
    if (holdData.objects('Hold').filtered("name = '" + hold.name + "'").length) return;

    holdData.write(() => {
      holdData.create('Hold', hold);
    });
  },

  addHang(holdname, hang) {
    const hold = this.findAll().filtered(`name = '${holdname}'`)[0];

    // in case string is not a hold name.
    if (hold !== undefined) {
      const holdlist = hold.hangs;

      holdData.write(() => {
        holdlist.push(hang);
      });
    }
  }
};

HoldService.save(new HoldModel('Small Crimp'));
HoldService.save(new HoldModel('Medium Crimp'));
HoldService.save(new HoldModel('Sloper'));

const hangExample = new HangModel(new Date(2000, 1, 2), 6);

const smallCrimp = 'Small Crimp';

HoldService.addHang(smallCrimp, hangExample);

module.exports = HoldService;
