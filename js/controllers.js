'use strict';

/* Controllers */


function projectorCtrl($scope) {

  $scope.startBalance = '';

  $scope.expenses = [
    {name:'Rent', amount:2500},
    {name:'Day Care', amount:1500}
  ];

  $scope.incomes = [
    {name:'Salary', amount:2500},
    {name:'Your Carry', amount:200}
  ];


  $scope.addExpense = function() {
    var newEmptyExpense = {name:'', amount:0};
    $scope.expenses.push(newEmptyExpense);
  }

  $scope.removeExpense = function(index) {
    $scope.expenses.splice(index,1);
  }

  $scope.addIncome = function() {
    var newEmptyIncome = {name:'', amount:0};
    $scope.incomes.push(newEmptyIncome);
  }

  $scope.removeIncome = function(index) {
    $scope.incomes.splice(index,1);
  }

  $scope.monthlyIncome = function() {
    var total = 0;
    for (var i = 0; i < $scope.incomes.length; i++) {
      if (parseInt($scope.incomes[i].amount)) {
        total = total + parseInt($scope.incomes[i].amount);
      }
    }
    return total;
  }

  $scope.monthlyExpense = function() {
    var total = 0;
    for (var i = 0; i < $scope.expenses.length; i++) {
      if (parseInt($scope.expenses[i].amount)) {
        total = total + parseInt($scope.expenses[i].amount);
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

    if (parseInt($scope.startBalance)) {
      monthByMonth[0] = parseInt($scope.startBalance);
    } else {
      monthByMonth[0] = 0;
    }

    for (var i = 1; i < 13; i++) {
      monthByMonth[i] = monthByMonth[i-1] + parseInt($scope.monthlyNet());
    }

    return monthByMonth;

  }


  $scope.drawChart = function() {

    
    var monthByMonth = $scope.montlyProjection();
    var twodmonthByMonth = [];
    twodmonthByMonth.push(['Month','Balance']);


    for (var i = 0; i < monthByMonth.length; i++) {
      twodmonthByMonth.push([i,monthByMonth[i]]);
    }
    var data = google.visualization.arrayToDataTable(twodmonthByMonth);

    drawChart(data);
  
  }





}