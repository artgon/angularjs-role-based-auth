app.controller('LoginController', function ($scope, AuthenticationService) {

    'use strict';

    $scope.login = function() {
      AuthenticationService.login({name: 'arthur'});
    };
});

app.controller('AppController', function ($scope, SessionService) {

    'use strict';

    $scope.name = SessionService.currentUser.name;
});


