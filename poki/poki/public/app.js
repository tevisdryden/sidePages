var app = window.angular.module('app', [])

app.factory('pokemonFetcher', pokemonFetcher)
app.controller('mainCtrl', mainCtrl)

function pokemonFetcher ($http) {

  var API_ROOT = '/pokemon'
  console.log("here again");
  return {
    get: function () {
      console.log("here again?");
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          console.log("got This for you");
          console.log(resp);
          return resp.data
        })
    },
    tryit: function() {
      console.log("here again?!?!?!");
      var politics = "/politics";
      return $http
        .get(politics)
        .then(function (resp) {
          console.log("Get Worked");
          console.log(resp.data);
          return resp.data
        })
    }
  }

}

function mainCtrl ($scope, pokemonFetcher, $http) {

  $scope.pokemon = []

  pokemonFetcher.get()
    .then(function (data) {
      console.log("is this here?");
      $scope.pokemon = data;
    })

  pokemonFetcher.tryit()
    .then(function (data) {
      console.log("tryit");
      console.log(data);
    })

  $scope.addPoki = function() {
    var formData = {name:$scope.Name,avatarUrl:$scope.Url};
    console.log(formData);
    var pokiURL = '/pokemon';
    $http({
       url: pokiURL,
       method: "POST",
       data: formData
    }).success(function(data, status, headers, config) {
      console.log("Post worked");
      console.log(data);
    }).error(function(data, status, headers, config) {
      console.log("Post failed");
    });
  }
}
