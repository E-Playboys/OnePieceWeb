OnePiece
    // =========================================================================
    // Login
    // =========================================================================
    .controller('loginCtrl', ['$scope', '$location', '$stateParams', '$state', 'authService', 'ngAuthSettings', '$rootScope', '$injector',
        function ($scope, $location, $stateParams, $state, authService, ngAuthSettings, $rootScope, $injector) {
            var $validationProvider = $injector.get('$validation');

            //Status
            $scope.loginTab = true;
            $scope.gotoTab = function (tabName) {
                $scope.loginTab = tabName == 'login';
                $scope.registerTab = tabName == 'register';
                $scope.forgotTab = tabName == 'forgot';
            }

            //Register
            $scope.registerForm = {
                checkValid: $validationProvider.checkValid,
                submit: function (form) {
                    $validationProvider.validate(form).success(function () {
                        $scope.register();
                    }).error(function () {
                    });
                },
                reset: function (form) {
                    $validationProvider.reset(form);
                }
            };

            $scope.register = function () {
                authService.saveRegistration($scope.registerForm).then(
                    function (response) {
                        $scope.loginForm.userName = $scope.registerForm.userName;
                        $scope.loginForm.password = $scope.registerForm.password;
                        $scope.login();
                        swal('success', 'User has been registered successfully.', 'success');
                    },
                    function (response) {
                        var errors = [];
                        for (var key in response.data.ModelState) {
                            for (var i = 0; i < response.data.ModelState[key].length; i++) {
                                errors.push(response.data.ModelState[key][i]);
                            }
                        }
                        swal(response.data.Message, errors.join(' '), 'error');
                    });
            }

            //Login
            $scope.loginForm = {
                checkValid: $validationProvider.checkValid,
                submit: function (form) {
                    $validationProvider.validate(form).success(function () {
                        $scope.login();
                    }).error(function () {
                    });
                },
                reset: function (form) {
                    $validationProvider.reset(form);
                }
            };

            $scope.login = function () {
                authService.login($scope.loginForm).then(
                    function (response) {
                        if ($state.current.name == 'account') {
                            $state.go('pages.wall');
                        } else {
                            $rootScope.$broadcast('hideLoginForm');
                        }
                    },
                    function (err) {
                        swal('Login failed!', err.error_description, 'error');
                    })
            }

            $scope.authExternalProvider = function (provider) {

                var redirectUri = location.protocol + '//' + location.host + '/authcomplete';

                var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
                                                                            + "&response_type=token&client_id=" + ngAuthSettings.clientId
                                                                            + "&redirect_uri=" + redirectUri;
                window.$windowScope = $scope;

                var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=" + $(window).width() + ",height=" + $(window).height());
            };

            $scope.authCompletedCB = function (fragment) {

                $scope.$apply(function () {

                    if (fragment.haslocalaccount == 'False') {

                        authService.logOut();
                        console.log(fragment);
                        authService.externalAuthData = {
                            provider: fragment.provider,
                            userName: fragment.external_user_name,
                            externalAccessToken: fragment.external_access_token
                        };

                        $rootScope.$broadcast('hideLoginForm');
                        $state.go('associate');
                    }
                    else {
                        //Obtain access token and redirect to orders
                        var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                        authService.obtainAccessToken(externalData).then(function (response) {
                            if ($state.current.name == 'account') {
                                $state.go('pages.wall');
                            } else {
                                $rootScope.$broadcast('hideLoginForm');
                            }
                        },
                     function (err) {
                         swal('Err!', err.error_descriptio, 'error');
                     });
                    }

                });
            }

        }])

