/**
 * Created by Administrator on 2017/2/22 0022.
 */
(function (angular) {
    /*自定义指令*/
    angular.module('moviecat.directives.auto_focus',[])
        .directive('autoFocus',['$location',function ($location) {
            /*此种方法在页面最初加载时，不会autofocus第一个元素*/
            // var path = $location.path();
            return {
                restrict: 'A',
                /*ng中所有的dom操作都集中在link中*/
                link: function ($scope,iElem,iAttrs,controller) {
                    /*页面最初加载autofocus第一个元素*/
                    $scope.$location = $location;
                    $scope.$watch('$location.path()',function (now) {
                        /*当path发生变化时执行，now是变化过后的值*/
                        /*正则匹配in_theaters等字符串，autoFous*/
                        var aLink = iElem.children().attr('href');
                        var type = aLink.replace(/#(\/.+?)\/\d+/,'$1');
                        if(now.startsWith(type)) {
                            iElem.parent().children().removeClass('active');
                            iElem.addClass('active');
                        }
                        console.log(iElem);
                    });
                    /*没必要*/
                    /*iElem.on('click',function () {
                        // window.iele = iElem;//在window中暴露，开发小经验
                        iElem.parent().children().removeClass('active');
                        iElem.addClass('active');
                    })*/
                }
            }
        }])
})(angular);