angular.module 'starter.services', []

  # Loader service
  .factory 'LoaderService', ['$rootScope', '$ionicLoading', ($rootScope, $ionicLoading) ->
    {
      show: ->
        
        options = 
          # The text to display in the loading indicator
          content: '<i class="icon ion-looping"></i>'

          # The animation to use
          animation: 'fade-in'

          # Will a dark overlay or backdrop cover the entire view
          showBackdrop: true

          # The maximum width of the loading indicator
          # Text will be wrapped if longer than maxWidth
          maxWidth: 200

          # The delay in showing the indicator
          showDelay: 500

        # Show the loading overlay and text
        $rootScope.loading = $ionicLoading.show(options)
        return

      hide: ->
        $ionicLoading.hide()
        return
    }
  ]

  # Helper
  .factory 'AGHelper', ['$ionicPopup', ($ionicPopup) ->
    helper = {}
    helper.alert = (msg) ->
        # navigator.notification.alert(msg)
        options =
          title: 'Alert'
          template: msg

        $ionicPopup.alert(options)
        return
    
    return helper
  ]

  # localStorage
  .factory 'localStorage', ['$window', ($window) ->
    {
      set: (key, value) ->
        $window.localStorage[key] = value
        return

      get: (key, defaultValue) ->
        $window.localStorage[key] || defaultValue

      setObject: (key, value) ->
        $window.localStorage[key] = JSON.stringify(value)
        return

      getObject: (key) ->
        JSON.parse($window.localStorage[key] || '{}')
    }
  ]

  # REST API resource
  .factory 'Fifa', ['$resource', ($resource) ->

    $resource 'data/teams.json', 
      {},
      {
        get: {
          method: 'GET'
          isArray: false
        }
      }
  ]

  # Get teams (either cached or remote)
  .factory 'Teams', ['Fifa', 'localStorage', (Fifa, localStorage) ->
    {
      all: () ->
        teams = localStorage.getObject('teams')

        if teams.length?
          # Get from local cached data
          # console.log 'LOCAL'
          teams

        else
          # Query teams form API
          # console.log 'REMOTE'
          Fifa.get {}, (teams) -> 
            # Save to local db
            localStorage.setObject('teams', teams.data)
            teams.data
    }
  ]

