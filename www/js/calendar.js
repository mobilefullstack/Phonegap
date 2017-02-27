var calendarPlugin = {
    createEvent: function( successCallback, errorCallback) {
        cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'CalendarPlugin', // mapped to our native Java class called "CalendarPlugin"
            'addCalendarEntry', // with this action name
            [{                  // and this array of custom arguments to create our entry

            }]
        ); 
     }
}