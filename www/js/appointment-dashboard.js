function init()
{

    var check_appoint_id=window.localStorage.setItem("check_appoint_id",-1);
    var user_id=localStorage.getItem("user_id");
    $.ajax({
        url: BASE_URL,
        type: "POST",
        dataType: "json",
        data: {pid: user_id, action: 'return_date_of_appointment'},
        crossDomain: true
    }).done(function (data) {
        if(data.response.request_id<=0)
            alert(data.response.message);
        else
        {
             var str = $('.border-gray1').html();
             var res_data = JSON.stringify(data);
             var jsonData = JSON.parse(res_data);
             str += '<select name="Appointment" onchange="get_request_id(this.value,this.options[this.selectedIndex].text)">';
             str +='<option value=-1>Select Appointment</option>'
             for (var i = 0; i < jsonData.response.length; i++) {
                 var counter = jsonData.response[i];
                 str += '<option value="'+counter.request_id+'">'+counter.final_date_timestamp+'</option>';
             }
             str +='</select>';
             $('.border-gray1').html(str);
         }

    }).fail(function (reason) {
        console.log("Error: "+JSON.stringify(reason));

    });
}

function edit_appointment()
{
    var check_appoint_id=localStorage.getItem("check_appoint_id");
    if(check_appoint_id==-1)
    {
        alert("Please select appointment first");
        return false;
    }
    else
    {
        window.location="edit-appointment.html";
    }
}

function view_doctor()
{
    var check_appoint_id=localStorage.getItem("check_appoint_id");
    if(check_appoint_id==-1)
    {
        alert("Please select appointment first");
        return false;
    }
    else
    {
             var user_id=localStorage.getItem("user_id");
             $(".loading-page").show();
             $.ajax({
                url: BASE_URL,
                type: "POST",
                dataType: "json",
                data: {user_id: user_id,appointment_id:check_appoint_id,action: 'return_doctor_appointments'},
                crossDomain: true
            }).done(function (data) {
                  $(".loading-page").hide();
                if(data.response.appointment_id<=0)
                    alert(data.response.message);
                else
                {
                     window.location="appointment-proposal.html";
                }

            }).fail(function (reason) {
                console.log("Error: "+JSON.stringify(reason));

            });

    }
}

function appointment_status()
{
    var check_appoint_id=localStorage.getItem("check_appoint_id");
    if(check_appoint_id==-1)
    {
        alert("Please select appointment first");
        return false;
    }
    else
    {
            var user_id=localStorage.getItem("user_id");
            $(".loading-page").show();
            $.ajax({
                url: BASE_URL,
                type: "POST",
                dataType: "json",
                data: {pid: user_id,appoint_id:check_appoint_id,action: 'current_status'},
                crossDomain: true
            }).done(function (data) {
            $(".loading-page").hide();
                if(data.response.appointment_id<=0)
                    alert(data.response.message);
                else
                {
                     window.location="current-status.html";
                }

            }).fail(function (reason) {
                console.log("Error: "+JSON.stringify(reason));

        });
    }
}

function cancel_appointment_status()
{
    var check_appoint_id=localStorage.getItem("check_appoint_id");
    if(check_appoint_id==-1)
    {
        alert("Please select appointment first");
        return false;
    }
    else
    {
        window.location="appointment-cancelLation.html";
    }
}

function get_request_id(id,appointment_date)
{
    if(id==-1)
    {
        alert("Please select appointment first");
        return false;
    }
    else
    {
        window.localStorage.setItem("check_appoint_id",id);
        window.localStorage.setItem("appointment_date",appointment_date);
    }
}

function home()
{
    window.location="patient_dashboard.html";
}