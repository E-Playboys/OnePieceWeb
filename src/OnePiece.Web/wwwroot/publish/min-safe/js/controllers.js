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
OnePiece
    // =========================================================================
    // Base controller for common functions
    // =========================================================================

    .controller('OnePieceCtrl', ['$timeout', '$state', 'growlService', 'authService', '$scope', function ($timeout, $state, growlService, authService, $scope) {
        this.OnePieceData = OnePieceData;

        this.authentication = authService.authentication;

        if (this.authentication.isAuth) {
            //Welcome Message
            growlService.growl('Welcome back ' + this.authentication.userInfo.DisplayName + '!', 'inverse')
        }

        this.logOut = function () {
            authService.logOut();
            $state.go('pages.wall');
        }
        
        // Detact Mobile Browser
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            angular.element('html').addClass('ismobile');
            this.hideHeaderAttr = true;
            this.hideOffsetAttr = '90';
            this.isMobile = true;
        }

        // By default Sidbars are hidden in boxed layout and in wide layout only the right sidebar is hidden.
        this.sidebarToggle = {
            left: false,
            right: false
        }

        // By default template has a boxed layout
        this.layoutType = localStorage.getItem('ma-layout-status');
        
        // For Mainmenu Active Class
        this.$state = $state;    
        
        //Close sidebar on click
        this.sidebarStat = function(event) {
            if (!angular.element(event.target).parent().hasClass('active')) {
                this.sidebarToggle.left = false;
            }
        }
    }])

    // =========================================================================
    // Header
    // =========================================================================
    .controller('headerCtrl', ['$timeout', '$rootScope', 'messageService', '$state', '$uibModal', function ($timeout, $rootScope, messageService, $state, $uibModal) {
        var _self = this;
         // Top Search
        _self.openSearch = function () {
            angular.element('#header').addClass('search-toggled');
            //growlService.growl('Welcome back Mallinda Hollaway', 'inverse');
        }

        _self.closeSearch = function () {
            angular.element('#header').removeClass('search-toggled');
        }

        _self.searchText = '';
        _self.search = function () {
            $state.go('pages.wall', { filter: 'search', slug: _self.searchText });
        }
        
        // Get messages and notification for header
        _self.img = messageService.img;
        _self.user = messageService.user;
        _self.user = messageService.text;

        _self.messageResult = messageService.getMessage(_self.img, _self.user, _self.text);


        //Clear Notification
        _self.clearNotification = function ($event) {
            $event.preventDefault();
            
            var x = angular.element($event.target).closest('.listview');
            var y = x.find('.lv-item');
            var z = y.size();
            
            angular.element($event.target).parent().fadeOut();
            
            x.find('.list-group').prepend('<i class="grid-loading hide-it"></i>');
            x.find('.grid-loading').fadeIn(1500);
            var w = 0;
            
            y.each(function(){
                var z = $(this);
                $timeout(function(){
                    z.addClass('animated fadeOutRightBig').delay(1000).queue(function(){
                        z.remove();
                    });
                }, w+=150);
            })
            
            $timeout(function(){
                angular.element('#notifications').addClass('empty');
            }, (z*150)+200);
        }
        
        // Clear Local Storage
        _self.clearLocalStorage = function () {
            
            //Get confirmation, if confirmed clear the localStorage
            swal({   
                title: "Are you sure?",   
                text: "All your saved localStorage values will be removed",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#be1101",
                confirmButtonText: "Yes, delete it!",   
                closeOnConfirm: false 
            }, function(){
                localStorage.clear();
                swal("Done!", "localStorage is cleared", "success"); 
            });
            
        }
        
        //Fullscreen View
        _self.fullScreen = function () {
            //Launch
            function launchIntoFullscreen(element) {
                if(element.requestFullscreen) {
                    element.requestFullscreen();
                } else if(element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if(element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if(element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            }

            //Exit
            function exitFullscreen() {
                if(document.exitFullscreen) {
                    document.exitFullscreen();
                } else if(document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if(document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }

            if (exitFullscreen()) {
                launchIntoFullscreen(document.documentElement);
            }
            else {
                launchIntoFullscreen(document.documentElement);
            }
        }

        _self.showPostingForm = function () {
            $rootScope.$broadcast('showPostingForm');
        }

        function modalInstances(animation, size, backdrop, keyboard) {
            _self.modalInstance = $uibModal.open({
                animation: animation,
                templateUrl: 'loginForm',
                controller: 'loginCtrl',
                size: size,
                backdrop: backdrop,
                keyboard: keyboard,
                windowClass: 'login-form'
            });
        }

        _self.showLoginForm = function () {
            modalInstances(true, 'md', true, true)
        }

        _self.hideLoginForm = function () {
            _self.modalInstance.close();
        }

        
        $rootScope.$on('showLoginForm', function () {
            _self.showLoginForm();
        });

        $rootScope.$on('hideLoginForm', function () {
            _self.hideLoginForm();
        });
    }])



OnePiece
    // =========================================================================
    // League
    // =========================================================================
    .controller('leagueCtrl', ['$modal', '$scope', 'League', 'localStorageService', '$http', function ($modal, $scope, League, localStorageService, $http) {
        var _self = this;

        _self.League = new League();
        _self.League.nextPage();

        //Listview Search (Check listview pages)
        _self.listviewSearchStat = false;

        _self.lvSearch = function () {
            _self.listviewSearchStat = true;
        }

        function modalInstances(animation, size, backdrop, keyboard, league) {
            _self.league = league;
            var modalInstance = $modal.open({
                animation: animation,
                templateUrl: 'addLeagueForm',
                controller: [
                    '$scope', '$modalInstance', 'FileUploader', function ($scope, $modalInstance, FileUploader) {
                        var uploadUrl = hostName + 'api/uploadavatar';
                        var filter = {
                            name: 'imageFilter',
                            fn: function (item /*{File|FileLikeObject}*/, options) {
                                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                            }
                        }
                        
                        $scope.newLeague = _self.league || {};

                        $scope.logoUploader = new FileUploader({
                            url: uploadUrl
                        });

                        $scope.logoUploader.onBeforeUploadItem = function (item) {
                            var authData = localStorageService.get('authorizationData');
                            if (authData) {
                                item.headers.Authorization = 'Bearer ' + authData.token;
                            }
                        };

                        $scope.logoUploader.filters.push(filter);

                        $scope.logoUploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                            swal("Err!", 'Please use |jpg|png|jpeg|bmp|gif| files.', "error");
                        };

                        $scope.save = function () {
                            $scope.uploadedLogo = false;
                            if ($scope.logoUploader.queue.length > 0) {
                                $scope.logoUploader.uploadAll();
                                $scope.logoUploader.onSuccessItem = function (item, response) {
                                    $scope.newLeague.Logo = response.url;
                                    $scope.uploadedLogo = true;
                                    $scope.sendLeague();
                                }
                                $scope.logoUploader.onErrorItem = function (item, response) {
                                }
                            } else {
                                if ($scope.newLeague.Logo) {
                                    $scope.uploadedLogo = true;
                                    $scope.sendLeague();
                                } else {
                                    swal("Empty Logo!", 'Please select Logo.', "error");
                                }
                            }

                        };

                        $scope.sendLeague = function () {
                            if ($scope.uploadedLogo) {
                                $http({
                                    url: hostName + 'api/league/createorupdate',
                                    method: "POST",
                                    data: $scope.newLeague
                                }).success(function (result) {
                                    if ($scope.newLeague.Id > 0) {
                                        var index = _self.League.items.indexOf($scope.newLeague);
                                        _self.League.items[index] = result;
                                    } else {
                                        _self.League.items.push(result);
                                    }

                                    $scope.logoUploader.clearQueue();
                                    $modalInstance.close();
                                }).error(function (result, status) {
                                    swal("Err!", result.Message, "error");
                                });
                            }
                        }

                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    }
                ],
                size: size,
                backdrop: backdrop,
                keyboard: keyboard
            });
        }

        _self.open = function (league) {
            modalInstances(true, 'lg', true, true, league)
        }

    }])
OnePiece
    // =========================================================================
    // Player
    // =========================================================================
    .controller('playerCtrl', ['$modal', '$scope', 'Player', 'localStorageService', '$http', function ($modal, $scope, Player, localStorageService, $http) {
        var _self = this;

        _self.Player = new Player();
        _self.Player.nextPage();

        //Listview Search (Check listview pages)
        _self.listviewSearchStat = false;

        _self.lvSearch = function () {
            _self.listviewSearchStat = true;
        }

        function modalInstances(animation, size, backdrop, keyboard, player) {
            _self.player = player;
            var modalInstance = $modal.open({
                animation: animation,
                templateUrl: 'addPlayerForm',
                controller: [
                    '$scope', '$uibModalInstance', 'FileUploader', function ($scope, $uibModalInstance, FileUploader) {
                        var uploadUrl = hostName + 'api/uploadavatar';
                        var filter = {
                            name: 'imageFilter',
                            fn: function (item /*{File|FileLikeObject}*/, options) {
                                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                            }
                        }
                        
                        $scope.newPlayer = _self.player || {};

                        $scope.avatarUploader = new FileUploader({
                            url: uploadUrl
                        });

                        $scope.avatarUploader.onBeforeUploadItem = function (item) {
                            var authData = localStorageService.get('authorizationData');
                            if (authData) {
                                item.headers.Authorization = 'Bearer ' + authData.token;
                            }
                        };

                        $scope.avatarUploader.filters.push(filter);

                        $scope.avatarUploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                            swal("Err!", 'Please use |jpg|png|jpeg|bmp|gif| files.', "error");
                        };

                        $scope.save = function () {
                            $scope.uploadedAvatar = false;
                            if ($scope.avatarUploader.queue.length > 0) {
                                $scope.uploadedAvatar = false;
                                $scope.avatarUploader.uploadAll();
                                $scope.avatarUploader.onSuccessItem = function (item, response) {
                                    $scope.newPlayer.Avatar = response.url;
                                    $scope.newPlayer.FunnyAvatar = response.url;
                                    $scope.uploadedAvatar = true;
                                    $scope.sendPlayer();
                                }
                                $scope.avatarUploader.onErrorItem = function (item, response) {
                                }
                            } else {
                                if ($scope.newPlayer.Avatar) {
                                    $scope.uploadedAvatar = true;
                                    $scope.sendPlayer();
                                } else {
                                    swal("Empty Avatar!", 'Please select Avatar.', "error");
                                }
                            }

                        };

                        $scope.sendPlayer = function () {
                            if ($scope.uploadedAvatar) {
                                $http({
                                    url: hostName + 'api/player/createorupdate',
                                    method: "POST",
                                    data: $scope.newPlayer
                                }).success(function (result) {
                                    if ($scope.newPlayer.Id > 0) {
                                        var index = _self.Player.items.indexOf($scope.newPlayer);
                                        _self.Player.items[index] = result;
                                    } else {
                                        _self.Player.items.push(result);
                                    }

                                    $scope.avatarUploader.clearQueue();
                                    $uibModalInstance.close();
                                }).error(function (result, status) {
                                    swal("Err!", result.Message, "error");
                                });
                            }
                        }

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }
                ],
                size: size,
                backdrop: backdrop,
                keyboard: keyboard
            });
        }

        _self.open = function (player) {
            modalInstances(true, 'lg', true, true, player)
        }

    }])
OnePiece
    // =========================================================================
    // Team
    // =========================================================================
    .controller('teamCtrl', ['$uibModal', '$scope', 'Team', 'localStorageService', '$http', function ($uibModal, $scope, Team, localStorageService, $http) {
        var _self = this;

        _self.Team = new Team();
        _self.Team.nextPage();

        //Listview Search (Check listview pages)
        _self.listviewSearchStat = false;

        _self.lvSearch = function () {
            _self.listviewSearchStat = true;
        }

        function modalInstances(animation, size, backdrop, keyboard, team) {
            _self.team = team;
            var modalInstance = $uibModal.open({
                animation: animation,
                templateUrl: 'addTeamForm',
                controller: [
                    '$scope', '$uibModalInstance', 'FileUploader', function ($scope, $uibModalInstance, FileUploader) {
                        var uploadUrl = hostName + 'api/uploadavatar';
                        var filter = {
                            name: 'imageFilter',
                            fn: function (item /*{File|FileLikeObject}*/, options) {
                                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                            }
                        }
                        
                        $scope.newTeam = _self.team || {};

                        $scope.logoUploader = new FileUploader({
                            url: uploadUrl
                        });

                        $scope.logoUploader.onBeforeUploadItem = function (item) {
                            var authData = localStorageService.get('authorizationData');
                            if (authData) {
                                item.headers.Authorization = 'Bearer ' + authData.token;
                            }
                        };

                        $scope.logoUploader.filters.push(filter);

                        $scope.logoUploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                            swal("Err!", 'Please use |jpg|png|jpeg|bmp|gif| files.', "error");
                        };

                        $scope.save = function () {
                            $scope.uploadedLogo = false;
                            if ($scope.logoUploader.queue.length > 0) {
                                $scope.logoUploader.uploadAll();
                                $scope.logoUploader.onSuccessItem = function (item, response) {
                                    $scope.newTeam.Logo = response.url;
                                    $scope.uploadedLogo = true;
                                    $scope.sendTeam();
                                }
                                $scope.logoUploader.onErrorItem = function (item, response) {
                                }
                            } else {
                                if ($scope.newTeam.Logo) {
                                    $scope.uploadedLogo = true;
                                    $scope.sendTeam();
                                } else {
                                    swal("Empty Logo!", 'Please select Logo.', "error");
                                }
                            }

                        };

                        $scope.sendTeam = function () {
                            if ($scope.uploadedLogo) {
                                $http({
                                    url: hostName + 'api/team/createorupdate',
                                    method: "POST",
                                    data: $scope.newTeam
                                }).success(function (result) {
                                    if ($scope.newTeam.Id > 0) {
                                        var index = _self.Team.items.indexOf($scope.newTeam);
                                        _self.Team.items[index] = result;
                                    } else {
                                        _self.Team.items.push(result);
                                    }
                                    $scope.logoUploader.clearQueue();
                                    $uibModalInstance.close();
                                }).error(function (result, status) {
                                    swal("Err!", result.Message, "error");
                                });
                            }
                        }

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }
                ],
                size: size,
                backdrop: backdrop,
                keyboard: keyboard
            });
        }

        _self.open = function (team) {
            modalInstances(true, 'lg', true, true, team)
        }

    }])
OnePiece
    // =========================================================================
    // Gag
    // =========================================================================
    .controller('gagCtrl', ['authService', '$sce', '$scope', '$rootScope', '$timeout', '$http', '$stateParams', '$uibModal', 'FileUploader', 'Gag', 'Tags', 'Tag', '$anchorScroll', 'localStorageService', '$injector', 
        function (authService, $sce, $scope, $rootScope, $timeout, $http, $stateParams, $uibModal, FileUploader, Gag, Tags, Tag, $anchorScroll, localStorageService, $injector) {
        var _self = this;

        _self.trustAsResourceUrl = $sce.trustAsResourceUrl;

        _self.Gag = new Gag();
        _self.Gag.slug = $stateParams.slug;
        _self.Gag.getGag(function (gag) {
            _self.newComment = {
                Content: '',
                ActionForId: gag.Id
            };

            _self.sendComment = function () {
                if (_self.newComment.Content.length < 10) {
                    swal("Quá ngắn!", "Ít nhất 10 ký tự thánh ơi!", "error");
                } else {
                    $http({
                        url: hostName + 'api/comment/create',
                        method: "POST",
                        data: _self.newComment
                    }).success(function (result) {
                        _self.newComment = {
                            Content: ''
                        };
                        gag.CommentList.items.push(result);
                        gag.CommentCount++;
                    }).error(function (result, status) {
                    }).finally(function () {
                    });
                }
            };
        });

        _self.youtubeRegexp = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
        _self.vimeoRegexp = /(?:https?:\/\/)?(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
        _self.facebookRegexp = /^(https?:\/\/www\.facebook\.com\/(?:video\.php\?v=\d+|.*?\/videos\/\d+))/;

        function showModal(animation, size, backdrop, keyboard) {

            var modalInstance = $uibModal.open({
                animation: animation,
                templateUrl: 'addPostForm',
                controller: ['$scope', '$sce', '$uibModalInstance', 'FileUploader',
                    function ($scope, $sce, $uibModalInstance, FileUploader) {

                        $scope.Tags = new Tags();

                        $scope.newPost = {
                            PostType: 'GAG',
                            Images: [],
                            Videos: [],
                            Tags: [],
                            Title: '',
                            Description: '',
                            CreatedUserName: authService.authentication.userName,
                            CreatedUserAvatar: authService.authentication.userInfo.Avatar
                        };
                        
                        $scope.isShowProgressBar = false;
                        $scope.acceptFileFormats = "";
                        $scope.trustAsResourceUrl = $sce.trustAsResourceUrl;

                        $scope.setDefaultStatus;

                        $scope.setDefaultStatus = function () {
                            $scope.wallImage = false;
                            $scope.wallGif = false;
                            $scope.wallVideo = false;
                            $scope.wallPostingVisible = false;
                            
                        };

                        $scope.gagUploader = new FileUploader({
                            url: hostName + 'api/upload'
                        });

                        $scope.gagUploader.onBeforeUploadItem = function (item) {
                            var authData = localStorageService.get('authorizationData');
                            if (authData) {
                                item.headers.Authorization = 'Bearer ' + authData.token;
                            }
                        };

                        $scope.selectFiles = function () {
                            var imageType = 1;
                            $scope.wallImage = true;
                            $scope.changeUploaderAcceptedFileFormat(imageType);
                            $scope.uploadNewFiles();
                        };

                        $scope.selectGif = function () {
                            var gifType = 2;
                            $scope.wallGif = true;
                            $scope.changeUploaderAcceptedFileFormat(gifType);
                            $scope.uploadNewFiles();
                        };

                        var authData = localStorageService.get('authorizationData');
                        if (authData) {
                            $scope.gagUploader.headers.Authorization = 'Bearer ' + authData.token;
                        }

                        $scope.gagUploader.filters.push({
                            name: 'extensionFilter',
                            fn: function (item, options) {
                                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                                if ('|jpg|png|jpeg|bmp|gif|mp4|'.indexOf(type) != -1) {
                                    return true;
                                }
                                swal("Invalid file format!", 'Please select a file with jpg, png, jpeg, bmp, gif or mp4 format and try again.', "error");
                                return false;
                            }
                        }, {
                            name: 'sizeFilter',
                            fn: function (item, options) {
                                var fileSize = parseInt(item.size);
                                if (fileSize <= 5242880) {
                                    return true;
                                }
                                swal("Selected file exceeds the 5MB file size limit!", 'Please choose a new file and try again.', "error");
                                return false;
                            }
                        });

                        $scope.gagUploader.onAfterAddingAll = function () {
                            $scope.gagUploader.queue.forEach(function (item) {
                                var file = item._file;
                                $scope.newPost.Images.push({
                                    ImageType: file.type === "video/mp4" ? 'Gif' : 'Static',
                                    Url: URL.createObjectURL(file),
                                    TempFile: true,
                                });
                            });
                        };

                        $scope.changeUploaderAcceptedFileFormat = function (uploaderType) {
                            var uploader = $("#uploader")[0];
                            uploader.removeAttribute('accept');
                            switch (uploaderType) {
                                case 1: // Images
                                    $(uploader).attr('accept', 'image/jpg, image/png, image/jpeg, img/bmp');
                                    $(uploader).attr('multiple', '');
                                    break;
                                case 2: // Gif, MP4
                                    $(uploader).attr('accept', 'image/gif, video/mp4');
                                    uploader.removeAttribute('multiple');
                                    break;
                                default:
                                    break;
                            }
                        };

                        $scope.uploadNewFiles = function () {
                            if ($scope.gagUploader.queue.length > 0) {
                                swal({
                                    title: "Are you sure?",
                                    text: "Do you want to upload the current selected files?",
                                    type: "warning",
                                    showCancelButton: true,
                                    cancelButtonText: "No",
                                    confirmButtonColor: "#be1101",
                                    confirmButtonText: "Yes",
                                    closeOnConfirm: true
                                }, function (isConfirm) {
                                    if (isConfirm) {
                                        $scope.post();
                                    } else {
                                        $scope.gagUploader.clearQueue();
                                        $timeout(function () {
                                            $("#btnWallPosting").click();
                                            $('#uploader').click();
                                        }, 10);
                                    }
                                });
                            } else {
                                $timeout(function () {
                                    $('#uploader').click();
                                }, 10);
                            }
                        };

                        $scope.getVideosType = function (url) {
                            if (url.match(_self.youtubeRegexp)) {
                                return 1;
                            } else if (url.match(_self.vimeoRegexp)) {
                                return 2;
                            } else if (url.match(_self.facebookRegexp)) {
                                return 3;
                            }

                            return 0;
                        };

                        $scope.post = function () {
                            if ($scope.wallImage || $scope.wallGif) {
                                $scope.isShowProgressBar = true;
                                $scope.gagUploader.uploadAll();

                                $scope.gagUploader.onSuccessItem = function (item, response) {
                                    $scope.newPost.Images.push({
                                        ImageType: '|gif|mp4|'.indexOf(response.format) > -1 ? 'Gif' : 'Static',
                                        Url: response.url,
                                        CropInfo: response.height + '_' + response.width,
                                        TempFile: false,
                                    });
                                }

                                $scope.gagUploader.onErrorItem = function (item, response, status) {
                                    $scope.isShowProgressBar = false;
                                    item.isUploaded = false;
                                    item.isError = false;

                                    if (status === 401) {
                                        var authService = $injector.get('authService');
                                        var authData = localStorageService.get('authorizationData');

                                        if (authData) {
                                            if (authData.useRefreshTokens) {
                                                authService.refreshToken();
                                                return;
                                            }
                                        }
                                        authService.logOut();
                                        $rootScope.$broadcast('showLoginForm');
                                    } else {
                                        swal(response.Message, response.ExceptionMessage, "error");
                                    }
                                }

                                $scope.gagUploader.onCompleteAll = function () {
                                    if ($scope.newPost.Images.length > 0) {

                                        $scope.newPost.Images.forEach(function (item, index) {
                                            if (item.TempFile) {
                                                $scope.newPost.Images.splice(index, 1);
                                            }
                                        });

                                        $scope.sendPost();
                                    }
                                }
                            } else {
                                if ($scope.newPost.Videos[0]) {
                                   
                                    if ($scope.newPost.Videos[0].Url.match(_self.youtubeRegexp)) {
                                        var youtubeId = $scope.newPost.Videos[0].Url.replace(_self.youtubeRegexp, '$1');
                                        $scope.newPost.Videos[0].Url = 'https://www.youtube.com/embed/' + youtubeId;
                                        $scope.newPost.Videos[0].Picture = 'https://img.youtube.com/vi/' + youtubeId + '/0.jpg';
                                        $scope.newPost.Videos[0].VideoType = 'Youtube';
                                    } else {
                                        var vimeoMatch = $scope.newPost.Videos[0].Url.match(_self.vimeoRegexp);
                                        if (vimeoMatch) {
                                            var vimeoId = $scope.newPost.Videos[0].Url.replace(_self.vimeoRegexp, '$' + (vimeoMatch.length - 1));
                                            $scope.newPost.Videos[0].Url = 'https://player.vimeo.com/video/' + vimeoId;
                                            $scope.newPost.Videos[0].VideoType = 'Vimeo';
                                        } else {
                                            var facebookMatch = $scope.newPost.Videos[0].Url.match(_self.facebookRegexp);
                                            if (facebookMatch) {
                                                $scope.newPost.Videos[0].VideoType = 'Facebook';
                                            } else {
                                                $scope.newPost.Videos[0].VideoType = 'Stream';
                                            }
                                        }
                                    }
                                    $scope.sendPost();
                                }
                            }
                        };

                        $scope.sendPost = function () {
                            $http({
                                url: hostName + 'api/post/create',
                                method: "POST",
                                data: $scope.newPost
                            }).success(function (result) {
                                swal("Đăng thành công!", result, "success");
                                $scope.gagUploader.clearQueue();
                                $scope.setDefaultStatus();

                                $scope.newPost = {
                                    PostType: 'GAG',
                                    Images: [],
                                    Videos: [],
                                    Tags: [],
                                    Title: '',
                                    Description: ''
                                };
                            }).error(function (result, status) {
                            }).finally(function () {
                                $scope.isShowProgressBar = false;
                            });
                        };

                        $scope.clear = function () {
                            swal({
                                title: "Are you sure?",
                                text: "Do you want clear all uploaded file?",
                                type: "warning",
                                showCancelButton: true,
                                cancelButtonText: "No",
                                confirmButtonColor: "#be1101",
                                confirmButtonText: "Yes",
                                closeOnConfirm: true
                            }, function (isConfirm) {
                                if (isConfirm) {
                                    $scope.gagUploader.clearQueue();
                                    $scope.setDefaultStatus;
                                    $uibModalInstance.dismiss('cancel');
                                    $("#btnWallPosting").click();
                                }
                            });
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }
                ],
                size: size,
                backdrop: backdrop,
                keyboard: keyboard,
            });
        }

        _self.showPostingForm = function () {
            showModal(true, 'lg', true, true);
        };

        $rootScope.$on('showPostingForm', function () {
            showModal(true, 'lg', true, true);
        });
    }])


OnePiece
    // =========================================================================
    // Wall
    // =========================================================================
    .controller('wallCtrl', ['authService', '$sce', '$scope', '$rootScope', '$timeout', '$http', '$stateParams', '$uibModal', 'FileUploader', 'Gag', 'Tags', 'Tag', '$anchorScroll', 'localStorageService', '$injector',
        function (authService, $sce, $scope, $rootScope, $timeout, $http, $stateParams, $uibModal, FileUploader, Gag, Tags, Tag, $anchorScroll, localStorageService, $injector) {
        var _self = this;

        _self.trustAsResourceUrl = $sce.trustAsResourceUrl;

        _self.Gag = new Gag();
        _self.Gag.filter = $stateParams.filter;
        _self.Gag.slug = $stateParams.slug;

        if ($stateParams.filter && $stateParams.filter.toLowerCase() == 'tag') {
            _self.CurrentTag = new Tag();
            _self.CurrentTag.slug = $stateParams.slug;
            _self.CurrentTag.getTag();
        }

        _self.isMobile = angular.element('html').hasClass('ismobile');

        if (!_self.isMobile) {
            _self.PlayerTags = new Tags();
            _self.PlayerTags.type = 'Player';
            _self.PlayerTags.getTopTags();

            _self.TeamTags = new Tags();
            _self.TeamTags.type = 'Team';
            _self.TeamTags.getTopTags();

            _self.LeagueTags = new Tags();
            _self.LeagueTags.type = 'League';
            _self.LeagueTags.getTopTags();
        }

        _self.youtubeRegexp = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
        _self.vimeoRegexp = /(?:https?:\/\/)?(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
        _self.facebookRegexp = /^(https?:\/\/www\.facebook\.com\/(?:video\.php\?v=\d+|.*?\/videos\/\d+))/;

        _self.getNewGags = function () {
            _self.Gag.slug = '';
            _self.Gag.skip = 0;
            _self.Gag.nextPage();
            $anchorScroll();
        };

        function showModal(animation, size, backdrop, keyboard) {

            var modalInstance = $uibModal.open({
                animation: animation,
                templateUrl: 'addPostForm',
                controller: ['$scope', '$sce', '$uibModalInstance', 'FileUploader',
                    function ($scope, $sce, $uibModalInstance, FileUploader) {

                        $scope.Tags = new Tags();

                        $scope.newPost = {
                            PostType: 'GAG',
                            Images: [],
                            Videos: [],
                            Tags: [],
                            Title: '',
                            Description: '',
                            CreatedUserName: authService.authentication.userName,
                            CreatedUserAvatar: authService.authentication.userInfo.Avatar
                        };
                        
                        $scope.isShowProgressBar = false;
                        $scope.acceptFileFormats = "";
                        $scope.trustAsResourceUrl = $sce.trustAsResourceUrl;

                        $scope.setDefaultStatus;

                        $scope.setDefaultStatus = function () {
                            $scope.wallImage = false;
                            $scope.wallGif = false;
                            $scope.wallVideo = false;
                            $scope.wallPostingVisible = false;
                            
                        };

                        $scope.gagUploader = new FileUploader({
                            url: hostName + 'api/upload'
                        });

                        $scope.gagUploader.onBeforeUploadItem = function (item) {
                            var authData = localStorageService.get('authorizationData');
                            if (authData) {
                                item.headers.Authorization = 'Bearer ' + authData.token;
                            }
                        };

                        $scope.selectFiles = function () {
                            var imageType = 1;
                            $scope.wallImage = true;
                            $scope.changeUploaderAcceptedFileFormat(imageType);
                            $scope.uploadNewFiles();
                        };

                        $scope.selectGif = function () {
                            var gifType = 2;
                            $scope.wallGif = true;
                            $scope.changeUploaderAcceptedFileFormat(gifType);
                            $scope.uploadNewFiles();
                        };

                        var authData = localStorageService.get('authorizationData');
                        if (authData) {
                            $scope.gagUploader.headers.Authorization = 'Bearer ' + authData.token;
                        }

                        $scope.gagUploader.filters.push({
                            name: 'extensionFilter',
                            fn: function (item, options) {
                                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                                if ('|jpg|png|jpeg|bmp|gif|mp4|'.indexOf(type) != -1) {
                                    return true;
                                }
                                swal("Invalid file format!", 'Please select a file with jpg, png, jpeg, bmp, gif or mp4 format and try again.', "error");
                                return false;
                            }
                        }, {
                            name: 'sizeFilter',
                            fn: function (item, options) {
                                var fileSize = parseInt(item.size);
                                if (fileSize <= 5242880) {
                                    return true;
                                }
                                swal("Selected file exceeds the 5MB file size limit!", 'Please choose a new file and try again.', "error");
                                return false;
                            }
                        });

                        $scope.gagUploader.onAfterAddingAll = function () {
                            $scope.gagUploader.queue.forEach(function (item) {
                                var file = item._file;
                                $scope.newPost.Images.push({
                                    ImageType: file.type === "video/mp4" ? 'Gif' : 'Static',
                                    Url: URL.createObjectURL(file),
                                    TempFile: true,
                                });
                            });
                        };

                        $scope.changeUploaderAcceptedFileFormat = function (uploaderType) {
                            var uploader = $("#uploader")[0];
                            uploader.removeAttribute('accept');
                            switch (uploaderType) {
                                case 1: // Images
                                    $(uploader).attr('accept', 'image/jpg, image/png, image/jpeg, img/bmp');
                                    $(uploader).attr('multiple', '');
                                    break;
                                case 2: // Gif, MP4
                                    $(uploader).attr('accept', 'image/gif, video/mp4');
                                    uploader.removeAttribute('multiple');
                                    break;
                                default:
                                    break;
                            }
                        };

                        $scope.uploadNewFiles = function () {
                            if ($scope.gagUploader.queue.length > 0) {
                                swal({
                                    title: "Are you sure?",
                                    text: "Do you want to upload the current selected files?",
                                    type: "warning",
                                    showCancelButton: true,
                                    cancelButtonText: "No",
                                    confirmButtonColor: "#be1101",
                                    confirmButtonText: "Yes",
                                    closeOnConfirm: true
                                }, function (isConfirm) {
                                    if (isConfirm) {
                                        $scope.post();
                                    } else {
                                        $scope.gagUploader.clearQueue();
                                        $timeout(function () {
                                            $("#btnWallPosting").click();
                                            $('#uploader').click();
                                        }, 10);
                                    }
                                });
                            } else {
                                $timeout(function () {
                                    $('#uploader').click();
                                }, 10);
                            }
                        };

                        $scope.getVideosType = function (url) {
                            if (url.match(_self.youtubeRegexp)) {
                                return 1;
                            } else if (url.match(_self.vimeoRegexp)) {
                                return 2;
                            } else if (url.match(_self.facebookRegexp)) {
                                return 3;
                            }

                            return 0;
                        };

                        $scope.post = function () {
                            if ($scope.wallImage || $scope.wallGif) {
                                $scope.isShowProgressBar = true;
                                $scope.gagUploader.uploadAll();

                                $scope.gagUploader.onSuccessItem = function (item, response) {
                                    $scope.newPost.Images.push({
                                        ImageType: '|gif|mp4|'.indexOf(response.format) > -1 ? 'Gif' : 'Static',
                                        Url: response.url,
                                        CropInfo: response.height + '_' + response.width,
                                        TempFile: false,
                                    });
                                }

                                $scope.gagUploader.onErrorItem = function (item, response, status) {
                                    $scope.isShowProgressBar = false;
                                    item.isUploaded = false;
                                    item.isError = false;

                                    if (status === 401) {
                                        var authService = $injector.get('authService');
                                        var authData = localStorageService.get('authorizationData');

                                        if (authData) {
                                            if (authData.useRefreshTokens) {
                                                authService.refreshToken();
                                                return;
                                            }
                                        }
                                        authService.logOut();
                                        $rootScope.$broadcast('showLoginForm');
                                    } else {
                                        swal(response.Message, response.ExceptionMessage, "error");
                                    }
                                }

                                $scope.gagUploader.onCompleteAll = function () {
                                    if ($scope.newPost.Images.length > 0) {

                                        $scope.newPost.Images.forEach(function (item, index) {
                                            if (item.TempFile) {
                                                $scope.newPost.Images.splice(index, 1);
                                            }
                                        });

                                        $scope.sendPost();
                                    }
                                }
                            } else {
                                if ($scope.newPost.Videos[0]) {
                                   
                                    if ($scope.newPost.Videos[0].Url.match(_self.youtubeRegexp)) {
                                        var youtubeId = $scope.newPost.Videos[0].Url.replace(_self.youtubeRegexp, '$1');
                                        $scope.newPost.Videos[0].Url = 'https://www.youtube.com/embed/' + youtubeId;
                                        $scope.newPost.Videos[0].Picture = 'https://img.youtube.com/vi/' + youtubeId + '/0.jpg';
                                        $scope.newPost.Videos[0].VideoType = 'Youtube';
                                    } else {
                                        var vimeoMatch = $scope.newPost.Videos[0].Url.match(_self.vimeoRegexp);
                                        if (vimeoMatch) {
                                            var vimeoId = $scope.newPost.Videos[0].Url.replace(_self.vimeoRegexp, '$' + (vimeoMatch.length - 1));
                                            $scope.newPost.Videos[0].Url = 'https://player.vimeo.com/video/' + vimeoId;
                                            $scope.newPost.Videos[0].VideoType = 'Vimeo';
                                        } else {
                                            var facebookMatch = $scope.newPost.Videos[0].Url.match(_self.facebookRegexp);
                                            if (facebookMatch) {
                                                $scope.newPost.Videos[0].VideoType = 'Facebook';
                                            } else {
                                                $scope.newPost.Videos[0].VideoType = 'Stream';
                                            }
                                        }
                                    }
                                    $scope.sendPost();
                                }
                            }
                        };

                        $scope.sendPost = function () {
                            $http({
                                url: hostName + 'api/post/create',
                                method: "POST",
                                data: $scope.newPost
                            }).success(function (result) {
                                swal("Đăng thành công!", result, "success");
                                $scope.gagUploader.clearQueue();
                                $scope.setDefaultStatus();

                                $scope.newPost = {
                                    PostType: 'GAG',
                                    Images: [],
                                    Videos: [],
                                    Tags: [],
                                    Title: '',
                                    Description: ''
                                };
                            }).error(function (result, status) {
                            }).finally(function () {
                                $scope.isShowProgressBar = false;
                            });
                        };

                        $scope.clear = function () {
                            swal({
                                title: "Are you sure?",
                                text: "Do you want clear all uploaded file?",
                                type: "warning",
                                showCancelButton: true,
                                cancelButtonText: "No",
                                confirmButtonColor: "#be1101",
                                confirmButtonText: "Yes",
                                closeOnConfirm: true
                            }, function (isConfirm) {
                                if (isConfirm) {
                                    $scope.gagUploader.clearQueue();
                                    $scope.setDefaultStatus;
                                    $uibModalInstance.dismiss('cancel');
                                    $("#btnWallPosting").click();
                                }
                            });
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }
                ],
                size: size,
                backdrop: backdrop,
                keyboard: keyboard,
            });
        }

        _self.showPostingForm = function () {
            showModal(true, 'lg', true, true);
        };

        $rootScope.$on('showPostingForm', function () {
            showModal(true, 'lg', true, true);
        });
    }])


OnePiece
// =========================================================================
// Posts management
// =========================================================================
.controller('postCtrl', ['$sce', '$timeout', '$http', '$state', '$stateParams', 'FileUploader', 'Gag', function ($sce, $timeout, $http, $state, $stateParams, FileUploader, Gag) {
    var _self = this;
    var updateUrl = hostName + 'api/post/update';
    _self.Gag = new Gag();
    _self.Gag.userFilter = $stateParams.username;
    _self.Gag.filter = $stateParams.filter || "all";
    _self.CurrentPost = {};
    _self.trustAsResourceUrl = $sce.trustAsResourceUrl;

    _self.updatePost = function (updatePost) {
        $http({
            url: updateUrl,
            method: "POST",
            data: updatePost
        }).success(function (result) {
            swal(result, "success");
            updatePost.$edit = false;
        }).error(function (result, status) {
            swal(result.Message, result.ExceptionMessage, "error");
        });
    };

}])
OnePiece
    .controller(

    )
OnePiece
// =========================================================================
// Posts management
// =========================================================================
.controller('postMngCtrl', ['$sce', '$timeout', '$http', '$state', '$stateParams', '$uibModal', 'FileUploader', 'Tags', 'Gag', 'localStorageService', 'authService',
    function ($sce, $timeout, $http, $state, $stateParams, $uibModal, FileUploader, Tags, Gag, localStorageService, authService) {
        var _self = this;

        if (!authService.authentication.isAdmin) {
            $state.go('pages.wall');
        }

        var deleteUrl = hostName + 'api/post/delete';
        var updateUrl = hostName + 'api/post/update';

        _self.Gag = new Gag();
        _self.Gag.filter = $stateParams.filter || "all";
        _self.CurrentPost = {};
        _self.trustAsResourceUrl = $sce.trustAsResourceUrl;

        _self.ApprovalPost = function (currentGag) {
            currentGag.IsActived = !currentGag.IsActived;

            $http({
                url: updateUrl,
                method: "POST",
                data: currentGag
            }).success(function (result) {
            }).error(function (result, status) {
                swal(result.Message, result.ExceptionMessage, "error");
                currentGag.IsActived = false;
            });
        };

        _self.deletePost = function (deletePost) {
            $http({
                url: deleteUrl,
                method: "POST",
                data: deletePost
            }).success(function (result) {
                swal(result, "success");
            }).error(function (result, status) {
                swal(result.Message, result.ExceptionMessage, "error");
            });
        }

        function showEditModal(editGag, animation, size, backdrop, keyboard) {
            var modalInstance = $uibModal.open({
                animation: animation,
                templateUrl: 'editPostForm',
                controller: ['$scope', '$sce', '$uibModalInstance', 'FileUploader',
                    function ($scope, $sce, $uibModalInstance, FileUploader) {
                        $scope.Tags = _self.Tags;

                        $scope.isShowProgressBar = false;
                        $scope.acceptFileFormats = "";
                        $scope.trustAsResourceUrl = $sce.trustAsResourceUrl;

                        $scope.setDefaultStatus;

                        $scope.setDefaultStatus = function () {
                            $scope.wallImage = false;
                            $scope.wallGif = false;
                            $scope.wallVideo = false;
                            $scope.wallPostingVisible = false;

                        };

                        $scope.currentGag = editGag;

                        $scope.updatePost = function () {
                            $http({
                                url: updateUrl,
                                method: "POST",
                                data: $scope.currentGag
                            }).success(function (result) {
                                swal(result, "success");
                            }).error(function (result, status) {
                                swal(result.Message, result.ExceptionMessage, "error");
                            });
                        };

                        $scope.gagUploader = new FileUploader({
                            url: hostName + 'api/upload'
                        });

                        $scope.gagUploader.onBeforeUploadItem = function (item) {
                            var authData = localStorageService.get('authorizationData');
                            if (authData) {
                                item.headers.Authorization = 'Bearer ' + authData.token;
                            }
                        };

                        $scope.selectFiles = function () {
                            var imageType = 1;
                            $scope.wallImage = true;
                            $scope.changeUploaderAcceptedFileFormat(imageType);
                            $scope.uploadNewFiles();
                        };

                        $scope.selectGif = function () {
                            var gifType = 2;
                            $scope.wallGif = true;
                            $scope.changeUploaderAcceptedFileFormat(gifType);
                            $scope.uploadNewFiles();
                        };

                        var authData = localStorageService.get('authorizationData');
                        if (authData) {
                            $scope.gagUploader.headers.Authorization = 'Bearer ' + authData.token;
                        }

                        $scope.gagUploader.filters.push({
                            name: 'extensionFilter',
                            fn: function (item, options) {
                                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                                if ('|jpg|png|jpeg|bmp|gif|mp4|'.indexOf(type) != -1) {
                                    return true;
                                }
                                swal("Invalid file format!", 'Please select a file with jpg, png, jpeg, bmp, gif or mp4 format and try again.', "error");
                                return false;
                            }
                        }, {
                            name: 'sizeFilter',
                            fn: function (item, options) {
                                var fileSize = parseInt(item.size);
                                if (fileSize <= 5242880) {
                                    return true;
                                }
                                swal("Selected file exceeds the 5MB file size limit!", 'Please choose a new file and try again.', "error");
                                return false;
                            }
                        });

                        $scope.gagUploader.onAfterAddingAll = function () {
                            $scope.gagUploader.queue.forEach(function (item) {
                                var file = item._file;
                                $scope.newPost.Images.push({
                                    ImageType: file.type === "video/mp4" ? 'Gif' : 'Static',
                                    Url: URL.createObjectURL(file),
                                    TempFile: true,
                                });
                            });
                        };

                        $scope.changeUploaderAcceptedFileFormat = function (uploaderType) {
                            var uploader = $("#uploader")[0];
                            uploader.removeAttribute('accept');
                            switch (uploaderType) {
                                case 1: // Images
                                    $(uploader).attr('accept', 'image/jpg, image/png, image/jpeg, img/bmp');
                                    $(uploader).attr('multiple', '');
                                    break;
                                case 2: // Gif, MP4
                                    $(uploader).attr('accept', 'image/gif, video/mp4');
                                    uploader.removeAttribute('multiple');
                                    break;
                                default:
                                    break;
                            }
                        };

                        $scope.uploadNewFiles = function () {
                            if ($scope.gagUploader.queue.length > 0) {
                                swal({
                                    title: "Are you sure?",
                                    text: "Do you want to upload the current selected files?",
                                    type: "warning",
                                    showCancelButton: true,
                                    cancelButtonText: "No",
                                    confirmButtonColor: "#be1101",
                                    confirmButtonText: "Yes",
                                    closeOnConfirm: true
                                }, function (isConfirm) {
                                    if (isConfirm) {
                                        $scope.post();
                                    } else {
                                        $scope.gagUploader.clearQueue();
                                        $timeout(function () {
                                            $("#btnWallPosting").click();
                                            $('#uploader').click();
                                        }, 10);
                                    }
                                });
                            } else {
                                $timeout(function () {
                                    $('#uploader').click();
                                }, 10);
                            }
                        };

                        $scope.getVideosType = function (url) {
                            if (url.match(_self.youtubeRegexp)) {
                                return 1;
                            } else if (url.match(_self.vimeoRegexp)) {
                                return 2;
                            } else if (url.match(_self.facebookRegexp)) {
                                return 3;
                            }

                            return 0;
                        };

                        $scope.post = function () {
                            if ($scope.wallImage || $scope.wallGif) {
                                $scope.isShowProgressBar = true;
                                $scope.gagUploader.uploadAll();

                                $scope.gagUploader.onSuccessItem = function (item, response) {
                                    $scope.newPost.Images.push({
                                        ImageType: '|gif|mp4|'.indexOf(response.format) > -1 ? 'Gif' : 'Static',
                                        Url: response.url,
                                        TempFile: false,
                                    });
                                }

                                $scope.gagUploader.onErrorItem = function (item, response, status) {
                                    $scope.isShowProgressBar = false;
                                    item.isUploaded = false;
                                    item.isError = false;

                                    if (status === 401) {
                                        var authService = $injector.get('authService');
                                        var authData = localStorageService.get('authorizationData');

                                        if (authData) {
                                            if (authData.useRefreshTokens) {
                                                authService.refreshToken();
                                                return;
                                            }
                                        }
                                        authService.logOut();
                                        $rootScope.$broadcast('showLoginForm');
                                    } else {
                                        swal(response.Message, response.ExceptionMessage, "error");
                                    }
                                }

                                $scope.gagUploader.onCompleteAll = function () {
                                    if ($scope.newPost.Images.length > 0) {

                                        $scope.newPost.Images.forEach(function (item, index) {
                                            if (item.TempFile) {
                                                $scope.newPost.Images.splice(index, 1);
                                            }
                                        });

                                        $scope.sendPost();
                                    }
                                }
                            } else {
                                if ($scope.newPost.Videos[0]) {

                                    if ($scope.newPost.Videos[0].Url.match(_self.youtubeRegexp)) {
                                        var youtubeId = $scope.newPost.Videos[0].Url.replace(_self.youtubeRegexp, '$1');
                                        $scope.newPost.Videos[0].Url = 'https://www.youtube.com/embed/' + youtubeId;
                                        $scope.newPost.Videos[0].VideoType = 'Youtube';
                                    } else {
                                        var vimeoMatch = $scope.newPost.Videos[0].Url.match(_self.vimeoRegexp);
                                        if (vimeoMatch) {
                                            var vimeoId = $scope.newPost.Videos[0].Url.replace(_self.vimeoRegexp, '$' + (vimeoMatch.length - 1));
                                            $scope.newPost.Videos[0].Url = 'https://player.vimeo.com/video/' + vimeoId;
                                            $scope.newPost.Videos[0].VideoType = 'Vimeo';
                                        } else {
                                            var facebookMatch = $scope.newPost.Videos[0].Url.match(_self.facebookRegexp);
                                            if (facebookMatch) {
                                                $scope.newPost.Videos[0].VideoType = 'Facebook';
                                            } else {
                                                $scope.newPost.Videos[0].VideoType = 'Stream';
                                            }
                                        }
                                    }
                                    $scope.sendPost();
                                }
                            }
                        };

                        $scope.sendPost = function () {
                            $http({
                                url: hostName + 'api/post/create',
                                method: "POST",
                                data: $scope.newPost
                            }).success(function (result) {
                                swal("Đăng thành công!", result, "success");
                                $scope.gagUploader.clearQueue();
                                $scope.setDefaultStatus();

                                $scope.newPost = {
                                    PostType: 'GAG',
                                    Images: [],
                                    Videos: [],
                                    Tags: [],
                                    Title: '',
                                    Description: ''
                                };
                            }).error(function (result, status) {
                            }).finally(function () {
                                $scope.isShowProgressBar = false;
                            });
                        };

                        $scope.clear = function () {
                            swal({
                                title: "Are you sure?",
                                text: "Do you want clear all uploaded file?",
                                type: "warning",
                                showCancelButton: true,
                                cancelButtonText: "No",
                                confirmButtonColor: "#be1101",
                                confirmButtonText: "Yes",
                                closeOnConfirm: true
                            }, function (isConfirm) {
                                if (isConfirm) {
                                    $scope.gagUploader.clearQueue();
                                    $scope.setDefaultStatus;
                                    $uibModalInstance.dismiss('cancel');
                                    $("#btnWallPosting").click();
                                }
                            });
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }
                ],
                size: size,
                backdrop: backdrop,
                keyboard: keyboard,
            });
        }

        _self.showPostingForm = function (gag) {
            showEditModal(gag, true, 'lg', true, true);
        };

    }
])