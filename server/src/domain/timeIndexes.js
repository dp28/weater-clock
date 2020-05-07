const HourInSeconds = 60 * 60;
const HalfDayInSeconds = 12 * HourInSeconds;
const LightsInInnerRing = 60;
const InnerLightsPerHour = 5;
const HoursInInnerRing = LightsInInnerRing / InnerLightsPerHour;
const SecondsPerLight = HourInSeconds / InnerLightsPerHour;

function calculateInnerIndexOfHour(secondsSinceEpoch) {
  const secondsToday = secondsSinceEpoch % HalfDayInSeconds;
  const secondsToStartOfHour = secondsToday - (secondsToday % HourInSeconds);
  return Math.floor(secondsToStartOfHour / SecondsPerLight);
}

module.exports = {
  calculateInnerIndexOfHour,
  HourInSeconds,
  LightsInInnerRing,
  InnerLightsPerHour,
  HoursInInnerRing,
};
