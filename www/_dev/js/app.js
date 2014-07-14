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
