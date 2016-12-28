OnePiece
// =========================================================================
// Posts management
// =========================================================================
.controller('postCtrl', ['$sce', '$timeout', '$http', '$state', '$stateParams', 'FileUploader', 'Gag', function ($sce, $timeout, $http, $state, $stateParams, FileUploader, Gag) {
    var _self = this;
    var updateUrl = hostName + 'api/post/update';
    _self.Gag = new Gag();
    _self.Gag.userFilter = $stateParams.username;
    _self.Gag.filter = $stateParams.filter || "all";
    _self.CurrentPost = {};
    _self.trustAsResourceUrl = $sce.trustAsResourceUrl;

    _self.updatePost = function (updatePost) {
        $http({
            url: updateUrl,
            method: "POST",
            data: updatePost
        }).success(function (result) {
            swal(result, "success");
            updatePost.$edit = false;
        }).error(function (result, status) {
            swal(result.Message, result.ExceptionMessage, "error");
        });
    };

}])