const covid19ImpactEstimator = (data) => {
    const  {
    region : {
        avgDailyIncomeInUsd
    },
    reportedCases,
    timeToElapse,
    periodType,
    population,
    totalHospitalBeds

    } = data;
    
    const impact = {};
    const severImpact = {};

    impact.currentlyInfected = Math.trunc(reportedCases * 10);
    severImpact.currentlyInfected = Math.trunc(reportedCases * 50);

    // check if time elapsed is months, weeks,days

    let timeFactor;
    
    switch (periodType.trim().toLowerCase()){
        case 'months':
            timeFactor = Math.trunc((timeToElapse * 30) / 3);
            break;

         case 'weeks':
                timeFactor = Math.trunc((timeToElapse * 7) / 3);
                break;

         case 'days':
            timeFactor = Math.trunc((timeToElapse) / 3);
            break;
            default:
    }

    //time passed as infection rates grow
    impact.infectionsByRequestTime = impact.currentlyInfected * (2 ** timeFactor);
    severeImpact.infectionsByRequestTime = severImpact.currentlyInfected * (2 ** timeFactor);
}

export default covid19ImpactEstimator;
