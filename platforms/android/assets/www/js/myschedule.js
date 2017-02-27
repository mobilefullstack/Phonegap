function msg()
{
    $.ajax{(
        url: 'http://35.162.172.171/doctorapp/api.php?action=myschedule',
        type: "GET",
        dataType: "json",
        data: {email: un, password: up},
        crossDomain: true
     )}.done(function (data) {
        if(data.response.id<=0)
            alert(data.response.message);
        else
        {
            var type=data.response.type;
            if(type=="patient")
            {
                 window.location="patient_dashboard.html";
            }
            else
            {
                window.location="doctor_dashboard.html";
            }
         }

    }).fail(function (reason) {
        console.log("Error: "+JSON.stringify(reason));

    });
}
