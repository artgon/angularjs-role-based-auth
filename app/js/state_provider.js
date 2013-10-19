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
    })

    .state('admin', {
      url: '/admin', 
      templateUrl: 'main/admin.html',
      controller: 'AppController'
    })

    .state('error', {
      url: '/error', 
      templateUrl: 'main/error.html',
      controller: 'AppController'
    });
});

app.run(function ($rootScope, $location, AuthenticationService, RoleService, SessionService) {

  'use strict';

  // enumerate routes that don't need authentication
  var routesThatDontRequireAuth = ['/login'];
  var routesForAdmin = ['/admin'];

  // check if current location matches route  
  var routeClean = function (route) {
    return _.find(routesThatDontRequireAuth,
      function (noAuthRoute) {
        return _.str.startsWith(route, noAuthRoute);
      });
  };

  // check if current location matches route  
  var routeAdmin = function (route) {
    return _.find(routesForAdmin,
      function (noAuthRoute) {
        return _.str.startsWith(route, noAuthRoute);
      });
  };

  $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
    // if route requires auth and user is not logged in
    if (!routeClean($location.url()) && !AuthenticationService.isLoggedIn()) {
      // redirect back to login
      ev.preventDefault();
      $location.path('/login');
    }
    else if (routeAdmin($location.url()) && !RoleService.validateRoleAdmin(SessionService.currentUser)) {
      // redirect back to login
      ev.preventDefault();
      $location.path('/error');
    }
  });
});
