/**
 * Created by Administrator on 2017/2/21 0021.
 */
(function (angular) {
    'use strict';
    var http = angular.module('moviecat.services.http',[]);
    http.service('HttpService',['$window','$document',function ($window,$document) {
        // console.log($document);
        this.jsonp = function (url,data,callback) {
            /*判断有无传进来的参数，考虑到循环，不建议使用*/
            // if(typeof data == "function"){
            //     callback = data;
            // }
            /*回调函数名*/
            var cbFun = 'my_json_cb_' + Math.random().toString().replace('.','');
            /*回调函数参数*/
            var queryString = url.indexOf('?') == -1 ? '?' : '';
            for(var key in data){
                queryString += key + '=' + data[key] +'&';
            }
            queryString += 'callback=' + cbFun;
            var scriptEle = $document[0].createElement('script');
            scriptEle.src = url + queryString;

            $window[cbFun] = function (data) {
                callback(data);
                $document[0].body.removeChild(scriptEle);
            };
            $document[0].body.appendChild(scriptEle);
        };
    }]);
})(angular);