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