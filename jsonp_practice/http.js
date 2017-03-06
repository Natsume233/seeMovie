/**
 * Created by Administrator on 2017/2/21 0021.
 */
(function (window,document) {
    'use strict';
    /*var jsonp = function (url,data,callback) {
        var fnSuffix = Math.random().toString().replace('.','');
        var cbName = 'my_json_cb_' + fnSuffix;
        window[cbName] = callback;
        var queryString = url.indexOf('?') == -1?'?':'&';
        for(var key in data) {
            queryString += key + '=' + data[key] +'&';
        }
        queryString += 'callback=' + cbName;
        var scriptEle = document.createElement('script');
        scriptEle.src = url + queryString;
        document.body.appendChild(scriptEle);
    };
    window.jsonp = jsonp;*/

    /*url data callback*/
    var jsonp = function (url,data,callback) {
        /*回调函数名*/
        var cbFun = 'my_json_cb_' + Math.random().toString().replace('.','');
        window[cbFun] = callback;
        /*回调函数参数*/
        var queryString = url.indexOf('?') == -1 ? '?' : '';
        for(var key in data){
            queryString += key + '=' + data[key] +'&';
        }
        queryString += 'callback=' + cbFun;
        var scriptEle = document.createElement('script');
        scriptEle.src = url + queryString;
        document.body.appendChild(scriptEle);
    };
    window.$jsonp = jsonp;
})(window,document);