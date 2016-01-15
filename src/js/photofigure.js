/**
 * @author H.Yvonne
 * @create 2016.1.12
 */
(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('./resetImgSize'),require('./rotate'));
    } else if (typeof define === 'function' && define.amd) {
        define(['./resetImgSize','./rotate'], function (resetimg,rotate) {
            return (root.photoFigure = factory(resetimg,rotate));
        });
    } else {
        root.photoFigure = factory(root.resetimg,root.rotate);
    }
})(this, function (resetimg,rotate) {
    var plugin = function (config) {
        var o;
        for(o in config) {
            this[o] = config[o];
        };
        this.init();
    };

    $.extend(plugin.prototype, {
        mainwrap : '',
        briefwrap : '',
        imgData : '',
        index : 0,
        callback : ''
    });

    $.extend(plugin.prototype, {
        init : function () {
            this.$wrap = '';
            this.renderDom();
        }
    });

    /*render dom*/
    $.extend(plugin.prototype, {
        renderDom : function () {
            var _self = this;
            var html = '<div class="photo-figure-wrap">\
                            <div class="photo-figure-showwrap">\
                                <span class="pf-img-wrap"></span>\
                                <div class="pf-handle-wrap">\
                                    <a href="javascript:;" class="photo-figure-icons pf-handle-close"></a>\
                                    <a href="javascript:;" class="photo-figure-icons pf-handle-enlarge"></a>\
                                    <a href="javascript:;" class="photo-figure-icons pf-handle-lrotate"></a>\
                                    <a href="javascript:;" class="photo-figure-icons pf-handle-rrotate"></a>\
                                </div>\
                                <div>\
                                    <a href="javascript:;" class="photo-figure-icons pf-switch-btn pf-switch-lbtn" nt="pre-btn"></a>\
                                    <a href="javascript:;" class="photo-figure-icons pf-switch-btn pf-switch-rbtn" nt="next-btn"></a>\
                                </div>\
                            </div>\
                            <div class="photo-figure-gallwrap">\
                                <a href="javascript:;" class="pf-gall-btn pf-gall-lbtn" nt="pre-btn">\
                                    <i class="photo-figure-icons"></i>\
                                </a>\
                                <div class="pf-gall-wrap">\
                                    <ul class="pf-gall-list"></ul>\
                                </div>\
                                <a href="javascript:;" class="pf-gall-btn pf-gall-rbtn" nt="next-btn">\
                                    <i class="photo-figure-icons"></i>\
                                </a>\
                            </div>\
                        </div>';
            _self.$wrap = $(html);
            _self._show_gallary();
            // _self._show_bigImg();
            _self.setFocus();
            _self.mainEvents();
        },
        _show_gallary : function () {
            var _self = this, len = _self.imgData.length;
            for(var i = 0; i < len; i++) {
                var minimg = new minImg(_self.imgData[i],i);
                var el = minimg.render();
                _self.$wrap.find('ul.pf-gall-list').append(el);
            }
            _self.mainwrap.html(_self.$wrap).show();
        },
        _show_bigImg : function () {
            var _self = this;
            _self.mainImg = new mainImg(_self);
        }
    });

    /*handle events*/
    $.extend(plugin.prototype, {
        mainEvents : function () {
            var _self = this;
            this.mainwrap.on('click', 'a.pf-handle-close', function () {
                _self.mainwrap.html('').hide();
                _self.briefwrap.show();
            }).on('click', 'a.pf-handle-enlarge', function () {
                window.open(_self.currUrl);
            }).on('click', 'a.pf-handle-lrotate', function () {
                _self.mainImg.rotate.anticlockwise();
            }).on('click', 'a.pf-handle-rrotate', function () {
                _self.mainImg.rotate.clockwise();
            }).on('mouseover', 'div.photo-figure-showwrap', function () {
                $(this).find('a.pf-switch-btn').show();
            }).on('mouseout', 'div.photo-figure-showwrap', function () {
                $(this).find('a.pf-switch-btn').hide();
            }).on('click', 'li.item', function () {
                var ind = $(this).attr('data-id')|0;
                _self.index = ind;
                _self.setFocus();
            }).on('click', 'a[nt="pre-btn"]', function () {
                _self.preImg();
            }).on('click', 'a[nt="next-btn"]', function () {
                _self.nextImg();
            });
        },
        setFocus : function () {
            var _self = this;
            _self.mainwrap.find('li.item').removeClass('item-active').eq(_self.index).addClass('item-active');
            _self.currUrl = _self.imgData[_self.index];
            _self._slideImgView();
            _self._show_bigImg();
        },
        preImg : function () {
            var _self = this, len = _self.imgData.length;
            if (_self.index == 0) {
                _self.index = len - 1;
            } else {
                _self.index -= 1;
            }
            _self.setFocus();
        },
        nextImg : function () {
           var _self = this, len = _self.imgData.length;
            if (_self.index == len - 1) {
                _self.index = 0;
            } else {
                _self.index += 1;
            }
             _self.setFocus();
        },
        _slideImgView: function() {
            var _self = this, viewWid = 104;
            var pagesize = Math.floor(_self.mainwrap.find('div.pf-gall-wrap').width() / viewWid);
            var len = _self.imgData.length;
            if (len < pagesize) return;
            var page = Math.floor(_self.index / pagesize);
            var s = page * pagesize,
                e = (page + 1) * pagesize;
            if (e > len) {
                e = len;
                s = s - e + len;
            }
            _self.mainwrap.find('ul.pf-gall-list').stop(true,false).animate({
                'margin-left': -(s * viewWid)
            }, 200);
        }
    });
    
    /*render big img*/
    var mainImg = function (plugin) {
        this.boxwh = {};
        this.plugin = plugin;
        this.imgmain = plugin.mainwrap.find('div.photo-figure-showwrap');
        this.init();
    }
    $.extend(mainImg.prototype, {
        init : function () {
            this.getBigSize();
            this.renderBigImg();
        },
        getBigSize : function () {
            var _self = this;
            this.boxwh = {
                w : _self.plugin.mainwrap.find('div.photo-figure-showwrap').width(),
                h : _self.plugin.mainwrap.find('div.photo-figure-showwrap').height()
            }
        },
        renderBigImg : function() {
            var _self = this,
                imgUrl = this.plugin.currUrl;
            resetimg({
                imageUrl: imgUrl,
                style: 'max',
                width: _self.boxwh.w,
                height: _self.boxwh.h
            }, function(wh, url) {
                _self.setImgAttr(wh, url);
            });
        },
        setImgAttr : function(wh, url) {
            var img = $('<img src="' + url + '"  width="' + wh[0] + '" height="' + wh[1] + '"/>');
            // this.plugin.mainwrap.find('.pf-img-wrap').html(img);
            this.setImgPos(wh, img);
        },
        setImgPos : function(wh, img) {
            var _self = this;
            if (wh[1] < _self.boxwh.h) {
                img.css('margin-top', (_self.boxwh.h - wh[1]) / 2);
            }
            _self.rotate = rotate({
                imgObj: img,
                width: wh[0],
                height: wh[1],
                imgwarp: _self.imgmain,
                wwid: _self.boxwh.w,
                whei: _self.boxwh.h
            });
        }
    });

    /*render small img*/
    var minImg = function (data,i) {
        this.data = data;
        this.ind = i;
        this.$el = ''; 
    };

    $.extend(minImg.prototype, {
        render : function () {
            var _self = this;
            var html = '<li class="item" data-id="'+_self.ind+'">'+
                            '<div class="pf-gall-item">'+
                                '<a href="javascript:;" class="pf-gall-img"></a>'+
                                '<span class="pf-gall-line"></span>'+
                            '</div>'+
                        '</li>';
            this.$el = $(html);
            this.events();
            return this.$el;
        },
        events : function () {
            this.renderImg();
        },
        renderImg: function() {
            var __ = this;
            var imgUrl = this.data;
            resetimg({
                imageUrl: imgUrl,
                style: 'min',
                width: 100,
                height: 100
            }, function(wh, url) {
                __.setImgAttr(wh, url);
            });
        },
        setImgAttr: function(wh, url) {
            var img = $('<img src="' + url + '"  width="' + wh[0] + '" height="' + wh[1] + '" class="bigPhotoImg" />');

            if (wh[0] > wh[1]) {
                img.css('margin-left', -(wh[0] - 100) / 2);
            } else {
                img.css('margin-top', -(wh[1] - 100) / 2);
            }
            img.css('opacity', 0).animate({
                'opacity': 1
            }, 200);
            this.$el.find('.pf-gall-img').html(img);
        }
    });


    return function (config) {
        return new plugin(config);
    }
});