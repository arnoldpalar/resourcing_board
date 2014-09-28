var app = angular.module('resourcingBoardApp', ['ngRoute']).run(function($rootScope){

    var promise = Kinvey.init({
        appKey    : 'kid_VVFlkze-ME',
        appSecret : '00efd3e9d632496a9a0ccea6262b1853'
    });

    promise.then(function(activeUser){

        if (activeUser) {

            $rootScope.activeUser = activeUser;

        }else{
            var username = prompt('username'); //admin
            var password = prompt('password'); //Admin@123

            var promise = Kinvey.User.login({
                username: username,
                password: password
            }, {
                success: function (response) {
                    alert("Welcome " + response.first_name);

                    $rootScope.activeUser = response;
                },
                error: function(error){
                    console.log('Error in logging in user' + error.description);
                }
            });
        }

    }, function(error){
        console.log('Error in initializing Datasource : ' + error.description);
    });

});

app.config(function($routeProvider){

    $routeProvider.when('/',
    {
        controller: 'HomeController',
        templateUrl: '/home.html'
    }).when('/board',
    {
        controller: 'BoardController',
        templateUrl: '/board/index.html'
    });

});

app.controller('HomeController', function($scope) {
    $scope.init = function(){

    };

    $scope.init();
});

function getDayStr(dayInt){
    switch(dayInt){
        case 0: return 'Sun'; break;
        case 1: return 'Mon'; break;
        case 2: return 'Tue'; break;
        case 3: return 'Wed'; break;
        case 4: return 'Thu'; break;
        case 5: return 'Fri'; break;
        case 6: return 'Sat'; break;
    }

    return '';
}
