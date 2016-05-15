// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material', 'satellizer']);


app.run(function ($ionicPlatform, $rootScope, $state) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart', function(event, toState) {

    // Grab the user from local storage and parse it to an object
    var user = JSON.parse(localStorage.getItem('user'));

    // If there is any user data in local storage then the user is quite
    // likely authenticated. If their token is expired, or if they are
    // otherwise not actually authenticated, they will be redirected to
    // the auth state because of the rejected request anyway
    if(user) {
      // The user's authenticated state gets flipped to
      // true so we can now show parts of the UI that rely
      // on the user being logged in
      $rootScope.authenticated = true;

      // Putting the user's data on $rootScope allows
      // us to access it anywhere across the app. Here
      // we are grabbing what is in local storage
      $rootScope.currentUser = user;

      // If the user is logged in and we hit the auth route we don't need
      // to stay there and can send the user to the main state
      if(toState.name === "login") {

        // Preventing the default behavior allows us to use $state.go
        // to change states
        event.preventDefault();

        // go to the "main" state which in our case is users
        $state.go('app.components');
      }
    }
  });

});

app.config(function ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide) {

  $authProvider.loginUrl = 'http://185.81.167.243/api' + '/authenticate';

  $stateProvider
      .state('app', {
        url: '/app',
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.lastData', {
        url: '/lastData',
        views: {
          'menuContent': {
            templateUrl: 'templates/lastStationsData.html',
            controller: 'LastStationsDataCtrl'
          }
        }
      })

      .state('app.lists', {
        url: '/lists',
        views: {
          'menuContent': {
            templateUrl: 'templates/lists.html',
            controller: 'ListsCtrl'
          }
        }
      })

      .state('app.components', {
        url: '/components',
        views: {
          'menuContent': {
            templateUrl: 'templates/components.html',
            controller: 'ComponentsCtrl'
          }
        }
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'AuthCtrl as auth'

      })

      .state('app.createStation', {
        url: '/createStation',
        views: {
          'menuContent': {
            templateUrl: 'templates/createStation.html',
            controller: 'CreateStationCtrl'
          }
        }
      })

      .state('app.editStation', {
        url: '/editStation/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/editStation.html',
            controller: 'EditStationCtrl'
          }
        }
      })

      .state('app.userStations', {
        url: '/userStations',
        views: {
          'menuContent': {
            templateUrl: 'templates/userStations.html',
            controller: 'StationsCtrl'
          }
        }
      })

      .state('app.weathers', {
        url: '/weathers',
        views: {
          'menuContent': {
            templateUrl: 'templates/weathers.html',
            controller: 'WeathersCtrl'
          }
        }
      })

      .state('app.userDetails', {
        url: '/userDetails',
        views: {
          'menuContent': {
            templateUrl: 'templates/userDetails.html',
            controller: 'UserCtrl'
          }
        }
      });

  function redirectWhenLoggedOut($q, $injector) {

    return {

      responseError: function(rejection) {

        // Need to use $injector.get to bring in $state or else we get
        // a circular dependency error
        var $state = $injector.get('$state');

        // Instead of checking for a status code of 400 which might be used
        // for other reasons in Laravel, we check for the specific rejection
        // reasons to tell us if we need to redirect to the login state
        var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

        // Loop through each rejection reason and redirect to the login
        // state if one is encountered
        angular.forEach(rejectionReasons, function(value, key) {

          if(rejection.data.error === value) {

            // If we get a rejection corresponding to one of the reasons
            // in our array, we know we need to authenticate the user so
            // we can remove the current user from local storage
            localStorage.removeItem('user');

            // Send the user to the auth state so they can login
            $state.go('/login');
          }
        });

        return $q.reject(rejection);
      }
    }
  }

  // Setup for the $httpInterceptor
  $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

  // Push the new factory onto the $http interceptor array
  $httpProvider.interceptors.push('redirectWhenLoggedOut');

  $authProvider.loginUrl = 'http://185.81.167.243/api' +  '/authenticate';

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
})
.directive('ngLastRepeat', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      if (scope.$last === true) {
        $timeout(function () {
          scope.$emit('ngLastRepeat'+ (attr.ngLastRepeat ? '.'+attr.ngLastRepeat : ''));
        });
      }
    }
  }
});
