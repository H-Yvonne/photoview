/**
 * reset img size
 * @author H.Yvonne
 * @create 2015.11.6
 */
(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('./preOnloadImgSize'));
    } else if (typeof define === 'function' && define.amd) {
        define(['./preOnloadImgSize'], function (preload) {
            return (root.resetimg = factory(preload));
        });
    } else {
        root.resetimg = factory(root.preload);
    }
})(this, function (preload) {
    var loadimgs=function(param,fn){
        todo(param,fn);
    };
    var todo=function(p,cb){
        preload(p.imageUrl,function(){
            var newWH;
            if(p.style=='max'){
                newWH=setWH(p,this);
            }else if(p.style=='min'){
                newWH=setMinWH(p,this);
            }
            cb&&cb(newWH,p.imageUrl);
        });
    },
    setWH=function(p,img){
        var iw=img.width,ih=img.height;
        var nw,nh;
        if(iw<=p.width && ih <= p.height){
            return [iw,ih]; 
        }
        var ratio=iw/ih;
        if(iw>=ih){
            if(iw>=p.width){
                nw=p.width;
                nh=nw/ratio;
            }else if(ih>=p.height){
                nh=p.height;
                nw=ratio*nh;
            }
        }else{
            if(ih>=p.height){
                nh=p.height;
                nw=ratio*nh;
            }else if(iw>=p.width){
                nw=p.width;
                nh=nw/ratio
            }
        }
        return [nw,nh];
    },
    setMinWH=function(p,img){
        var iw=img.width,ih=img.height;
        var nw,nh;
        var ratio=p.width/p.height;
        var lratio=iw/ih;
        
        if(ratio>lratio){
            nw=p.width;
            nh=nw/lratio;
        }else{
            nh=p.height;
            nw=lratio*nh
        }
        return [nw,nh];
    };
    
    return loadimgs;
})