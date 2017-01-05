const sum = require('../sum');
const moment = require('moment');

test('given a date and a hang duration, expect back object', () => {
  const now = moment().format('MM-DD-YYYY');
  const desiredObject = {};
  desiredObject[now] = 12;

  expect(sum(now, 12)).toMatchObject(desiredObject);
});
