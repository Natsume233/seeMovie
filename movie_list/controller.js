/**
 * Created by Administrator on 2017/2/21 0021.
 */
(function (angular) {
    'use strict';
    /*即将上映模块*/
    angular.module('moviecat.movie_list',['ngRoute','moviecat.services.http'])
        .config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
            $locationProvider.hashPrefix('');
            $routeProvider.when('/:category/:page',{
                templateUrl: 'movie_list/view.html',
                controller: 'MovieListController'
            })
        }])
        .controller('MovieListController',['$scope','$route','$routeParams','HttpService','AppConfig',function ($scope,$route,$routeParams,HttpService,AppConfig) {
            console.log(AppConfig);
            /*标题*/
            $scope.title = 'Loading...';
            /*分页*/
            /*每一页的条数*/
            var count = AppConfig.pageSize;
            /*页码*/
            var page = parseInt($routeParams.page);
            /*每一页的开始*/
            var start = (page - 1) * count;
            /*数据绑定*/
            /*请求到的数据*/
            $scope.subjects = [];
            /*错误信息*/
            $scope.message = '';
            /*记录的条数*/
            $scope.totalCount = 0;
            /*总页数*/
            $scope.totalPages = 0;
            $scope.currentPage = page;
            /*未加载完时的加载动画*/
            $scope.loading = true;
            // 本地数据绑定
            // $http.get('in.json').then(function (res) {
            //     // console.log(res);
            //         $scope.subjects = res.data.subjects;
            // },function (err) {
            //     $scope.message = err.status + ' ' + err.statusText;
            // });
            HttpService.jsonp(AppConfig.listApiAddress + $routeParams.category,{start: start,count: count,q: $routeParams.q},function (data) {
                $scope.title = data.title;
                /*请求到的数据*/
                $scope.subjects = data.subjects;
                // console.log(data);
                $scope.totalCount = data.total;
                $scope.totalPages = Math.ceil($scope.totalCount/count);
                /*加载动画完毕*/
                $scope.loading = false;
                /*$apply:详见文档*/
                $scope.$apply();
            });

            /*暴露行为：更改页码*/
            $scope.goTo = function (page) {
                // console.log($route.current);
                if(page>=1 && page<=$scope.totalPages){
                    $route.updateParams({ page : page });
                }
            }
        }]);
})(angular);



