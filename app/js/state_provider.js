app.config(function ($stateProvider, $urlRouterProvider) {

  'use strict';

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'main/login.html',
      controller: 'LoginController'
    })

    .state('app', {
      url: '/', 
      templateUrl: 'main/app.html',
      controller: 'AppController'
  });
});

app.run(function ($rootScope, $location, AuthenticationService) {

  'use strict';

  // enumerate routes that don't need authentication
  var routesThatDontRequireAuth = ['/login'];

  // check if current location matches route  
  var routeClean = function (route) {
    return _.find(routesThatDontRequireAuth,
      function (noAuthRoute) {
        return _.str.startsWith(route, noAuthRoute);
      });
  };

  $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
    // if route requires auth and user is not logged in
    if (!routeClean($location.url()) && !AuthenticationService.isLoggedIn()) {
      // redirect back to login
      $location.path('/login');
    }
  });
});
