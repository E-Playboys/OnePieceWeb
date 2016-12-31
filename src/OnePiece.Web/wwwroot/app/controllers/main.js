function OnePieceCtrl($timeout, $state, growlService, AuthService, $scope) {
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
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
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
    this.sidebarStat = function (event) {
        if (!angular.element(event.target).parent().hasClass('active')) {
            this.sidebarToggle.left = false;
        }
    }
}