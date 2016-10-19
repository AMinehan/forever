angular.module('forever.services', [])

.factory('World', function($http){
  var getWorld = function() {
    return $http({
      method: 'GET',
      url: '/api/world'
    })
    .then(function(resp){
      return resp.data;
    })
  }
  var postWorld = function(locs, map){
    return $http({
      method: 'POST',
      url: 'api/world',
      data: {locs: locs, map: map}
    }).then(function(resp){console.log(resp);
      return resp;
    });
  }
  var getPlayer = function(){
    return $http({
      method: 'GET',
      url: 'api/player',
    })
    .then(function(resp){
      return resp.data;
    });
  }
  return {
    getWorld: getWorld,
    getPlayer: getPlayer,
    postWorld: postWorld
  }


})
.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.forever');
  };

  var signout = function () {
    console.log('goodbye forever');
    $window.localStorage.removeItem('com.forever');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
