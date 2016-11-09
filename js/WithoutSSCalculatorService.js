
//var WithoutSSCalculatorService = angular.module('WithoutSSCalculatorService', [])
app.service('WithoutSSCalculator', ['TaxRateCalculator','SGCRate','AgeCalculator',function(TaxRateCalculator,SGCRate,AgeCalculator){
        this.getFinalAmount = function(age,fy,excludeSGC){
            // var age = AgeCalculator.getAge(dob,datePension.getFullYear());
            var datePension =  new Date;
            datePension.setYear(fy);
            datePension.setDate(2);
            datePension.setMonth(6);
            // console.log(datePension);
            var sgc=SGCRate.calculateSGCRate(datePension)*excludeSGC > 19615.60 ? 19615.60 : SGCRate.calculateSGCRate(datePension)*excludeSGC;
            var concessionalContributionCap;
            concessionalContributionCap=age<49?30000:35000;
            var concessionalContributionTax=0.15;
            var excessContributionTax=0.32;
            var grossAnnualIncomebeforeSGC=excludeSGC;
            var additionalConcessionalContribution=0;
            var assessableAnnualIncome=grossAnnualIncomebeforeSGC-additionalConcessionalContribution;
            var personalTax= TaxRateCalculator.getTaxBase(assessableAnnualIncome)+TaxRateCalculator.getTaxRate(assessableAnnualIncome)*(assessableAnnualIncome-1-TaxRateCalculator.getLowerBoundValue(assessableAnnualIncome));
            var takehomePay=assessableAnnualIncome-personalTax;

            var concessionalContribution=additionalConcessionalContribution+sgc;
            if(concessionalContribution>concessionalContributionCap){
                  var contributionTax=concessionalContribution*concessionalContributionTax+((concessionalContribution-concessionalContributionCap)*excessContributionTax);
            }else{
                  var contributionTax=concessionalContribution*concessionalContributionTax+0;
            }
            var boostUpSuperBalanceBy=concessionalContribution-contributionTax;
            var finalAmount=takehomePay+boostUpSuperBalanceBy;
            var ttakehomePay=personalTax+contributionTax;

            // var unattainableTHPS = takehomePay < minTakeHomePay;

            // if(maxTHPCalculation){
            //     console.log("taxwss",ttakehomePay);
            //     return takehomePay;
            // }

          //   if(unattainableTHPS){
          //   return [0,0,0,unattainableTHPS];
          // }else{
            return [takehomePay,ttakehomePay,finalAmount,false];
          // }
      };

}]);
