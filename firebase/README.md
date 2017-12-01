# firebase tutorial
For this tutorial we will build a simple angular chat application

1. Set up your firebase account at https://firebase.google.com/.  You should be able to login using your google account.  Go to the console and create a new project called "chat".  When you go to the project, you will see a option to "Add Firebase to your web app".  Select this option and it will give you a block of code to add to your firebase application.
2. Create an express application to host your files (express firebase)
2. Create an angular front end with a form and a place to list existing chats (public/index.html).
  ```html
<!doctype html>
<html ng-app="myApp">
  <head>
  <script src="https://www.gstatic.com/firebasejs/3.5.3/firebase.js"></script>
  <script>
  // Initialize Firebase
  var config = {
    apiKey: "From Step 1",
    authDomain: "From Step 1",
    databaseURL: "From Step 1",
    storageBucket: "From Step 1",
    messagingSenderId: "From Step 1"
  };
  firebase.initializeApp(config);
  </script>
  <!-- AngularJS -->
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
  <!-- AngularFire -->
  <script src="https://cdn.firebase.com/libs/angularfire/2.1.0/angularfire.min.js"></script>
  <!-- Your Javascript -->
  <script src="javascripts/script.js"></script>
  </head>
  
  <body>

  <div ng-controller="chatController">
  <form novalidate class="simple-form">
    Name: <input type="text" ng-model="user.name" /><br />
    Chat: <input type="text" ng-model="user.chat" /><br />
    <input type="submit" ng-click="update(user)" value="Save" />
  </form>
  <ul>
  <li ng-repeat='line in chats'>
  {{line.from}} - {{line.body}}
  </li>
  </ul>
</div>

  </body>
</html>
  ```
2. Now create a controller for this front end (public/javascripts/script.js)

  ```js
var myApp = angular.module("myApp",[]);
myApp.controller("chatController", ["$scope",
  function($scope) {
    $scope.chats = [];
    $scope.update = function(user) {
      var newmessage = {from:user.name || "anonymous",body:user.chat};
      console.log(newmessage);
      $scope.chats.push(newmessage);
      user.chat = "";
    }
  } 
]);
  ```
3. Test the application to make sure it works.
4. Now save the posts into firebase and make sure they end up there by looking at the database page.  First allow connections to your firebase database without authentication.  Go to your firebase console and select "Database" on the left margin.  This should expose the tabs "Data", "Rules", "Usage", "Backups".  Select "Rules" and replace the given rules with the following.
 ```
{
  "rules": {
    ".read": "true",
    ".write": "true"
  }
}
 ```
5. Then inject the firebase service into the controller.  You are enabling a three way binding between the html, javascript and database.  The "child" reference initializes the "messages" collection.  The call to $add() not only changes the $scope variable so that angular can add the chat to the list, but it also saves the chat to the database on firebase.  You can also run this in several windows and they will all stay synchronized since changes to one window will modify the firebase database and will then update all of the other browser data.  If this doesnt seem cool, I dont know what is.

 ```js
var myApp = angular.module("myApp",["firebase"]);
myApp.controller("chatController", ["$scope", "$firebaseArray",
  function($scope, $firebaseArray) {
    var ref = firebase.database().ref().child("messages");
    $scope.chats = $firebaseArray(ref);
    $scope.update = function(user) {
        var newmessage = {from:user.name || "anonymous",body:user.chat};
        console.log(newmessage);
        $scope.chats.$add(newmessage);
        user.chat = "";
    }
  }
]);
 ```
5. Look to see the resulting entries in the firebase interface
