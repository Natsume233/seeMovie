/**
 * Created by Administrator on 2017/2/22 0022.
 */
(function (angular) {
    'use strict';
    var module = angular.module('moviecat.movie_detail',['ngRoute','moviecat.services.http'])
        .config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
            $locationProvider.hashPrefix('');
            $routeProvider.when('/detail/:id',{
                templateUrl: 'movie_detail/view.html',
                controller: 'MovieDetailController'
            });
        }])
        .controller('MovieDetailController',['$scope','$route','$routeParams','HttpService','AppConfig',function ($scope,$route,$routeParams,HttpService,AppConfig) {
            $scope.movie = {};
            $scope.loading = true;
            var id = $routeParams.id;
            // console.log(id);
            var apiAddress = AppConfig.detailApiAddress + id;
            /*跨域*/
            HttpService.jsonp(apiAddress,{},function (data) {
                console.log(data);
                $scope.movie = data;
                $scope.loading = false;
                $scope.$apply();
            })
        }])
})(angular);