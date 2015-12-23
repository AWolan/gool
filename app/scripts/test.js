'use strict';

angular
    .module('app.test', [])
    .controller('TestController', ['$scope', 'salaryConst', function ($scope, salaryConst) {
        var i;
        var pay;
        var salaryList = [];
        var payList = [
            {
                year: 2015,
                month: 1,
                base: 5000.00,
                x: 1.0,
                equalization: 0.00,
                overtime: 0.00,
                bonus: 0.00,
                leave: 98.56,
                healthLeave: 0.00,
                benefit: 0.00,
                medicalCare: 20.00,
                insurance: 29.00
            }
        ];
        var sum = function (list) {
            var i;
            var result = 0;
            for (i = 0; i < list.length; i++) {
                result += list[i];
            }
            return result;
        };
        var calculateBrutto = function (pay) {
            return sum([
                pay.base * pay.x,
                pay.equalization,
                pay.overtime,
                pay.bonus,
                pay.leave,
                pay.healthLeave
            ]);
        };
        var calculateInsuranceBase = function (pay) {
            return sum([
                pay.base * pay.x,
                pay.equalization,
                pay.overtime,
                pay.bonus,
                pay.leave,
                pay.medicalCare,
                pay.insurance
            ]);
        };
        var calculateInsuranceContribution = function (insuranceBase) {
            var retiringContribution = salaryConst.retiringFactor * insuranceBase;
            var rentContribution = salaryConst.rentFactor * insuranceBase;
            var illnessContribution = salaryConst.illnessFactor * insuranceBase;
            var insuranceContribution = sum([
                retiringContribution,
                rentContribution,
                illnessContribution
            ]);
            return {
                retiringContribution: retiringContribution,
                rentContribution: rentContribution,
                illnessContribution: illnessContribution,

                getInsuranceContribution: function () {
                    return insuranceContribution;
                }
            };
        };
        var calculateHealthBase = function (insuranceBase, insuranceContribution, healthLeave) {
            return sum([
                insuranceBase,
                healthLeave,
                -insuranceContribution.getInsuranceContribution()
            ]);
        };
        var calculateHealthContribution = function (healthInsuranceBase) {
            return salaryConst.healthFactor * healthInsuranceBase;
        };
        var calculateTaxBase = function (insuranceBase, insuranceContribution, healthLeave) {
            var taxBase;

            if (insuranceBase > 0) {
                taxBase = sum([
                    insuranceBase,
                    healthLeave,
                    -insuranceContribution.getInsuranceContribution(),
                    -salaryConst.deductibleCost
                ]);
            } else {
                taxBase = 0;
            }
            return taxBase;
        };
        var calculateTaxContribution = function (taxBase, healthBase) {
            var taxBase;

            if (taxBase > 0) {
                taxBase = sum([
                    salaryConst.taxFactor * taxBase,
                    -salaryConst.taxRelief,
                    -salaryConst.healthTaxFactor * healthBase
                ]);
            } else {
                taxBase = 0;
            }
            return taxBase;
        };
        var calculateNetto = function (brutto, insuranceContribution, healthContribution, taxContribution) {
            return sum([
                brutto,
                -insuranceContribution.getInsuranceContribution(),
                -healthContribution,
                -taxContribution
            ]);
        };
        var calculateSalary = function (pay) {
            var brutto = calculateBrutto(pay);
            var insuranceBase = calculateInsuranceBase(pay);
            var insuranceContribution = calculateInsuranceContribution(insuranceBase);
            var healthBase = calculateHealthBase(insuranceBase, insuranceContribution, pay.healthLeave);
            var healthContribution = calculateHealthContribution(healthBase);
            var taxBase = calculateTaxBase(insuranceBase, insuranceContribution, pay.healthLeave);
            var taxContribution = calculateTaxContribution(taxBase, healthBase);
            var netto = calculateNetto(brutto, insuranceContribution, healthContribution, taxContribution);

            return {
                brutto: brutto,
                netto: netto,
                retiringContribution: insuranceContribution.retiringContribution,
                rentContribution: insuranceContribution.rentContribution,
                illnessContribution: insuranceContribution.illnessContribution,
                healthContribution: healthContribution,
                taxContribution: taxContribution
            };
        };

        $scope.$watch('base', function(newValue, oldValue) {
            var pay = {
                  base: newValue,
                  x: 1.0,
                  equalization: 0.00,
                  overtime: 0.00,
                  bonus: 0.00,
                  leave: 0.00,
                  healthLeave: 0.00,
                  benefit: 0.00,
                  medicalCare: 108.00,
                  insurance: 22.34
              };
            $scope.salary = calculateSalary(pay)
        });
    }]);
