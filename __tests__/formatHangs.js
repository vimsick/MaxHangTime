import HangModel from '../js/services/models/hang';

const formatHangs = require('../js/services/formatHangs');
const moment = require('moment');

test('given a date and a hang duration, expect back a hang model', () => {
  const now = moment().format('MM-DD-YYYY');

  expect(formatHangs(now, 12)).toBeInstanceOf(HangModel);
});
