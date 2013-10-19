app.config(function ($stateProvider, $urlRouterProvider) {

  'use strict';

  $urlRouterProvider.otherwise('/app');

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'main/login.html',
      controller: 'LoginController'
    })

    .state('app', {
      url: '/app', 
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
    console.log(from.name + ' -> ' + to.name);
    // if route requires auth and user is not logged in
    if (!routeClean($location.url()) && !AuthenticationService.isLoggedIn()) {
      // redirect back to login
      ev.preventDefault();
      $location.path('/login');
    }
  });
});
