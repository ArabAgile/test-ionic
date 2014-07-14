angular.module 'starter.controllers', []

  .controller 'AppCtrl', ['$scope', 'localStorage', 'AGHelper', ($scope, localStorage, AGHelper) ->
    # AGHelper.alert('Welcome!');

    return
  ]

  .controller 'TeamsCtrl', ['$scope', 'localStorage', 'Fifa', ($scope, localStorage, Fifa) ->

    teams = localStorage.getObject('teams')

    if teams.length?
      # Get from local cached data
      # console.log 'LOCAL'
      $scope.teams = teams

    else
      # Query teams form API
      # console.log 'REMOTE'
      Fifa.get {}, (teams) -> 
        # Save to local db
        localStorage.setObject('teams', teams.data)
        $scope.teams = teams.data

    return
  ]


  .controller 'TeamCtrl', ['$scope', 'Teams', '$stateParams', ($scope, Teams, $stateParams) ->
    teams = Teams.all()
    $scope.id = $stateParams.teamId

    for team in teams
      if team.c_TeamNatioShort == $scope.id
        $scope.team = team;
        break

    return
  ]


  .controller 'EditTeamCtrl', ['$scope', 'Teams', 'localStorage', '$stateParams', '$location', ($scope, Teams, localStorage, $stateParams, $location) ->
    teams = Teams.all()
    $scope.id = $stateParams.teamId

    for team, i in teams
      if team.c_TeamNatioShort == $scope.id
        $scope.team = team;
        $scope.index = i;
        break

    $scope.edit = () ->
      teams[$scope.index].c_Team_en = $scope.team.c_Team_en
      localStorage.setObject 'teams', teams
      $location.path '/app/teams/' + $scope.id
      return
      
    return
  ]