angular.module('forever.world', [])

//////////////////////////////////////////
//                                      //
//         MAIN SPAGHETTI FILE          //
//                                      //
//////////////////////////////////////////

.controller('WorldController', function ($scope, $location, Auth, World, $http) {

//////////////////////////////////////////
//                                      //
//              VARIABLES               //
//                                      //
//////////////////////////////////////////

  $scope.username = '';
  $scope.playerStuff = {'stuff': 1, 'thing': 2};
  var stringyMap = [];
  var worldDB = {};
  var worldPointer = ''
  var player = {x: 3, y: 3};
  $scope.worldLoc = {x: 0, y: 0}
  var cityCodex =[[['T U'],
                   ['E S'],
                   ['ICI']],
                  [[',,,'],
                   [',,,'],
                   [',,,']],
                  [['---'],
                   ['...'],
                   ['---']],
                  [['|.|'],
                   ['|.|'],
                   ['|.|']],
                  [['/.\\'],
                   ['...'],
                   ['\\./']],
                   [[',_,'],
                   ['/o\\'],
                   ['|_|']],
                  [['mmm'],
                   ['mmm'],
                   ['|||']],
                  [['mmm'],
                   ['mmm'],
                   ['mmm']],
                  [['^-^'],
                   ['-^-'],
                   ['^-^']]];

  var worldCodex = [[['T U'],
                     ['E S'],
                     ['ICI']],
                    [['WWW'],
                     ['WWW'],
                     ['WWW']],
                    [[',,,'],
                     [',,,'],
                     [',,,']],
                    [['^^^'],
                     ['^^^'],
                     ['^^^']],
                    [['^-^'],
                     ['-^-'],
                     ['^-^']],
                    [[',.,'],
                     ['.,.'],
                     [',.,']]];

  var activeCodex = cityCodex;

  var worldTemplate =[[1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1],
                      [1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1],
                      [1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1],
                      [1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1],
                      [1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1],
                      [1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1],
                      [1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1],
                      [1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1],
                      [1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1],
                      [1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1]];

var cityMap = [[1,1,1,7,6,7,3,1,1,8],
              [1,8,8,6,8,6,3,5,1,1],
              [1,8,8,8,8,5,3,1,1,1],
              [1,1,1,1,1,1,3,5,1,1],
              [1,5,5,5,5,5,3,1,1,1],
              [2,2,2,2,2,2,4,2,2,2],
              [1,5,5,5,5,5,3,1,1,1],
              [1,7,7,7,1,1,3,1,1,1],
              [1,6,7,7,1,1,3,5,1,1],
              [1,1,6,6,1,5,3,5,1,1]];

var messages = ['YOU LIVE IN THE SUBURBS.  IT IS BORING HERE.  IT IS TIME WE LEAVE.',
                'THE FOG MUST BE IN.  LOOK AROUND FOR SOMETHING TO DO.',
                'OBEY THE MACHINE.  IN 500 YARDS, TURN LEFT.',
                'YOU HAVE ARRIVED AT YOUR DESTINATION.  BUILD ME A HOUSE.',
                'BUILD A ROAD.'];

var activeMap = cityMap;
  $scope.message = messages[0];

//////////////////////////////////////////
//                                      //
//              FUNCTIONS               //
//                                      //
//////////////////////////////////////////

  $scope.signout = function() {
    Auth.signout();
  };

  //duplicates array of subarrays
  var copyMap = function(elmap){
    return elmap.slice().reduce(function(acc, cur){
      acc.push(cur.slice());
      return acc;
    }, [])
  }

  //renders map
  var renderify = function(map, loc) {
    $scope.stringyMap = [];
    for (var i = 0; i < map[0].length * 3; i++){
      $scope.stringyMap.push(' ');
    }
    for (var i = 0; i < map[0].length; i++) {
      for (var j = 0; j < map[0].length; j++) {
        if (i === player.x && j === player.y) {
          if (Math.floor(activeMap[i][j]) === 1 && activeMap !== cityMap){
            activeMap[i][j] = explore();
          }
          cityCodex[0].forEach(function(x, k) {
            $scope.stringyMap[i * 3 + k] += x;
          });
        } else if (map[i][j] % Math.floor(map[i][j]) === 0) {
          cityCodex[map[i][j]].forEach(function(x, k){
            $scope.stringyMap[i*3 + k] += x;
          });
        } else {
          worldCodex[Math.floor(map[i][j])].forEach(function(x, k){
            $scope.stringyMap[i*3 + k] += x;
          });
        }
      }
    }
  };

  //replace WWWs with random tiles
  var explore = function() {
    return Math.floor(Math.random() * (worldCodex.length - 2)) + 5 / 2;
  }

  //build exciting houses!
  var housify = function() {
    activeMap[player.x][player.y] = 5;
    if ($scope.message === messages[3]) {
      $scope.message = messages[4];
    }

  }

  //build exciting roads!
  var roadify = function(locs) {
    var roads = [2,3,4]
    $scope.message = $scope.message === messages[4] ? '' : $scope.message;
    if (roads.indexOf(activeMap[locs.x][locs.y]) === -1){
      return;
    }
    if (roads.indexOf(activeMap[locs.x][locs.y + 1]) !== -1 || roads.indexOf(activeMap[locs.x][locs.y - 1]) !== -1){
      if (roads.indexOf(activeMap[locs.x + 1][locs.y]) !== -1 || roads.indexOf(activeMap[locs.x - 1][locs.y]) !== -1){
        activeMap[locs.x][locs.y] = 4;
      } else {
        activeMap[locs.x][locs.y] = 2;
      }
    } else {
      activeMap[locs.x][locs.y] = 3;
    }

  }
  $scope.keyHandler = function(key){

    //check for wasd movement and rerender map
    if (key.key === 'a'){
      player.y--;
    } else if (key.key === 's'){
      player.x++;
    } else if (key.key === 'd'){
      player.y++;
    } else if (key.key === 'w'){
      player.x--;
    } else if (key.key === 'e'){
      housify();
    } else if (key.key === 'q'){
      activeMap[player.x][player.y] = 3
      roadify({x: player.x, y: player.y});
      for (var i = -1; i < 2; i++) {
        if (player.x + i >=0 && player.x + i <= 9){
          roadify({x: (player.x + i), y: player.y})
        }
      }
      for (var i = -1; i < 2; i++) {
        if (player.y + i >=0 && player.y + i <= 9){
          roadify({x: player.x, y: (player.y + i)})
        }
      }
    }

    //check if player leaves the edge of the map
    if (player.x > 9 || player.x < 0 || player.y > 9 || player.y < 0){
      scribe();
      worldDB[worldPointer] = copyMap(activeMap);
      World.postWorld(worldPointer, worldDB[worldPointer]);
      if (player.x < 0) {
        player.x = 9;
        $scope.worldLoc.x--;
      }
      if (player.y < 0) {
        player.y = 9;
        $scope.worldLoc.y--;
      }
      if (player.x > 9) {
        player.x = 0;
        $scope.worldLoc.x++;
      }
      if (player.y > 9) {
        player.y = 0;
        $scope.worldLoc.y++;
      }
      if ($scope.worldLoc.x === 0 && $scope.worldLoc.y === 0) {
        activeMap = cityMap;
      } else {
        scribe();
        if (worldDB.hasOwnProperty ( worldPointer )){
          activeMap = worldDB[worldPointer];
        } else {
          activeMap = copyMap(worldTemplate);
          $scope.message = $scope.message === messages [0] ? messages[1] : $scope.message;
        }
      }
      if (Math.abs($scope.worldLoc.y) > 3 || Math.abs($scope.worldLoc.x) > 3) {
        $scope.message = $scope.message === messages[1] ? messages[2] : $scope.message;
      }
      if (Math.abs($scope.worldLoc.y) > 4 || Math.abs($scope.worldLoc.x) > 4) {
        $scope.message = $scope.message === messages[2] ? messages[3] : $scope.message;
      }
    }
    renderify(activeMap);
  }

  //convert x,y location into a string to be used as a key
  var scribe = function() {
    worldPointer = [$scope.worldLoc.x, $scope.worldLoc.y].join();
  };

  //run once on start
  var init = function() {
    World.getWorld()
    .then(function(globe){
      setTimeout(function(){
        var temp = globe;
        temp.forEach(function(x){
          worldDB[x.location] = x.data;
        });
      }, 2000)

    });
    $scope.user = World.getPlayer();
    renderify(activeMap);
  };
  setTimeout(function(){
    $scope.username = $scope.user.$$state.value.username;
  }, 1000)

  init();
});