function AuthInterceptorServiceFactory($q, $injector, $location, localStorageService, $rootScope) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            var $state = $injector.get('$state');
            var authService = $injector.get('authService');
            var authData = localStorageService.get('authorizationData');

            if (authData) {
                if (authData.useRefreshTokens) {
                    authService.refreshToken();
                    return $q.reject(rejection);
                }
            }
            authService.logOut();
            $rootScope.$broadcast('showLoginForm');
        } else {
            swal(rejection.statusText, rejection.data.Message, "error");
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}