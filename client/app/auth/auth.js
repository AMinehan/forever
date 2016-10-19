// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service


angular.module('forever.auth', [])

.controller('AuthController', authController);


function authController($scope, $window, $location, $rootScope, Auth) {
  $scope.user = {};
  $scope.message = '';

  init = function(){
    if (Auth.isAuth()) {
      $rootScope.$apply(function(){
        $location.path = '/world';
      });
    }
  }

  var validate = function() {
    if ($scope.user.username && $scope.user.password) {
      $scope.message = '';
      return true;
    }
    $scope.message = 'Please enter a username and password';
    return false;
  };

  $scope.signin = function () {
    if (validate()) {
      Auth.signin($scope.user)
        .then(function (token) {
          $scope.user.loggedinUsername = $scope.user.username;
          console.log('loggedin user: ', $scope.user.loggedinUsername);
          $window.localStorage.setItem('com.forever', token);
          $location.path('/world');
        })
        .catch(function (error) {
          $scope.message = 'Incorrect username or password';
          $scope.user.username = '';
          $scope.user.password = '';
          console.error(error);
        });
    }

  };

  $scope.signup = function () {
    if (validate()) {
      Auth.signup($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.forever', token);
          $location.path('/world');
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      $scope.user.username = '';
      $scope.user.password = '';
    }
  };

  $scope.signout = function() {
    Auth.signout();
  };

  init();
}

