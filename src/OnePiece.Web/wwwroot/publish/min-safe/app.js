var OnePiece = angular.module('OnePiece', [
    'ngAnimate',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'oc.lazyLoad',
    'nouislider',
    'ngTable',
    'LocalStorageModule',
    'angularHideHeader',
    'validation',
    'validation.rule'
])

var baseUrl = $('base').attr('href');
var appBaseUrl = baseUrl + 'app/';
var hostName = baseUrl;

OnePiece.constant('ngAuthSettings', {
    apiServiceBaseUri: baseUrl,
    clientId: 'OnePiece.Web'
});

OnePiece.run(['authService', '$window', function (authService, $window) {
    authService.fillAuthData();

    $window.fbAsyncInit = function () {
        FB.init({
            appId: OnePieceData.FacebookAppId,
            xfbml: true,
            version: 'v2.5'
        });

        // Get Embedded Video Player API Instance
        var my_video_player;
        FB.Event.subscribe('xfbml.ready', function (msg) {
            if (msg.type === 'video') {
                my_video_player = msg.instance;
            }
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}]);