图片放大查看
=========
简介
-----------
点击小图可放大显示，类似新浪微博图片查看

Example
-----------
页面中预先渲染小图list，预留大图放置的div容器
```html
<div class="container">
    <div class="brief">
        <ul class="brief-list">
            <li class="it">
                <a href="javascript:;" class="it-img" data-ind="0">
                    <img src="../src/images/test1.jpg" height="100%" />
                </a>
            </li>
            <li class="it">
                <a href="javascript:;" class="it-img" data-ind="1">
                    <img src="../src/images/test2.jpg" height="100%" />
                </a>
            </li>
            <li class="it">
                <a href="javascript:;" class="it-img" data-ind="2">
                    <img src="../src/images/test3.jpg" height="100%" />
                </a>
            </li>
            <li class="it">
                <a href="javascript:;" class="it-img" data-ind="3">
                    <img src="../src/images/test4.jpg" height="100%" />
                </a>
            </li>
            <li class="it">
                <a href="javascript:;" class="it-img" data-ind="4">
                    <img src="../src/images/test5.jpg" height="100%" />
                </a>
            </li>
            <li class="it">
                <a href="javascript:;" class="it-img" data-ind="5">
                    <img src="../src/images/test6.jpg" height="100%" />
                </a>
            </li>
            <li class="it">
                <a href="javascript:;" class="it-img" data-ind="6">
                    <img src="../src/images/test7.jpg" height="100%" />
                </a>
            </li>
        </ul>
    </div>
    <div class="detail"></div>
</div>
```
引入样式文件，js文件
```
<link rel="stylesheet" href="../src/css/index.css">
<script type="text/javascript" src="../src/js/preOnloadImgSize.js"></script>
<script type="text/javascript" src="../src/js/resetImgSize.js"></script>
<script type="text/javascript" src="../src/js/rotate.js"></script>
<script type="text/javascript" src="../src/js/photofigure.js"></script>
```
注：内置了UMD加载方式，若使用模块加载只需引入photofigure.js文件

实现图片查看
```
<script type="text/javascript">
(function () {
    $('a.it-img').on('click', function () {
        var _wrap = $(this).parents('div.container'), ind = $(this).attr('data-ind') | 0;
        var arr = [];
        _wrap.find('a.it-img').each(function () {
            var url = $(this).find('img').attr('src');
            arr.push(url);
        });
        _wrap.find('div.brief').hide();
        photoFigure({
            mainwrap : _wrap.find('div.detail'),
            imgData : arr,
            briefwrap : _wrap.find('div.brief'),
            index : ind
        });
    });
})();
</script>
```

参数说明
----------
<pre><code>
mainwrap: 放置大图显示容器
imgData: 图片路径数组
briefwrap: 小图显示区域外层容器（图片放大后会自动隐藏次区域）,
index: 当前要放大的小图索引值
callback: 回调方法（可自行在需要区域添加代码）
</code></pre>
