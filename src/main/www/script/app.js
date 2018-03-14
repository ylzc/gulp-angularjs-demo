define([
    "angular",
    "asyncLoader",
    "ui.router",
    "ui.bootstrap",
    "angularAnimate",
    "angularSanitize",
    "oc.lazyLoad"
],(angular, asyncLoader)=>{
    let app = angular.module("demo",[
        'ui.router',
        "ui.bootstrap",
        "ngAnimate",
        "ngSanitize",
        "oc.lazyLoad",
    ]);
    asyncLoader.configure(app);
    return app;
});