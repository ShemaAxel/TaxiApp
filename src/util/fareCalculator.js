const calculateFare = (
  baseFare,
  timeRate,
  time,
  distanceRate,
  distance,
  surge
) => {
  const distanceInKm = distance * 0.001;
  const timeInMin = time * 0.0166667;
  const pricePerKm = timeRate * timeInMin;
  const pricePerMinute = distanceRate * distanceInKm;
  const totalFare = (baseFare + pricePerKm + pricePerMinute) * surge;
  //for Rwanda
  const pricePerKilom = 450;
  const RwfFare = distanceInKm * pricePerKilom;

  return Math.round(RwfFare);
};

export default calculateFare;
