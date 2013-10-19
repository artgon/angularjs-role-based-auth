app.controller('LoginController', function ($scope, AuthenticationService) {

    'use strict';

    $scope.loginUser = function() {
      AuthenticationService.login({name: 'User', role: 'user'});
    };

    $scope.loginAdmin = function() {
      AuthenticationService.login({name: 'Admin', role: 'admin'});
    };
});

app.controller('AppController', function ($scope, SessionService) {

    'use strict';

    $scope.name = SessionService.currentUser.name;
});


