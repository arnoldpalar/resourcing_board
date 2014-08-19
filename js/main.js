$(function(){

    //init();

});

function init(){
    // Initialize Kinvey for use in app.
    var promise = Kinvey.init({
        appKey    : 'kid_VVFlkze-ME',
        appSecret : '00efd3e9d632496a9a0ccea6262b1853'
    });

    promise.then(function(activeUser){

        if (activeUser) {
            loadResourcingBoardLayout();
        }else{
            var username = prompt('username'); //admin
            var password = prompt('password'); //Admin@123
            var promise = Kinvey.User.login({
                username: username,
                password: password
            }, {
                success: function (response) {
                    alert("Welcome " + response.first_name);

                    loadResourcingBoardLayout();
                },
                error: function(error){
                    alert(error.description);
                }
            });
        }

    }, function(error){
        alert('Failed to initialize Datasource : ' + error.description);
    });

}

function loadResourcingBoardLayout(){
    var promise = Kinvey.DataStore.find('resources', null, {
        success: function(response) {
            alert('resources response');
            alert(JSON.stringify(response));

            Kinvey.User.logout({
                success: function() {
                    alert('Logged out');
                }
            });
        },
        error: function(error){
            alert(error.description);
        }
    }).then(function(request){
        //TODO
    }, function(error) {
        alert(error.description);
    });

}