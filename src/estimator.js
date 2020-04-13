const input = {
  region: {
    name: 'Africa',
    avAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};
const covid19ImpactEstimator = (data) => {
  const input = data;
  const impact = {};
  const severeImpact = {};
  const output = {};
  output.data = input;
  output.impact = impact;
  output.severeImpact = severeImpact;
  // Challenge1
  let numDays = data.timeToElapse;
  if (data.periodType === 'weeks') {
    numDays = numDays * 7
  } else if (data.periodType === 'months') {
    numDays = numDays * 30
  }
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected
    * (2 ** Math.floor(numDays / 3));
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected
    * (2 ** Math.floor(numDays / 3));
  return output;
};
export default covid19ImpactEstimator;
