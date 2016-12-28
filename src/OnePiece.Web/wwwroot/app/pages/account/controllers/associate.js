OnePiece
    // =========================================================================
    // Associate
    // =========================================================================
    .controller('associateCtrl', ['$scope', '$state', 'authService', '$injector', function ($scope, $state, authService, $injector) {
        var $validationProvider = $injector.get('$validation');

        $scope.associateForm = {
            userName: authService.externalAuthData.userName,
            provider: authService.externalAuthData.provider,
            externalAccessToken: authService.externalAuthData.externalAccessToken,
            checkValid: $validationProvider.checkValid,
            submit: function (form) {
                $validationProvider.validate(form).success(function () {
                    authService.registerExternal($scope.associateForm).then(function (response) {
                        $state.go('pages.wall');
                    },
                     function (response) {
                         var errors = [];
                         for (var key in response.ModelState) {
                             errors.push(response.ModelState[key]);
                         }
                         swal(response.Message, errors.join(' '), 'error');
                     });
                }).error(function () {
                });
            },
            reset: function (form) {
                $validationProvider.reset(form);
            }
        };

        var _self = this;

        _self.registerData = {
            userName: authService.externalAuthData.userName,
            provider: authService.externalAuthData.provider,
            externalAccessToken: authService.externalAuthData.externalAccessToken
        };

        _self.registerExternal = function () {

            authService.registerExternal(_self.registerData).then(function (response) {
                $state.go('pages.wall');
            },
              function (response) {
                  var errors = [];
                  for (var key in response.ModelState) {
                      errors.push(response.ModelState[key]);
                  }
                  swal(response.Message, errors.join(' '), 'error');
              });
        };
    }])

