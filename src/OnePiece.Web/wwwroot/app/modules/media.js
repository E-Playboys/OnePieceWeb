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