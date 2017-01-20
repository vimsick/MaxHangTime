import HangModel from './models/hang';

module.exports = formatHangs;

function formatHangs(referenceDate, duration) {
  const hangTime = new HangModel(referenceDate, duration);
  return hangTime;
}
