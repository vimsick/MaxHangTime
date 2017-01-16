module.exports = formatHangs;

function formatHangs(referenceDate, duration) {
  const hangTime = {};
  hangTime[referenceDate] = duration;
  return hangTime;
}
