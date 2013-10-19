app.factory('AuthenticationService', function ($http, SessionService) {

  'use strict';

  return {

    login: function (credentials) {
      return $http.post('/api/login', credentials).success(function (data) {
        if (data.loggedIn) {
          SessionService.currentUser = data.user;
        }
      });
    },

    isLoggedIn: function () {
      return SessionService.currentUser !== null;
    }
  };
});

app.factory('SessionService', function () {

  'use strict';

  return {
    currentUser: null
  };
});
