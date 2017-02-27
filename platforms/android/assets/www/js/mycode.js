function init() {
      var user_id=localStorage.getItem("user_id");
      if(user_id)
      {
           window.location="patient_dashboard.html";
      }
}
function signup()
{
    window.location='patient-detail.html';
}
function gettoken()
{

    var dev_token=localStorage.getItem("dev_token");
    if(dev_token==null || dev_token=='')
    {
        gettoken();
    }
    return true;


}
function login()
{

     var un=$('#username').val();
     var up=$('#password').val();
     var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
     if (un == "") {
        alert("Please Enter Username.");
        return false;
     }
     else if (up == "") {
        alert("Please Enter Password.");
        return false;
     }
     else if (!reg.test(un)){
        alert("Incorrect Email-ID format");
        return false;
     }
     else
     {
         app.addToCal();
        gettoken();
        var dev_token=localStorage.getItem("dev_token");
        $(".loading-page").show();
        $.ajax({
            url: BASE_URL,
            type: "POST",
            dataType: "json",
            data: {email: un, password: up,dev_token:dev_token,action: 'login',type:'patient'},
            crossDomain: true
        }).done(function (data) {
        $(".loading-page").hide();
            if(data.response.id<=0)
                alert(data.response.message);
            else
            {
                window.localStorage.setItem("user_id", data.response.id);
                window.location="patient_dashboard.html";
             }

        }).fail(function (reason) {
            console.log("Error: "+JSON.stringify(reason));
        });
     }

}
//Patient redirected pages
function request_doctor_appoint()
{
    window.location="make-appointment.html";
}

function update_details()
{
    window.location="update-patient-detail.html";
}




function appointment_dashboad()
{
        var user_id=localStorage.getItem("user_id");
        $(".loading-page").show();
        $.ajax({
            url: BASE_URL,
            type: "POST",
            dataType: "json",
            data: {pid: user_id, action: 'return_date_of_appointment'},
            crossDomain: true
        }).done(function (data) {
        $(".loading-page").hide();
            if(data.response.request_id<=0)
                alert(data.response.message);
            else
            {
                window.location="appointment-dashboard.html";
            }

    }).fail(function (reason) {
        console.log("Error: "+JSON.stringify(reason));

    });

}

function closee()
{
    window.localStorage.removeItem("user_id");
    window.location="index.html";
}