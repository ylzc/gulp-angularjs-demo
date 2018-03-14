define([
    'app'
], (app) => {
    app.controller("appCtrl",($scope,$config,$timeout,$rootScope,$state)=>{
        $rootScope.state=$state;
        $rootScope.olMap={};
        $timeout(function(){
            angular.extend($rootScope.olMap,$config.olMapDefault);
        },0)
    })
});