const covid19ImpactEstimator = (data) => {
    const {
    
    region : {
        avgDailyIncomeInUsd
    },
    reportedCases,
    timeToElapse,
    periodType,
    population,
    totalHospitalBeds

    }  = data
    
    //challenge1
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

    //challenge 2

    const impactRequestedTime = impact.infectionsByRequestedTime * 0.15;
    const severeImpactRequest = severeImpact.infectionsByRequestedTime * 0.15;

    impact.severeCasesByRequestedTime = Math.trunc(impactRequestedTime);
    severeImpact.severeCasesByRequestedTime = Math.trunc(severeImpactRequest);

    const bedsAvailable = totalHospitalBeds * 0.35;
    const ImpactHospitlBedval = bedsAvailable - impactRequestedTime;
    const sevImpactHospitalBedval = bedsAvailable - severeImpactRequest;

    impact.hospitalBedsByRequestedTime = Math.trunc(sevImpactHospitalBedval);

    //challenge 3

    const ImpactCasesforICU = impact.infectionsByRequestedTime * 0.05;
    const sevImpactCasesforICE = severeImpact.infectionsByRequestedTime * 0.05;
    const ImpactVentilator = impact.infectionsByRequestedTime *0.02;
    const sevImpactVentillator = severeImpact.infectionsByRequestedTime * 0.02;


    impact.casesForICUByRequestedTime = Math.trunc(ImpactCasesforICU);
    severeImpact.casesForICUByRequestedTime = Math.trunc(sevImpactCasesforICU);

    impact.casesForVentilatorsByRequestedTime = Math.trunc(ImpactVentilator);
    severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(sevImpactVentillator);

    let newDay;
    const compute = population * avgDailyIncomeInUsd;
    if (periodType === 'months'){
        newDay = timeToElapse * 30;

        impact.dollarsInFlight = {
            Math.trunc((impact.infectionsByRequestedTime * compute)/ newDay)
        };
        severeImpact.dollarsInFlight = {
            Math.trunc((severeImpact.infectionsByRequestedTime * compute) / newDay)
        };
   
    }else if (periodType === 'weeks'){
        newDay = timeToElapse * 7;
        impact.dollarsInFlight = {
            Math.trunc((impact.infectionsByRequestedTime * compute) / newDay)
        };
        severeImpact.dollarsInFlight = {
            Math.trunc((severeImpact.infectionsByRequestedTime * compute) / newDay)
        };
    }else if (periodType === 'days'){
        newDay = timeToElapse * 1;
        impact.dollarsInFlight = {
            Math.trunc((impact.infectionsByRequestedTime * compute) / newDay)
        };
        severeImpact.dollarsInFlight = {
            Math.trunc((severeImpact.infectionsByRequestedTime * compute) / newDay)
        };
    }

    return{     
        data,
        impact,
        severeImpact
    };
};







export default covid19ImpactEstimator;
