function init() {
     var appointment_date=localStorage.getItem("appointment_date");
     document.getElementById('date').value=appointment_date;

}

function cancel_appointment()
{
    var check_appoint_id=localStorage.getItem("check_appoint_id");
    $(".loading-page").show();
    $.ajax({
        url: BASE_URL,
        type: "POST",
        dataType: "json",
        data: {appointment_id: check_appoint_id,action: 'cancel_appointment'},
        crossDomain: true
    }).done(function (data) {
        $(".loading-page").hide();
        if(data.response.id<=0)
            alert(data.response.message);
        else
        {
            alert(data.response.message);
            window.location="appointment-dashboard.html";
        }

    }).fail(function (reason) {
        console.log("Error: "+JSON.stringify(reason));

    });
}
function appointment_dashboard()
{
    window.location="appointment-dashboard.html";
}