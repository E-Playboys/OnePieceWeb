OnePiece
    // =========================================================================
    // User Profile Controller
    // =========================================================================
    .controller('profileCtrl', ['authService', 'ngAuthSettings', 'FileUploader', 'localStorageService', '$http', '$state', '$stateParams', '$scope', function (authService, ngAuthSettings, FileUploader, localStorageService, $http, $state, $stateParams, $scope) {
        var _self = this;
        // Model property
        _self.currentUserInfo = {};
        _self.currentAuth = authService.authentication || {};
        _self.currentExtAuth = authService.externalAuthData || {};
        _self.editInfo = 0;
        _self.editContact = 0;
        _self.userGenger = { name: 'Others', value: 2 };
        _self.genderOptions = [
            { name: 'Male', value: 0 },
            { name: 'Female', value: 1 },
            { name: 'Others', value: 2 },
        ];
        _self.oldPassword = "";
        _self.newPassword = "";
        _self.newPasswordRetype = "";

        _self.IsAnotherProfile = $stateParams.username !== authService.authentication.userName;
        // For view another user profile
        if (_self.IsAnotherProfile) {
            authService.getUserProfile($stateParams.username).then(function (response) {
                _self.currentUserInfo = response.data;
                _self.currentUserInfo.DateOfBirth = _self.currentUserInfo.DateOfBirth != null ? moment(_self.currentUserInfo.DateOfBirth).format("DD/MM/YYYY") : "";
                _self.currentUserInfo.JoinedDate = moment(_self.currentUserInfo.JoinedDate).format("DD/MM/YYYY");
                _self.currentUserInfo.LastLogin = moment().format("DD/MM/YYYY");
                _self.userGenger = _self.genderOptions[_self.currentUserInfo.Gender];
            });
        } else {
            _self.currentUserInfo = authService.authentication.userInfo;

            // Reformat date time value
            _self.currentUserInfo.DateOfBirth = _self.currentUserInfo.DateOfBirth != null ? moment(_self.currentUserInfo.DateOfBirth).format("DD/MM/YYYY") : "";
            _self.currentUserInfo.JoinedDate = moment(_self.currentUserInfo.JoinedDate).format("DD/MM/YYYY");
            _self.currentUserInfo.LastLogin = moment().format("DD/MM/YYYY");

            // Serialize gender
            _self.userGenger = _self.genderOptions[_self.currentUserInfo.Gender];
        }

        _self.uploader = new FileUploader({
            url: hostName + 'api/uploadavatar'
        });

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _self.uploader.headers.Authorization = 'Bearer ' + authData.token;
        }
        
        _self.changeAvatar = function () {            
            $('#avaUploader').click();

            _self.postAvatarProfile = setInterval(function () {
                if (_self.uploader.queue.length > 0) {
                    _self.uploader.uploadAll();

                    _self.uploader.onSuccessItem = function (data, respone) {
                        _self.currentUserInfo.Avatar = respone.url;
                        _self.uploader.clearQueue();

                        authService.updateProfile(_self.currentUserInfo).then(function (response) {
                            authService.authentication.userInfo.Avatar = response.data.Avatar;

                            // Update auth data in local storage
                            var authLocalData = localStorageService.get('authorizationData');
                            authLocalData.userInfo = JSON.stringify(authService.authentication.userInfo);
                            localStorageService.set('authorizationData', authLocalData);

                            clearInterval(_self.postAvatarProfile);
                        });
                    };

                    _self.uploader.onErrorItem = function (item, response) {
                        swal("Err!", response.Message, "error");
                    }
                }
            }, 1000);
        };

        _self.updateUserInfo = function () {

            var IsChangePassword = !(_self.oldPassword === "" ||
                                    _self.newPassword === "" ||
                                    _self.newPasswordRetype === "") &&
                                         (_self.newPassword === _self.newPasswordRetype);

            _self.currentUserInfo.Gender = _self.userGenger.value;
            _self.currentUserInfo.DateOfBirth = moment(_self.currentUserInfo.DateOfBirth, "DD/MM/YYYY").format("YYYY/MM/DD");

            authService.updateProfile(_self.currentUserInfo).then(function (response) {
                authService.authentication.userInfo = response.data;

                // Update auth data in local storage
                var authLocalData = localStorageService.get('authorizationData');
                authLocalData.userInfo = JSON.stringify(authService.authentication.userInfo);
                localStorageService.set('authorizationData', authLocalData);
                _self.currentUserInfo.DateOfBirth = moment(_self.currentUserInfo.DateOfBirth).format("DD/MM/YYYY");

                editInfo = 0;
                editContact = 0;
            });

            if (IsChangePassword) {
                authService.changePassword(_self.oldPassword, _self.newPassword, _self.newPasswordRetype)
                    .then(function (response) {
                        if (response.status === 200) {
                            authService.logOut();
                            $state.go('account', { action: 'login' });
                        }
                });
            }
        };
    }])