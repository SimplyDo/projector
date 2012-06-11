'use strict';

/* Controllers */


function projectorCtrl($scope,Storage) {

  $scope.startBalance = Storage.loadObject('startBalance');

  $scope.expenses = Storage.loadObject('expenses');

  $scope.incomes = Storage.loadObject('incomes');

  $scope.nonRecurring = Storage.loadObject('nonRecurring');


  $scope.save = function() {
    Storage.saveObject($scope.expenses,'expenses');
    Storage.saveObject($scope.incomes,'incomes');
    Storage.saveObject($scope.startBalance,'startBalance');
    Storage.saveObject($scope.nonRecurring,'nonRecurring');
  }

  $scope.clear = function() {
    Storage.clear();
    $scope.startBalance = [];
    $scope.expenses = [];
    $scope.incomes = [];
    $scope.nonRecurring = [];
  }

  $scope.addExpense = function() {
    var newEmptyExpense = {active:true, name:'', amount:0, frequency:1};
    $scope.expenses.push(newEmptyExpense);
  }

  $scope.removeExpense = function(index) {
    $scope.expenses.splice(index,1);
  }

  $scope.addIncome = function() {
    var newEmptyIncome = {active:true, name:'', amount:0, frequency:1};
    $scope.incomes.push(newEmptyIncome);
  }

  $scope.removeIncome = function(index) {
    $scope.incomes.splice(index,1);
  }

  $scope.addTransaction = function() {
    var newEmptyTransaction = {active:true, name:'', amount:0, month:1};
    $scope.nonRecurring.push(newEmptyTransaction);
  }

  $scope.removeTransaction = function(index) {
    $scope.nonRecurring.splice(index,1);
  }

  $scope.tallyTransactions = function() {

    var total = 0;
    var oneOff = 0;

    for (var m = 0; m < $scope.nonRecurring.length; m++) {
      oneOff = $scope.convertToNumber($scope.nonRecurring[m].amount);
      if (oneOff != 0) {
        if ($scope.nonRecurring[m].active) {
          total = total + oneOff;
        }
      }
    }

    return total;
  }

  $scope.monthlyIncome = function() {
    var total = 0;
    var thisMonth;
    for (var i = 0; i < $scope.incomes.length; i++) {
      thisMonth = $scope.convertToNumber($scope.incomes[i].amount);
      if (thisMonth != 0) {
        if ($scope.incomes[i].active) {
          total = total + (thisMonth * $scope.incomes[i].frequency);
        }
      }
    }
    return total;
  }

  $scope.monthlyExpense = function() {
    var total = 0;
    var thisMonth;
    for (var i = 0; i < $scope.expenses.length; i++) {
      thisMonth = $scope.convertToNumber($scope.expenses[i].amount);
      if (thisMonth != 0) {
        if ($scope.expenses[i].active) {
          total = total + (thisMonth*$scope.expenses[i].frequency);
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
    var oneOff = 0;

    for (var i = 0; i < 12; i++) {
      runningTotal = runningTotal + $scope.monthlyNet();

      // add applicable one-off transations
      for (var m = 0; m < $scope.nonRecurring.length; m++) {
        if ($scope.convertToNumber($scope.nonRecurring[m].month) == i+1) {
          oneOff = $scope.convertToNumber($scope.nonRecurring[m].amount);
          if (oneOff != 0) {
            if ($scope.nonRecurring[m].active) {
              runningTotal = runningTotal + oneOff;
            }
          }
        }
      }

      monthByMonth[i] = runningTotal;
    }
   
    return monthByMonth;

  }

  $scope.getMonthLabel = function(monthAhead) {

    var d = new Date;
    var currentMonth = d.getMonth();
    var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

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


  $scope.convertToNumber = function(value) {
    
    var floatNumber = parseFloat(value);

    if (floatNumber) {

      return floatNumber;

    } else {

     return 0;

    }

  }

  $scope.roundDown = function(number) {
    
    //return Math.round(number*100)/100;
    return Math.round(number);

  }

  if ($scope.incomes.length < 1) {
    $scope.addIncome();
  }


}