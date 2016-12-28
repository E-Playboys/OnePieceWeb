OnePiece
    // =========================================================================
    // GAG
    // =========================================================================

    .directive('gag', function ($http) {
        return {
            restrict: 'E',
            scope: {
                gag: '=',
                single: '='
            },
            templateUrl: appBaseUrl + 'modules/template/gag.html',
            link: function (scope, element) {
                scope.shareToFacebook = function () {
                    var shareInfo = {
                        method: 'feed',
                        link: OnePieceData.AbsoluteUri + 'gag/' + scope.gag.Slug,
                        name: scope.gag.Title,
                        caption: 'BONGVL.VN',
                        description: scope.gag.Description
                    }

                    if (scope.gag.Images[0]) {
                        shareInfo.picture = scope.gag.Images[0].Url;
                    } else {
                        shareInfo.picture = scope.gag.Videos[0].Picture;
                        shareInfo.source = scope.gag.Videos[0].Url;
                    }
                    FB.ui(shareInfo, function (response) {
                        if (response && !response.error_message) {
                            swal("Chia sẻ thành công!", "Gag này đã được đăng lên Facebook của bạn!", "success");
                        }
                    });
                };

                scope.shareToGooglePlus = function () {
                    alert('TO DO');
                }

                scope.newComment = {
                    Content: '',
                    ActionForId: scope.gag.Id
                };

                scope.sendComment = function () {
                    if (scope.newComment.Content.length < 10) {
                        swal("Quá ngắn!", "Ít nhất 10 ký tự thánh ơi!", "error");
                    } else {
                        $http({
                            url: hostName + 'api/comment/create',
                            method: "POST",
                            data: scope.newComment
                        }).success(function (result) {
                            scope.newComment = {
                                Content: ''
                            };
                            scope.gag.CommentList.items.push(result);
                            scope.gag.CommentCount++;
                        }).error(function (result, status) {
                        }).finally(function () {
                        });
                    }
                };

                scope.newLike = {
                    ActionForId: scope.gag.Id
                };

                scope.toggleLike = function () {
                    $http({
                        url: hostName + 'api/like/toggle',
                        method: "POST",
                        data: scope.newLike
                    }).success(function (result) {
                        scope.gag.Liked = !scope.gag.Liked;
                        scope.gag.LikeCount = scope.gag.Liked ? scope.gag.LikeCount + 1 : scope.gag.LikeCount - 1;
                    }).error(function (result, status) {
                    });
                };
            }
        }
    })


    // =========================================================================
    // TOP TAG
    // =========================================================================

    .directive('topTag', function ($http) {
        return {
            restrict: 'E',
            scope: {
                tags: '=',
                header: '@',
                subHeader: '@'
            },
            templateUrl: appBaseUrl + 'modules/template/top-tag.html'
        }
    })


    // =========================================================================
    // LAYOUT
    // =========================================================================
    
    .directive('changeLayout', function(){
        
        return {
            restrict: 'A',
            scope: {
                changeLayout: '='
            },
            
            link: function(scope, element, attr) {
                
                //Default State
                if(scope.changeLayout === '1') {
                    element.prop('checked', true);
                }
                
                //Change State
                element.on('change', function(){
                    if(element.is(':checked')) {
                        localStorage.setItem('ma-layout-status', 1);
                        scope.$apply(function(){
                            scope.changeLayout = '1';
                        })
                    }
                    else {
                        localStorage.setItem('ma-layout-status', 0);
                        scope.$apply(function(){
                            scope.changeLayout = '0';
                        })
                    }
                })
            }
        }
    })



    // =========================================================================
    // MAINMENU COLLAPSE
    // =========================================================================

    .directive('toggleSidebar', function(){

        return {
            restrict: 'A',
            scope: {
                modelLeft: '=',
                modelRight: '='
            },
            
            link: function(scope, element, attr) {
                element.on('click', function(){
 
                    if (element.data('target') === 'mainmenu') {
                        if (scope.modelLeft === false) {
                            scope.$apply(function(){
                                scope.modelLeft = true;
                            })
                        }
                        else {
                            scope.$apply(function(){
                                scope.modelLeft = false;
                            })
                        }
                    }
                    
                    if (element.data('target') === 'chat') {
                        if (scope.modelRight === false) {
                            scope.$apply(function(){
                                scope.modelRight = true;
                            })
                        }
                        else {
                            scope.$apply(function(){
                                scope.modelRight = false;
                            })
                        }
                        
                    }
                })
            }
        }
    
    })
    

    
    // =========================================================================
    // SUBMENU TOGGLE
    // =========================================================================

    .directive('toggleSubmenu', function(){

        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                    element.parent().toggleClass('toggled');
                    element.parent().find('ul').stop(true, false).slideToggle(200);
                })
            }
        }
    })


    // =========================================================================
    // STOP PROPAGATION
    // =========================================================================
    
    .directive('stopPropagate', function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                element.on('click', function(event){
                    event.stopPropagation();
                });
            }
        }
    })

    .directive('aPrevent', function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                element.on('click', function(event){
                    event.preventDefault();
                });
            }
        }
    })


    // =========================================================================
    // PRINT
    // =========================================================================
    
    .directive('print', function(){
        return {
            restrict: 'A',
            link: function(scope, element){
                element.click(function(){
                    window.print();
                })   
            }
        }
    })

   