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