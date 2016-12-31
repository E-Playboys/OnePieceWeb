function PostFactory($http, $sce, Comment) {
    var Gag = function () {
        this.items = [];
        this.busy = false;
        this.skip = 0;
        this.take = 5;
        this.filter = '';
        this.slug = '';
        this.userFilter = '';
        this.item = null;
    };

    Gag.prototype.nextPage = function () {
        var _self = this;
        if (_self.busy) return;
        _self.busy = true;

        var url = hostName + 'api/post/getgags';
        $http.get(url, {
            params: {
                skip: _self.skip,
                take: _self.take,
                slug: _self.slug,
                filter: _self.filter,
                userFilter: _self.userFilter,
            }
        }).success(function (data) {
            var items = data;
            if (items.length == 0) {
                return;
            }
            items.forEach(function (item) {
                item.PublishedDate = new Date(item.PublishedDate);
                _self.items.push(item);
                item.CommentList = new Comment();
                item.CommentList.actionFor = 'Post';
                item.CommentList.actionForId = item.Id;
                item.CommentList.skip = 0;
                item.CommentList.take = 2;
                item.CommentList.nextPage();
            });
            _self.busy = false;
            _self.skip += _self.take;
        });
    };

    Gag.prototype.getAllGags = function () {
        var _self = this;
        if (_self.busy) return;
        _self.busy = true;

        var url = hostName + 'api/post/getallgags';
        $http.get(url, {
            params: {
                skip: _self.skip,
                take: _self.take,
            }
        }).success(function (data) {
            var items = data;
            if (items.length == 0) {
                return;
            }
            items.forEach(function (item) {
                item.PublishedDate = new Date(item.PublishedDate);
                _self.items.push(item);
                item.CommentList = new Comment();
                item.CommentList.actionFor = 'Post';
                item.CommentList.actionForId = item.Id;
                item.CommentList.skip = 0;
                item.CommentList.take = 2;
                item.CommentList.nextPage();
            });
            _self.busy = false;
            _self.skip += _self.take;
        });
    };

    Gag.prototype.getGag = function (callback) {
        var _self = this;
        if (_self.busy) return;
        _self.busy = true;

        var url = hostName + 'api/post/getgag';
        $http.get(url, {
            params: {
                slug: _self.slug,
            }
        }).success(function (data) {
            var item = data;
            item.PublishedDate = new Date(item.PublishedDate);
            _self.item = item;
            item.CommentList = new Comment();
            item.CommentList.actionFor = 'Post';
            item.CommentList.actionForId = item.Id;
            item.CommentList.skip = 0;
            item.CommentList.take = 5;
            item.CommentList.nextPage();
            _self.busy = false;
            callback(item);
        });
    }

    return Gag;
}