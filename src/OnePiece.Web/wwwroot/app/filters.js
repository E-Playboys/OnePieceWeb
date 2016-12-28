OnePiece
    .filter('moment', function () {
        return function (date) {
            moment.locale('vi');
            return moment(date).fromNow();
        };
    })
    .filter('trustAsResourceUrl', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }])
    .filter('stringRes', function () {
        return function (key) {
            var strings = {
                'back': 'Cũ hơn',
                'comment': 'bình luận',
                'forward': 'Mới hơn',
                'postOn': 'Đăng',
                'sameTagsGags': 'Cùng tags',
                'sameTagsGagsDescription': 'Những bài cùng tags với bài này',
                'sameUserGags': 'Đăng bởi',
                'sameUserGagsDescription': 'Những bài được đăng bởi',
                'titlePlaceHolder': 'Tiêu đề...'
            }
            return strings[key] || key;
        };
    })
    .filter('resize', function () {
        return function (url, w, h) {
            if (!url) {
                return url;
            }
            var resizeInfo = [];
            if (w) {
                resizeInfo.push('w_' + w);
            }
            if (h) {
                resizeInfo.push('h_' + h);
            }
            return url.replace('upload', 'upload/' + resizeInfo.join(','));
        };
    });