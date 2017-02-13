OnePiece 

    // =========================================================================
    // CALENDAR WIDGET
    // =========================================================================

    .directive('fullCalendar', function(){
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.fullCalendar({
                    contentHeight: 'auto',
                    theme: true,
                    header: {
                        right: '',
                        center: 'prev, title, next',
                        left: ''
                    },
                    defaultDate: '2014-06-12',
                    editable: true,
                    events: [
                        {
                            title: 'All Day',
                            start: '2014-06-01',
                            className: 'bgm-cyan'
                        },
                        {
                            title: 'Long Event',
                            start: '2014-06-07',
                            end: '2014-06-10',
                            className: 'bgm-orange'
                        },
                        {
                            id: 999,
                            title: 'Repeat',
                            start: '2014-06-09',
                            className: 'bgm-lightgreen'
                        },
                        {
                            id: 999,
                            title: 'Repeat',
                            start: '2014-06-16',
                            className: 'bgm-blue'
                        },
                        {
                            title: 'Meet',
                            start: '2014-06-12',
                            end: '2014-06-12',
                            className: 'bgm-teal'
                        },
                        {
                            title: 'Lunch',
                            start: '2014-06-12',
                            className: 'bgm-gray'
                        },
                        {
                            title: 'Birthday',
                            start: '2014-06-13',
                            className: 'bgm-pink'
                        },
                        {
                            title: 'Google',
                            url: 'http://google.com/',
                            start: '2014-06-28',
                            className: 'bgm-bluegray'
                        }
                    ]
                });
            }
        }
    })
    

    // =========================================================================
    // MAIN CALENDAR
    // =========================================================================

    .directive('calendar', ['$compile', function($compile){
        return {
            restrict: 'A',
            scope: {
                select: '&',
                actionLinks: '=',
            },
            link: function(scope, element, attrs) {
                
                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();

                //Generate the Calendar
                element.fullCalendar({
                    header: {
                        right: '',
                        center: 'prev, title, next',
                        left: ''
                    },

                    theme: true, //Do not remove this as it ruin the design
                    selectable: true,
                    selectHelper: true,
                    editable: true,

                    //Add Events
                    events: [
                        {
                            title: 'Hangout with friends',
                            start: new Date(y, m, 1),
                            allDay: true,
                            className: 'bgm-cyan'
                        },
                        {
                            title: 'Meeting with client',
                            start: new Date(y, m, 10),
                            allDay: true,
                            className: 'bgm-red'
                        },
                        {
                            title: 'Repeat Event',
                            start: new Date(y, m, 18),
                            allDay: true,
                            className: 'bgm-blue'
                        },
                        {
                            title: 'Semester Exam',
                            start: new Date(y, m, 20),
                            allDay: true,
                            className: 'bgm-green'
                        },
                        {
                            title: 'Soccor match',
                            start: new Date(y, m, 5),
                            allDay: true,
                            className: 'bgm-purple'
                        },
                        {
                            title: 'Coffee time',
                            start: new Date(y, m, 21),
                            allDay: true,
                            className: 'bgm-orange'
                        },
                        {
                            title: 'Job Interview',
                            start: new Date(y, m, 5),
                            allDay: true,
                            className: 'bgm-dark'
                        },
                        {
                            title: 'IT Meeting',
                            start: new Date(y, m, 5),
                            allDay: true,
                            className: 'bgm-cyan'
                        },
                        {
                            title: 'Brunch at Beach',
                            start: new Date(y, m, 1),
                            allDay: true,
                            className: 'bgm-purple'
                        },
                        {
                            title: 'Live TV Show',
                            start: new Date(y, m, 15),
                            allDay: true,
                            className: 'bgm-orange'
                        },
                        {
                            title: 'Software Conference',
                            start: new Date(y, m, 25),
                            allDay: true,
                            className: 'bgm-blue'
                        },
                        {
                            title: 'Coffee time',
                            start: new Date(y, m, 30),
                            allDay: true,
                            className: 'bgm-orange'
                        },
                        {
                            title: 'Job Interview',
                            start: new Date(y, m, 30),
                            allDay: true,
                            className: 'bgm-dark'
                        },
                    ],

                    //On Day Select
                    select: function(start, end, allDay) {
                        scope.select({
                            start: start, 
                            end: end
                        });
                    }
                });
                
                  
                //Add action links in calendar header
                element.find('.fc-toolbar').append($compile(scope.actionLinks)(scope));
            }
        }
    }])
    

    //Change Calendar Views
    .directive('calendarView', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function(){
                    $('#calendar').fullCalendar('changeView', attrs.calendarView);  
                })
            }
        }
    })


OnePiece

    // =========================================================================
    // WEATHER WIDGET
    // =========================================================================

    .directive('weatherWidget', function(){
        return {
            restrict: 'A',
            link: function(scope, element) {
                $.simpleWeather({
                    location: 'Austin, TX',
                    woeid: '',
                    unit: 'f',
                    success: function(weather) {
                        html = '<div class="weather-status">'+weather.temp+'&deg;'+weather.units.temp+'</div>';
                        html += '<ul class="weather-info"><li>'+weather.city+', '+weather.region+'</li>';
                        html += '<li class="currently">'+weather.currently+'</li></ul>';
                        html += '<div class="weather-icon wi-'+weather.code+'"></div>';
                        html += '<div class="dash-widget-footer"><div class="weather-list tomorrow">';
                        html += '<span class="weather-list-icon wi-'+weather.forecast[2].code+'"></span><span>'+weather.forecast[1].high+'/'+weather.forecast[1].low+'</span><span>'+weather.forecast[1].text+'</span>';
                        html += '</div>';
                        html += '<div class="weather-list after-tomorrow">';
                        html += '<span class="weather-list-icon wi-'+weather.forecast[2].code+'"></span><span>'+weather.forecast[2].high+'/'+weather.forecast[2].low+'</span><span>'+weather.forecast[2].text+'</span>';
                        html += '</div></div>';
                        $("#weather-widget").html(html);
                    },
                    error: function(error) {
                        $("#weather-widget").html('<p>'+error+'</p>');
                    }
                });
            }
        }
        
    })



    // =========================================================================
    // SWEATALERT
    // =========================================================================

    //Basic
    .directive('swalBasic', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                    swal("Here's a message!");
                });
            }
        }
    })
    
    //A title with a text under
    .directive('swalText', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                    swal("Here's a message!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, tincidunt vitae ipsum et, pellentesque maximus enim. Mauris eleifend ex semper, lobortis purus sed, pharetra felis")

                });
            }
        }
    })

    //Success Message
    .directive('swalSuccess', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                    swal("Good job!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, tincidunt vitae ipsum et, pellentesque maximus enim. Mauris eleifend ex semper, lobortis purus sed, pharetra felis", "success")

                });
            }
        }
    })

    //Warning Message
    .directive('swalWarning', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                    swal({   
                        title: "Are you sure?",   
                        text: "You will not be able to recover this imaginary file!",   
                        type: "warning",   
                        showCancelButton: true,   
                        confirmButtonColor: "#DD6B55",   
                        confirmButtonText: "Yes, delete it!",   
                        closeOnConfirm: false 
                    }, function(){   
                        swal("Deleted!", "Your imaginary file has been deleted.", "success"); 
                    });
                });
            }
        }
    })

    //Parameter
    .directive('swalParams', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                    swal({   
                        title: "Are you sure?",   
                        text: "You will not be able to recover this imaginary file!",   
                        type: "warning",   
                        showCancelButton: true,   
                        confirmButtonColor: "#DD6B55",   
                        confirmButtonText: "Yes, delete it!",   
                        cancelButtonText: "No, cancel plx!",   
                        closeOnConfirm: false,   
                        closeOnCancel: false 
                    }, function(isConfirm){   
                        if (isConfirm) {     
                            swal("Deleted!", "Your imaginary file has been deleted.", "success");   
                        } else {     
                            swal("Cancelled", "Your imaginary file is safe :)", "error");   
                        } 
                    });
                });
            }
        }
    })

    //Custom Image
    .directive('swalImg', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                    swal({   
                        title: "Sweet!",   
                        text: "Here's a custom image.",   
                        imageUrl: "img/thumbs-up.png" 
                    });
                });
            }
        }
    })
            
    //Auto Close Timer
    .directive('swalTimer', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                     swal({   
                        title: "Auto close alert!",   
                        text: "I will close in 2 seconds.",   
                        timer: 2000,   
                        showConfirmButton: false 
                    });
                });
            }
        }
    })

    

    // =========================================================================
    // GROWL
    // =========================================================================

    .directive('growlDemo', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                function notify(from, align, icon, type, animIn, animOut){
                    $.growl({
                        icon: icon,
                        title: ' Bootstrap Growl ',
                        message: 'Turning standard Bootstrap alerts into awesome notifications',
                        url: ''
                    },{
                            element: 'body',
                            type: type,
                            allow_dismiss: true,
                            placement: {
                                    from: from,
                                    align: align
                            },
                            offset: {
                                x: 20,
                                y: 85
                            },
                            spacing: 10,
                            z_index: 1031,
                            delay: 2500,
                            timer: 1000,
                            url_target: '_blank',
                            mouse_over: false,
                            animate: {
                                    enter: animIn,
                                    exit: animOut
                            },
                            icon_type: 'class',
                            template: '<div data-growl="container" class="alert" role="alert">' +
                                            '<button type="button" class="close" data-growl="dismiss">' +
                                                '<span aria-hidden="true">&times;</span>' +
                                                '<span class="sr-only">Close</span>' +
                                            '</button>' +
                                            '<span data-growl="icon"></span>' +
                                            '<span data-growl="title"></span>' +
                                            '<span data-growl="message"></span>' +
                                            '<a href="#" data-growl="url"></a>' +
                                        '</div>'
                    });
                }
                
                element.on('click', function(e){
                    e.preventDefault();
                    
                    var nFrom = attrs.from;
                    var nAlign = attrs.align;
                    var nIcons = attrs.icon;
                    var nType = attrs.type;
                    var nAnimIn = attrs.animationIn;
                    var nAnimOut = attrs.animationOut;

                    notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut);
            
                })
                
                
            }
        }
    })


OnePiece 

    // =========================================================================
    // INPUT FEILDS MODIFICATION
    // =========================================================================

    //Add blue animated border and remove with condition when focus and blur

    .directive('fgLine', function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                if($('.fg-line')[0]) {
                    $('body').on('focus', '.form-control', function(){
                        $(this).closest('.fg-line').addClass('fg-toggled');
                    })

                    $('body').on('blur', '.form-control', function(){
                        var p = $(this).closest('.form-group');
                        var i = p.find('.form-control').val();

                        if (p.hasClass('fg-float')) {
                            if (i.length == 0) {
                                $(this).closest('.fg-line').removeClass('fg-toggled');
                            }
                        }
                        else {
                            $(this).closest('.fg-line').removeClass('fg-toggled');
                        }
                    });
                }
    
            }
        }
        
    })

    

    // =========================================================================
    // AUTO SIZE TEXTAREA
    // =========================================================================
    
    .directive('autoSize', function(){
        return {
            restrict: 'A',
            link: function(scope, element){
                if (element[0]) {
                   autosize(element);
                }
            }
        }
    })
    

    // =========================================================================
    // BOOTSTRAP SELECT
    // =========================================================================

    .directive('selectPicker', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                //if (element[0]) {
                    element.selectpicker();
                //}
            }
        }
    })
    

    // =========================================================================
    // INPUT MASK
    // =========================================================================

    .directive('inputMask', function(){
        return {
            restrict: 'A',
            scope: {
              inputMask: '='
            },
            link: function(scope, element){
                element.mask(scope.inputMask.mask);
            }
        }
    })

    
    // =========================================================================
    // COLOR PICKER
    // =========================================================================

    .directive('colordPicker', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $(element).each(function(){
                    var colorOutput = $(this).closest('.cp-container').find('.cp-value');
                    $(this).farbtastic(colorOutput);
                });
                
            }
        }
    })



    // =========================================================================
    // PLACEHOLDER FOR IE 9 (on .form-control class)
    // =========================================================================

    .directive('formControl', function(){
        return {
            restrict: 'C',
            link: function(scope, element, attrs) {
                if(angular.element('html').hasClass('ie9')) {
                    $('input, textarea').placeholder({
                        customClass: 'ie9-placeholder'
                    });
                }
            }
            
        }
    })

    // =========================================================================
    // ENTER KEY
    // =========================================================================
    .directive('enterKey', function () {
        return function (scope, element, attrs) {

            element.bind("keydown keypress", function (event) {
                var keyCode = event.which || event.keyCode;

                // If enter key is pressed
                if (keyCode === 13) {
                    scope.$apply(function () {
                        // Evaluate the expression
                        scope.$eval(attrs.enterKey);
                    });

                    event.preventDefault();
                }
            });
        }
    })
OnePiece

    // =========================================================================
    // MEDIA ELEMENT
    // =========================================================================
    
    .directive('mediaElement', function(){
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.mediaelementplayer();
            }
        }
        
    })


    // =========================================================================
    // LIGHTBOX
    // =========================================================================
    
    .directive('lightbox', function(){
        return {
            restrict: 'C',
            link: function (scope, lightbox) {
                scope.$on('onRepeatLast_lightbox', function (scope, element, attrs) {
                    var items = lightbox.find('.wip-item');
                    items.each(function (index, item) {
                        var imageUrl = $(item).attr('href') || $(item).attr('data-src');
                        if (imageUrl) {
                            imageUrl = imageUrl.replace('upload', 'upload/w_' + Math.round($(item).width()));
                            if (imageUrl.indexOf('.gif') == -1 && imageUrl.indexOf('.mp4') == -1) {
                                if (items.length == 1) {
                                    var image = new Image();
                                    image.src = imageUrl;
                                    $(image).on('load', function () {
                                        $(item).css('padding-bottom', 0);
                                        $(item).height(image.height - 1);
                                    });
                                }

                                $(item).css('background-image', 'url(' + imageUrl + ')');

                                lightbox.lightGallery({
                                    enableTouch: true,
                                    thumbnail: true,
                                    hash: false,
                                    thumbContHeight: 120
                                });
                            } else {
                                var $item = $(item);
                                var $img = $item.find('img');
                                $img.attr('src', imageUrl.replace('.gif', '.jpg').replace('.mp4', '.jpg'));
                                if (imageUrl.indexOf('video') == -1) {
                                    $img.attr('data-gif', imageUrl.replace('upload/', 'upload/fl_awebp.lossy,').replace('.gif', '.webp').replace('.mp4', '.webp'));
                                }
                                $img.attr('data-wait', true);
                                $img.attr('data-playon', 'click');
                                $img.unwrap();
                                $img.on('load', function () {
                                    $img.attr('height', $img.height());
                                    $img.attr('width', $img.width());
                                    lightbox.height($img.height());
                                    $img.gifplayer({
                                        label: ''
                                    });

                                    var id = moment().valueOf();
                                    lightbox.attr('id', 'gp_' + id);
                                    lightbox.selector = '#gp_' + id;
                                    lightbox.scrolling({
                                        checkScrolling: true
                                    });
                                    lightbox.on('scrollin', function (event, $all_elements) {
                                        var $item = $(event.target);
                                        var $img = $item.find('img.gifplayer-ready:visible');
                                        if ($img.length > 0) {
                                            $img.gifplayer('play');
                                        }
                                    });
                                    lightbox.on('scrollout', function (event, $all_elements) {
                                        var $item = $(event.target);
                                        var $img = $item.find('img.gifplayer-ready');
                                        $img.gifplayer('stop');
                                    });
                                });
                            }
                        }
                    });
                });
            }
        }
        
    })


    // =========================================================================
    // ONLOADED REPEAT
    // =========================================================================
    .directive('onLastRepeat', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if (scope.$last) setTimeout(function () {
                    scope.$emit('onRepeatLast_' + attrs.onLastRepeat, element, attrs);
                }, 1);
            }
        }
    })
OnePiece
    // =========================================================================
    // GAG
    // =========================================================================

    .directive('gag', ['$http', function ($http) {
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
    }])


    // =========================================================================
    // TOP TAG
    // =========================================================================

    .directive('topTag', ['$http', function ($http) {
        return {
            restrict: 'E',
            scope: {
                tags: '=',
                header: '@',
                subHeader: '@'
            },
            templateUrl: appBaseUrl + 'modules/template/top-tag.html'
        }
    }])


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

   
OnePiece

    // =========================================================================
    // NICE SCROLL
    // =========================================================================

    //Html

    .directive('html', ['nicescrollService', function(nicescrollService){
        return {
            restrict: 'E',
            link: function(scope, element) {

                if (!element.hasClass('ismobile')) {
                    if (!$('.login-content')[0]) {
                        nicescrollService.niceScroll(element, 'rgba(0,0,0,0.3)', '5px');
                    }
                }
            }
        }
    }])


    //Table

    .directive('tableResponsive', ['nicescrollService', function(nicescrollService){
        return {
            restrict: 'C',
            link: function(scope, element) {

                if (!$('html').hasClass('ismobile')) {
                    nicescrollService.niceScroll(element, 'rgba(0,0,0,0.3)', '5px');
                }
            }
        }
    }])


    //Chosen

    .directive('chosenResults', ['nicescrollService', function(nicescrollService){
        return {
            restrict: 'C',
            link: function(scope, element) {

                if (!$('html').hasClass('ismobile')) {
                    nicescrollService.niceScroll(element, 'rgba(0,0,0,0.3)', '5px');
                }
            }
        }
    }])


    //Tabs

    .directive('tabNav', ['nicescrollService', function(nicescrollService){
        return {
            restrict: 'C',
            link: function(scope, element) {

                if (!$('html').hasClass('ismobile')) {
                    nicescrollService.niceScroll(element, 'rgba(0,0,0,0.3)', '2px');
                }
            }
        }
    }])


    //For custom class

    .directive('cOverflow', ['nicescrollService', function(nicescrollService){
        return {
            restrict: 'C',
            link: function(scope, element) {

                if (!$('html').hasClass('ismobile')) {
                    nicescrollService.niceScroll(element, 'rgba(0,0,0,0.5)', '5px');
                }
            }
        }
    }])


    // =========================================================================
    // WAVES
    // =========================================================================

    // For .btn classes
    .directive('btn', function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                if(element.hasClass('btn-icon') || element.hasClass('btn-float')) {
                    Waves.attach(element, ['waves-circle']);
                }

                else if(element.hasClass('btn-light')) {
                    Waves.attach(element, ['waves-light']);
                }

                else {
                    Waves.attach(element);
                }

                Waves.init();
            }
        }
    })


    // =========================================================================
    // SCROLL TO HIDE
    // =========================================================================
    .directive('scrollHide', ['$timeout', '$window', function ($timeout, $window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var scrollposition = 0, scroll_time;
                angular.element($window).bind("scroll", function () {
                    var body = angular.element(document.getElementsByTagName('body'));
                    var current_scroll = body[0].scrollTop;
                    if (current_scroll) {
                        console.log(current_scroll >= scrollposition)
                        if (current_scroll <= scrollposition) {
                            element.removeClass('invisible');
                            element.removeClass('animated fadeOutDown');
                        }
                        else {
                            element.addClass('invisible');
                            element.addClass('animated fadeOutDown');
                        }
                    }
                    scroll_time = $timeout(function () {
                        scrollposition = current_scroll;
                    }, 60);
                });
            }
        }
    }]);
OnePiece

    // =========================================================================
    // UPLOAD FILES
    // =========================================================================

    //Thumb
    .directive('ngThumb', ['$window', function ($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function (item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function (file) {
                var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function (scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        }
    }])



    //Thumb background
    .directive('ngThumbBackground', ['$window', function ($window) {
        var helper = {
            isFile: function (item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function (file) {
                var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                var params = scope.$eval(attributes.ngThumbBackground);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.src = event.target.result;
                    element.css('background-image', 'url(' + img.src + ')');
                    element.height(params.height);
                    element.width(params.width);
                }
            }
        }
    }])

    //Image src
    .directive('ngImageSrc', ['$window', function ($window) {
        var helper = {
            isFile: function (item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function (file) {
                var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                var params = scope.$eval(attributes.ngImageSrc);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.src = event.target.result;
                    element.css('background-image', 'url(' + img.src + ')');
                    element.attr('href', img.src);
                    element.append(img);
                }
            }
        }
    }]);