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
