'use strict';

/* Controllers */


function projectorCtrl($scope) {

  $scope.startBalance = '';

  $scope.expenses = [];

  $scope.incomes = [];


  $scope.addExpense = function() {
    var newEmptyExpense = {active:true, name:'', amount:0};
    $scope.expenses.push(newEmptyExpense);
  }

  $scope.removeExpense = function(index) {
    $scope.expenses.splice(index,1);
  }

  $scope.addIncome = function() {
    var newEmptyIncome = {active:true, name:'', amount:0};
    $scope.incomes.push(newEmptyIncome);
  }

  $scope.removeIncome = function(index) {
    $scope.incomes.splice(index,1);
  }

  $scope.monthlyIncome = function() {
    var total = 0;
    for (var i = 0; i < $scope.incomes.length; i++) {
      if (parseInt($scope.incomes[i].amount)) {
        if ($scope.incomes[i].active) {
          total = total + parseInt($scope.incomes[i].amount);
        }
      }
    }
    return total;
  }

  $scope.monthlyExpense = function() {
    var total = 0;
    for (var i = 0; i < $scope.expenses.length; i++) {
      if (parseInt($scope.expenses[i].amount)) {
        if ($scope.expenses[i].active) {
          total = total + parseInt($scope.expenses[i].amount);
        }
      }
    }
    return total;
  }

  $scope.monthlyNet = function() {

    var income = $scope.monthlyIncome();
    var expense = $scope.monthlyExpense();

    return income - expense;
  }

  $scope.montlyProjection = function() {

    var monthByMonth = [];
    var runningTotal = 0;

    for (var i = 0; i < 12; i++) {
      runningTotal = runningTotal + parseInt($scope.monthlyNet());
      monthByMonth[i] = runningTotal;
    }
   
    return monthByMonth;

  }

  $scope.getInt = function(value) {
    if (value) {
      return parseInt(value);
    } else {
      return 0;
    }
  }

  $scope.getMonthLabel = function(monthAhead) {

    var d = new Date;
    var currentMonth = d.getMonth() + 1;
    var monthNames = ['Januar','Februar','March','April','May','June','July','August','September','October','November','December'];

    var futureMonth = currentMonth + monthAhead;
    if (futureMonth > 11) {
      futureMonth = futureMonth - 12;
    }
    return monthNames[futureMonth];
  }

  $scope.positiveNegative = function(value) {
    if (value > 0) {
      return "positive";
    }
    if (value < 0) {
      return "negative";
    }
  }


}