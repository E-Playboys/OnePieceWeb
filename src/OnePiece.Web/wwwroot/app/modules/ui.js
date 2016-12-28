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