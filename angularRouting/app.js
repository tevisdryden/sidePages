angular.module('News', [])
    .controller('MainCtrl', [
    '$scope',
    function($scope){
      $scope.test = 'Hello world!';
    }
 	]);