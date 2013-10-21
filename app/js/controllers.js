app.controller('LoginController', function ($scope, AuthenticationService) {

    'use strict';

    $scope.loginUser = function() {
      // this should be replaced with a call to your API for user verification (or you could also do it in the service)
      AuthenticationService.login({name: 'User', role: 'user'});
    };

    $scope.loginAdmin = function() {
      // this should be replaced with a call to your API for user verification (or you could also do it in the service)    
      AuthenticationService.login({name: 'Admin', role: 'admin'});
    };
});

app.controller('AppController', function ($scope, SessionService) {

    'use strict';

    $scope.name = SessionService.currentUser.name;
});


