(function (win) { 
    var baseUrl = "./";

    var config = {
        baseUrl: baseUrl, //依赖相对路径 
        waitSeconds: 60,
        map: {
            '*': {
                'css': 'plugin/require-css/css.min' // or whatever the path to require-css is
            }
        },
        paths: {
            'jquery': 'plugin/jquery/dist/jquery.min',
            'angular': 'plugin/angular/angular.min',
            'oc.lazyLoad.core':"plugin/oclazyload/dist/modules/ocLazyLoad.core",
            'oc.lazyLoad':"plugin/oclazyload/dist/modules/ocLazyLoad.loaders.core",
            'ui.router': 'plugin/angular-ui-router/release/angular-ui-router.min',
            'ui.bootstrap': 'plugin/angular-bootstrap/ui-bootstrap-tpls.min',
            'angularAnimate': 'plugin/angular-animate/angular-animate.min',
            'angularSanitize': 'plugin/angular-sanitize/angular-sanitize.min',
            'openLayers': 'plugin/OpenLayers/4/ol',
            'pOl3':"plugin/OpenLayers/p-ol3/p-ol3",
            'angularOpenlayersDirective': 'plugin/OpenLayers/dist/angular-openlayers-directive',
            "colorPicker":"plugin/color-picker/color-picker",
            'asyncLoader': 'plugin/ng1-lazy-load/ng1-lazy-load',

            'app': 'script/app',
            'app-config':"script/app-config",
            'appCtrl': 'script/controllers/appController',
        },
        shim: {
            'angular': {
                exports: 'angular'
            },
            'ui.router': {
                deps: [
                    'angular'
                ]
            },
            'ui.bootstrap': {
                deps: [
                    'angular'
                ]
            },
            'angularAnimate': {
                deps: ['angular']
            },
            'angularSanitize': {
                deps: ['angular']
            },
            'oc.lazyLoad.core': {
                deps: ['angular']
            },
            "oc.lazyLoad":{
                deps: [
                    'angular',
                    "oc.lazyLoad.core"
                ]
            },
            "pOl3":{
                deps:[
                    "css!plugin/OpenLayers/p-ol3/p-ol3"
                ]
            },
            'openLayers':{
                deps:[
                    "css!plugin/OpenLayers/4/ol",
                    "css!plugin/OpenLayers/dist/angular-openlayers-directive"
                ]
            },
            "colorPicker":{
                deps:[
                    'angular',
                    "css!plugin/color-picker/color-picker.min"
                ]
            }
        }
    };
    require.config(config);
    require(['jquery', 'angular', 'app','app-config', 'appCtrl'],
        function ($, angular) {
            angular.bootstrap(document, ['demo']); //动态方式启动angular 
        });
})(window);

