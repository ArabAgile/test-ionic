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
