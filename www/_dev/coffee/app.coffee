
angular.module 'starter', ['ionic', 'starter.controllers', 'starter.services', 'ngResource']

  .run ['$ionicPlatform', ($ionicPlatform) ->
    $ionicPlatform.ready = ->
      if window.cordova && window.cordova.plugins.Keyboard
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar true

      if window.StatusBar 
        StatusBar.styleDefault()
        return
  ]

  .config ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->
    
    # Main 
    $stateProvider

    .state 'app', {
      url: "/app"
      abstract: true
      templateUrl: "templates/menu.html"
      controller: 'AppCtrl'
    }

    # Teams
    .state 'app.teams', {
      url: "/teams"
      views: {
        'menuContent' : {
          templateUrl: "templates/teams.html"
          controller: 'TeamsCtrl'
        }
      }

    }

    # Single team
    .state 'app.single', {
      url: "/teams/:teamId"
      views: {
        'menuContent' : {
          templateUrl: "templates/team.html"
          controller: 'TeamCtrl'
        }
      }
    }

    # Edit team
    .state 'app.edit', {
      url: "/edit/:teamId"
      views: {
        'menuContent' : {
          templateUrl: "templates/edit.html"
          controller: 'EditTeamCtrl'
        }
      }
    }

    $urlRouterProvider.otherwise '/app/teams'

    return
  ]

  .config ['$httpProvider', ($httpProvider) ->
    $httpProvider.defaults.useXDomain = true
    delete $httpProvider.defaults.headers.common['X-Requested-With']
    return
  ]

###
  .config ['$resourceProvider', ($resourceProvider) ->
    $resourceProvider.defaults.useXDomain = true
    delete $resourceProvider.defaults.headers.common['X-Requested-With']
    return
  ]
###
