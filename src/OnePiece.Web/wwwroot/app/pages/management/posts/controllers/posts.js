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