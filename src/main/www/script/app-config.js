define([
    'app'
], (app) => {
    // 定义启动时的相关配置项
    app
        .constant("$config", {
            olMapDefault: {
                map: [
                    {
                        name: "satelliteMap_base",
                        source: {
                            type: 'XYZ',
                            url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}'
                        },
                        visible: true
                    },
                    {
                        name: "satelliteMap_symbol",
                        source: {
                            type: 'XYZ',
                            url: 'http://t1.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}'
                        },
                        visible: true
                    },
                    {
                        name: "imageMap_base",
                        source: {
                            type: 'XYZ',
                            url: 'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}'
                        },
                        "visible": false
                    },
                    {
                        name: "imageMap_symbol",
                        source: {
                            type: 'XYZ',
                            url: 'http://t1.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}'
                        },
                        "visible": false
                    }
                ],
                center: {
                    lat: 26.65,
                    lon: 106.63,
                    zoom: 11
                },
                view: {
                    rotation: 0,
                    maxZoom: 18,
                    minZoom: 6
                },
                defaults: {
                    interactions: {
                        mouseWheelZoom: false,
                        pinchRotate: false
                    }
                }
            },
        })
        .config(($stateProvider,$locationProvider,$urlRouterProvider,$httpProvider)=>{
            $locationProvider.hashPrefix("");

            $stateProvider
                .state("main",{
                    url:"/main",
                    templateUrl:"partials/main.html",
                    controllerUrl:"script/controllers/mainController.js"
                })
                .state("test",{
                    url:"/test",
                    templateUrl:"partials/test.html",
                    controllerUrl:"script/controllers/testController.js"
                })

            $urlRouterProvider
                .otherwise("/main")
        })
});
