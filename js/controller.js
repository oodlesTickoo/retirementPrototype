app.controller("TTRController", ['$scope', '$timeout', 'AgeCalculator', 'ChartServiceHc', 'DonutChartServiceHc', 'PdfMaker', 'AreaChartService', function($scope, $timeout, AgeCalculator, ChartServiceHc, DonutChartServiceHc, PdfMaker, AreaChartService) {

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };
    var minDrawdown;
    $scope.listOb = [{ id: 0, name: "Minimum Pension Only" },
        { id: 1, name: "Choose you own pension" }
    ];

    $scope.forms = {};

    $scope.personalDetails = {
        firstName : "Amit",
        lastName : "Kumar",
        email : "iamitkrs@gmail.com",
        mobile: 412121212,
        postalCode : 1234
    };

    var d = document.getElementsByClassName('title-div');

    $scope.chartOneOpen = true;
    $scope.needSS = true;

    $scope.isMenuDrop1 = false;
    $scope.isMenuDrop2 = true;


    $scope.menuDrop1 = function() {
        $scope.isMenuDrop2 = $scope.isMenuDrop1 ? true : true;
        $scope.isMenuDrop1 = $scope.isMenuDrop1 ? false : true;
    }
    $scope.menuDrop2 = function() {
        $scope.isMenuDrop1 = $scope.isMenuDrop1 ? true : true;
        $scope.isMenuDrop2 = $scope.isMenuDrop2 ? false : true;
    }


    $(".form-1").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {

        if ($scope.isMenuDrop1) {
            d[0].style.backgroundColor = "#91B6BE";
            document.getElementsByClassName('caret1-down')[0].style.display = 'none';
            document.getElementsByClassName('caret1-right')[0].style.display = 'block';
        } else {
            // console.log("super");
            d[0].style.backgroundColor = "#dbe3e6";
            document.getElementsByClassName('caret1-down')[0].style.display = 'block';
            document.getElementsByClassName('caret1-right')[0].style.display = 'none';
        }
    });

    $(".form-2").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
        if ($scope.isMenuDrop2) {
            d[1].style.backgroundColor = "#eaab00";
            document.getElementsByClassName('caret2-down')[0].style.display = 'none';
            document.getElementsByClassName('caret2-right')[0].style.display = 'block';
        } else {
            // console.log("super1");
            d[1].style.backgroundColor = "#f9e6b3";
            document.getElementsByClassName('caret2-down')[0].style.display = 'block';
            document.getElementsByClassName('caret2-right')[0].style.display = 'none';
        }
    });



    /* $('.title-div').mouseenter(function() {
        console.log("yo");
        if ($scope.isMenuDrop1) {
            d.className += " title-div-nohover";
        } else {
            d.className += " title-div-hover";
        }
    });

    $('.title-div').mouseleave(function() {
        console.log("yop");

        if ($scope.isMenuDrop1) {
            d.className = d.className.replace(/(?:^|\s)title-div-nohover(?!\S)/g, '');
        }
        else{
            d.className = d.className.replace(/(?:^|\s)title-div-hover(?!\S)/g, '');
        }

    });
*/

    var maleExpectancy = [80.3, 79.6, 78.6, 77.6, 76.6, 75.6, 74.6, 73.6, 72.7, 71.7, 70.7, 69.7, 68.7, 67.7, 66.7, 65.7, 64.7, 63.7, 62.8, 61.8, 60.8, 59.9, 58.9, 57.9, 57, 56, 55, 54.1, 53.1, 52.2, 51.2, 50.2, 49.3, 48.3, 47.3, 46.4, 45.4, 44.5, 43.5, 42.6, 41.6, 40.7, 39.8, 38.8, 37.9, 37, 36, 35.1, 34.2, 33.3, 32.4, 31.4, 30.5, 29.6, 28.8, 27.9, 27, 26.1, 25.3, 24.4, 23.5, 22.7, 21.9, 21, 20.2, 19.4, 18.6, 17.8, 17, 16.3, 15.5, 14.8, 14, 13.3, 12.6, 11.9, 11.2, 10.6, 9.9, 9.3, 8.7, 8.2, 7.6, 7.1, 6.6, 6.1, 5.7, 5.3, 4.9, 4.5, 4.2, 3.9, 3.6, 3.4, 3.2, 3, 2.8, 2.6, 2.5, 2.4, 2.3];

    var femaleExpectancy = [84.4, 83.7, 82.7, 81.7, 80.7, 79.7, 78.7, 77.7, 76.8, 75.8, 74.8, 73.8, 72.8, 71.8, 70.8, 69.8, 68.8, 67.8, 66.8, 65.9, 64.9, 63.9, 62.9, 61.9, 60.9, 60, 59, 58, 57, 56, 55, 54.1, 53.1, 52.1, 51.1, 50.1, 49.2, 48.2, 47.2, 46.3, 45.3, 44.3, 43.4, 42.4, 41.4, 40.5, 39.5, 38.6, 37.6, 36.7, 35.8, 34.8, 33.9, 33, 32, 31.1, 30.2, 29.3, 28.4, 27.5, 26.6, 25.7, 24.8, 23.9, 23, 22.2, 21.3, 20.4, 19.6, 18.8, 17.9, 17.1, 16.3, 15.5, 14.7, 13.9, 13.2, 12.4, 11.7, 11, 10.3, 9.6, 9, 8.3, 7.7, 7.2, 6.6, 6.1, 5.7, 5.2, 4.8, 4.4, 4.1, 3.8, 3.5, 3.3, 3, 2.9, 2.7, 2.5, 2.4];

    var dt = new Date();

    $scope.fy = dt.getMonth() > 5 ? dt.getFullYear() : dt.getFullYear() - 1;

    var initDate = new Date();
    initDate.setYear(1959);
    initDate.setMonth(6);
    initDate.setDate(3);

    var initDate2 = new Date();
    initDate2.setYear(1965);
    initDate2.setMonth(6);
    initDate2.setDate(4);

    $scope.dob = initDate;
    $scope.dobSpouse = initDate2;


    $scope.infoShow = function(value) {
        if (value) {
            document.getElementsByClassName("information-overlay")[0].style.visibility = "visible";
            document.getElementsByClassName("information-overlay")[0].style.zIndex = "9999";
            document.getElementsByClassName("information-overlay")[0].style.position = "inline-block";
            document.getElementsByClassName("information-overlay")[0].style.height = "" + (document.getElementsByClassName("otrp-calculator")[0].clientHeight - 10) + "px";
        } else {
            document.getElementsByClassName("information-overlay")[0].style.visibility = "hidden";
        }
    }

    $scope.firstDP = function() {
        $scope.dateOptions.maxDate = new Date($scope.fy - 18, 5, 30);
        $scope.dateOptions.minDate = new Date(1950, 0, 1);
    }

    $scope.secondDp = function() {
        delete $scope.dateOptions.maxDate;
    }

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        // minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        showWeeks: false
    };


    $scope.open1 = function() {
        $scope.popup1.opened = true;
        $scope.firstDP();
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
        $scope.firstDP();
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'dd/MM/yyyy', 'd!/M!/yyyy'];
    $scope.format = $scope.formats[5];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [{
        date: tomorrow,
        status: 'full'
    }, {
        date: afterTomorrow,
        status: 'partially'
    }];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
    $scope.genderOption = true;
    $scope.genderOptionSpouse = false;
    $scope.spouseOption = false;
    $scope.houseOption = false;
    $scope.retirementAgeSpouse = 70;
    $scope.retirementAgeSpouseNew = 70;
    $scope.annualSalarySpouse = 90000;
    $scope.annualSalarySpouseNew = 90000;
    $scope.superBalanceSpouse = 200000;
    $scope.superBalanceSpouseNew = 200000;
    $scope.salarySacrificeSpouse = 5000;
    $scope.pensionStartSpouse = 65;
    $scope.insurancePremiumSpouse = 0;
    $scope.investmentReturnSpouse = 5.30;
    $scope.variableFeeSpouse = 1.11;
    $scope.fixedFeeSpouse = 300;
    $scope.pensionDrawdownBase = 40000;
    $scope.pensionDrawdownBaseSpouse = 30000;

    $scope.overlay = false;

    $scope.age = AgeCalculator.getAge($scope.dob, $scope.fy);
    $scope.ageSpouse = AgeCalculator.getAge($scope.dobSpouse, $scope.fy);

    $scope.newChangesApplied = false;

    $scope.enableNewSliders = true;

    $scope.saveWithNew = false;

    var leMember1 = $scope.genderOption ? maleExpectancy[$scope.age] : femaleExpectancy[$scope.age];

    var leMember2 = $scope.genderOptionSpouse ? maleExpectancy[$scope.ageSpouse] : femaleExpectancy[$scope.ageSpouse];

    $scope.showPensionOption = true;
    $scope.showPensionOptionSpouse = true;

    $('#select-spouse-option').on('changed.bs.select', function(e) {
        $scope.spouseOption = $(this).selectpicker('val') <= 0;
        // console.log("spouse option set to", $scope.spouseOption);
        $timeout(0);
        var assetsDiv = document.getElementById("other-assets-div");
        assetsDiv.classList.toggle("colorChange");
        if (!$scope.spouseOption) {
            assetsDiv.style.backgroundColor = "#fbefcc";
        } else {
            assetsDiv.style.backgroundColor = "#f2f5f6";
        }
    });

    $('#select-gender-option').on('changed.bs.select', function(e) {
        $scope.genderOption = $(this).selectpicker('val') <= 0;
        // console.log("gender option set to", $scope.genderOption);
        $timeout(0);
        leMember1 = $scope.genderOption ? maleExpectancy[$scope.age] : femaleExpectancy[$scope.age];
    });

    $('#select-gender-option-spouse').on('changed.bs.select', function(e) {
        $scope.genderOptionSpouse = $(this).selectpicker('val') > 0;
        // console.log("spouse gender option set to", $scope.genderOptionSpouse);
        $timeout(0);
        leMember2 = $scope.genderOptionSpouse ? maleExpectancy[$scope.ageSpouse] : femaleExpectancy[$scope.ageSpouse];

    });

    $('#select-house-option').on('changed.bs.select', function(e) {
        $scope.houseOption = $(this).selectpicker('val') <= 0;
        // console.log("house option set to", $scope.houseOption);
        $timeout(0);
    });

    $('#select-pension-drawdown').on('changed.bs.select', function(e) {
        $scope.showPensionOption = $(this).selectpicker('val') <= 0;
        // console.log("choose pension option set to", $scope.showPensionOption);
        $timeout(0);
    });

    $('#select-pension-drawdown-spouse').on('changed.bs.select', function(e) {
        $scope.showPensionOptionSpouse = $(this).selectpicker('val') <= 0;
        // console.log("choose spouse pension option set to", $scope.showPensionOptionSpouse);
        $timeout(0);
    });


    // $scope.genderChange = function(bool) {
    //     $scope.genderOption = bool;
    //     leMember1 = $scope.genderOption ? maleExpectancy[$scope.age] : femaleExpectancy[$scope.age];
    //     // calculateFinal();
    // };

    // $scope.genderChangeSpouse = function(bool) {
    //     $scope.genderOptionSpouse = bool;
    //     leMember2 = $scope.genderOptionSpouse ? maleExpectancy[$scope.ageSpouse] : femaleExpectancy[$scope.ageSpouse];
    //     // calculateFinal();
    // };

    $scope.retirementAge = 65;
    $scope.retirementAgeNew = 65;
    $scope.preservationAge = 55;
    $scope.preservationAgeSpouse = 55;

    $scope.annualSalary = 260000;
    $scope.annualSalaryNew = 260000;


    $scope.employerContributionLevel = 9.50;
    $scope.employerContributionLevelSpouse = 9.50;

    $scope.inflation = 3.50;
    $scope.inflationSpouse = 3.50;

    $scope.superBalance = 500000;
    $scope.superBalanceNew = 500000;

    $scope.wageIncrease = 4.00;
    $scope.wageIncreaseSpouse = 4.00;

    $scope.insurancePremium = 0;

    $scope.salarySacrifice = 20000;

    $scope.pensionStart = 57;

    $scope.investmentReturn = 5.30;

    $scope.variableFee = 1.11;

    $scope.fixedFee = 300;

    $scope.homeContents = 50000;
    $scope.vehicleCost = 0;
    $scope.investmentProperty = 2000;
    $scope.bankAssets = 20000;
    $scope.listedInvestment = 0;
    $scope.marginLoans = 0;
    $scope.allocatedPension = 60000;
    $scope.otherInvestment = 20000;
    $scope.netRentalIncome = 0;
    $scope.otherIncome = 0;
    $scope.pensionIncome = 0;

    $scope.target = 40000;
    $scope.targetNew = 40000;


    var retirementAgeSlider = document.getElementById('retirementAgeSlider'),
        retirementAgeSliderNew = document.getElementById('retirementAgeSliderNew'),
        annualSalarySlider = document.getElementById('annualSalarySlider'),
        annualSalarySliderNew = document.getElementById('annualSalarySliderNew'),
        employerContributionLevelSlider = document.getElementById('employerContributionLevelSlider'),
        employerContributionLevelSpouseSlider = document.getElementById('employerContributionLevelSpouseSlider'),
        superBalanceSlider = document.getElementById('superBalanceSlider'),
        superBalanceSliderNew = document.getElementById('superBalanceSliderNew'),
        inflationSlider = document.getElementById('inflationSlider'),
        inflationSpouseSlider = document.getElementById('inflationSpouseSlider'),
        wageIncreaseSlider = document.getElementById('wageIncreaseSlider'),
        wageIncreaseSpouseSlider = document.getElementById('wageIncreaseSpouseSlider'),
        insurancePremiumSlider = document.getElementById('insurancePremiumSlider'),
        salarySacrificeSlider = document.getElementById('salarySacrificeSlider'),
        pensionStartSlider = document.getElementById('pensionStartSlider'),
        investmentReturnSlider = document.getElementById('investmentReturnSlider'),
        variableFeeSlider = document.getElementById('variableFeeSlider'),
        fixedFeeSlider = document.getElementById('fixedFeeSlider'),
        annualSalarySpouseSlider = document.getElementById('annualSalarySpouseSlider'),
        annualSalarySpouseSliderNew = document.getElementById('annualSalarySpouseSliderNew'),
        superBalanceSpouseSlider = document.getElementById('superBalanceSpouseSlider'),
        superBalanceSpouseSliderNew = document.getElementById('superBalanceSpouseSliderNew'),
        salarySacrificeSpouseSlider = document.getElementById('salarySacrificeSpouseSlider'),
        pensionStartSpouseSlider = document.getElementById('pensionStartSpouseSlider'),
        insurancePremiumSpouseSlider = document.getElementById('insurancePremiumSpouseSlider'),
        investmentReturnSpouseSlider = document.getElementById('investmentReturnSpouseSlider'),
        variableFeeSpouseSlider = document.getElementById('variableFeeSpouseSlider'),
        fixedFeeSpouseSlider = document.getElementById('fixedFeeSpouseSlider'),
        retirementAgeSpouseSlider = document.getElementById('retirementAgeSpouseSlider'),
        retirementAgeSpouseSliderNew = document.getElementById('retirementAgeSpouseSliderNew'),
        pensionDrawdownBaseSlider = document.getElementById('pensionDrawdownBaseSlider'),
        pensionDrawdownBaseSpouseSlider = document.getElementById('pensionDrawdownBaseSpouseSlider'),
        homeContentsSlider = document.getElementById('homeContentsSlider'),
        vehicleCostSlider = document.getElementById('vehicleCostSlider'),
        investmentPropertySlider = document.getElementById('investmentPropertySlider'),
        bankAssetsSlider = document.getElementById('bankAssetsSlider'),
        listedInvestmentSlider = document.getElementById('listedInvestmentSlider'),
        marginLoansSlider = document.getElementById('marginLoansSlider'),
        allocatedPensionSlider = document.getElementById('allocatedPensionSlider'),
        otherInvestmentSlider = document.getElementById('otherInvestmentSlider'),
        netRentalIncomeSlider = document.getElementById('netRentalIncomeSlider'),
        otherIncomeSlider = document.getElementById('otherIncomeSlider'),
        pensionIncomeSlider = document.getElementById('pensionIncomeSlider'),
        targetSlider = document.getElementById('targetSlider'),
        targetSliderNew = document.getElementById('targetSliderNew');


    noUiSlider.create(targetSlider, {
        start: [$scope.target],
        range: {
            'min': [10000],
            'max': [100000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','

        }),
        connect: [false,false]
    });

    noUiSlider.create(targetSliderNew, {
        start: [$scope.targetNew],
        range: {
            'min': [10000],
            'max': [100000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','

        }),
        connect: [false,false]
    });


    noUiSlider.create(retirementAgeSlider, {
        start: [$scope.retirementAge],
        range: {
            'min': [60],
            'max': [75]
        },
        step: 1,
        format: wNumb({
            decimals: 0,
        }),
        connect: [false,false]
    });

    noUiSlider.create(retirementAgeSliderNew, {
        start: [$scope.retirementAgeNew],
        range: {
            'min': [60],
            'max': [75]
        },
        step: 1,
        format: wNumb({
            decimals: 0,
        }),
        connect: [false,false]
    });

    noUiSlider.create(annualSalarySlider, {
        start: [$scope.annualSalary],
        range: {
            'min': [0],
            'max': [600000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','

        }),
        connect: [false,false]
    });

        noUiSlider.create(annualSalarySliderNew, {
        start: [$scope.annualSalaryNew],
        range: {
            'min': [0],
            'max': [600000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','

        }),
        connect: [false,false]
    });

    noUiSlider.create(employerContributionLevelSlider, {
        start: [$scope.employerContributionLevel],
        range: {
            'min': [9],
            'max': [20]
        },
        step: 0.1,
        format: wNumb({
            decimals: 2,
            postfix: '%',
            // thousand: ','
        }),
        connect: [false,false]
    });

    noUiSlider.create(employerContributionLevelSpouseSlider, {
        start: [$scope.employerContributionLevelSpouse],
        range: {
            'min': [9],
            'max': [20]
        },
        step: 0.1,
        format: wNumb({
            decimals: 2,
            postfix: '%',
            // thousand: ','
        }),
        connect: [false,false]
    });

    noUiSlider.create(inflationSlider, {
        start: [$scope.inflation],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.1,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: [false,false]
    });

    noUiSlider.create(inflationSpouseSlider, {
        start: [$scope.inflationSpouse],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.1,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: [false,false]
    });

    noUiSlider.create(superBalanceSlider, {
        start: [$scope.superBalance],
        range: {
            'min': [0],
            'max': [3000000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

        noUiSlider.create(superBalanceSliderNew, {
        start: [$scope.superBalanceNew],
        range: {
            'min': [0],
            'max': [3000000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });


    noUiSlider.create(wageIncreaseSlider, {
        start: [$scope.wageIncrease],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.1,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: [false,false]
    });

    noUiSlider.create(wageIncreaseSpouseSlider, {
        start: [$scope.wageIncreaseSpouse],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.1,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: [false,false]
    });


    noUiSlider.create(insurancePremiumSlider, {
        start: [$scope.insurancePremium],
        range: {
            'min': [0],
            'max': [20000]
        },
        step: 100,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

    noUiSlider.create(salarySacrificeSlider, {
        start: [$scope.salarySacrifice],
        range: {
            'min': [0],
            'max': [35000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

    noUiSlider.create(pensionStartSlider, {
        start: [$scope.pensionStart],
        range: {
            'min': [55],
            'max': [65]
        },
        step: 1,
        format: wNumb({
            decimals: 0,
        }),
        connect: [false,false]
    });

    noUiSlider.create(investmentReturnSlider, {
        start: [$scope.investmentReturn],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.1,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: [false,false]
    });

    noUiSlider.create(variableFeeSlider, {
        start: [$scope.variableFee],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.01,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: [false,false]
    });

    noUiSlider.create(fixedFeeSlider, {
        start: [$scope.fixedFee],
        range: {
            'min': [0],
            'max': [20000]
        },
        step: 100,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

    noUiSlider.create(annualSalarySpouseSlider, {
        start: [$scope.annualSalarySpouse],
        range: {
            'min': [0],
            'max': [600000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','

        }),
        connect: [false,false]
    });

        noUiSlider.create(annualSalarySpouseSliderNew, {
        start: [$scope.annualSalarySpouseNew],
        range: {
            'min': [0],
            'max': [600000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','

        }),
        connect: [false,false]
    });

    noUiSlider.create(superBalanceSpouseSlider, {
        start: [$scope.superBalanceSpouse],
        range: {
            'min': [0],
            'max': [3000000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

        noUiSlider.create(superBalanceSpouseSliderNew, {
        start: [$scope.superBalanceSpouseNew],
        range: {
            'min': [0],
            'max': [3000000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

    noUiSlider.create(insurancePremiumSpouseSlider, {
        start: [$scope.insurancePremiumSpouse],
        range: {
            'min': [0],
            'max': [20000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

    noUiSlider.create(salarySacrificeSpouseSlider, {
        start: [$scope.salarySacrificeSpouse],
        range: {
            'min': [0],
            'max': [35000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

    noUiSlider.create(pensionStartSpouseSlider, {
        start: [$scope.pensionStartSpouse],
        range: {
            'min': [55],
            'max': [65]
        },
        step: 1,
        format: wNumb({
            decimals: 0,
        }),
        connect: [false,false]
    });
    noUiSlider.create(investmentReturnSpouseSlider, {
        start: [$scope.investmentReturnSpouse],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.1,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: [false,false]
    });


    noUiSlider.create(variableFeeSpouseSlider, {
        start: [$scope.variableFeeSpouse],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.01,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: [false,false]
    });

    noUiSlider.create(fixedFeeSpouseSlider, {
        start: [$scope.fixedFeeSpouse],
        range: {
            'min': [0],
            'max': [20000]
        },
        step: 100,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

    noUiSlider.create(retirementAgeSpouseSlider, {
        start: [$scope.retirementAgeSpouse],
        range: {
            'min': [60],
            'max': [75]
        },
        step: 1,
        format: wNumb({
            decimals: 0,
            // prefix: '$',
            // thousand: ','
        }),
        connect: [false,false]
    });

        noUiSlider.create(retirementAgeSpouseSliderNew, {
        start: [$scope.retirementAgeSpouseNew],
        range: {
            'min': [60],
            'max': [75]
        },
        step: 1,
        format: wNumb({
            decimals: 0,
            // prefix: '$',
            // thousand: ','
        }),
        connect: [false,false]
    });

    noUiSlider.create(pensionDrawdownBaseSlider, {
        start: [$scope.pensionDrawdownBase],
        range: {
            'min': [0],
            'max': [60000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

    noUiSlider.create(pensionDrawdownBaseSpouseSlider, {
        start: [$scope.pensionDrawdownBaseSpouse],
        range: {
            'min': [0],
            'max': [60000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

    noUiSlider.create(homeContentsSlider, {
        start: [$scope.homeContents],
        range: {
            'min': [0],
            'max': [500000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','

        }),
        connect: [false,false]
    });

    noUiSlider.create(vehicleCostSlider, {
        start: [$scope.vehicleCost],
        range: {
            'min': [0],
            'max': [500000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

    noUiSlider.create(listedInvestmentSlider, {
        start: [$scope.listedInvestment],
        range: {
            'min': [0],
            'max': [1000000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

    noUiSlider.create(investmentPropertySlider, {
        start: [$scope.investmentProperty],
        range: {
            'min': [0],
            'max': [2000000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

    noUiSlider.create(bankAssetsSlider, {
        start: [$scope.bankAssets],
        range: {
            'min': [0],
            'max': [1000000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

    noUiSlider.create(marginLoansSlider, {
        start: [$scope.marginLoans],
        range: {
            'min': [0],
            'max': [1000000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });


    noUiSlider.create(allocatedPensionSlider, {
        start: [$scope.allocatedPension],
        range: {
            'min': [0],
            'max': [100000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

    // noUiSlider.create(superFundsSlider, {
    //     start: [$scope.superFunds],
    //     range: {
    //         'min': [0],
    //         'max': [10000000]
    //     },
    //     step: 500,
    //     format: wNumb({
    //         decimals: 0,
    //         prefix: '$',
    //         thousand: ','
    //     }),
    //     connect: [false,false]
    // });

    noUiSlider.create(otherInvestmentSlider, {
        start: [$scope.otherInvestment],
        range: {
            'min': [0],
            'max': [200000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

    // noUiSlider.create(employmentIncomeSlider, {
    //     start: [$scope.employmentIncome],
    //     range: {
    //         'min': [0],
    //         'max': [10000000]
    //     },
    //     step: 500,
    //     format: wNumb({
    //         decimals: 0,
    //         prefix: '$',
    //         thousand: ','
    //     }),
    //     connect: [false,false]
    // });

    // noUiSlider.create(employmentIncomePartnerSlider, {
    //     start: [$scope.employmentIncomePartner],
    //     range: {
    //         'min': [0],
    //         'max': [10000000]
    //     },
    //     step: 500,
    //     format: wNumb({
    //         decimals: 0,
    //         prefix: '$',
    //         thousand: ','
    //     }),
    //     connect: [false,false]
    // });

    noUiSlider.create(netRentalIncomeSlider, {
        start: [$scope.netRentalIncome],
        range: {
            'min': [0],
            'max': [20000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });

    noUiSlider.create(otherIncomeSlider, {
        start: [$scope.otherIncome],
        range: {
            'min': [0],
            'max': [200000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });
    noUiSlider.create(pensionIncomeSlider, {
        start: [$scope.pensionIncome],
        range: {
            'min': [0],
            'max': [200000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: [false,false]
    });




    var ageInput = document.getElementById('ageInput'),
        retirementAgeInput = document.getElementById('retirementAgeInput'),
        retirementAgeInputNew = document.getElementById('retirementAgeInputNew'),
        annualSalaryInput = document.getElementById('annualSalaryInput'),
        annualSalaryInputNew = document.getElementById('annualSalaryInputNew'),
        employerContributionLevelInput = document.getElementById('employerContributionLevelInput'),
        employerContributionLevelSpouseInput = document.getElementById('employerContributionLevelSpouseInput'),
        superBalanceInput = document.getElementById('superBalanceInput'),
        superBalanceInputNew = document.getElementById('superBalanceInputNew'),
        // rateOfReturnInput = document.getElementById('rateOfReturnInput'),
        inflationInput = document.getElementById('inflationInput'),
        inflationSpouseInput = document.getElementById('inflationSpouseInput'),
        wageIncreaseInput = document.getElementById('wageIncreaseInput'),
        wageIncreaseSpouseInput = document.getElementById('wageIncreaseSpouseInput'),
        insurancePremiumInput = document.getElementById('insurancePremiumInput'),
        // superTaxRateInput = document.getElementById('superTaxRateInput'),
        salarySacrificeInput = document.getElementById('salarySacrificeInput'),
        pensionStartInput = document.getElementById('pensionStartInput'),
        investmentReturnInput = document.getElementById('investmentReturnInput'),
        variableFeeInput = document.getElementById('variableFeeInput'),
        fixedFeeInput = document.getElementById('fixedFeeInput'),
        annualSalarySpouseInput = document.getElementById('annualSalarySpouseInput'),
        annualSalarySpouseInputNew = document.getElementById('annualSalarySpouseInputNew'),
        superBalanceSpouseInput = document.getElementById('superBalanceSpouseInput'),
        superBalanceSpouseInputNew = document.getElementById('superBalanceSpouseInputNew'),
        salarySacrificeSpouseInput = document.getElementById('salarySacrificeSpouseInput'),
        pensionStartSpouseInput = document.getElementById('pensionStartSpouseInput'),
        insurancePremiumSpouseInput = document.getElementById('insurancePremiumSpouseInput'),
        investmentReturnSpouseInput = document.getElementById('investmentReturnSpouseInput'),
        variableFeeSpouseInput = document.getElementById('variableFeeSpouseInput'),
        fixedFeeSpouseInput = document.getElementById('fixedFeeSpouseInput'),
        retirementAgeSpouseInput = document.getElementById('retirementAgeSpouseInput'),
        retirementAgeSpouseInputNew = document.getElementById('retirementAgeSpouseInputNew'),
        pensionDrawdownBaseInput = document.getElementById('pensionDrawdownBaseInput'),
        pensionDrawdownBaseSpouseInput = document.getElementById('pensionDrawdownBaseSpouseInput'),
        homeContentsInput = document.getElementById('homeContentsInput'),
        vehicleCostInput = document.getElementById('vehicleCostInput'),
        investmentPropertyInput = document.getElementById('investmentPropertyInput'),
        bankAssetsInput = document.getElementById('bankAssetsInput'),
        listedInvestmentInput = document.getElementById('listedInvestmentInput'),
        marginLoansInput = document.getElementById('marginLoansInput'),
        allocatedPensionInput = document.getElementById('allocatedPensionInput'),
        // superFundsInput = document.getElementById('superFundsInput'),
        otherInvestmentInput = document.getElementById('otherInvestmentInput'),
        // employmentIncomeInput = document.getElementById('employmentIncomeInput'),
        // employmentIncomePartnerInput = document.getElementById('employmentIncomePartnerInput'),
        netRentalIncomeInput = document.getElementById('netRentalIncomeInput'),
        otherIncomeInput = document.getElementById('otherIncomeInput'),
        pensionIncomeInput = document.getElementById('pensionIncomeInput')
    targetInput = document.getElementById('targetInput'),
    targetInputNew = document.getElementById('targetInputNew');

    targetSlider.noUiSlider.on('update', function(values, handle) {
        targetInput.value = values[handle];
        $scope.target = (values[handle]);
    });

    targetSliderNew.noUiSlider.on('update', function(values, handle) {
        targetInputNew.value = values[handle];
        $scope.targetNew = (values[handle]);
    });

    retirementAgeSlider.noUiSlider.on('update', function(values, handle) {
        retirementAgeInput.value = values[handle];
        $scope.retirementAge = (values[handle]);
    });

        retirementAgeSliderNew.noUiSlider.on('update', function(values, handle) {
        retirementAgeInputNew.value = values[handle];
        $scope.retirementAgeNew = (values[handle]);
    });

    annualSalarySlider.noUiSlider.on('update', function(values, handle) {
        // console.log("sli up");
        annualSalaryInput.value = values[handle];
        $scope.annualSalary = (values[handle]);
        $timeout(0);
    });

        annualSalarySliderNew.noUiSlider.on('update', function(values, handle) {
            // console.log("newsli up");
        annualSalaryInputNew.value = values[handle];
        $scope.annualSalaryNew = (values[handle]);
        $timeout(0);
    });

    employerContributionLevelSlider.noUiSlider.on('update', function(values, handle) {
        employerContributionLevelInput.value = values[handle];
        $scope.employerContributionLevel = (values[handle]);
    });

    employerContributionLevelSpouseSlider.noUiSlider.on('update', function(values, handle) {
        employerContributionLevelSpouseInput.value = values[handle];
        $scope.employerContributionLevelSpouse = (values[handle]);
    });

    superBalanceSlider.noUiSlider.on('update', function(values, handle) {
        superBalanceInput.value = values[handle];
        $scope.superBalance = (values[handle]);
    });

    superBalanceSliderNew.noUiSlider.on('update', function(values, handle) {
        superBalanceInputNew.value = values[handle];
        $scope.superBalanceNew = (values[handle]);
    });

    // rateOfReturnSlider.noUiSlider.on('update', function(values, handle) {
    //     rateOfReturnInput.value = values[handle];
    //     $scope.rateOfReturn = (values[handle]);
    // });

    inflationSlider.noUiSlider.on('update', function(values, handle) {
        inflationInput.value = values[handle];
        $scope.inflation = (values[handle]);
    });

    inflationSpouseSlider.noUiSlider.on('update', function(values, handle) {
        inflationSpouseInput.value = values[handle];
        $scope.inflationSpouse = (values[handle]);
    });

    wageIncreaseSlider.noUiSlider.on('update', function(values, handle) {
        wageIncreaseInput.value = values[handle];
        $scope.wageIncrease = (values[handle]);
    });

    wageIncreaseSpouseSlider.noUiSlider.on('update', function(values, handle) {
        wageIncreaseSpouseInput.value = values[handle];
        $scope.wageIncreaseSpouse = (values[handle]);
    });

    insurancePremiumSlider.noUiSlider.on('update', function(values, handle) {
        insurancePremiumInput.value = values[handle];
        $scope.insurancePremium = (values[handle]);
    });

    // superTaxRateSlider.noUiSlider.on('update', function(values, handle) {
    //     superTaxRateInput.value = values[handle];
    //     $scope.superTaxRate = (values[handle]);
    // });

    salarySacrificeSlider.noUiSlider.on('update', function(values, handle) {
        salarySacrificeInput.value = values[handle];
        $scope.salarySacrifice = (values[handle]);
    });

    pensionStartSlider.noUiSlider.on('update', function(values, handle) {
        pensionStartInput.value = values[handle];
        $scope.pensionStart = (values[handle]);
    });

    investmentReturnSlider.noUiSlider.on('update', function(values, handle) {
        investmentReturnInput.value = values[handle];
        $scope.investmentReturn = (values[handle]);
    });

    variableFeeSlider.noUiSlider.on('update', function(values, handle) {
        variableFeeInput.value = values[handle];
        $scope.variableFee = (values[handle]);
    });

    fixedFeeSlider.noUiSlider.on('update', function(values, handle) {
        fixedFeeInput.value = values[handle];
        $scope.fixedFee = (values[handle]);
    });

    annualSalarySpouseSlider.noUiSlider.on('update', function(values, handle) {
        annualSalarySpouseInput.value = values[handle];
        $scope.annualSalarySpouse = (values[handle]);
    });

        annualSalarySpouseSliderNew.noUiSlider.on('update', function(values, handle) {
        annualSalarySpouseInputNew.value = values[handle];
        $scope.annualSalarySpouseNew = (values[handle]);
    });

    superBalanceSpouseSlider.noUiSlider.on('update', function(values, handle) {
        superBalanceSpouseInput.value = values[handle];
        $scope.superBalanceSpouse = (values[handle]);
    });

    superBalanceSpouseSliderNew.noUiSlider.on('update', function(values, handle) {
        superBalanceSpouseInputNew.value = values[handle];
        $scope.superBalanceSpouseNew = (values[handle]);
    });

    salarySacrificeSpouseSlider.noUiSlider.on('update', function(values, handle) {
        salarySacrificeSpouseInput.value = values[handle];
        $scope.salarySacrificeSpouse = (values[handle]);
    });

    pensionStartSpouseSlider.noUiSlider.on('update', function(values, handle) {
        pensionStartSpouseInput.value = values[handle];
        $scope.pensionStartSpouse = (values[handle]);
    });

    insurancePremiumSpouseSlider.noUiSlider.on('update', function(values, handle) {
        insurancePremiumSpouseInput.value = values[handle];
        $scope.insurancePremiumSpouse = (values[handle]);
    });

    investmentReturnSpouseSlider.noUiSlider.on('update', function(values, handle) {
        investmentReturnSpouseInput.value = values[handle];
        $scope.investmentReturnSpouse = (values[handle]);
    });

    variableFeeSpouseSlider.noUiSlider.on('update', function(values, handle) {
        variableFeeSpouseInput.value = values[handle];
        $scope.variableFeeSpouse = (values[handle]);
    });

    fixedFeeSpouseSlider.noUiSlider.on('update', function(values, handle) {
        fixedFeeSpouseInput.value = values[handle];
        $scope.fixedFeeSpouse = (values[handle]);
    });

    retirementAgeSpouseSlider.noUiSlider.on('update', function(values, handle) {
        retirementAgeSpouseInput.value = values[handle];
        $scope.retirementAgeSpouse = (values[handle]);
    });

    retirementAgeSpouseSliderNew.noUiSlider.on('update', function(values, handle) {
        retirementAgeSpouseInputNew.value = values[handle];
        $scope.retirementAgeSpouseNew = (values[handle]);
    });

    pensionDrawdownBaseSlider.noUiSlider.on('update', function(values, handle) {
        pensionDrawdownBaseInput.value = values[handle];
        $scope.pensionDrawdownBase = (values[handle]);
    });

    pensionDrawdownBaseSpouseSlider.noUiSlider.on('update', function(values, handle) {
        pensionDrawdownBaseSpouseInput.value = values[handle];
        $scope.pensionDrawdownBaseSpouse = (values[handle]);
    });

    homeContentsSlider.noUiSlider.on('update', function(values, handle) {
        homeContentsInput.value = values[handle];
        $scope.homeContents = (values[handle]);
    });

    vehicleCostSlider.noUiSlider.on('update', function(values, handle) {
        vehicleCostInput.value = values[handle];
        $scope.vehicleCost = (values[handle]);
    });

    investmentPropertySlider.noUiSlider.on('update', function(values, handle) {
        investmentPropertyInput.value = values[handle];
        $scope.investmentProperty = (values[handle]);
    });

    bankAssetsSlider.noUiSlider.on('update', function(values, handle) {
        bankAssetsInput.value = values[handle];
        $scope.bankAssets = (values[handle]);
    });

    listedInvestmentSlider.noUiSlider.on('update', function(values, handle) {
        listedInvestmentInput.value = values[handle];
        $scope.listedInvestment = (values[handle]);
    });

    marginLoansSlider.noUiSlider.on('update', function(values, handle) {
        marginLoansInput.value = values[handle];
        $scope.marginLoans = (values[handle]);
    });

    allocatedPensionSlider.noUiSlider.on('update', function(values, handle) {
        allocatedPensionInput.value = values[handle];
        $scope.allocatedPension = (values[handle]);
    });

    // superFundsSlider.noUiSlider.on('update', function(values, handle) {
    //     superFundsInput.value = values[handle];
    //     $scope.superFunds = (values[handle]);
    // });

    otherInvestmentSlider.noUiSlider.on('update', function(values, handle) {
        otherInvestmentInput.value = values[handle];
        $scope.otherInvestment = (values[handle]);
    });

    // employmentIncomeSlider.noUiSlider.on('update', function(values, handle) {
    //     employmentIncomeInput.value = values[handle];
    //     $scope.employmentIncome = (values[handle]);
    // });

    // employmentIncomePartnerSlider.noUiSlider.on('update', function(values, handle) {
    //     employmentIncomePartnerInput.value = values[handle];
    //     $scope.employmentIncomePartner = (values[handle]);
    // });

    netRentalIncomeSlider.noUiSlider.on('update', function(values, handle) {
        netRentalIncomeInput.value = values[handle];
        $scope.netRentalIncome = (values[handle]);
    });

    otherIncomeSlider.noUiSlider.on('update', function(values, handle) {
        otherIncomeInput.value = values[handle];
        $scope.otherIncome = (values[handle]);
    });
    pensionIncomeSlider.noUiSlider.on('update', function(values, handle) {
        pensionIncomeInput.value = values[handle];
        $scope.pensionIncome = (values[handle]);
    });

    function preservationTable(ageTemp) {
        var temp;
        switch (ageTemp) {
            case 56:
                temp = 56;
                break;
            case 55:
                temp = 57;
                break;
            case 54:
                temp = 58;
                break;
            case 53:
                temp = 59;
                break;
            default:
                if ($scope.age > 56) { temp = 55 } else { temp = 60 }
                break;
        }
        return temp;
    }

    function preservationChange(temp) {
        if (temp) {
            $scope.preservationAge = preservationTable($scope.age);
        } else {
            $scope.preservationAgeSpouse = preservationTable($scope.ageSpouse);
        }

    }

    $scope.ageChange = function() {
        var dobText = document.getElementById("dobText");
        var dateString = dobText.value;
        var dateArr = dateString.split("/");

        var date_regex = /^([1-9]|0[1-9]|1\d|2\d|3[01])\/(0[1-9]|[1-9]|1[0-2])\/(19[5-9][0-9])$/;
        var correct = date_regex.test(dobText.value);
        var fd = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
        if (((fd.getMonth() + 1) === Number(dateArr[1]) && fd.getDate() === Number(dateArr[0])) && correct) {
            $scope.dob = fd;
        } else {
            $scope.dob = initDate;
        }
        $scope.age = AgeCalculator.getAge($scope.dob, $scope.fy);
        leMember1 = $scope.genderOption ? maleExpectancy[$scope.age] : femaleExpectancy[$scope.age];
        if ($scope.age > 59) {
            retirementAgeSlider.noUiSlider.updateOptions({
                range: {
                    'min': ($scope.age + 1),
                    'max': 75
                }
            });
            retirementAgeSliderNew.noUiSlider.updateOptions({
                range: {
                    'min': ($scope.age + 1),
                    'max': 75
                }
            });
        } else {
            retirementAgeSlider.noUiSlider.updateOptions({
                range: {
                    'min': 60,
                    'max': 75
                }
            });
            retirementAgeSliderNew.noUiSlider.updateOptions({
                range: {
                    'min': 60,
                    'max': 75
                }
            });
        }
        preservationChange(true);
        if (Number($scope.preservationAge) == Number($scope.retirementAge)) {
            $scope.pensionStart = Number($scope.preservationAge);
            pensionStartSlider.setAttribute('disabled', true);
        } else {
            pensionStartSlider.removeAttribute('disabled');
            pensionStartSlider.noUiSlider.updateOptions({
                range: {
                    'min': (Number($scope.preservationAge)),
                    'max': (Number($scope.retirementAge))
                }
            });
        }

        changeCCLimit();
    }


    $scope.ageChange2 = function() {
        var dobText = document.getElementById("dobTextSpouse");
        var dateString = dobText.value;
        var dateArr = dateString.split("/");

        var date_regex = /^([1-9]|0[1-9]|1\d|2\d|3[01])\/(0[1-9]|[1-9]|1[0-2])\/(19[5-9][0-9])$/;
        var correct = date_regex.test(dobText.value);
        var fd = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
        if (((fd.getMonth() + 1) === Number(dateArr[1]) && fd.getDate() === Number(dateArr[0])) && correct) {
            $scope.dobSpouse = fd;
        } else {
            $scope.dobSpouse = initDate;
        }
        $scope.ageSpouse = AgeCalculator.getAge($scope.dobSpouse, $scope.fy);
        leMember2 = $scope.genderOptionSpouse ? maleExpectancy[$scope.ageSpouse] : femaleExpectancy[$scope.ageSpouse];
        if ($scope.ageSpouse > 59) {
            retirementAgeSpouseSlider.noUiSlider.updateOptions({
                range: {
                    'min': ($scope.ageSpouse + 1),
                    'max': 75
                }
            });
            retirementAgeSpouseSliderNew.noUiSlider.updateOptions({
                range: {
                    'min': ($scope.ageSpouse + 1),
                    'max': 75
                }
            });
        } else {
            retirementAgeSpouseSlider.noUiSlider.updateOptions({
                range: {
                    'min': 60,
                    'max': 75
                }
            });
            retirementAgeSpouseSliderNew.noUiSlider.updateOptions({
                range: {
                    'min': 60,
                    'max': 75
                }
            });
        }
        preservationChange(false);

        if (Number($scope.preservationAgeSpouse) == Number($scope.retirementAgeSpouse)) {
            $scope.pensionStartSpouse = Number($scope.preservationAgeSpouse);
            pensionStartSpouseSlider.setAttribute('disabled', true);
        } else {
            pensionStartSpouseSlider.removeAttribute('disabled');
            pensionStartSpouseSlider.noUiSlider.updateOptions({
                range: {
                    'min': (Number($scope.preservationAgeSpouse)),
                    'max': (Number($scope.retirementAgeSpouse))
                }
            });
        }





        changeCCLimitSpouse();
    }

    retirementAgeInput.addEventListener("change", function() {
        retirementAgeSlider.noUiSlider.set($scope.retirementAge);
    });

    retirementAgeInputNew.addEventListener("change", function() {
        retirementAgeSliderNew.noUiSlider.set($scope.retirementAgeNew);
    });

    annualSalaryInput.addEventListener("change", function() {
        // console.log("sli ch");
        annualSalarySlider.noUiSlider.set($scope.annualSalary);
    });

        annualSalaryInputNew.addEventListener("change", function() {
                        // console.log("newsli change");

        annualSalarySliderNew.noUiSlider.set($scope.annualSalaryNew);
    });

    employerContributionLevelInput.addEventListener("change", function() {
        employerContributionLevelSlider.noUiSlider.set($scope.employerContributionLevel);
    });

    employerContributionLevelSpouseInput.addEventListener("change", function() {
        employerContributionLevelSpouseSlider.noUiSlider.set($scope.employerContributionLevelSpouse);
    });

    superBalanceInput.addEventListener("change", function() {
        superBalanceSlider.noUiSlider.set($scope.superBalance);
    });

    superBalanceInputNew.addEventListener("change", function() {
        superBalanceSliderNew.noUiSlider.set($scope.superBalanceNew);
    });


    inflationInput.addEventListener("change", function() {
        inflationSlider.noUiSlider.set($scope.inflation);
    });

    inflationSpouseInput.addEventListener("change", function() {
        inflationSpouseSlider.noUiSlider.set($scope.inflationSpouse);
    });

    wageIncreaseInput.addEventListener("change", function() {
        wageIncreaseSlider.noUiSlider.set($scope.wageIncrease);
    });

    wageIncreaseSpouseInput.addEventListener("change", function() {
        wageIncreaseSpouseSlider.noUiSlider.set($scope.wageIncreaseSpouse);
    });

    insurancePremiumInput.addEventListener("change", function() {
        insurancePremiumSlider.noUiSlider.set($scope.insurancePremium);
    });


    salarySacrificeInput.addEventListener("change", function() {
        salarySacrificeSlider.noUiSlider.set($scope.salarySacrifice);
    });

    pensionStartInput.addEventListener("change", function() {
        pensionStartSlider.noUiSlider.set($scope.pensionStart);
    });

    investmentReturnInput.addEventListener("change", function() {
        investmentReturnSlider.noUiSlider.set($scope.investmentReturn);
    });

    variableFeeInput.addEventListener("change", function() {
        variableFeeSlider.noUiSlider.set($scope.variableFee);
    });

    fixedFeeInput.addEventListener("change", function() {
        fixedFeeSlider.noUiSlider.set($scope.fixedFee);
    });

    annualSalarySpouseInput.addEventListener("change", function() {
        annualSalarySpouseSlider.noUiSlider.set($scope.annualSalarySpouse);
    });

        annualSalarySpouseInputNew.addEventListener("change", function() {
        annualSalarySpouseSliderNew.noUiSlider.set($scope.annualSalarySpouseNew);
    });

    superBalanceSpouseInput.addEventListener("change", function() {
        superBalanceSpouseSlider.noUiSlider.set($scope.superBalanceSpouse);
    });

        superBalanceSpouseInputNew.addEventListener("change", function() {
        superBalanceSpouseSliderNew.noUiSlider.set($scope.superBalanceSpouseNew);
    });

    salarySacrificeSpouseInput.addEventListener("change", function() {
        salarySacrificeSpouseSlider.noUiSlider.set($scope.salarySacrificeSpouse);
    });

    pensionStartSpouseInput.addEventListener("change", function() {
        pensionStartSpouseSlider.noUiSlider.set($scope.pensionStartSpouse);
    });

    insurancePremiumSpouseInput.addEventListener("change", function() {
        insurancePremiumSpouseSlider.noUiSlider.set($scope.insurancePremiumSpouse);
    });

    investmentReturnSpouseInput.addEventListener("change", function() {
        investmentReturnSpouseSlider.noUiSlider.set($scope.investmentReturnSpouse);
    });

    variableFeeSpouseInput.addEventListener("change", function() {
        variableFeeSpouseSlider.noUiSlider.set($scope.variableFeeSpouse);
    });

    fixedFeeSpouseInput.addEventListener("change", function() {
        fixedFeeSpouseSlider.noUiSlider.set($scope.fixedFeeSpouse);
    });

    retirementAgeSpouseInput.addEventListener("change", function() {
        retirementAgeSpouseSlider.noUiSlider.set($scope.retirementAgeSpouse);
    });

    retirementAgeSpouseInputNew.addEventListener("change", function() {
        retirementAgeSpouseSliderNew.noUiSlider.set($scope.retirementAgeSpouseNew);
    });

    pensionDrawdownBaseInput.addEventListener("change", function() {
        pensionDrawdownBaseSlider.noUiSlider.set($scope.pensionDrawdownBase);
    });

    pensionDrawdownBaseSpouseInput.addEventListener("change", function() {
        pensionDrawdownBaseSpouseSlider.noUiSlider.set($scope.pensionDrawdownBaseSpouse);
    });

    homeContentsInput.addEventListener("change", function() {
        homeContentsSlider.noUiSlider.set($scope.homeContents);
    });

    vehicleCostInput.addEventListener("change", function() {
        vehicleCostSlider.noUiSlider.set($scope.vehicleCost);
    });

    investmentPropertyInput.addEventListener("change", function() {
        investmentPropertySlider.noUiSlider.set($scope.investmentProperty);
    });

    bankAssetsInput.addEventListener("change", function() {
        bankAssetsSlider.noUiSlider.set($scope.bankAssets);
    });

    listedInvestmentInput.addEventListener("change", function() {
        listedInvestmentSlider.noUiSlider.set($scope.listedInvestment);
    });

    marginLoansInput.addEventListener("change", function() {
        marginLoansSlider.noUiSlider.set($scope.marginLoans);
    });

    allocatedPensionInput.addEventListener("change", function() {
        allocatedPensionSlider.noUiSlider.set($scope.allocatedPension);
    });

    otherInvestmentInput.addEventListener("change", function() {
        otherInvestmentSlider.noUiSlider.set($scope.otherInvestment);
    });


    netRentalIncomeInput.addEventListener("change", function() {
        netRentalIncomeSlider.noUiSlider.set($scope.netRentalIncome);
    });

    otherIncomeInput.addEventListener("change", function() {
        otherIncomeSlider.noUiSlider.set($scope.otherIncome);
    });
    pensionIncomeInput.addEventListener("change", function() {
        pensionIncomeSlider.noUiSlider.set($scope.pensionIncome);
    });

    targetInput.addEventListener("change", function() {
        targetSlider.noUiSlider.set($scope.target);
    });

    targetInputNew.addEventListener("change", function() {
        targetSliderNew.noUiSlider.set($scope.targetNew);
    });


    retirementAgeSlider.noUiSlider.on('set', function(values, handle) {
        $scope.enableNewSliders = false;
        retirementAgeInput.value = values[handle];
        $scope.retirementAge = (values[handle]);
        retirementAgeSliderNew.noUiSlider.set($scope.retirementAge);
        preservationChange(true);
        if (Number($scope.preservationAge) == Number($scope.retirementAge)) {
            $scope.pensionStart = Number($scope.preservationAge);
            pensionStartSlider.setAttribute('disabled', true);
        } else {
            pensionStartSlider.removeAttribute('disabled');
            pensionStartSlider.noUiSlider.updateOptions({
                range: {
                    'min': (Number($scope.preservationAge)),
                    'max': (Number($scope.retirementAge))
                }
            });
        }
        $scope.enableNewSliders = true;

        // calculateFinal();
        $timeout(0);
    });

        retirementAgeSliderNew.noUiSlider.on('set', function(values, handle) {
            $scope.saveWithNew = true;
            $scope.newChangesApplied = true;
        retirementAgeInputNew.value = values[handle];
        $scope.retirementAgeNew = (values[handle]);
        preservationChange(true);
        if (Number($scope.preservationAge) == Number($scope.retirementAgeNew)) {
            $scope.pensionStart = Number($scope.preservationAge);
            pensionStartSlider.setAttribute('disabled', true);
        } else {
            pensionStartSlider.removeAttribute('disabled');
            pensionStartSlider.noUiSlider.updateOptions({
                range: {
                    'min': (Number($scope.preservationAge)),
                    'max': (Number($scope.retirementAgeNew))
                }
            });
        }
        if($scope.enableNewSliders){
        $scope.calculateFinal(true,false);
        }
        $scope.newChangesApplied = false;
        $timeout(0);
    });

    annualSalarySlider.noUiSlider.on('set', function(values, handle){
        // console.log("sli set");
                $scope.enableNewSliders = false;
        annualSalaryInput.value = values[handle];
        $scope.annualSalary = (values[handle]);
        annualSalarySliderNew.noUiSlider.set($scope.annualSalary);
        changeCCLimit();
        // calculateFinal();
         $scope.enableNewSliders = true;
        $timeout(0);
    });

        annualSalarySliderNew.noUiSlider.on('set', function(values, handle){
            $scope.saveWithNew = true;
        $scope.newChangesApplied = true;
        annualSalaryInputNew.value = values[handle];
        $scope.annualSalaryNew = (values[handle]);
        changeCCLimit();
                if($scope.enableNewSliders){
        $scope.calculateFinal(true,false);
    }
        $timeout(0);
        $scope.newChangesApplied = false;
    });

    employerContributionLevelSlider.noUiSlider.on('set', function(values, handle) {
        employerContributionLevelInput.value = values[handle];
        $scope.employerContributionLevel = (values[handle]);
        changeCCLimit();
        // calculateFinal();
        $timeout(0);
    });

    employerContributionLevelSpouseSlider.noUiSlider.on('set', function(values, handle) {
        employerContributionLevelSpouseInput.value = values[handle];
        $scope.employerContributionLevelSpouse = (values[handle]);
        changeCCLimitSpouse();
        // calculateFinal();
        $timeout(0);
    });

    superBalanceSlider.noUiSlider.on('set', function(values, handle) {
        $scope.enableNewSliders = false;
        superBalanceInput.value = values[handle];
        $scope.superBalance = (values[handle]);
        superBalanceSliderNew.noUiSlider.set($scope.superBalance);
        // calculateFinal();
        $scope.enableNewSliders = true;
        $timeout(0);
    });

    superBalanceSliderNew.noUiSlider.on('set', function(values, handle) {
        $scope.saveWithNew = true;
        $scope.newChangesApplied = true;
        superBalanceInputNew.value = values[handle];
        $scope.superBalanceNew = (values[handle]);
        if($scope.enableNewSliders){
        $scope.calculateFinal(true,false);
        }
        $timeout(0);
        $scope.newChangesApplied = false;        
    });

    inflationSlider.noUiSlider.on('set', function(values, handle) {
        inflationInput.value = values[handle];
        $scope.inflation = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    wageIncreaseSlider.noUiSlider.on('set', function(values, handle) {
        wageIncreaseInput.value = values[handle];
        $scope.wageIncrease = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    inflationSpouseSlider.noUiSlider.on('set', function(values, handle) {
        inflationSpouseInput.value = values[handle];
        $scope.inflationSpouse = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    wageIncreaseSpouseSlider.noUiSlider.on('set', function(values, handle) {
        wageIncreaseSpouseInput.value = values[handle];
        $scope.wageIncreaseSpouse = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    insurancePremiumSlider.noUiSlider.on('set', function(values, handle) {
        insurancePremiumInput.value = values[handle];
        $scope.insurancePremium = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    salarySacrificeSlider.noUiSlider.on('set', function(values, handle) {
        salarySacrificeInput.value = values[handle];
        $scope.salarySacrifice = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    pensionStartSlider.noUiSlider.on('set', function(values, handle) {
        pensionStartInput.value = values[handle];
        $scope.pensionStart = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    investmentReturnSlider.noUiSlider.on('set', function(values, handle) {
        investmentReturnInput.value = values[handle];
        $scope.investmentReturn = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    variableFeeSlider.noUiSlider.on('set', function(values, handle) {
        variableFeeInput.value = values[handle];
        $scope.variableFee = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    fixedFeeSlider.noUiSlider.on('set', function(values, handle) {
        fixedFeeInput.value = values[handle];
        $scope.fixedFee = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    annualSalarySpouseSlider.noUiSlider.on('set', function(values, handle) {
        $scope.enableNewSliders = false;
        annualSalarySpouseInput.value = values[handle];
        $scope.annualSalarySpouse = (values[handle]);
        annualSalarySpouseSliderNew.noUiSlider.set($scope.annualSalarySpouse);
        changeCCLimitSpouse();
        // calculateFinal();
        $scope.enableNewSliders = true;
        $timeout(0);
    });

    annualSalarySpouseSliderNew.noUiSlider.on('set', function(values, handle) {
        $scope.saveWithNew = true;
        $scope.newChangesApplied = true;
        annualSalarySpouseInputNew.value = values[handle];
        $scope.annualSalarySpouse = (values[handle]);
        changeCCLimitSpouse();
        if($scope.enableNewSliders){
        $scope.calculateFinal(true,false);
        }   
        $scope.newChangesApplied = false;
        $timeout(0);
    });

    superBalanceSpouseSlider.noUiSlider.on('set', function(values, handle) {
        $scope.enableNewSliders = false;
        superBalanceSpouseInput.value = values[handle];
        $scope.superBalanceSpouse = (values[handle]);
        superBalanceSpouseSliderNew.noUiSlider.set($scope.superBalanceSpouse);
        // calculateFinal();
        $scope.enableNewSliders = true;
        $timeout(0);
    });

        superBalanceSpouseSliderNew.noUiSlider.on('set', function(values, handle) {
            $scope.saveWithNew = true;
        $scope.newChangesApplied = true;
        superBalanceSpouseInputNew.value = values[handle];
        $scope.superBalanceSpouseNew = (values[handle]);
        if($scope.enableNewSliders){
        $scope.calculateFinal(true,false);
        }
        $scope.newChangesApplied = false;
        $timeout(0);
    });

    salarySacrificeSpouseSlider.noUiSlider.on('set', function(values, handle) {
        salarySacrificeSpouseInput.value = values[handle];
        $scope.salarySacrificeSpouse = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    pensionStartSpouseSlider.noUiSlider.on('set', function(values, handle) {
        pensionStartSpouseInput.value = values[handle];
        $scope.pensionStartSpouse = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    insurancePremiumSpouseSlider.noUiSlider.on('set', function(values, handle) {
        insurancePremiumSpouseInput.value = values[handle];
        $scope.insurancePremiumSpouse = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    investmentReturnSpouseSlider.noUiSlider.on('set', function(values, handle) {
        investmentReturnSpouseInput.value = values[handle];
        $scope.investmentReturnSpouse = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    variableFeeSpouseSlider.noUiSlider.on('set', function(values, handle) {
        variableFeeSpouseInput.value = values[handle];
        $scope.variableFeeSpouse = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    fixedFeeSpouseSlider.noUiSlider.on('set', function(values, handle) {
        fixedFeeSpouseInput.value = values[handle];
        $scope.fixedFeeSpouse = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    retirementAgeSpouseSlider.noUiSlider.on('set', function(values, handle) {
        $scope.enableNewSliders = false;
        retirementAgeSpouseInput.value = values[handle];
        $scope.retirementAgeSpouse = (values[handle]);
        retirementAgeSpouseSliderNew.noUiSlider.set($scope.retirementAgeSpouse);
        preservationChange(false);
        if (Number($scope.preservationAgeSpouse) == Number($scope.retirementAgeSpouse)) {
            $scope.pensionStartSpouse = Number($scope.preservationAgeSpouse);
            pensionStartSpouseSlider.setAttribute('disabled', true);
        } else {
            pensionStartSpouseSlider.removeAttribute('disabled');
            pensionStartSpouseSlider.noUiSlider.updateOptions({
                range: {
                    'min': (Number($scope.preservationAgeSpouse)),
                    'max': (Number($scope.retirementAgeSpouse))
                }
            });
        }
        $scope.enableNewSliders = true;

        // calculateFinal();
        $timeout(0);
    });

    retirementAgeSpouseSliderNew.noUiSlider.on('set', function(values, handle) {
        $scope.saveWithNew = true;
        $scope.newChangesApplied = true;
        retirementAgeSpouseInputNew.value = values[handle];
        $scope.retirementAgeSpouseNew = (values[handle]);
        preservationChange(false);
        if (Number($scope.preservationAgeSpouse) == Number($scope.retirementAgeSpouseNew)) {
            $scope.pensionStartSpouse = Number($scope.preservationAgeSpouse);
            pensionStartSpouseSlider.setAttribute('disabled', true);
        } else {
            pensionStartSpouseSlider.removeAttribute('disabled');
            pensionStartSpouseSlider.noUiSlider.updateOptions({
                range: {
                    'min': (Number($scope.preservationAgeSpouse)),
                    'max': (Number($scope.retirementAgeSpouseNew))
                }
            });
        }
        if($scope.enableNewSliders){
        $scope.calculateFinal(true,false);
    }
        $scope.newChangesApplied = true;
        $timeout(0);
    });

    pensionDrawdownBaseSlider.noUiSlider.on('set', function(values, handle) {
        pensionDrawdownBaseInput.value = values[handle];
        $scope.pensionDrawdownBase = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    pensionDrawdownBaseSpouseSlider.noUiSlider.on('set', function(values, handle) {
        pensionDrawdownBaseSpouseInput.value = values[handle];
        $scope.pensionDrawdownBaseSpouse = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    homeContentsSlider.noUiSlider.on('set', function(values, handle) {
        homeContentsInput.value = values[handle];
        $scope.homeContents = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    vehicleCostSlider.noUiSlider.on('set', function(values, handle) {
        vehicleCostInput.value = values[handle];
        $scope.vehicleCost = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    investmentPropertySlider.noUiSlider.on('set', function(values, handle) {
        investmentPropertyInput.value = values[handle];
        $scope.investmentProperty = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    bankAssetsSlider.noUiSlider.on('set', function(values, handle) {
        bankAssetsInput.value = values[handle];
        $scope.bankAssets = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    listedInvestmentSlider.noUiSlider.on('set', function(values, handle) {
        listedInvestmentInput.value = values[handle];
        $scope.listedInvestment = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    marginLoansSlider.noUiSlider.on('set', function(values, handle) {
        marginLoansInput.value = values[handle];
        $scope.marginLoans = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    allocatedPensionSlider.noUiSlider.on('set', function(values, handle) {
        allocatedPensionInput.value = values[handle];
        $scope.allocatedPension = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    otherInvestmentSlider.noUiSlider.on('set', function(values, handle) {
        otherInvestmentInput.value = values[handle];
        $scope.otherInvestment = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });


    netRentalIncomeSlider.noUiSlider.on('set', function(values, handle) {
        netRentalIncomeInput.value = values[handle];
        $scope.netRentalIncome = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    otherIncomeSlider.noUiSlider.on('set', function(values, handle) {
        otherIncomeInput.value = values[handle];
        $scope.otherIncome = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });
    pensionIncomeSlider.noUiSlider.on('set', function(values, handle) {
        pensionIncomeInput.value = values[handle];
        $scope.pensionIncome = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    targetSlider.noUiSlider.on('set', function(values, handle) {
        $scope.enableNewSliders = false;
        targetInput.value = values[handle];
        $scope.target = (values[handle]);
        targetSliderNew.noUiSlider.set($scope.target);
        // calculateFinal();
        $scope.enableNewSliders = true;
        $timeout(0);
    });

    targetSliderNew.noUiSlider.on('set', function(values, handle) {
        $scope.saveWithNew = true;
        $scope.newChangesApplied = true;
        targetInputNew.value = values[handle];
        $scope.target = (values[handle]);
        if($scope.enableNewSliders){
        $scope.calculateFinal(true,false);
    }
        $scope.newChangesApplied = false;
        $timeout(0);
    });


    $scope.spouseOptionChange = function(spouse) {
        $scope.spouseOption = spouse;
        // calculateFinal();
        $timeout(0);
    }

    $scope.houseOptionChange = function(ownHouse) {
        $scope.houseOption = ownHouse;
        // calculateFinal();
        $timeout(0);
    }


    function calculateMinPension(age) {
        if (age >= 56 && age <= 64) {
            return 4;
        }
        if (age >= 65 && age <= 74) {
            return 5;
        }
        if (age >= 75 && age <= 79) {
            return 6;
        }
        if (age >= 80 && age <= 84) {
            return 7;
        }
        if (age >= 85 && age <= 89) {
            return 9;
        }
        if (age >= 90 && age <= 94) {
            return 11;
        }
        if (age >= 95) {
            return 14;
        }
    }

    function cLookUp(sal) {
        if (sal <= 249999) {
            return 0.15;
        } else {
            return 0.3;
        }
    }

    function changeCCLimit() {
        var salary = $scope.newChangesApplied ? Number($scope.annualSalaryNew.replaceAll('$', '').replaceAll(',', '')) : Number($scope.annualSalary.replaceAll('$', '').replaceAll(',', ''));
        var empContributionPerc = Number($scope.employerContributionLevel.replaceAll('%', ''));
        var empContribution = salary * (empContributionPerc / 100) > 19615.60 ? 19615.60 : salary * (empContributionPerc / 100);
        var ccLimit = $scope.age >= 49 ? 35000 - empContribution : 30000 - empContribution;
        if (ccLimit < 0) {
            ccLimit = 0.4;
        }
        salarySacrificeSlider.noUiSlider.updateOptions({
            range: {
                'min': 0,
                'max': ccLimit
            }
        });

    }

    function changeCCLimitSpouse() {
        var salary = $scope.newChangesApplied ? Number($scope.annualSalarySpouseNew.replaceAll('$', '').replaceAll(',', '')) : Number($scope.annualSalarySpouse.replaceAll('$', '').replaceAll(',', ''));
        var empContributionPerc = Number($scope.employerContributionLevelSpouse.replaceAll('%', ''));
        var empContribution = salary * (empContributionPerc / 100) > 19615.60 ? 19615.60 : salary * (empContributionPerc / 100);
        var ccLimit = $scope.ageSpouse >= 49 ? 35000 - empContribution : 30000 - empContribution;
        if (ccLimit < 0) {
            ccLimit = 0.4;
        }
        salarySacrificeSpouseSlider.noUiSlider.updateOptions({
            range: {
                'min': 0,
                'max': ccLimit
            }
        });

    }

    changeCCLimit();

    changeCCLimitSpouse();

    $scope.isCouple = true;

    $scope.ownsHome = true;

    $scope.minPension = true;

    $scope.ddPercent = 4.00;

    $scope.ddBase = 40000;

    $scope.minPensionSpouse = true;

    $scope.ddBaseSpouse = 30000;

    function biCount(spouse) {

        if (!spouse) {
            var annualSalary = $scope.newChangesApplied ? Number($scope.annualSalaryNew.replaceAll('$', '').replaceAll(',', '')) : Number($scope.annualSalary.replaceAll('$', '').replaceAll(',', ''));

            var superBalance = $scope.newChangesApplied ? Number($scope.superBalanceNew.replaceAll('$', '').replaceAll(',', '')) : Number($scope.superBalance.replaceAll('$', '').replaceAll(',', ''));

            var wageIncrease = Number($scope.wageIncrease.replaceAll('%', ''));

            var inflation = Number($scope.inflation.replaceAll('%', ''));
            var inflationSpouse = Number($scope.inflationSpouse.replaceAll('%', ''));

            var investmentReturn = Number($scope.investmentReturn.replaceAll('%', ''));

            var variableFee = Number($scope.variableFee.replaceAll('%', ''));

            var employerContributionLevel = Number($scope.employerContributionLevel.replaceAll('%', ''));

            var salarySacrifice = Number($scope.salarySacrifice.replaceAll('$', '').replaceAll(',', ''));

            // var salarySacrifice = 20000;

            var fixedFee = Number($scope.fixedFee.replaceAll('$', '').replaceAll(',', ''));

            var insurancePremium = Number($scope.insurancePremium.replaceAll('$', '').replaceAll(',', ''));

            var retirementAge = $scope.newChangesApplied ? Number($scope.retirementAgeNew) : Number($scope.retirementAge);

            var pensionStart = Number($scope.pensionStart);

            var minPension = !$scope.showPensionOption;


            var ddBase = Number($scope.pensionDrawdownBase.replaceAll('$', '').replaceAll(',', ''));

            var ageL = Number($scope.age);

        } else {
            var annualSalary = $scope.newChangesApplied ? Number($scope.annualSalarySpouseNew.replaceAll('$', '').replaceAll(',', '')) : Number($scope.annualSalarySpouse.replaceAll('$', '').replaceAll(',', ''));

            var superBalance = $scope.newChangesApplied ? Number($scope.superBalanceSpouseNew.replaceAll('$', '').replaceAll(',', '')) : Number($scope.superBalanceSpouse.replaceAll('$', '').replaceAll(',', ''));

            var wageIncrease = Number($scope.wageIncreaseSpouse.replaceAll('%', ''));

            var inflation = Number($scope.inflationSpouse.replaceAll('%', ''));

            var investmentReturn = Number($scope.investmentReturnSpouse.replaceAll('%', ''));

            var variableFee = Number($scope.variableFeeSpouse.replaceAll('%', ''));

            var employerContributionLevel = Number($scope.employerContributionLevelSpouse.replaceAll('%', ''));

            var salarySacrifice = Number($scope.salarySacrificeSpouse.replaceAll('$', '').replaceAll(',', ''));

            // var salarySacrifice = 5000;

            var fixedFee = Number($scope.fixedFeeSpouse.replaceAll('$', '').replaceAll(',', ''));

            var insurancePremium = Number($scope.insurancePremiumSpouse.replaceAll('$', '').replaceAll(',', ''));

            var retirementAge = $scope.newChangesApplied ? Number($scope.retirementAgeSpouseNew) : Number($scope.retirementAgeSpouse);


            var pensionStart = Number($scope.pensionStartSpouse);

            var minPension = !$scope.showPensionOptionSpouse;

            var ddBase = Number($scope.pensionDrawdownBaseSpouse.replaceAll('$', '').replaceAll(',', ''));

            var ageL = Number($scope.ageSpouse);
        }



        var biArray = [];

        var baArray = [];

        var penArray = [];

        var ageArray = [];

        var balanceIndexed = 0;

        var year = 0;

        var cpi;

        var adjustedSalary, concessionalCo, earning, taxation, drawdown, fAndI, balance, balanceCpi, paymentFactor;

        var count = 0;

        while (balanceIndexed >= 0) {
            cpi = Math.pow(1 + (inflation / 100), year);
            adjustedSalary = ageL < retirementAge ? annualSalary * Math.pow(1 + (wageIncrease / 100), year) : 0;
            if (year === 0) {
                concessionalCo = 0;
            } else {
                if (ageL < retirementAge) {
                    var concessionalCap = ageL >= 49 ? 35000 : 30000;
                    // console.log("cCap",concessionalCap);
                    concessionalCo = Math.min(Math.min(adjustedSalary * (employerContributionLevel / 100), 19615.60) + salarySacrifice, concessionalCap);
                } else {
                    concessionalCo = 0;
                }
            }
            balanceCpi = 1 / cpi;
            // var temp1 = 0;
            if (year === 0) {
                earnings = taxation = drawdown = fAndI = 0;
                balance = superBalance;

            } else {
                if (minPension) {
                    if (ageL < pensionStart) {
                        drawdown = 0;
                    } else {
                        drawdown = baArray[year - 1] * (calculateMinPension(ageL) / 100)
                    }
                } else {
                    if (ageL < pensionStart) {
                        drawdown = 0;
                    } else {
                        drawdown = ddBase * Math.pow(1 + (inflation / 100), ageL - pensionStart);
                    }
                }
                minDrawdown = drawdown;


                fAndI = baArray[year - 1] * (variableFee / 100.00) + fixedFee + insurancePremium;


                earnings = baArray[year - 1] * (Math.pow(1 + (investmentReturn / 100), 0.5) - 1) + (baArray[year - 1] * Math.pow(1 + (investmentReturn / 100), 0.5) + concessionalCo - fAndI - drawdown) * (Math.pow(1 + (investmentReturn / 100), 0.5) - 1);


                if (ageL >= 60 && ageL >= pensionStart) {
                    taxation = cLookUp(annualSalary) * concessionalCo;
                } else {
                    taxation = cLookUp(annualSalary) * concessionalCo + earnings * 0.15;
                }

                balance = baArray[year - 1] + concessionalCo + earnings - taxation - drawdown - fAndI;
            }

            balanceIndexed = balance * balanceCpi;

            baArray.push(balance);

            penArray.push(drawdown);

            biArray.push(balanceIndexed);

            ageArray.push(ageL);

            year++;

            ageL++;

            count++;

            // console.log([balance,balanceCpi,balanceIndexed]);

        }

        // console.log(biArray);

        // console.log({
        //     count: count - 1,
        //     biArray: biArray,
        //     penArray: penArray,
        //     ageArray: ageArray
        // });

        return {
            count: count - 1,
            biArray: biArray,
            penArray: penArray,
            ageArray: ageArray
        }

    }

    function entitledAgedPension(superFunds, assetCalculationObj, ageMember1, ageMember2) {
        var homeContents = Number($scope.homeContents.replaceAll('$', '').replaceAll(',', ''));
        var vehicleCost = Number($scope.vehicleCost.replaceAll('$', '').replaceAll(',', ''));
        var investmentProperty = Number($scope.investmentProperty.replaceAll('$', '').replaceAll(',', ''));
        var bankAssets = Number($scope.bankAssets.replaceAll('$', '').replaceAll(',', ''));
        var listedInvestment = Number($scope.listedInvestment.replaceAll('$', '').replaceAll(',', ''));
        var marginLoans = Number($scope.marginLoans.replaceAll('$', '').replaceAll(',', ''));
        var allocatedPension = Number($scope.allocatedPension.replaceAll('$', '').replaceAll(',', ''));
        var otherInvestment = Number($scope.otherInvestment.replaceAll('$', '').replaceAll(',', ''));
        var employmentIncome = $scope.newChangesApplied ? Number($scope.annualSalaryNew.replaceAll('$', '').replaceAll(',', '')) : Number($scope.annualSalary.replaceAll('$', '').replaceAll(',', ''));
        var employmentIncomePartner = $scope.spouseOption ? ($scope.newChangesApplied ? Number($scope.annualSalarySpouseNew.replaceAll('$', '').replaceAll(',', '')) : Number($scope.annualSalarySpouse.replaceAll('$', '').replaceAll(',', '')) ) : 0;
        var netRentalIncome = Number($scope.netRentalIncome.replaceAll('$', '').replaceAll(',', ''));
        var otherIncome = Number($scope.otherIncome.replaceAll('$', '').replaceAll(',', ''));
        var pensionIncome = Number($scope.pensionIncome.replaceAll('$', '').replaceAll(',', ''));

        // console.log("super" , superFunds);

        if (ageMember1 >= ( $scope.newChangesApplied ? Number($scope.retirementAgeNew) : Number($scope.retirementAge))) {
            employmentIncome = 0;
        }

        if (ageMember2 >= ( $scope.newChangesApplied ? Number($scope.retirementAgeSpouseNew) : Number($scope.retirementAgeSpouse)) ) {
            employmentIncomePartner = 0;
        }



        var temp, temp2, temp3, deemingRate;

        if ($scope.spouseOption) {
            deemingRate = (($scope.age < $scope.pensionStart) && ($scope.ageSpouse < $scope.pensionStartSpouse)) ? 40300 : 80600;
        } else {
            deemingRate = 48600;
        }


        var totalAsset = homeContents + vehicleCost + investmentProperty;
        var totalInvestment = bankAssets + listedInvestment + marginLoans + allocatedPension + superFunds + otherInvestment;
        var totalIncome = employmentIncome + employmentIncomePartner + netRentalIncome + otherIncome + pensionIncome;

        // console.log("tip", totalIncome , memberN);

        if (totalInvestment <= deemingRate) {
            temp = totalInvestment * (1.75 / 100);
        } else {
            temp = deemingRate * (1.75 / 100) + (totalInvestment - deemingRate) * (3.25 / 100);
        }

        var totalCalcIncome = totalIncome + temp;


        var fortnightIncome = totalCalcIncome / 26;


        if (fortnightIncome <= assetCalculationObj.itCheck) {
            temp2 = assetCalculationObj.default;
        } else {
            temp2 = assetCalculationObj.default-assetCalculationObj.percent * (fortnightIncome - assetCalculationObj.itCheck);
        }

        var maxAgedPensionIncome = temp2;

        var totalCalcAsset = totalAsset + totalInvestment;

        if (totalCalcAsset <= assetCalculationObj.low) {
            temp3 = assetCalculationObj.default;
        } else {
            if (totalCalcAsset > assetCalculationObj.high) {
                temp3 = 0;
            } else {
                temp3 = assetCalculationObj.default-(assetCalculationObj.default / (assetCalculationObj.high - assetCalculationObj.low)) * (totalCalcAsset - assetCalculationObj.low);
            }
        }

        var maxAgedPensionAsset = temp3;


        var entitledAgedPension = maxAgedPensionIncome > maxAgedPensionAsset ? maxAgedPensionAsset : maxAgedPensionIncome;

        // return entitledAgedPension;

        return entitledAgedPension > 0 ? entitledAgedPension : 0;
    }


    $scope.calculateFinal = function(isValid,closeInputs) {

        // console.log($scope.newChangesApplied);

        // console.log("calculating");

        if (isValid) {

            if(closeInputs){
                document.getElementById("inputs").style.display = "none";
               // $("#results").animate({height: 'toggle'},1500);
                       document.body.scrollTop = document.documentElement.scrollTop = 0;
               document.getElementById("results").style.display = "block";
            }

            // console.log('chaling');
            var targetIncome = $scope.newChangesApplied ? Number($scope.targetNew.replaceAll('$', '').replaceAll(',', '')) : Number($scope.target.replaceAll('$', '').replaceAll(',', ''));
            //console.log(targetIncome);
            var isCouple = $scope.spouseOption;
            var ctm;
            var object1 = biCount(false);
            var object2;

            if (isCouple) {
                object2 = biCount(true);
                ctm = Math.max(object1.count, object2.count);
            } else {
                ctm = object1.count;
            }

            var last = Math.max(object1.penArray[object1.count] + object1.biArray[object1.count], 0);

            object1.penArray.pop();

            object1.penArray.push(last);

            // console.log("array",object1.penArray);

            if ($scope.spouseOption) {

                var last = Math.max(object2.penArray[object2.count] + object2.biArray[object2.count], 0);

                object2.penArray.pop();

                object2.penArray.push(last);

                // console.log("array2",object2.penArray);

            }

            if (isCouple) {
                fillArray();
            }

            function fillArray() {
                if (object1.count < object2.count) {
                    for (var i = 0; i < object2.count - object1.count; i++) {
                        object1.penArray.push(0);
                        object1.biArray.push(0);
                        object1.ageArray.push(object1.ageArray[object1.count + i] + 1);
                    }
                } else {
                    for (var i = 0; i < object1.count - object2.count; i++) {
                        object2.penArray.push(0);
                        object2.biArray.push(0);
                        object2.ageArray.push(object2.ageArray[object2.count + i] + 1);
                    }
                }
            }

            // console.log("obj1",object1);
            // console.log("obj2",object2);


            var assetCalculationObj = {};

            if ($scope.spouseOption && $scope.houseOption) {
                assetCalculationObj.high = 1163000;
                assetCalculationObj.low = 291500;
                assetCalculationObj.default = 653.5;
                assetCalculationObj.itCheck = 288;
                assetCalculationObj.percent = 0.25;
            }

            if ($scope.spouseOption && !$scope.houseOption) {
                assetCalculationObj.high = 1312000;
                assetCalculationObj.low = 440500;
                assetCalculationObj.default = 653.5;
                assetCalculationObj.itCheck = 288;
                assetCalculationObj.percent = 0.25;
            }

            if (!$scope.spouseOption && $scope.houseOption) {
                assetCalculationObj.high = 783500;
                assetCalculationObj.low = 205500;
                assetCalculationObj.default = 867;
                assetCalculationObj.itCheck = 162;
                assetCalculationObj.percent = 0.5;
            }

            if (!$scope.spouseOption && !$scope.houseOption) {
                assetCalculationObj.high = 932500;
                assetCalculationObj.low = 354500;
                assetCalculationObj.default = 867;
                assetCalculationObj.itCheck = 162;
                assetCalculationObj.percent = 0.5;
            }

            var superFund;

            var member1BalanceArray = object1.biArray;

            // console.log(cArray);

            var member2BalanceArray = $scope.spouseOption ? object2.biArray : [];

            // console.log(eArray);

            var member1PensionArray = object1.penArray;

            var member2PensionArray = $scope.spouseOption ? object2.penArray : [];



            var member1EPArray = [];

            var member2EPArray = [];

            var member1APArray = [];

            var member2APArray = [];

            var totalSuperBalanceArray = [];

            var totalAnnualIncomeArray = [];

            for (i = 0; i <= ctm; i++) {
                if ($scope.spouseOption) {
                    superFund = object1.biArray[i] > 0 ? object1.biArray[i] : 0 + object2.biArray[i] > 0 ? object2.biArray[i] : 0;
                    if (object2.ageArray[i] < 65) {
                        member2EPArray.push(0);
                    } else {
                        // if(i > object2.count){
                        //     member2EPArray.push(0);
                        // }else{
                        member2EPArray.push(entitledAgedPension(superFund, assetCalculationObj, object1.ageArray[i], object2.ageArray[i]));
                        // }
                    }

                    if (object1.ageArray[i] < 65) {
                        member1EPArray.push(0);
                    } else {
                        // if(i > object1.count){
                        // member1EPArray.push(0);
                        // }else{
                        member1EPArray.push(entitledAgedPension(superFund, assetCalculationObj, object1.ageArray[i], object2.ageArray[i]));
                        // }
                    }
                    member2APArray.push(member2EPArray[i] * 26);
                    member1APArray.push(member1EPArray[i] * 26);
                    totalSuperBalanceArray.push(member1BalanceArray[i] + member2BalanceArray[i]);
                    totalAnnualIncomeArray.push(member1APArray[i] + member2APArray[i] + member1PensionArray[i] + member2PensionArray[i]);
                } else {
                    superFund = object1.biArray[i] > 0 ? object1.biArray[i] : 0;
                    if (object1.ageArray[i] < 65) {
                        member1EPArray.push(0);
                    } else {
                        member1EPArray.push(entitledAgedPension(superFund, assetCalculationObj, object1.ageArray[i], object1.ageArray[i]));
                    }
                    member2EPArray.push(0);
                    member2APArray.push(member2EPArray[i] * 26);
                    member1APArray.push(member1EPArray[i] * 26);
                    totalSuperBalanceArray.push(member1BalanceArray[i]);
                    totalAnnualIncomeArray.push(member1APArray[i] + member1PensionArray[i]);
                }



            }

            // console.log('j', member1APArray);
            // console.log('k', member2APArray);
            // console.log('l',totalSuperBalanceArray);
            // console.log('m', totalAnnualIncomeArray);

            // console.log(assetCalculationObj);




            if (!$scope.spouseOption) {
                while (member1APArray.length <= Math.ceil(leMember1)) {
                    member1APArray.push(0);
                }
                while (member1PensionArray.length <= Math.ceil(leMember1)) {
                    member1PensionArray.push(0);
                }
                ChartServiceHc.createChart(totalSuperBalanceArray.slice(0, 5 + Math.ceil(leMember1)));
                AreaChartService.createChart(member1APArray.slice(0, 5 + Math.ceil(leMember1)), [], member1PensionArray.slice(0, 5 + Math.ceil(leMember1)), [], leMember1, leMember2, false, targetIncome);

            } else {
                while (member1APArray.length <= Math.max(Math.ceil(leMember1), Math.ceil(leMember2))) {
                    member1APArray.push(0);
                }
                while (member1PensionArray.length <= Math.max(Math.ceil(leMember1), Math.ceil(leMember2))) {
                    member1PensionArray.push(0);
                }
                while (member2PensionArray.length <= Math.max(Math.ceil(leMember1), Math.ceil(leMember2))) {
                    member2PensionArray.push(0);
                }
                while (member2APArray.length <= Math.max(Math.ceil(leMember1), Math.ceil(leMember2))) {
                    member2APArray.push(0);
                }
                ChartServiceHc.createChart(totalSuperBalanceArray.slice(0, 5 + Math.max(Math.ceil(leMember1), Math.ceil(leMember2))));
                AreaChartService.createChart(member1APArray.slice(0, 5 + Math.max(Math.ceil(leMember1), Math.ceil(leMember2))), member2APArray.slice(0, 5 + Math.max(Math.ceil(leMember1), Math.ceil(leMember2))), member1PensionArray.slice(0, 5 + Math.max(Math.ceil(leMember1), Math.ceil(leMember2))), member2PensionArray.slice(0, 5 + Math.max(Math.ceil(leMember1), Math.ceil(leMember2))), leMember1, leMember2, true, targetIncome);

            }
            // console.log("calculated");
        } else {
            $("#myModal").modal('show');
            $("html, body").animate({ scrollTop: $("#tell-us").position().top + 80 }, "slow");
        }


    }

    $scope.calculateFinal(true,false);

    document.getElementById("download").addEventListener("click", function() {

        if ($scope.forms.ttrForm.$valid) {

            var annualSalary1 = $scope.saveWithNew ? Number($scope.annualSalaryNew.replaceAll('$', '').replaceAll(',', '')) : Number($scope.annualSalary.replaceAll('$', '').replaceAll(',', ''));
            var superBalance1 = $scope.saveWithNew ? Number($scope.superBalanceNew.replaceAll('$', '').replaceAll(',', '')) : Number($scope.superBalance.replaceAll('$', '').replaceAll(',', ''));
            var wageIncrease1 = Number($scope.wageIncrease.replaceAll('%', ''));
            var inflation1 = Number($scope.inflation.replaceAll('%', ''));
            var investmentReturn1 = Number($scope.investmentReturn.replaceAll('%', ''));
            var variableFee1 = Number($scope.variableFee.replaceAll('%', ''));
            var employerContributionLevel1 = Number($scope.employerContributionLevel.replaceAll('%', ''));
            var salarySacrifice1 = Number($scope.salarySacrifice.replaceAll('$', '').replaceAll(',', ''));
            var fixedFee1 = Number($scope.fixedFee.replaceAll('$', '').replaceAll(',', ''));
            var insurancePremium1 = Number($scope.insurancePremium.replaceAll('$', '').replaceAll(',', ''));
            var retirementAge1 = $scope.saveWithNew ? $scope.retirementAgeNew : $scope.retirementAge ;
            var pensionStart1 = $scope.pensionStart;
            var ddBase1 = Number($scope.pensionDrawdownBase.replaceAll('$', '').replaceAll(',', ''));
            var targetIncome = $scope.saveWithNew ? Number($scope.targetNew.replaceAll('$', '').replaceAll(',', '')) : Number($scope.target.replaceAll('$', '').replaceAll(',', ''));
            var gender = $scope.genderOption ? "Male" : "Female";



            var annualSalary1Spouse = $scope.saveWithNew ? Number($scope.annualSalarySpouseNew.replaceAll('$', '').replaceAll(',', '')) : Number($scope.annualSalarySpouse.replaceAll('$', '').replaceAll(',', ''));
            var superBalance1Spouse = $scope.saveWithNew ? Number($scope.superBalanceSpouseNew.replaceAll('$', '').replaceAll(',', '')) : Number($scope.superBalanceSpouse.replaceAll('$', '').replaceAll(',', ''));
            var wageIncrease1Spouse = Number($scope.wageIncreaseSpouse.replaceAll('%', ''));
            var inflation1Spouse = Number($scope.inflationSpouse.replaceAll('%', ''));
            var investmentReturn1Spouse = Number($scope.investmentReturnSpouse.replaceAll('%', ''));
            var variableFee1Spouse = Number($scope.variableFeeSpouse.replaceAll('%', ''));
            var employerContributionLevel1Spouse = Number($scope.employerContributionLevelSpouse.replaceAll('%', ''));
            var salarySacrifice1Spouse = Number($scope.salarySacrificeSpouse.replaceAll('$', '').replaceAll(',', ''));
            var fixedFee1Spouse = Number($scope.fixedFeeSpouse.replaceAll('$', '').replaceAll(',', ''));
            var insurancePremium1Spouse = Number($scope.insurancePremiumSpouse.replaceAll('$', '').replaceAll(',', ''));
            var retirementAge1Spouse = $scope.saveWithNew ? $scope.retirementAgeSpouseNew : $scope.retirementAgeSpouse;
            var pensionStart1Spouse = $scope.pensionStartSpouse;
            var ddBase1Spouse = Number($scope.pensionDrawdownBaseSpouse.replaceAll('$', '').replaceAll(',', ''));
            var genderSpouse = $scope.genderOptionSpouse ? "Male" : "Female";


            var homeContents = Number($scope.homeContents.replaceAll('$', '').replaceAll(',', ''));
            var vehicleCost = Number($scope.vehicleCost.replaceAll('$', '').replaceAll(',', ''));
            var investmentProperty = Number($scope.investmentProperty.replaceAll('$', '').replaceAll(',', ''));
            var bankAssets = Number($scope.bankAssets.replaceAll('$', '').replaceAll(',', ''));
            var listedInvestment = Number($scope.listedInvestment.replaceAll('$', '').replaceAll(',', ''));
            var marginLoans = Number($scope.marginLoans.replaceAll('$', '').replaceAll(',', ''));
            var allocatedPension = Number($scope.allocatedPension.replaceAll('$', '').replaceAll(',', ''));
            var otherInvestment = Number($scope.otherInvestment.replaceAll('$', '').replaceAll(',', ''));
            var employmentIncome = Number($scope.annualSalary.replaceAll('$', '').replaceAll(',', ''));
            var employmentIncomePartner = $scope.spouseOption ? Number($scope.annualSalarySpouse.replaceAll('$', '').replaceAll(',', '')) : 0;
            var netRentalIncome = Number($scope.netRentalIncome.replaceAll('$', '').replaceAll(',', ''));
            var otherIncome = Number($scope.otherIncome.replaceAll('$', '').replaceAll(',', ''));
            var pensionIncome = Number($scope.pensionIncome.replaceAll('$', '').replaceAll(',', ''));
            var drawdownValue;
            var drawdownValueSpouse;

            drawdownValue = $scope.showPensionOption ? ddBase1 : minDrawdown;
            drawdownValueSpouse = $scope.showPensionOptionSpouse ? ddBase1Spouse : minDrawdown;

            var personalDetails = {
                dob: $scope.dob,
                age: $scope.age,
                annualSalary: annualSalary1,
                superBalance: superBalance1,
                retirementAge: retirementAge1,
                gender: gender,
                salarySacrifice: salarySacrifice1,
                pensionAge: pensionStart1,
                spouseOption: $scope.spouseOption,
                houseOption: $scope.houseOption,
                targetIncome: targetIncome
            }

            // console.log('personalDetails', personalDetails);

            var personalDetailsSpouse = {
                    dob: $scope.dobSpouse,
                    age: $scope.ageSpouse,
                    annualSalary: annualSalary1Spouse,
                    superBalance: superBalance1Spouse,
                    retirementAge: retirementAge1Spouse,
                    gender: genderSpouse,
                    salarySacrifice: salarySacrifice1Spouse,
                    pensionAge: pensionStart1Spouse
                }
                // console.log('personalDetailsSpouse', personalDetailsSpouse);

            var assumptions = {
                    insurancePremium: insurancePremium1,
                    investmentReturn: investmentReturn1,
                    variableFee: variableFee1,
                    fixedFee: fixedFee1,
                    employerContributionLevel: employerContributionLevel1,
                    inflation: inflation1,
                    wageIncrease: wageIncrease1,
                    pensionDrawdownBase: drawdownValue
                }
                // console.log('assumptions', assumptions);

            var assumptionsSpouse = {
                insurancePremium: insurancePremium1Spouse,
                investmentReturn: investmentReturn1Spouse,
                variableFee: variableFee1Spouse,
                fixedFee: fixedFee1Spouse,
                employerContributionLevel: employerContributionLevel1Spouse,
                inflation: inflation1Spouse,
                wageIncrease: wageIncrease1Spouse,
                pensionDrawdownBase: drawdownValueSpouse
            }

            // console.log('assumptionsSpouse', assumptionsSpouse);


            var otherAssets = {
                homeContents: homeContents,
                vehicleCost: vehicleCost,
                investmentProperty: investmentProperty,
                bankAssets: bankAssets,
                listedInvestment: listedInvestment,
                marginLoans: marginLoans,
                otherInvestment: otherInvestment,
                netRentalIncome: netRentalIncome,
                otherIncome: otherIncome,
                pensionIncome: pensionIncome,
                allocatedPension: allocatedPension
            }


            // console.log('otherAssets', otherAssets);
            PdfMaker.createChart($scope.personalDetails, personalDetails, personalDetailsSpouse, assumptions, assumptionsSpouse, otherAssets);

        } else {
            $("#myModal").modal('show');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    });

    // document.getElementById("bar-chart").addEventListener("click", function() {
        $("#bar-chart,#bar-chart-m").on("click",function(){
        $scope.chartOneOpen = true;
        $("#containerA").highcharts().reflow();
        document.getElementById("containerA").style.display = "none";
        document.getElementById("container").style.display = "block";
        $("#container").highcharts().reflow();
        $timeout(0);
    });

    // document.getElementById("area-chart").addEventListener("click", function() {
        $("#area-chart,#area-chart-m").on("click",function(){
        $scope.chartOneOpen = false;
        $("#container").highcharts().reflow();
        document.getElementById("container").style.display = "none";
        document.getElementById("containerA").style.display = "block";
        $("#containerA").highcharts().reflow();
        $timeout(0);
    });

    $(".print-doc").on("click", printBothCharts);

    function printBothCharts() {
        if ($scope.forms.ttrForm.$valid) {
            var printUpdate = function() {
                $('#container').highcharts().reflow();
                $("#containerA").highcharts().reflow();
            };

            if ($scope.chartOneOpen) {
                document.getElementById("containerA").style.display = "block";
                if (window.matchMedia) {
                    var mediaQueryList = window.matchMedia('print');
                    mediaQueryList.addListener(function(mql) {
                        printUpdate();
                    });
                }
                window.print();
                setTimeout(function() {
                    document.getElementById("containerA").style.display = "none";
                }, 200);
            } else {
                document.getElementById("container").style.display = "block";
                if (window.matchMedia) {
                    var mediaQueryList = window.matchMedia('print');
                    mediaQueryList.addListener(function(mql) {
                        printUpdate();
                    });
                }
                window.print();
                setTimeout(function() {
                    document.getElementById("container").style.display = "none";
                }, 200);
            }
        } else {
            $("#myModal").modal('show');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    };

    $scope.resetSliders = function(){
        window.contentRevealOptions.reset = true;
        sr.reveal('.contents',contentRevealOptions);
        // console.log(contentRevealOptions);
        var sliders = document.getElementsByClassName("slider-div");
        [].forEach.call(sliders,function(slider){
            slider.noUiSlider.reset();})
        document.getElementById("results").style.display = "none";
        // $("#inputs").animate({height: 'toggle'},2000);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
         document.getElementById("inputs").style.display = "block";

        $scope.saveWithNew = false;
    }


}]);
