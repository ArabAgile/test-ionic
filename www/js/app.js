angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngResource']).run([
  '$ionicPlatform', function($ionicPlatform) {
    return $ionicPlatform.ready = function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    };
  }
]).config([
  '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    }).state('app.teams', {
      url: "/teams",
      views: {
        'menuContent': {
          templateUrl: "templates/teams.html",
          controller: 'TeamsCtrl'
        }
      }
    }).state('app.single', {
      url: "/teams/:teamId",
      views: {
        'menuContent': {
          templateUrl: "templates/team.html",
          controller: 'TeamCtrl'
        }
      }
    }).state('app.edit', {
      url: "/edit/:teamId",
      views: {
        'menuContent': {
          templateUrl: "templates/edit.html",
          controller: 'EditTeamCtrl'
        }
      }
    });
    $urlRouterProvider.otherwise('/app/teams');
  }
]).config([
  '$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
]);


/*
  .config ['$resourceProvider', ($resourceProvider) ->
    $resourceProvider.defaults.useXDomain = true
    delete $resourceProvider.defaults.headers.common['X-Requested-With']
    return
  ]
 */

angular.module('starter.controllers', []).controller('AppCtrl', ['$scope', 'localStorage', 'AGHelper', function($scope, localStorage, AGHelper) {}]).controller('TeamsCtrl', [
  '$scope', 'localStorage', 'Fifa', function($scope, localStorage, Fifa) {
    var teams;
    teams = localStorage.getObject('teams');
    if (teams.length != null) {
      $scope.teams = teams;
    } else {
      Fifa.get({}, function(teams) {
        localStorage.setObject('teams', teams.data);
        return $scope.teams = teams.data;
      });
    }
  }
]).controller('TeamCtrl', [
  '$scope', 'Teams', '$stateParams', function($scope, Teams, $stateParams) {
    var team, teams, _i, _len;
    teams = Teams.all();
    $scope.id = $stateParams.teamId;
    for (_i = 0, _len = teams.length; _i < _len; _i++) {
      team = teams[_i];
      if (team.c_TeamNatioShort === $scope.id) {
        $scope.team = team;
        break;
      }
    }
  }
]).controller('EditTeamCtrl', [
  '$scope', 'Teams', 'localStorage', '$stateParams', '$location', function($scope, Teams, localStorage, $stateParams, $location) {
    var i, team, teams, _i, _len;
    teams = Teams.all();
    $scope.id = $stateParams.teamId;
    for (i = _i = 0, _len = teams.length; _i < _len; i = ++_i) {
      team = teams[i];
      if (team.c_TeamNatioShort === $scope.id) {
        $scope.team = team;
        $scope.index = i;
        break;
      }
    }
    $scope.edit = function() {
      teams[$scope.index].c_Team_en = $scope.team.c_Team_en;
      localStorage.setObject('teams', teams);
      $location.path('/app/teams/' + $scope.id);
    };
  }
]);

angular.module('starter.services', []).factory('LoaderService', [
  '$rootScope', '$ionicLoading', function($rootScope, $ionicLoading) {
    return {
      show: function() {
        var options;
        options = {
          content: '<i class="icon ion-looping"></i>',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 500
        };
        $rootScope.loading = $ionicLoading.show(options);
      },
      hide: function() {
        $ionicLoading.hide();
      }
    };
  }
]).factory('AGHelper', [
  '$ionicPopup', function($ionicPopup) {
    var helper;
    helper = {};
    helper.alert = function(msg) {
      var options;
      options = {
        title: 'Alert',
        template: msg
      };
      $ionicPopup.alert(options);
    };
    return helper;
  }
]).factory('localStorage', [
  '$window', function($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    };
  }
]).factory('Fifa', [
  '$resource', function($resource) {
    return $resource('data/teams.json', {}, {
      get: {
        method: 'GET',
        isArray: false
      }
    });
  }
]).factory('Teams', [
  'Fifa', 'localStorage', function(Fifa, localStorage) {
    return {
      all: function() {
        var teams;
        teams = localStorage.getObject('teams');
        if (teams.length != null) {
          return teams;
        } else {
          return Fifa.get({}, function(teams) {
            localStorage.setObject('teams', teams.data);
            return teams.data;
          });
        }
      }
    };
  }
]);
