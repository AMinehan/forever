angular.module('forever.world', [])

.controller('WorldController', function ($scope, $location, Auth, World) {
  // Your code here
  var stringyMap = ['h','i']
  var player = {x: 3, y: 3};
 var codex = [[['TU '],
               ['ES '],
               ['ICI']],
              [[',,,'],
               [',,,'],
               [',,,']],
              [['==='],
               ['...'],
               ['===']],
              [['|.|'],
               ['|.|'],
               ['|.|']],
              [['/.\\'],
               ['...'],
               ['\\./']],
              [[',_ '],
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

/*index:

0: player
1: grass
2: horizontal road
3: vertical road
4: intersection
5: house
6: trees, front
7: trees, extended
8: water
9:
10:*/

  // $scope.handleInput = function() {
  //   $scope.data.filter;
  //   $scope.data.filteredArray = $scope.data.links.filter(function(link) {
  //     return link.title.toLowerCase().match($scope.data.filter.toLowerCase());
  //   });
  // };

var map = [[1,1,1,7,6,7,3,1,1,8],
           [1,8,8,6,8,6,3,5,1,1],
           [1,8,8,8,8,5,3,1,1,1],
           [1,1,1,1,1,1,3,5,1,1],
           [1,5,5,5,5,5,3,1,1,1],
           [2,2,2,2,2,2,4,2,2,2],
           [1,5,5,5,5,5,3,1,1,1],
           [1,7,7,7,1,1,3,1,1,1],
           [1,6,7,7,1,1,3,5,1,1],
           [1,1,6,6,1,5,3,5,1,1]];

  $scope.message = 'hello';

  $scope.signout = function() {
    Auth.signout();
  };
  var renderify = function(map, loc) {
    $scope.stringyMap = [];
    for (var i = 0; i < map[0].length * 3; i++){
      $scope.stringyMap.push(' ');
    }
    for (var i = 0; i < map[0].length; i++) {
      for (var j = 0; j < map[0].length; j++) {
        if (i === player.x && j === player.y) {
          codex[0].forEach(function(x, k) {
            $scope.stringyMap[i * 3 + k] += x;
          });
        } else {
          codex[map[i][j]].forEach(function(x, k){
            $scope.stringyMap[i*3 + k] += x;
          });
        }
      }
    }
  };
  $scope.clickNorth = function() {
    player.x--;
    renderify(map);
  };
  $scope.clickSouth = function() {
    player.x++;
    renderify(map);
  };
  $scope.clickEast = function() {
    player.y++;
    renderify(map);
  };
  $scope.clickWest = function() {
    player.y--;
    renderify(map);
  };
  $scope.keyHandler = function(key){
    console.log(key, 'hi');
    if (key.key === 'a'){
      player.y--;
    } else if (key.key === 's'){
      player.x++;
    } else if (key.key === 'd'){
      player.y++;
    } else if (key.key === 'w'){
      player.x--;
    }
    renderify(map);
  }
  var init = function() {
    $scope.world = World.getWorld();
    $scope.user = World.getPlayer();

    renderify(map);
    // if (Auth.isAuth()) {
    //   Links.getAll()
    //        .then(function(links) {
    //          $scope.data.links = links.sort(function(a, b) {
    //            return b.visits - a.visits;
    //          });
    //          $scope.data.filteredArray = $scope.data.links;
    //        });

    // } else {

      console.log('hi');
    // }

  };

  init();
})
// .directive('shortenLink', function () {
//   return {
//     template: '<div class="visits"><span class="count">{{ link.visits }} Visits</span></div>' +
//               '<img src="../assets/redirect_icon.png"></img>' +
//               '<span class=\'title\'>{{ link.title }}</span><br/>' +
//               '<span class=\'original\'>{{ link.url }}</span><br/>' +
//               '<a href=http://localhost:8000/{{link.code}}>http://www.shortlify.com/{{ link.code }}</a><br/>'
//   };
// });
