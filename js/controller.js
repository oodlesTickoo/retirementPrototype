app.controller("TTRController", ['$scope', '$timeout', 'AgeCalculator', 'TaxRateCalculator', 'SGCRate', 'WithoutSSCalculator', 'WithSSCalculator', 'ChartServiceHc', 'DonutChartServiceHc', 'PdfMaker', function($scope, $timeout, AgeCalculator, TaxRateCalculator, SGCRate, WithoutSSCalculator, WithSSCalculator, ChartServiceHc, DonutChartServiceHc, PdfMaker) {

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };

    $scope.forms = {};

    $scope.resultWithSS = [0, 0, 0];
    $scope.resultWithoutSS = [0, 0, 0];

    var initDate = new Date();
    initDate.setYear(1997);
    initDate.setMonth(6);
    initDate.setDate(1);
    $scope.dob = initDate;

    $scope.personalDetails = {};

    $scope.chartOneOpen = true;

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
        // $scope.unattainableTHP = false;

    $scope.firstDP = function() {
        $scope.dateOptions.maxDate = new Date($scope.fy - 18, 5, 30);
        $scope.dateOptions.minDate = new Date(1950, 0, 1);
        // console.log("firstDp", $scope.dateOptions.minDate);
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
        // dateDisabled: disabled,
        formatYear: 'yy',
        // maxDate: new Date(2020, 5, 22),
        // minDate: new Date(),
        startingDay: 1,
        showWeeks: false
    };

    // $scope.toggleMin = function() {
    //   $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    //   $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    // };

    // $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
        $scope.firstDP();
    };

    $scope.open2 = function() {
        $scope.secondDp();
        $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'dd/MM/yyyy', 'd!/M!/yyyy'];
    $scope.format = $scope.formats[5];
    // $scope.altInputFormats = ['d!/M!/yyyy'];

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


    $scope.unattainableTHP = false;

    $scope.attainableTHP = false;

    $scope.unattainableTHPS = false;

    $scope.optimisedSS;

    $scope.needSS = true;


    $scope.overlay = false;


    // $scope.age = 42;

    var dt = new Date();

    $scope.fy = dt.getMonth() > 5 ? dt.getFullYear() : dt.getFullYear() - 1;

    $scope.cses = 80000;

    $scope.thp = 45000;

    $scope.maxTHP2 = 0;

    $scope.age = AgeCalculator.getAge($scope.dob, $scope.fy);



    // var ageSlider = document.getElementById('ageSlider'),
    var fySlider = document.getElementById('fySlider'),
        csesSlider = document.getElementById('csesSlider'),
        thpSlider = document.getElementById('thpSlider');


    // noUiSlider.create(ageSlider, {
    //  start: [$scope.age],
    //  range: {
    //   'min': [  18 ],
    //   'max': [ 65 ]
    //  },
    // step : 1,
    // format: wNumb({
    //  decimals: 0,
    // }),
    // connect : 'lower'
    // });

    noUiSlider.create(fySlider, {
        start: [$scope.fy],
        range: {
            'min': [2016],
            'max': [2025]
        },
        step: 1,
        format: wNumb({
            decimals: 0,
        }),
        connect: 'lower'
    });

    noUiSlider.create(csesSlider, {
        start: [$scope.cses],
        range: {
            'min': [10000],
            'max': [300000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','

        }),
        connect: 'lower'
    });

    noUiSlider.create(thpSlider, {
        start: [$scope.thp],
        range: {
            'min': [1000],
            'max': [61000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    $scope.calculateMaxTHP2 = function() {
        var cses1 = $scope.cses.replace("$", "").replace(",", "");
        var thp1 = $scope.thp.replace("$", "").replace(",", "");
        // $scope.maxTHP1 = Math.floor(WithoutSSCalculator.getFinalAmount($scope.age, $scope.fy, Number(cses1), Number(thp1), true));
        // console.log(1,$scope.maxTHP1);
        $scope.maxTHP2 = Math.floor(WithSSCalculator.getFinalAmount($scope.age, $scope.fy, Number(cses1),true));
        // console.log(2,$scope.maxTHP2);
    }

    var ageInput = document.getElementById('ageInput'),
        fyInput = document.getElementById('fyInput'),
        csesInput = document.getElementById('csesInput'),
        thpInput = document.getElementById('thpInput');

    // ageSlider.noUiSlider.on('update', function( values, handle ) {
    // ageInput.value = values[handle];
    // $scope.age = Number(values[handle]);
    // });

    fySlider.noUiSlider.on('update', function(values, handle) {
        fyInput.value = values[handle];
        $scope.fy = Number(values[handle]);
    });

    csesSlider.noUiSlider.on('update', function(values, handle) {
        csesInput.value = values[handle];
        $scope.cses = (values[handle]);
    });

    thpSlider.noUiSlider.on('update', function(values, handle) {
        thpInput.value = values[handle];
        $scope.thp = (values[handle]);
    });


    $scope.submitForm2 = function(isValid) {
        if (isValid) {

            var cses1 = $scope.cses.replace("$", "").replace(",", "");
            var thp1 = $scope.thp.replace("$", "").replace(",", "");




            $scope.needSS = true;
            $scope.calculationsDone = true;
            $scope.resultWithoutSS = WithoutSSCalculator.getFinalAmount($scope.age, $scope.fy, Number(cses1));
            // console.log("rw/oss", $scope.resultWithoutSS.toString());
            $scope.thpWithoutSS = $scope.resultWithoutSS[0];
            $scope.taxWithoutSS = $scope.resultWithoutSS[1];
            $scope.finalAmountWithoutSS = $scope.resultWithoutSS[2];
            $scope.unattainableTHPS = $scope.resultWithoutSS[3];
            $scope.resultWithSS = WithSSCalculator.getFinalAmount($scope.age, $scope.fy, Number(cses1), false);
            // console.log("rwss", $scope.resultWithSS.toString());
            $scope.thpWithSS = $scope.resultWithSS[0];
            $scope.taxWithSS = $scope.resultWithSS[1];
            $scope.finalAmountWithSS = $scope.resultWithSS[2];
            // $scope.finalSS = $scope.resultWithSS[3];
            $scope.optimisedSS = $scope.resultWithSS[3];
            $scope.unattainableTHP = $scope.resultWithSS[4];
            $scope.attainableTHP = !$scope.unattainableTHP;
            if (($scope.resultWithoutSS[2] - $scope.resultWithSS[2]) > 0) {
                $scope.needSS = false;
            }
            if ($scope.attainableTHP && !$scope.unattainableTHPS) {
                // ChartService.createChart(Number($scope.thpWithoutSS.toFixed(2)),Number($scope.thpWithSS.toFixed(2)),Number(($scope.taxWithoutSS - $scope.taxWithSS).toFixed(2)), Number($scope.optimisedSS.toFixed(2)));
                ChartServiceHc.createChart(Number($scope.thpWithoutSS.toFixed(2)), Number($scope.thpWithSS.toFixed(2)), Number(($scope.taxWithoutSS - $scope.taxWithSS).toFixed(2)), Number($scope.optimisedSS.toFixed(2)));
                DonutChartServiceHc.createChart(Number($scope.thpWithoutSS.toFixed(2)), Number($scope.thpWithSS.toFixed(2)), Number(($scope.taxWithoutSS - $scope.taxWithSS).toFixed(2)), Number($scope.optimisedSS.toFixed(2)));

            }
            $timeout(0);
            // console.log("complete2");
        }
        else{
                $('#myModal').modal('show');
                $("html, body").animate({ scrollTop: 0 }, "slow");
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
        // $scope.submitForm2(true);
    }

    csesInput.addEventListener("change", function() {
        // if(this.value < 10000){
        //   this.value = 10000;
        // }
        csesSlider.noUiSlider.set($scope.cses);
    })

    $('#thpInput').on("change", function() {
        // if(this.value < 1000){
        //   this.value = 1000;
        // }
        thpSlider.noUiSlider.set($scope.thp);
        // console.log("thp changes input", typeof($scope.thp));
    })

    // $('#ageInput').on("change",function(){
    //   if(this.value <= 0){
    //     this.value = 18;
    //   }
    //   ageSlider.noUiSlider.set($scope.age);
    // })

    $('#fyInput').on("change", function() {
        if (this.value < 2016) {
            $scope.fy = 2016;
        }
        fySlider.noUiSlider.set($scope.fy);
    })

    csesSlider.noUiSlider.on('set', function(values, handle) {
        csesInput.value = values[handle];
        $scope.cses = (values[handle]);

        $scope.calculateMaxTHP2();

        thpSlider.noUiSlider.updateOptions({
            range: {
                'min': 1000,
                'max': Math.floor($scope.maxTHP2) - 1
            },
            // step :500,
            // start: Math.floor($scope.maxTHP2) >= $scope.thp ? $scope.thp : $scope.maxTHP2
        });
        // $scope.submitForm2(true);
    });

    // ageSlider.noUiSlider.on('set', function( values, handle ) {
    // ageInput.value = values[handle];
    // $scope.age = Number(values[handle]);
    // $scope.submitForm2(true);
    // });

    fySlider.noUiSlider.on('set', function(values, handle) {
        fyInput.value = values[handle];
        $scope.fy = Number(values[handle]);
        $scope.ageChange();
        // $scope.submitForm2(true);
    });

    thpSlider.noUiSlider.on('set', function(values, handle) {
        thpInput.value = values[handle];
        $scope.thp = (values[handle]);
        // $scope.submitForm2(true);
    });

    //$scope.submitForm2(true);

    // $scope.$watch("formData", function(){
    // $scope.unattainableTHP = false;
    // $scope.attainableTHP = false;
    // }, true);

    document.getElementById("download").addEventListener("click", function() {
        if($scope.forms.ttrForm.$valid){
        var toggleNeeded = false;
        if (!$scope.chartOneOpen) {
            document.getElementById("container").classList.toggle("ng-hide");
            toggleNeeded = true;
        }
        PdfMaker.createChart($scope.personalDetails,$scope.dob, $scope.age, $scope.fy, $scope.cses, $scope.thp, $scope.resultWithoutSS, $scope.resultWithSS, $scope.needSS, $scope.optimisedSS, toggleNeeded);
      }else{
        $('#myModal').modal('show');
      }  
    });

     $(".print-doc").on("click",printReport);

     function printReport(){
       if($scope.forms.ttrForm.$valid){
        print();
      }else{
        $('#myModal').modal('show');
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }  
     }


}]);
