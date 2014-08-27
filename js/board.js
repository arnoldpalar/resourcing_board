/**
 * Created by arnoldpalar.sg on 20/8/2014.
 */
$(function(){

    //init();

    renderBoardDates(2014, 7);

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