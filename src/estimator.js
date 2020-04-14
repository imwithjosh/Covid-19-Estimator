const covid19ImpactEstimator = (data) => {
  const {
    region,
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds
  } = data;

  const currInfImpact = reportedCases * 10;
  const impactObj = {
    currentlyInfected: currInfImpact
  };

  const currInfSevImpact = reportedCases * 50;
  const severeImpactObj = {
    currentlyInfected: currInfSevImpact
  };

  const chkDuration = (period, duration) => {
    let result = 2 ** Math.floor(duration / 3);
    if (period === 'weeks') {
      result = 2 ** Math.floor((duration * 7) / 3);
    } else if (period === 'months') {
      result = Math.floor(2 ** ((duration * 30) / 3));
    }
    return result;
  };
  const getDuration = chkDuration(periodType, timeToElapse);

  const impactInfectionsBy = currInfImpact * getDuration;
  impactObj.infectionsByRequestedTime = impactInfectionsBy;
  const severeImpactInfectonsBy = currInfSevImpact * getDuration;
  severeImpactObj.infectionsByRequestedTime = severeImpactInfectonsBy;

  const impactSevereCases = impactObj.infectionsByRequestedTime * 0.15;
  impactObj.severeCasesByRequestedTime = Math.round(impactSevereCases);
  const severeImpactSevereCases = severeImpactObj.infectionsByRequestedTime * 0.15;
  severeImpactObj.severeCasesByRequestedTime = Math.round(severeImpactSevereCases);

  let impactHospBeds = (
    totalHospitalBeds * 0.35 - impactObj.severeCasesByRequestedTime
  );
  impactHospBeds = impactHospBeds < 0 ? Math.round(impactHospBeds) : Math.floor(impactHospBeds);
  impactObj.hospitalBedsByRequestedTime = impactHospBeds;

  let sevImpactHospBeds = (totalHospitalBeds * 0.35
    - severeImpactObj.severeCasesByRequestedTime);
  sevImpactHospBeds = sevImpactHospBeds < 0 ? Math.round(
    sevImpactHospBeds
  ) : Math.floor(sevImpactHospBeds);
  severeImpactObj.hospitalBedsByRequestedTime = sevImpactHospBeds;

  impactObj.casesForICUByRequestedTime = Math.floor(
    impactObj.infectionsByRequestedTime * 0.05
  );
  severeImpactObj.casesForICUByRequestedTime = Math.floor(
    severeImpactObj.infectionsByRequestedTime * 0.05
  );

  impactObj.casesForVentilatorsByRequestedTime = Math.floor(
    impactObj.infectionsByRequestedTime * 0.02
  );
  severeImpactObj.casesForVentilatorsByRequestedTime = Math.floor(
    severeImpactObj.infectionsByRequestedTime * 0.02
  );

  const dFlightImpact = Math.floor(
    (impactInfectionsBy
      * region.avgDailyIncomePopulation
      * region.avgDailyIncomeInUSD)
    / getDuration
  );
  impactObj.dollarsInFlight = dFlightImpact;
  const dFlightSevere = Math.floor(
    (severeImpactInfectonsBy
      * region.avgDailyIncomePopulation
      * region.avgDailyIncomeInUSD)
    / getDuration
  );
  severeImpactObj.dollarsInFlight = Number(dFlightSevere);

  return {
    impact: impactObj,
    severeImpact: severeImpactObj
  };
};

export default covid19ImpactEstimator;