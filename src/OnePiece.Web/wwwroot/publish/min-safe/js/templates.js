angular.module('OnePiece').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('wwwroot/app/template/chat.html',
    "<div class=\"chat-search\"><div class=\"fg-line\"><input type=\"text\" class=\"form-control\" placeholder=\"Search People\"></div></div><div class=\"listview\"><a class=\"lv-item\" href=\"\"><div class=\"media\"><div class=\"pull-left p-relative\"><img class=\"lv-img-sm\" src=\"wwwroot/img/profile-pics/2.jpg\" alt=\"\"> <i class=\"chat-status-busy\"></i></div><div class=\"media-body\"><div class=\"lv-title\">Jonathan Morris</div><small class=\"lv-small\">Available</small></div></div></a> <a class=\"lv-item\" href=\"\"><div class=\"media\"><div class=\"pull-left\"><img class=\"lv-img-sm\" src=\"wwwroot/img/profile-pics/1.jpg\" alt=\"\"></div><div class=\"media-body\"><div class=\"lv-title\">David Belle</div><small class=\"lv-small\">Last seen 3 hours ago</small></div></div></a> <a class=\"lv-item\" href=\"\"><div class=\"media\"><div class=\"pull-left p-relative\"><img class=\"lv-img-sm\" src=\"wwwroot/img/profile-pics/3.jpg\" alt=\"\"> <i class=\"chat-status-online\"></i></div><div class=\"media-body\"><div class=\"lv-title\">Fredric Mitchell Jr.</div><small class=\"lv-small\">Availble</small></div></div></a> <a class=\"lv-item\" href=\"\"><div class=\"media\"><div class=\"pull-left p-relative\"><img class=\"lv-img-sm\" src=\"wwwroot/img/profile-pics/4.jpg\" alt=\"\"> <i class=\"chat-status-online\"></i></div><div class=\"media-body\"><div class=\"lv-title\">Glenn Jecobs</div><small class=\"lv-small\">Availble</small></div></div></a> <a class=\"lv-item\" href=\"\"><div class=\"media\"><div class=\"pull-left\"><img class=\"lv-img-sm\" src=\"wwwroot/img/profile-pics/5.jpg\" alt=\"\"></div><div class=\"media-body\"><div class=\"lv-title\">Bill Phillips</div><small class=\"lv-small\">Last seen 3 days ago</small></div></div></a> <a class=\"lv-item\" href=\"\"><div class=\"media\"><div class=\"pull-left\"><img class=\"lv-img-sm\" src=\"wwwroot/img/profile-pics/6.jpg\" alt=\"\"></div><div class=\"media-body\"><div class=\"lv-title\">Wendy Mitchell</div><small class=\"lv-small\">Last seen 2 minutes ago</small></div></div></a> <a class=\"lv-item\" href=\"\"><div class=\"media\"><div class=\"pull-left p-relative\"><img class=\"lv-img-sm\" src=\"wwwroot/img/profile-pics/7.jpg\" alt=\"\"> <i class=\"chat-status-busy\"></i></div><div class=\"media-body\"><div class=\"lv-title\">Teena Bell Ann</div><small class=\"lv-small\">Busy</small></div></div></a></div>"
  );


  $templateCache.put('wwwroot/app/template/footer.html',
    "Copyright &copy; 2015 OnePiece<ul class=\"f-menu\"><li><a href=\"\" data-ui-sref=\"pages.wall\" data-ng-click=\"onepiecectrl.sidebarStat($event)\">Home</a></li><li><a href=\"\" data-ui-sref=\"pages.league\" data-ng-click=\"onepiecectrl.sidebarStat($event)\">Leagues</a></li><li><a href=\"\" data-ui-sref=\"pages.team\" data-ng-click=\"onepiecectrl.sidebarStat($event)\">Teams</a></li><li><a href=\"\" data-ui-sref=\"pages.player\" data-ng-click=\"onepiecectrl.sidebarStat($event)\">Players</a></li></ul>"
  );


  $templateCache.put('wwwroot/app/template/header.html',
    "<ul class=\"header-inner\"><li class=\"logo\" data-ng-class=\"{ 'open': onepiecectrl.sidebarToggle.left === true }\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.wall({filter:'',slug:''})\"><div class=\"logo-button\"></div></a></li><li class=\"menu hidden-xs p-l-15 p-r-15\" data-target=\"mainmenu\" data-toggle-sidebar data-model-left=\"onepiecectrl.sidebarToggle.left\"><a href=\"\"><i class=\"zmdi zmdi-menu f-25\"></i></a></li><li class=\"menu hidden-xs\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.wall({filter:'image',slug:''})\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-image-o\"></i> <span class=\"hidden-xs p-l-5\">Image</span></a></li><li class=\"menu hidden-xs\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.wall({filter:'gif',slug:''})\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-collection-image-o\"></i> <span class=\"hidden-xs p-l-5\">Gif</span></a></li><li class=\"menu hidden-xs\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.wall({filter:'video',slug:''})\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-tv-play\"></i> <span class=\"hidden-xs p-l-5\">Video</span></a></li><li class=\"menu pull-right-start\"></li><li class=\"menu\"><a href=\"\" data-ng-click=\"hctrl.openSearch();\"><i class=\"zmdi zmdi-search f-25\"></i></a></li><li class=\"menu\" data-ng-if=\"!onepiecectrl.authentication.isAuth\"><a href=\"\" data-ng-click=\"hctrl.showLoginForm();\"><i class=\"zmdi zmdi-lock-outline f-22\"></i></a></li><li class=\"menu hidden-sm hidden-md hidden-lg\" data-ng-if=\"onepiecectrl.authentication.isAuth\"><a href=\"\" data-ng-click=\"hctrl.showPostingForm();\"><i class=\"zmdi zmdi-plus f-22\"></i></a></li><li class=\"menu hidden-sm hidden-md hidden-lg\"><a href=\"\" data-target=\"mainmenu\" data-toggle-sidebar data-model-left=\"onepiecectrl.sidebarToggle.left\"><i class=\"zmdi zmdi-menu f-22\"></i></a></li><li class=\"menu m-r-5\"></li><!--<li class=\"pull-right\">\r" +
    "\n" +
    "        <ul class=\"top-menu\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <!--<li id=\"toggle-width\">\r" +
    "\n" +
    "                <div class=\"toggle-switch\">\r" +
    "\n" +
    "                    <input id=\"tw-switch\" type=\"checkbox\" hidden=\"hidden\" data-change-layout=\"onepiecectrl.layoutType\">\r" +
    "\n" +
    "                    <label for=\"tw-switch\" class=\"ts-helper\"></label>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </li>--><!--<li id=\"top-search\">\r" +
    "\n" +
    "                <a class=\"tm-search\" href=\"\" data-ng-click=\"hctrl.openSearch();\"></a>\r" +
    "\n" +
    "            </li>--><!--<li class=\"dropdown\" dropdown>\r" +
    "\n" +
    "                <a dropdown-toggle class=\"tm-message\" href=\"\"><i class=\"tmn-counts\">6</i></a>\r" +
    "\n" +
    "                <div class=\"dropdown-menu dropdown-menu-lg stop-propagate pull-right\">\r" +
    "\n" +
    "                    <div class=\"listview\">\r" +
    "\n" +
    "                        <div class=\"lv-header\">\r" +
    "\n" +
    "                            Messages\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"lv-body\">\r" +
    "\n" +
    "                            <a class=\"lv-item\" ng-href=\"\" ng-repeat=\"w in hctrl.messageResult.list\">\r" +
    "\n" +
    "                                <div class=\"media\">\r" +
    "\n" +
    "                                    <div class=\"pull-left\">\r" +
    "\n" +
    "                                        <img class=\"lv-img-sm\" ng-src=\"wwwroot/img/profile-pics/{{ w.img }}\" alt=\"\">\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    <div class=\"media-body\">\r" +
    "\n" +
    "                                        <div class=\"lv-title\">{{ w.user }}</div>\r" +
    "\n" +
    "                                        <small class=\"lv-small\">{{ w.text }}</small>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </a>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        \r" +
    "\n" +
    "                        <div class=\"clearfix\"></div>\r" +
    "\n" +
    "                        \r" +
    "\n" +
    "                        <a class=\"lv-footer\" href=\"\">View All</a>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "            <li class=\"dropdown\" dropdown>\r" +
    "\n" +
    "                <a dropdown-toggle class=\"tm-notification\" href=\"\"><i class=\"tmn-counts\">9</i></a>\r" +
    "\n" +
    "                <div class=\"dropdown-menu dropdown-menu-lg stop-propagate pull-right\">\r" +
    "\n" +
    "                    <div class=\"listview\" id=\"notifications\">\r" +
    "\n" +
    "                        <div class=\"lv-header\">\r" +
    "\n" +
    "                            Notification\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <ul class=\"actions\">\r" +
    "\n" +
    "                                <li>\r" +
    "\n" +
    "                                    <a href=\"\" data-ng-click=\"hctrl.clearNotification($event)\">\r" +
    "\n" +
    "                                        <i class=\"zmdi zmdi-check-all\"></i>\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "                                </li>\r" +
    "\n" +
    "                            </ul>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"lv-body\">\r" +
    "\n" +
    "                            <a class=\"lv-item\" ng-href=\"\" ng-repeat=\"w in hctrl.messageResult.list\">\r" +
    "\n" +
    "                                <div class=\"media\">\r" +
    "\n" +
    "                                    <div class=\"pull-left\">\r" +
    "\n" +
    "                                        <img class=\"lv-img-sm\" ng-src=\"wwwroot/img/profile-pics/{{ w.img }}\" alt=\"\">\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    <div class=\"media-body\">\r" +
    "\n" +
    "                                        <div class=\"lv-title\">{{ w.user }}</div>\r" +
    "\n" +
    "                                        <small class=\"lv-small\">{{ w.text }}</small>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </a>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        \r" +
    "\n" +
    "                        <div class=\"clearfix\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <a class=\"lv-footer\" href=\"\">View Previous</a>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "            <li class=\"dropdown hidden-xs\" dropdown>\r" +
    "\n" +
    "                <a dropdown-toggle class=\"tm-task\" href=\"\"><i class=\"tmn-counts\">2</i></a>\r" +
    "\n" +
    "                <div class=\"dropdown-menu pull-right dropdown-menu-lg\">\r" +
    "\n" +
    "                    <div class=\"listview\">\r" +
    "\n" +
    "                        <div class=\"lv-header\">\r" +
    "\n" +
    "                            Tasks\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"lv-body\">\r" +
    "\n" +
    "                            <div class=\"lv-item\">\r" +
    "\n" +
    "                                <div class=\"lv-title m-b-5\">HTML5 Validation Report</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"progress\">\r" +
    "\n" +
    "                                    <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"95\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 95%\">\r" +
    "\n" +
    "                                        <span class=\"sr-only\">95% Complete (success)</span>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"lv-item\">\r" +
    "\n" +
    "                                <div class=\"lv-title m-b-5\">Google Chrome Extension</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"progress\">\r" +
    "\n" +
    "                                    <div class=\"progress-bar progress-bar-success\" role=\"progressbar\" aria-valuenow=\"80\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 80%\">\r" +
    "\n" +
    "                                        <span class=\"sr-only\">80% Complete (success)</span>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"lv-item\">\r" +
    "\n" +
    "                                <div class=\"lv-title m-b-5\">Social Intranet Projects</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"progress\">\r" +
    "\n" +
    "                                    <div class=\"progress-bar progress-bar-info\" role=\"progressbar\" aria-valuenow=\"20\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 20%\">\r" +
    "\n" +
    "                                        <span class=\"sr-only\">20% Complete</span>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"lv-item\">\r" +
    "\n" +
    "                                <div class=\"lv-title m-b-5\">Bootstrap Admin Template</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"progress\">\r" +
    "\n" +
    "                                    <div class=\"progress-bar progress-bar-warning\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 60%\">\r" +
    "\n" +
    "                                        <span class=\"sr-only\">60% Complete (warning)</span>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"lv-item\">\r" +
    "\n" +
    "                                <div class=\"lv-title m-b-5\">Youtube Client App</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"progress\">\r" +
    "\n" +
    "                                    <div class=\"progress-bar progress-bar-danger\" role=\"progressbar\" aria-valuenow=\"80\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 80%\">\r" +
    "\n" +
    "                                        <span class=\"sr-only\">80% Complete (danger)</span>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div> \r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        \r" +
    "\n" +
    "                        <div class=\"clearfix\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <a class=\"lv-footer\" href=\"\">View All</a>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "        </ul>--></ul><ul class=\"sub-header-inner hidden-sm hidden-md hidden-lg\"><li class=\"menu\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.wall({filter:'image',slug:''})\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-image-o\"></i> <span class=\"p-l-5\">Image</span></a></li><li class=\"menu\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.wall({filter:'gif',slug:''})\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-collection-image-o\"></i> <span class=\"p-l-5\">Gif</span></a></li><li class=\"menu\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.wall({filter:'video',slug:''})\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-tv-play\"></i> <span class=\"p-l-5\">Video</span></a></li></ul><!-- Top Search Content --><div id=\"top-search-wrap\"><input type=\"text\" enter-key=\"hctrl.search()\" data-ng-model=\"hctrl.searchText\"> <i id=\"top-search-close\" data-ng-click=\"hctrl.closeSearch()\">&times;</i></div><script type=\"text/ng-template\" id=\"loginForm\"><!-- Login -->\r" +
    "\n" +
    "    <div data-ng-controller=\"loginCtrl as lctrl\">\r" +
    "\n" +
    "        <form name=\"LoginForm\" class=\"lc-block lc-form\" id=\"l-login\" data-ng-class=\"{ 'toggled': loginTab }\" data-ng-if=\"loginTab\">\r" +
    "\n" +
    "            <div class=\"input-group m-b-20\">\r" +
    "\n" +
    "                <span class=\"input-group-addon\"><i class=\"zmdi zmdi-account\"></i></span>\r" +
    "\n" +
    "                <div class=\"fg-line\">\r" +
    "\n" +
    "                    <input type=\"text\" name=\"userNameLogin\" class=\"form-control\" placeholder=\"Username\" data-ng-model=\"loginForm.userName\" enter-key=\"loginForm.submit(LoginForm)\" validator=\"required,username\" valid-method=\"watch\" message-id=\"userNameLoginMessage\">\r" +
    "\n" +
    "                    <span id=\"userNameLoginMessage\"></span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"input-group m-b-20\">\r" +
    "\n" +
    "                <span class=\"input-group-addon\"><i class=\"zmdi zmdi-male\"></i></span>\r" +
    "\n" +
    "                <div class=\"fg-line\">\r" +
    "\n" +
    "                    <input type=\"password\" name=\"passwordLogin\" class=\"form-control\" placeholder=\"Password\" data-ng-model=\"loginForm.password\" enter-key=\"loginForm.submit(LoginForm)\" validator=\"required\" valid-method=\"watch\" message-id=\"passwordLoginMessage\">\r" +
    "\n" +
    "                    <span id=\"passwordLoginMessage\"></span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"clearfix\"></div>\r" +
    "\n" +
    "            <div class=\"checkbox\">\r" +
    "\n" +
    "                <label>\r" +
    "\n" +
    "                    <input type=\"checkbox\" value=\"\" data-ng-model=\"loginForm.useRefreshTokens\">\r" +
    "\n" +
    "                    <i class=\"input-helper\"></i>\r" +
    "\n" +
    "                    Keep me signed in\r" +
    "\n" +
    "                </label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <a href=\"\" class=\"btn btn-login btn-success btn-float\" data-ng-click=\"loginForm.submit(LoginForm)\"><i class=\"zmdi zmdi-arrow-forward\"></i></a>\r" +
    "\n" +
    "            <a href=\"\" class=\"btn btn-facebook-login btn-primary btn-float\" data-ng-click=\"authExternalProvider('Facebook')\"><i class=\"zmdi zmdi-facebook\"></i></a>\r" +
    "\n" +
    "            <a href=\"\" class=\"btn btn-google-login btn-danger btn-float\" data-ng-click=\"authExternalProvider('Google')\"><i class=\"zmdi zmdi-google\"></i></a>\r" +
    "\n" +
    "            <ul class=\"login-navigation\">\r" +
    "\n" +
    "                <li data-block=\"#l-register\" class=\"bgm-red\" data-ng-click=\"gotoTab('register')\">Register</li>\r" +
    "\n" +
    "                <li data-block=\"#l-forget-password\" class=\"bgm-orange\" data-ng-click=\"gotoTab('forgot')\">Forgot Password?</li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "        <!-- Register -->\r" +
    "\n" +
    "        <form name=\"RegisterForm\" class=\"lc-block lc-form\" id=\"l-register\" data-ng-class=\"{ 'toggled': registerTab }\" data-ng-if=\"registerTab\">\r" +
    "\n" +
    "            <div class=\"input-group m-b-20\">\r" +
    "\n" +
    "                <span class=\"input-group-addon\"><i class=\"zmdi zmdi-account\"></i></span>\r" +
    "\n" +
    "                <div class=\"fg-line\">\r" +
    "\n" +
    "                    <input type=\"text\" name=\"userNameRegister\" class=\"form-control\" placeholder=\"Username\" data-ng-model=\"registerForm.userName\" enter-key=\"registerForm.submit(RegisterForm)\" validator=\"required,username\" valid-method=\"watch\" message-id=\"userNameRegisterMessage\">\r" +
    "\n" +
    "                    <span id=\"userNameRegisterMessage\"></span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"input-group m-b-20\">\r" +
    "\n" +
    "                <span class=\"input-group-addon\"><i class=\"zmdi zmdi-email\"></i></span>\r" +
    "\n" +
    "                <div class=\"fg-line\">\r" +
    "\n" +
    "                    <input type=\"text\" name=\"emailRegister\" class=\"form-control\" placeholder=\"Email Address\" data-ng-model=\"registerForm.email\" enter-key=\"registerForm.submit(RegisterForm)\" validator=\"required,email\" valid-method=\"watch\" message-id=\"emailRegisterMessage\">\r" +
    "\n" +
    "                    <span id=\"emailRegisterMessage\"></span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"input-group m-b-20\">\r" +
    "\n" +
    "                <span class=\"input-group-addon\"><i class=\"zmdi zmdi-male\"></i></span>\r" +
    "\n" +
    "                <div class=\"fg-line\">\r" +
    "\n" +
    "                    <input type=\"password\" name=\"passwordRegister\" class=\"form-control\" placeholder=\"Password\" data-ng-model=\"registerForm.password\" enter-key=\"registerForm.submit(RegisterForm)\" validator=\"required,minlength=6\" valid-method=\"watch\" message-id=\"passwordRegisterMessage\">\r" +
    "\n" +
    "                    <span id=\"passwordRegisterMessage\"></span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"clearfix\"></div>\r" +
    "\n" +
    "            <div class=\"checkbox\">\r" +
    "\n" +
    "                <label>\r" +
    "\n" +
    "                    <input type=\"checkbox\" value=\"\">\r" +
    "\n" +
    "                    <i class=\"input-helper\"></i>\r" +
    "\n" +
    "                    Accept the license agreement\r" +
    "\n" +
    "                </label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <a href=\"\" class=\"btn btn-login btn-danger btn-float\" data-ng-click=\"registerForm.submit(RegisterForm)\"><i class=\"zmdi zmdi-arrow-forward\"></i></a>\r" +
    "\n" +
    "            <ul class=\"login-navigation\">\r" +
    "\n" +
    "                <li data-block=\"#l-login\" class=\"bgm-green\" data-ng-click=\"gotoTab('login')\">Login</li>\r" +
    "\n" +
    "                <li data-block=\"#l-forget-password\" class=\"bgm-orange\" data-ng-click=\"gotoTab('forgot')\">Forgot Password?</li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "        <!-- Forgot Password -->\r" +
    "\n" +
    "        <form name=\"ForgotForm\" class=\"lc-block lc-form\" id=\"l-forget-password\" data-ng-class=\"{ 'toggled': forgotTab }\" data-ng-if=\"forgotTab\">\r" +
    "\n" +
    "            <p class=\"text-left\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu risus. Curabitur commodo lorem fringilla enim feugiat commodo sed ac lacus.</p>\r" +
    "\n" +
    "            <div class=\"input-group m-b-20\">\r" +
    "\n" +
    "                <span class=\"input-group-addon\"><i class=\"zmdi zmdi-email\"></i></span>\r" +
    "\n" +
    "                <div class=\"fg-line\">\r" +
    "\n" +
    "                    <input type=\"text\" name=\"emailForgot\" class=\"form-control\" placeholder=\"Email Address\" data-ng-model=\"forgotForm.email\" enter-key=\"forgotForm.submit(ForgotForm)\" validator=\"required,email\" valid-method=\"watch\" message-id=\"emailForgotMessage\">\r" +
    "\n" +
    "                    <span id=\"emailForgotMessage\"></span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <a href=\"\" class=\"btn btn-login btn-warning btn-float\"><i class=\"zmdi zmdi-arrow-forward\"></i></a>\r" +
    "\n" +
    "            <ul class=\"login-navigation\">\r" +
    "\n" +
    "                <li data-block=\"#l-login\" class=\"bgm-green\" data-ng-click=\"gotoTab('login')\">Login</li>\r" +
    "\n" +
    "                <li data-block=\"#l-register\" class=\"bgm-red\" data-ng-click=\"gotoTab('register')\">Register</li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "        <!-- Older IE warning message -->\r" +
    "\n" +
    "        <!--[if lt IE 9]>\r" +
    "\n" +
    "            <div class=\"ie-warning\">\r" +
    "\n" +
    "                <h1 class=\"c-white\">Warning!!</h1>\r" +
    "\n" +
    "                <p>You are using an outdated version of Internet Explorer, please upgrade <br/>to any of the following web browsers to access this website.</p>\r" +
    "\n" +
    "                <div class=\"iew-container\">\r" +
    "\n" +
    "                    <ul class=\"iew-download\">\r" +
    "\n" +
    "                        <li>\r" +
    "\n" +
    "                            <a href=\"http://www.google.com/chrome/\">\r" +
    "\n" +
    "                                <img src=\"img/browsers/chrome.png\" alt=\"\">\r" +
    "\n" +
    "                                <div>Chrome</div>\r" +
    "\n" +
    "                            </a>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li>\r" +
    "\n" +
    "                            <a href=\"https://www.mozilla.org/en-US/firefox/new/\">\r" +
    "\n" +
    "                                <img src=\"img/browsers/firefox.png\" alt=\"\">\r" +
    "\n" +
    "                                <div>Firefox</div>\r" +
    "\n" +
    "                            </a>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li>\r" +
    "\n" +
    "                            <a href=\"http://www.opera.com\">\r" +
    "\n" +
    "                                <img src=\"img/browsers/opera.png\" alt=\"\">\r" +
    "\n" +
    "                                <div>Opera</div>\r" +
    "\n" +
    "                            </a>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li>\r" +
    "\n" +
    "                            <a href=\"https://www.apple.com/safari/\">\r" +
    "\n" +
    "                                <img src=\"img/browsers/safari.png\" alt=\"\">\r" +
    "\n" +
    "                                <div>Safari</div>\r" +
    "\n" +
    "                            </a>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li>\r" +
    "\n" +
    "                            <a href=\"http://windows.microsoft.com/en-us/internet-explorer/download-ie\">\r" +
    "\n" +
    "                                <img src=\"img/browsers/ie.png\" alt=\"\">\r" +
    "\n" +
    "                                <div>IE (New)</div>\r" +
    "\n" +
    "                            </a>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                    </ul>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <p>Sorry for the inconvenience!</p>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        <![endif]-->\r" +
    "\n" +
    "    </div></script>"
  );


  $templateCache.put('wwwroot/app/template/management-header.html',
    "<ul class=\"header-inner\"><li class=\"logo\" data-ng-class=\"{ 'open': onepiecectrl.sidebarToggle.left === true }\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.wall({filter:'',slug:''})\"><div class=\"logo-button\"></div></a></li><li class=\"menu hidden-xs p-l-15 p-r-15\" data-target=\"mainmenu\" data-toggle-sidebar data-model-left=\"onepiecectrl.sidebarToggle.left\"><a href=\"\"><i class=\"zmdi zmdi-menu f-25\"></i></a></li><li class=\"menu hidden-sm hidden-md hidden-lg\"><a href=\"\" data-target=\"mainmenu\" data-toggle-sidebar data-model-left=\"onepiecectrl.sidebarToggle.left\"><i class=\"zmdi zmdi-menu f-22\"></i></a></li><li class=\"menu m-r-5\"></li></ul><ul class=\"sub-header-inner hidden-sm hidden-md hidden-lg\"><li class=\"menu\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.wall({filter:'image',slug:''})\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-image-o\"></i> <span class=\"p-l-5\">Image</span></a></li><li class=\"menu\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.wall({filter:'gif',slug:''})\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-collection-image-o\"></i> <span class=\"p-l-5\">Gif</span></a></li><li class=\"menu\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.wall({filter:'video',slug:''})\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-tv-play\"></i> <span class=\"p-l-5\">Video</span></a></li></ul><!-- Top Search Content --><div id=\"top-search-wrap\"><input type=\"text\" enter-key=\"hctrl.search()\" data-ng-model=\"hctrl.searchText\"> <i id=\"top-search-close\" data-ng-click=\"hctrl.closeSearch()\">&times;</i></div><script type=\"text/ng-template\" id=\"loginForm\"><!-- Login -->\r" +
    "\n" +
    "    <div data-ng-controller=\"loginCtrl as lctrl\">\r" +
    "\n" +
    "        <form name=\"LoginForm\" class=\"lc-block lc-form\" id=\"l-login\" data-ng-class=\"{ 'toggled': loginTab }\" data-ng-if=\"loginTab\">\r" +
    "\n" +
    "            <div class=\"input-group m-b-20\">\r" +
    "\n" +
    "                <span class=\"input-group-addon\"><i class=\"zmdi zmdi-account\"></i></span>\r" +
    "\n" +
    "                <div class=\"fg-line\">\r" +
    "\n" +
    "                    <input type=\"text\" name=\"userNameLogin\" class=\"form-control\" placeholder=\"Username\" data-ng-model=\"loginForm.userName\" enter-key=\"loginForm.submit(LoginForm)\" validator=\"required,username\" valid-method=\"watch\" message-id=\"userNameLoginMessage\">\r" +
    "\n" +
    "                    <span id=\"userNameLoginMessage\"></span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"input-group m-b-20\">\r" +
    "\n" +
    "                <span class=\"input-group-addon\"><i class=\"zmdi zmdi-male\"></i></span>\r" +
    "\n" +
    "                <div class=\"fg-line\">\r" +
    "\n" +
    "                    <input type=\"password\" name=\"passwordLogin\" class=\"form-control\" placeholder=\"Password\" data-ng-model=\"loginForm.password\" enter-key=\"loginForm.submit(LoginForm)\" validator=\"required\" valid-method=\"watch\" message-id=\"passwordLoginMessage\">\r" +
    "\n" +
    "                    <span id=\"passwordLoginMessage\"></span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"clearfix\"></div>\r" +
    "\n" +
    "            <div class=\"checkbox\">\r" +
    "\n" +
    "                <label>\r" +
    "\n" +
    "                    <input type=\"checkbox\" value=\"\" data-ng-model=\"loginForm.useRefreshTokens\">\r" +
    "\n" +
    "                    <i class=\"input-helper\"></i>\r" +
    "\n" +
    "                    Keep me signed in\r" +
    "\n" +
    "                </label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <a href=\"\" class=\"btn btn-login btn-success btn-float\" data-ng-click=\"loginForm.submit(LoginForm)\"><i class=\"zmdi zmdi-arrow-forward\"></i></a>\r" +
    "\n" +
    "            <a href=\"\" class=\"btn btn-facebook-login btn-primary btn-float\" data-ng-click=\"authExternalProvider('Facebook')\"><i class=\"zmdi zmdi-facebook\"></i></a>\r" +
    "\n" +
    "            <a href=\"\" class=\"btn btn-google-login btn-danger btn-float\" data-ng-click=\"authExternalProvider('Google')\"><i class=\"zmdi zmdi-google\"></i></a>\r" +
    "\n" +
    "            <ul class=\"login-navigation\">\r" +
    "\n" +
    "                <li data-block=\"#l-register\" class=\"bgm-red\" data-ng-click=\"gotoTab('register')\">Register</li>\r" +
    "\n" +
    "                <li data-block=\"#l-forget-password\" class=\"bgm-orange\" data-ng-click=\"gotoTab('forgot')\">Forgot Password?</li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "        <!-- Register -->\r" +
    "\n" +
    "        <form name=\"RegisterForm\" class=\"lc-block lc-form\" id=\"l-register\" data-ng-class=\"{ 'toggled': registerTab }\" data-ng-if=\"registerTab\">\r" +
    "\n" +
    "            <div class=\"input-group m-b-20\">\r" +
    "\n" +
    "                <span class=\"input-group-addon\"><i class=\"zmdi zmdi-account\"></i></span>\r" +
    "\n" +
    "                <div class=\"fg-line\">\r" +
    "\n" +
    "                    <input type=\"text\" name=\"userNameRegister\" class=\"form-control\" placeholder=\"Username\" data-ng-model=\"registerForm.userName\" enter-key=\"registerForm.submit(RegisterForm)\" validator=\"required,username\" valid-method=\"watch\" message-id=\"userNameRegisterMessage\">\r" +
    "\n" +
    "                    <span id=\"userNameRegisterMessage\"></span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"input-group m-b-20\">\r" +
    "\n" +
    "                <span class=\"input-group-addon\"><i class=\"zmdi zmdi-email\"></i></span>\r" +
    "\n" +
    "                <div class=\"fg-line\">\r" +
    "\n" +
    "                    <input type=\"text\" name=\"emailRegister\" class=\"form-control\" placeholder=\"Email Address\" data-ng-model=\"registerForm.email\" enter-key=\"registerForm.submit(RegisterForm)\" validator=\"required,email\" valid-method=\"watch\" message-id=\"emailRegisterMessage\">\r" +
    "\n" +
    "                    <span id=\"emailRegisterMessage\"></span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"input-group m-b-20\">\r" +
    "\n" +
    "                <span class=\"input-group-addon\"><i class=\"zmdi zmdi-male\"></i></span>\r" +
    "\n" +
    "                <div class=\"fg-line\">\r" +
    "\n" +
    "                    <input type=\"password\" name=\"passwordRegister\" class=\"form-control\" placeholder=\"Password\" data-ng-model=\"registerForm.password\" enter-key=\"registerForm.submit(RegisterForm)\" validator=\"required,minlength=6\" valid-method=\"watch\" message-id=\"passwordRegisterMessage\">\r" +
    "\n" +
    "                    <span id=\"passwordRegisterMessage\"></span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"clearfix\"></div>\r" +
    "\n" +
    "            <div class=\"checkbox\">\r" +
    "\n" +
    "                <label>\r" +
    "\n" +
    "                    <input type=\"checkbox\" value=\"\">\r" +
    "\n" +
    "                    <i class=\"input-helper\"></i>\r" +
    "\n" +
    "                    Accept the license agreement\r" +
    "\n" +
    "                </label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <a href=\"\" class=\"btn btn-login btn-danger btn-float\" data-ng-click=\"registerForm.submit(RegisterForm)\"><i class=\"zmdi zmdi-arrow-forward\"></i></a>\r" +
    "\n" +
    "            <ul class=\"login-navigation\">\r" +
    "\n" +
    "                <li data-block=\"#l-login\" class=\"bgm-green\" data-ng-click=\"gotoTab('login')\">Login</li>\r" +
    "\n" +
    "                <li data-block=\"#l-forget-password\" class=\"bgm-orange\" data-ng-click=\"gotoTab('forgot')\">Forgot Password?</li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "        <!-- Forgot Password -->\r" +
    "\n" +
    "        <form name=\"ForgotForm\" class=\"lc-block lc-form\" id=\"l-forget-password\" data-ng-class=\"{ 'toggled': forgotTab }\" data-ng-if=\"forgotTab\">\r" +
    "\n" +
    "            <p class=\"text-left\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu risus. Curabitur commodo lorem fringilla enim feugiat commodo sed ac lacus.</p>\r" +
    "\n" +
    "            <div class=\"input-group m-b-20\">\r" +
    "\n" +
    "                <span class=\"input-group-addon\"><i class=\"zmdi zmdi-email\"></i></span>\r" +
    "\n" +
    "                <div class=\"fg-line\">\r" +
    "\n" +
    "                    <input type=\"text\" name=\"emailForgot\" class=\"form-control\" placeholder=\"Email Address\" data-ng-model=\"forgotForm.email\" enter-key=\"forgotForm.submit(ForgotForm)\" validator=\"required,email\" valid-method=\"watch\" message-id=\"emailForgotMessage\">\r" +
    "\n" +
    "                    <span id=\"emailForgotMessage\"></span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <a href=\"\" class=\"btn btn-login btn-warning btn-float\"><i class=\"zmdi zmdi-arrow-forward\"></i></a>\r" +
    "\n" +
    "            <ul class=\"login-navigation\">\r" +
    "\n" +
    "                <li data-block=\"#l-login\" class=\"bgm-green\" data-ng-click=\"gotoTab('login')\">Login</li>\r" +
    "\n" +
    "                <li data-block=\"#l-register\" class=\"bgm-red\" data-ng-click=\"gotoTab('register')\">Register</li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "        <!-- Older IE warning message -->\r" +
    "\n" +
    "        <!--[if lt IE 9]>\r" +
    "\n" +
    "            <div class=\"ie-warning\">\r" +
    "\n" +
    "                <h1 class=\"c-white\">Warning!!</h1>\r" +
    "\n" +
    "                <p>You are using an outdated version of Internet Explorer, please upgrade <br/>to any of the following web browsers to access this website.</p>\r" +
    "\n" +
    "                <div class=\"iew-container\">\r" +
    "\n" +
    "                    <ul class=\"iew-download\">\r" +
    "\n" +
    "                        <li>\r" +
    "\n" +
    "                            <a href=\"http://www.google.com/chrome/\">\r" +
    "\n" +
    "                                <img src=\"img/browsers/chrome.png\" alt=\"\">\r" +
    "\n" +
    "                                <div>Chrome</div>\r" +
    "\n" +
    "                            </a>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li>\r" +
    "\n" +
    "                            <a href=\"https://www.mozilla.org/en-US/firefox/new/\">\r" +
    "\n" +
    "                                <img src=\"img/browsers/firefox.png\" alt=\"\">\r" +
    "\n" +
    "                                <div>Firefox</div>\r" +
    "\n" +
    "                            </a>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li>\r" +
    "\n" +
    "                            <a href=\"http://www.opera.com\">\r" +
    "\n" +
    "                                <img src=\"img/browsers/opera.png\" alt=\"\">\r" +
    "\n" +
    "                                <div>Opera</div>\r" +
    "\n" +
    "                            </a>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li>\r" +
    "\n" +
    "                            <a href=\"https://www.apple.com/safari/\">\r" +
    "\n" +
    "                                <img src=\"img/browsers/safari.png\" alt=\"\">\r" +
    "\n" +
    "                                <div>Safari</div>\r" +
    "\n" +
    "                            </a>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                        <li>\r" +
    "\n" +
    "                            <a href=\"http://windows.microsoft.com/en-us/internet-explorer/download-ie\">\r" +
    "\n" +
    "                                <img src=\"img/browsers/ie.png\" alt=\"\">\r" +
    "\n" +
    "                                <div>IE (New)</div>\r" +
    "\n" +
    "                            </a>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                    </ul>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <p>Sorry for the inconvenience!</p>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        <![endif]-->\r" +
    "\n" +
    "    </div></script>"
  );


  $templateCache.put('wwwroot/app/template/management-sidebar.html',
    "<div class=\"sidebar-inner c-overflow\"><div data-ng-if=\"onepiecectrl.authentication.isAuth\" class=\"profile-menu\"><a href=\"\" toggle-submenu><div class=\"profile-pic\"><img data-ng-src=\"{{onepiecectrl.authentication.userInfo.Avatar}}\" alt=\"\"></div><div class=\"profile-info\">{{onepiecectrl.authentication.userInfo.DisplayName}} <i class=\"zmdi zmdi-caret-down\"></i></div></a><ul class=\"main-menu\"><li><a data-ui-sref=\"pages.profile.about({username: onepiecectrl.authentication.userName})\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-account\"></i> View Profile</a></li><li><a href=\"\"><i class=\"zmdi zmdi-input-antenna\"></i> Privacy Settings</a></li><li><a href=\"\"><i class=\"zmdi zmdi-settings\"></i> Settings</a></li><li><a href=\"\" data-ng-click=\"onepiecectrl.logOut()\"><i class=\"zmdi zmdi-time-restore\"></i> Logout</a></li></ul></div><ul class=\"main-menu\"><li data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.wall\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-home\"></i> Dash Board</a></li><li data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.league\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-globe-alt\"></i> Leagues</a></li><li data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.team\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-flag\"></i> Teams</a></li><li data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.player\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-run\"></i> Players</a></li><li data-ui-sref-active=\"active\"><a data-ui-sref=\"management.dashboard\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-puzzle-piece\"></i> Management</a></li></ul></div>"
  );


  $templateCache.put('wwwroot/app/template/profile-menu.html',
    "<li class=\"btn-wave\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.profile.about\">Thông tin</a></li><li class=\"btn-wave\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.profile.connections\">Bạn bè</a></li><li class=\"btn-wave\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.profile.photos\">Hình ảnh</a></li><li class=\"btn-wave\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.profile.posts\">Bài đăng</a></li>"
  );


  $templateCache.put('wwwroot/app/template/sidebar-left.html',
    "<div class=\"sidebar-inner c-overflow\"><div data-ng-if=\"onepiecectrl.authentication.isAuth\" class=\"profile-menu\"><a href=\"\" toggle-submenu><div class=\"profile-pic\"><img data-ng-src=\"{{onepiecectrl.authentication.userInfo.Avatar}}\" alt=\"\"></div><div class=\"profile-info\">{{onepiecectrl.authentication.userInfo.DisplayName}} <i class=\"zmdi zmdi-caret-down\"></i></div></a><ul class=\"main-menu\"><li><a data-ui-sref=\"pages.profile.about({username: onepiecectrl.authentication.userName})\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-account\"></i> View Profile</a></li><li><a href=\"\"><i class=\"zmdi zmdi-input-antenna\"></i> Privacy Settings</a></li><li><a href=\"\"><i class=\"zmdi zmdi-settings\"></i> Settings</a></li><li><a href=\"\" data-ng-click=\"onepiecectrl.logOut()\"><i class=\"zmdi zmdi-time-restore\"></i> Logout</a></li></ul></div><ul class=\"main-menu\"><li data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.wall\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-home\"></i> Home</a></li><li data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.league\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-globe-alt\"></i> Leagues</a></li><li data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.team\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-flag\"></i> Teams</a></li><li data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.player\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-run\"></i> Players</a></li><li data-ng-if=\"onepiecectrl.authentication.isAdmin\" data-ui-sref-active=\"active\"><a data-ui-sref=\"management.posts\" data-ng-click=\"onepiecectrl.sidebarStat($event)\"><i class=\"zmdi zmdi-puzzle-piece\"></i> Management</a></li></ul></div>"
  );


  $templateCache.put('wwwroot/app/template/carousel/carousel.html',
    "<div ng-mouseenter=\"pause()\" ng-mouseleave=\"play()\" class=\"carousel\" ng-swipe-right=\"prev()\" ng-swipe-left=\"next()\"><ol class=\"carousel-indicators\" ng-show=\"slides.length > 1\"><li ng-repeat=\"slide in slides | orderBy:'index' track by $index\" ng-class=\"{active: isActive(slide)}\" ng-click=\"select(slide)\"></li></ol><div class=\"carousel-inner\" ng-transclude></div><a class=\"left carousel-control\" ng-click=\"prev()\" ng-show=\"slides.length > 1\"><span class=\"zmdi zmdi-chevron-left\"></span></a> <a class=\"right carousel-control\" ng-click=\"next()\" ng-show=\"slides.length > 1\"><span class=\"zmdi zmdi-chevron-right\"></span></a></div>"
  );


  $templateCache.put('wwwroot/app/template/datepicker/day.html',
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\" class=\"dp-table dpt-day\"><thead><tr class=\"tr-dpnav\"><th><button type=\"button\" class=\"pull-left btn-dp\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-left\"></i></button></th><th colspan=\"{{::5 + showWeeks}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" class=\"w-100 btn-dp\"><div class=\"dp-title\">{{title}}</div></button></th><th><button type=\"button\" class=\"pull-right btn-dp\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-right\"></i></button></th></tr><tr class=\"tr-dpday\"><th ng-if=\"showWeeks\" class=\"text-center\"></th><th ng-repeat=\"label in ::labels track by $index\" class=\"text-center\"><small aria-label=\"{{::label.full}}\">{{::label.abbr}}</small></th></tr></thead><tbody><tr ng-repeat=\"row in rows track by $index\"><td ng-if=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td><td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\" ng-class=\"::dt.customClass\"><button type=\"button\" class=\"w-100 btn-dp btn-dpday btn-dpbody\" ng-class=\"{'dp-today': dt.current, 'dp-selected': dt.selected, 'dp-active': isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'dp-day-muted': dt.secondary, 'dp-day-today': dt.current}\">{{::dt.label}}</span></button></td></tr></tbody></table>"
  );


  $templateCache.put('wwwroot/app/template/datepicker/month.html',
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\" class=\"dp-table\"><thead><tr class=\"tr-dpnav\"><th><button type=\"button\" class=\"pull-left btn-dp\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-left\"></i></button></th><th><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" class=\"w-100 btn-dp\"><div class=\"dp-title\">{{title}}</div></button></th><th><button type=\"button\" class=\"pull-right btn-dp\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-right\"></i></button></th></tr></thead><tbody><tr ng-repeat=\"row in rows track by $index\"><td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\" ng-class=\"::dt.customClass\"><button type=\"button\" class=\"w-100 btn-dp btn-dpbody\" ng-class=\"{'dp-selected': dt.selected, 'dp-active': isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'dp-day-today': dt.current}\">{{::dt.label}}</span></button></td></tr></tbody></table>"
  );


  $templateCache.put('wwwroot/app/template/datepicker/popup.html',
    "<ul class=\"dropdown-menu\" ng-keydown=\"keydown($event)\"><li ng-transclude></li><li ng-if=\"showButtonBar\" class=\"dp-actions clearfix\"><button type=\"button\" class=\"btn btn-link\" ng-click=\"select('today')\">{{ getText('current') }}</button> <button type=\"button\" class=\"btn btn-link\" ng-click=\"close()\">{{ getText('close') }}</button></li></ul>"
  );


  $templateCache.put('wwwroot/app/template/datepicker/year.html',
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\" class=\"dp-table\"><thead><tr class=\"tr-dpnav\"><th><button type=\"button\" class=\"pull-left btn-dp\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-left\"></i></button></th><th colspan=\"3\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"w-100 btn-dp\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><div class=\"dp-title\">{{title}}</div></button></th><th><button type=\"button\" class=\"pull-right btn-dp\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-right\"></i></button></th></tr></thead><tbody><tr ng-repeat=\"row in rows track by $index\"><td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\"><button type=\"button\" class=\"w-100 btn-dp btn-dpbody\" ng-class=\"{'dp-selected': dt.selected, 'dp-active': isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'dp-day-today': dt.current}\">{{::dt.label}}</span></button></td></tr></tbody></table>"
  );


  $templateCache.put('wwwroot/app/template/pagination/pager.html',
    "<ul class=\"pager\"><li ng-class=\"{disabled: noPrevious(), previous: align}\"><a href ng-click=\"selectPage(page - 1, $event)\">Previous</a></li><li ng-class=\"{disabled: noNext(), next: align}\"><a href ng-click=\"selectPage(page + 1, $event)\">Next</a></li></ul>"
  );


  $templateCache.put('wwwroot/app/template/pagination/pagination.html',
    "<ul class=\"pagination\"><li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(1, $event)\"><i class=\"zmdi zmdi-more-horiz\"><i></i></i></a></li><li ng-if=\"directionLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(page - 1, $event)\"><i class=\"zmdi zmdi-chevron-left\"></i></a></li><li ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active}\"><a href ng-click=\"selectPage(page.number, $event)\">{{page.text}}</a></li><li ng-if=\"directionLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(page + 1, $event)\"><i class=\"zmdi zmdi-chevron-right\"></i></a></li><li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(totalPages, $event)\"><i class=\"zmdi zmdi-more-horiz\"><i></i></i></a></li></ul>"
  );


  $templateCache.put('wwwroot/app/template/tabs/tabset.html',
    "<div class=\"clearfix\"><ul class=\"tab-nav\" ng-class=\"{'tn-vertical': vertical, 'tn-justified': justified, 'tab-nav-right': right}\" ng-transclude></ul><div class=\"tab-content\"><div class=\"tab-pane\" ng-repeat=\"tab in tabs\" ng-class=\"{active: tab.active}\" tab-content-transclude=\"tab\"></div></div></div>"
  );

}]);
