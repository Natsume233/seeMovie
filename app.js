/**
 * Created by Administrator on 2017/2/19 0019.
 */
(function (angular) {
    'use strict';
    angular.module('moviecat',['ngRoute','moviecat.movie_detail','moviecat.movie_list','moviecat.directives.auto_focus'])
        /*为公共模块定义常量*/
        .constant('AppConfig',{
            pageSize:10,
            listApiAddress: 'https://api.douban.com/v2/movie/',
            detailApiAddress: 'https://api.douban.com/v2/movie/subject/'
        })
        .config(['$routeProvider',function ($routeProvider) {
            $routeProvider.otherwise({redirectTo:'/in_theaters/1'});
        }])
        .controller('SearchController',['$scope','$route','AppConfig',function ($scope,$route,AppConfig) {
            console.log(AppConfig);
            $scope.input = '';
            $scope.search = function () {
                // console.log($scope.input);
                $route.updateParams({category:'search',q:$scope.input});
            }
        }]);
})(angular);