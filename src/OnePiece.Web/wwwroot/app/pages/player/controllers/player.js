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