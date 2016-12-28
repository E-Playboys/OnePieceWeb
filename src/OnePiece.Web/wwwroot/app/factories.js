OnePiece
    .factory('Gag', ['$http', '$sce', 'Comment', function ($http, $sce, Comment) {
        var Gag = function () {
            this.items = [];
            this.busy = false;
            this.skip = 0;
            this.take = 5;
            this.filter = '';
            this.slug = '';
            this.userFilter = '';
            this.item = null;
        };

        Gag.prototype.nextPage = function () {
            var _self = this;
            if (_self.busy) return;
            _self.busy = true;

            var url = hostName + 'api/post/getgags';
            $http.get(url, {
                params: {
                    skip: _self.skip,
                    take: _self.take,
                    slug: _self.slug,
                    filter: _self.filter,
                    userFilter: _self.userFilter,
                }
            }).success(function (data) {
                var items = data;
                if (items.length == 0) {
                    return;
                }
                items.forEach(function (item) {
                    item.PublishedDate = new Date(item.PublishedDate);
                    _self.items.push(item);
                    item.CommentList = new Comment();
                    item.CommentList.actionFor = 'Post';
                    item.CommentList.actionForId = item.Id;
                    item.CommentList.skip = 0;
                    item.CommentList.take = 2;
                    item.CommentList.nextPage();
                });
                _self.busy = false;
                _self.skip += _self.take;
            });
        };

        Gag.prototype.getAllGags = function () {
            var _self = this;
            if (_self.busy) return;
            _self.busy = true;

            var url = hostName + 'api/post/getallgags';
            $http.get(url, {
                params: {
                    skip: _self.skip,
                    take: _self.take,
                }
            }).success(function (data) {
                var items = data;
                if (items.length == 0) {
                    return;
                }
                items.forEach(function (item) {
                    item.PublishedDate = new Date(item.PublishedDate);
                    _self.items.push(item);
                    item.CommentList = new Comment();
                    item.CommentList.actionFor = 'Post';
                    item.CommentList.actionForId = item.Id;
                    item.CommentList.skip = 0;
                    item.CommentList.take = 2;
                    item.CommentList.nextPage();
                });
                _self.busy = false;
                _self.skip += _self.take;
            });
        };

        Gag.prototype.getGag = function (callback) {
            var _self = this;
            if (_self.busy) return;
            _self.busy = true;

            var url = hostName + 'api/post/getgag';
            $http.get(url, {
                params: {
                    slug: _self.slug,
                }
            }).success(function (data) {
                var item = data;
                item.PublishedDate = new Date(item.PublishedDate);
                _self.item = item;
                item.CommentList = new Comment();
                item.CommentList.actionFor = 'Post';
                item.CommentList.actionForId = item.Id;
                item.CommentList.skip = 0;
                item.CommentList.take = 5;
                item.CommentList.nextPage();
                _self.busy = false;
                callback(item);
            });
        }

        return Gag;
    }])
    .factory('Comment', ['$http', '$sce', function ($http, $sce) {
        var Comment = function () {
            this.items = [];
            this.busy = false;
            this.skip = 0;
            this.take = 5;
            this.actionForId = 0;
            this.actionFor = '';
            this.remain = 0;
        };

        Comment.prototype.nextPage = function () {
            var _self = this;
            if (_self.busy) return;
            _self.busy = true;

            var url = hostName + 'api/comment/getcomments';
            $http.get(url, {
                params: {
                    skip: _self.skip,
                    take: _self.take,
                    actionForId: _self.actionForId,
                    actionFor: _self.actionFor
                }
            }).success(function (data) {
                var items = data;
                if (items.length == 0) {
                    return;
                }
                items.forEach(function (item) {
                    item.CreatedDate = new Date(item.CreatedDate);
                    _self.items.push(item);
                });
                _self.busy = false;
                _self.skip += _self.take;
            });
        };

        return Comment;
    }])
    .factory('League', ['$http', '$sce', function ($http, $sce) {
        var League = function () {
            this.items = [];
            this.busy = false;
            this.skip = 0;
            this.take = 30;
            this.count = 0;
        };

        League.prototype.nextPage = function () {
            var _self = this;
            if (_self.busy) return;
            _self.busy = true;

            var url = hostName + 'api/league/getleagues';
            $http.get(url, {
                params: {
                    skip: _self.skip,
                    take: _self.take
                }
            }).success(function (data) {
                var items = data.leagues;
                _self.count = data.count;
                if (items.length == 0) {
                    return;
                }
                items.forEach(function (item) {
                    _self.items.push(item);
                });
                _self.busy = false;
                _self.skip += _self.take;
            });
        };

        return League;
    }])
    .factory('Team', ['$http', '$sce', function ($http, $sce) {
        var Team = function () {
            this.items = [];
            this.busy = false;
            this.skip = 0;
            this.take = 30;
            this.count = 0;
        };

        Team.prototype.nextPage = function () {
            var _self = this;
            if (_self.busy) return;
            _self.busy = true;

            var url = hostName + 'api/team/getteams';
            $http.get(url, {
                params: {
                    skip: _self.skip,
                    take: _self.take
                }
            }).success(function (data) {
                var items = data.teams;
                _self.count = data.count;
                if (items.length == 0) {
                    return;
                }
                items.forEach(function (item) {
                    _self.items.push(item);
                });
                _self.busy = false;
                _self.skip += _self.take;
            });
        };

        return Team;
    }])
    .factory('Player', ['$http', '$sce', function ($http, $sce) {
        var Player = function () {
            this.items = [];
            this.busy = false;
            this.skip = 0;
            this.take = 60;
            this.count = 0;
        };

        Player.prototype.nextPage = function () {
            var _self = this;
            if (_self.busy) return;
            _self.busy = true;

            var url = hostName + 'api/player/getplayers';
            $http.get(url, {
                params: {
                    skip: _self.skip,
                    take: _self.take
                }
            }).success(function (data) {
                var items = data.players;
                _self.count = data.count;
                if (items.length == 0) {
                    return;
                }
                items.forEach(function (item) {
                    _self.items.push(item);
                });
                _self.busy = false;
                _self.skip += _self.take;
            });
        };

        return Player;
    }])
    .factory('Tags', ['$http', '$sce', function ($http, $sce) {
        var Tags = function () {
            this.items = [];
            this.skip = 0;
            this.take = 5;
            this.type = '';
        };

        Tags.prototype.getAutoCompleteTags = function ($searhTerm) {
            var _self = this;
            var url = hostName + 'api/tags/gettagsautocomplete';

            return $http.get(url, {
                params: {
                    searchTerm: $searhTerm,
                    take: _self.take,
                    skip: _self.skip,
                }
            }).then(function (response) {
                var items = response.data;

                if (items.length == 0) {
                    return;
                }

                return items;
            });
        };

        Tags.prototype.getTopTags = function () {
            var _self = this;
            var url = hostName + 'api/tags/gettoptags';

            return $http.get(url, {
                params: {
                    top: 30,
                    type: _self.type
                }
            }).then(function (response) {
                if (response.data.length > 0) {
                    _self.items = response.data;
                }
            });
        }

        return Tags;
    }])
    .factory('Tag', ['$http', '$sce', function ($http, $sce) {
        var Tag = function () {
            this.item = {};
            this.slug = '';
        };
        Tag.prototype.getTag = function () {
            var _self = this;
            var url = hostName + 'api/tags/gettag';

            return $http.get(url, {
                params: {
                    slug: _self.slug
                }
            }).then(function (response) {
                _self.item = response.data;
            });
        }

        return Tag;
    }])
    .factory('authService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', function ($http, $q, localStorageService, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            userName: "",
            userRole: "",
            isAdmin: false,
            useRefreshTokens: false,
            userInfo: {}
        };

        var _externalAuthData = {
            provider: "",
            userName: "",
            userRole: "",
            isAuth: false,
            externalAccessToken: ""
        };

        var _saveRegistration = function (registration) {

            _logOut();

            return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
                return response;
            });

        };

        var _login = function (loginData) {

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            if (loginData.useRefreshTokens) {
                data = data + "&client_id=" + ngAuthSettings.clientId;
            }

            var deferred = $q.defer();

            $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                _authentication.isAdmin = response.userRoles === 'Admin' || response.userRoles === 'SuperAdmin';

                if (loginData.useRefreshTokens) {
                    localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, userRole: response.userRoles, isAdmin: _authentication.isAdmin, userInfo: response.userInfo, refreshToken: response.refresh_token, useRefreshTokens: true });
                }
                else {
                    localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, userRole: response.userRoles, isAdmin: _authentication.isAdmin, userInfo: response.userInfo, refreshToken: "", useRefreshTokens: false });
                }

                _authentication.isAuth = true;
                _authentication.userName = response.userName;
                _authentication.userRole = response.userRoles;
                _authentication.useRefreshTokens = loginData.useRefreshTokens;
                _authentication.userInfo = JSON.parse(response.userInfo);

                deferred.resolve(response);

            }).error(function (err, status) {
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _logOut = function () {

            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = "";
            _authentication.useRefreshTokens = false;
            _authentication.userInfo = {};

        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
                _authentication.userRole = authData.userRoles;
                _authentication.isAdmin = authData.isAdmin;
                _authentication.useRefreshTokens = authData.useRefreshTokens;
                _authentication.userInfo = authData.userInfo ? JSON.parse(authData.userInfo) : {};
            }

        };

        var _updateProfile = function (profileInfo) {
            profileInfo.UserName = _authentication.userName;
            return $http.post(serviceBase + 'api/account/update', profileInfo).then(function (response) {
                return response;
            });
        };

        var _getUserProfile = function (inputUsername) {
            var url = hostName + 'api/account/user';

            return $http.get(url, {
                params: {
                    userName: inputUsername
                }
            }).then(function (response) {
                return response;
            });
        };

        var _changePassword = function (oldPassword, newPassword, newPasswordRetype) {
            var passwordData = {
                OldPassword: oldPassword,
                NewPassword: newPassword,
                ConfirmPassword: newPasswordRetype,
            };

            return $http.post(serviceBase + 'api/account/changepassword', passwordData).then(function (response) {
                return response;
            });
        };

        var _refreshToken = function () {
            var deferred = $q.defer();

            var authData = localStorageService.get('authorizationData');

            if (authData) {

                if (authData.useRefreshTokens) {

                    var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                    localStorageService.remove('authorizationData');

                    $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                        localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, userInfo: response.userInfo, userRole: response.userRoles, isAdmin: _authentication.isAdmin, refreshToken: response.refresh_token, useRefreshTokens: true });

                        deferred.resolve(response);

                    }).error(function (err, status) {
                        _logOut();
                        deferred.reject(err);
                    });
                }
            }

            return deferred.promise;
        };

        var _obtainAccessToken = function (externalData) {

            var deferred = $q.defer();

            $http.get(serviceBase + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {
                _authentication.isAdmin = response.userRoles === 'Admin' || response.userRoles === 'SuperAdmin';

                localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, userRole: response.userRoles, isAdmin: _authentication.isAdmin, userInfo: response.userInfo, refreshToken: "", useRefreshTokens: false });
                _authentication.isAuth = true;
                _authentication.userName = response.userName;
                _authentication.userRole = response.userRoles;
                _authentication.useRefreshTokens = false;
                _authentication.userInfo = JSON.parse(response.userInfo);

                deferred.resolve(response);

            }).error(function (err, status) {
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _registerExternal = function (registerExternalData) {

            var deferred = $q.defer();

            $http.post(serviceBase + 'api/account/registerexternal', registerExternalData).success(function (response) {
                _authentication.isAdmin = response.userRoles === 'Admin' || response.userRoles === 'SuperAdmin';

                localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, userRole: response.userRoles, isAdmin: _authentication.isAdmin, userInfo: response.userInfo, refreshToken: "", useRefreshTokens: false });

                _authentication.isAuth = true;
                _authentication.userName = response.userName;
                _authentication.userRole = response.userRoles;
                _authentication.useRefreshTokens = false;
                _authentication.userInfo = JSON.parse(response.userInfo);

                deferred.resolve(response);

            }).error(function (err, status) {
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        authServiceFactory.saveRegistration = _saveRegistration;
        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.updateProfile = _updateProfile;
        authServiceFactory.getUserProfile = _getUserProfile;
        authServiceFactory.changePassword = _changePassword;
        authServiceFactory.authentication = _authentication;
        authServiceFactory.refreshToken = _refreshToken;

        authServiceFactory.obtainAccessToken = _obtainAccessToken;
        authServiceFactory.externalAuthData = _externalAuthData;
        authServiceFactory.registerExternal = _registerExternal;

        return authServiceFactory;
    }])
    .factory('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', '$rootScope', function ($q, $injector, $location, localStorageService, $rootScope) {

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
    }]);