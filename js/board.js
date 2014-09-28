/**
 * Created by arnoldpalar.sg on 20/8/2014.
 */

app.controller('BoardController', function($scope, $rootScope) {

    $scope.init = function (){

        renderBoardDates(2014, 8);
    };

    $scope.init();


});

function loadResourcingBoardLayout(){
    var promise = Kinvey.DataStore.find('resources', null, {
        success: function(response) {
            console.log(JSON.stringify(response));

            Kinvey.User.logout({
                success: function() {
                    alert('Logged out');
                }
            });
        },
        error: function(error){
            console.log('Error in retrieving resources list' + error.description);
        }
    }).then(function(request){
        //TODO
    }, function(error) {
        console.log('Error in retrieving resources list' + error.description);
    });

}

function setupBoard(){
    jQuery('.month-nav > .nav-btn.prev').click(function(){

    });
}

function renderBoardDates(year, month){
    var dateRangeTR = jQuery('.date-board .date-range').empty();
    var daysTR = jQuery('.date-board .days').empty();

    var theDate = new Date(year, month, 1);

    var weekDayCount = 0;
    while(theDate.getMonth() === month){
        var dayInt = theDate.getDay();
        weekDayCount++;

        daysTR.append('<th>'+ getDayStr(dayInt) +'</th>');

        var weekStartDate;
        if(weekDayCount === 1){
            weekStartDate = new Date(theDate.getTime());
        }

        if(dayInt === 6){
            if (weekStartDate.getDate() != theDate.getDate()) {
                dateRangeTR.append('<th colspan="' + weekDayCount + '">' + weekStartDate.getDate() + ' - ' + theDate.getDate() + '</th>');
            }else{
                dateRangeTR.append('<th colspan="' + weekDayCount + '">' + weekStartDate.getDate() + '</th>');
            }
            weekDayCount = 0;
        }

        theDate.setDate(theDate.getDate() + 1);

        if(theDate.getMonth() > month){
            var endDate = new Date(year, month + 1, 0);
            if (weekStartDate.getDate() != endDate.getDate()) {
                dateRangeTR.append('<th colspan="' + weekDayCount + '">' + weekStartDate.getDate() + ' - ' + endDate.getDate() + '</th>');
            }else{
                dateRangeTR.append('<th colspan="' + weekDayCount + '">' + weekStartDate.getDate() + '</th>');
            }
        }
    }
}