app.factory('AuthenticationService', function ($http, SessionService) {

  'use strict';

  return {

    login: function (user) {
      SessionService.currentUser = user;
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
