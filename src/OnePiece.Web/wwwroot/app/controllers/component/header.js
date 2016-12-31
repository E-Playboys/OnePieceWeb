function HeaderCtrl($timeout, $rootScope, messageService, $state, $uibModal) {

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

        y.each(function () {
            var z = $(this);
            $timeout(function () {
                z.addClass('animated fadeOutRightBig').delay(1000).queue(function () {
                    z.remove();
                });
            }, w += 150);
        })

        $timeout(function () {
            angular.element('#notifications').addClass('empty');
        }, (z * 150) + 200);
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
        }, function () {
            localStorage.clear();
            swal("Done!", "localStorage is cleared", "success");
        });

    }

    //Fullscreen View
    _self.fullScreen = function () {
        //Launch
        function launchIntoFullscreen(element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }

        //Exit
        function exitFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
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
}