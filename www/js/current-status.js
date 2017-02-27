function init()
{
    var check_appoint_id=localStorage.getItem("check_appoint_id");
    var user_id=localStorage.getItem("user_id");
    getchat();
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
             var str = $('.border-gray1').html();
             var res_data = JSON.stringify(data);
             var jsonData = JSON.parse(res_data);
             for (var i = 0; i < jsonData.response.length; i++) {
                 var counter = jsonData.response[i];
                 str += '<div class="border-gray">';
                 str += '<div class="col-lg-12 col-md-12 col-sm-12">';
                 str +='<div class="projects">';
                 str +='<ul><li style="margin-bottom:20px"><div  class="left-profile"><img src=http://mobile.csgroupdevhub.com/doctorapp/proofs/'+counter.profile_pic+' id="doc_img" alt="doctor"></div><div>'+counter.fname+" "+counter.lname+'</div><div>GP, Family Health</div></li>';
                 str+='<li><h2>Appointment Time Available</h2> <span>'+counter.proposed_time+' '+counter.proposed_day+'</span></li>';
                 str+='<li><h2>Billing Fees</h2> <span>'+counter.billing_type+'</span></li>';
                 str+='<li><h2>No. of Patient Seen</h2> <span>5</span></li>';
                 str+='<li><h2>Rating</h2> <span>4/5</span></li>';
                 str+='<li><h2>Message to patient</h2><span>'+counter.note_on_patient+'</span></li>';
                 str+= '</ul></div></div></div>';

                 window.localStorage.setItem("appointment_booked_id", counter.appointment_booked_id);
             }

             $('.border-gray1').html(str);
        }

    }).fail(function (reason) {
        console.log("Error: "+JSON.stringify(reason));

    });
    return false;


}
function send_message()
{
     var message=$('#Send').val();
     if (message == "") {
        alert("Message can't be fill empty.");
        return false;
     }
     else
     {
        var user_id=localStorage.getItem("user_id");
        var appointment_booked_id=localStorage.getItem("appointment_booked_id");
        $(".loading-page").show();
        $.ajax({
            url: BASE_URL,
            type: "POST",
            dataType: "json",
            data: {user_id: user_id,appointment_id:appointment_booked_id,message:message,action: 'chat'},
            crossDomain: true
        }).done(function (data) {
        $(".loading-page").hide();
            if(data.response.appointment_id<=0)
                alert(data.response.message);
            else
            {
                alert(data.response.message);
                document.getElementById("Send").value='';
            }
            return false;
        }).fail(function (reason) {
            console.log("Error: "+JSON.stringify(reason));
        });
     }
}

function getchat()
{
     var appointment_booked_id=localStorage.getItem("appointment_booked_id");
     $(".loading-page").show();
     $.ajax({
        url: BASE_URL,
        type: "POST",
        dataType: "json",
        data: {appointment_id:appointment_booked_id,action: 'return_chat'},
        crossDomain: true
     }).done(function (data) {
     $(".loading-page").hide();
//        if(data.response.appointment_id<=0)
//            alert(data.response.message);
//        else
//        {
//            alert(data.response.message);
//            document.getElementById("Send").value='';
//        }
         var str = $('.border-gray2').html();cd

         var res_data = JSON.stringify(data);
         var jsonData = JSON.parse(res_data);
         for (var i = 0; i < jsonData.response.length; i++) {
             var counter = jsonData.response[i];
             str +='<div class="gray-cnt"><ul class="gray-txt">';
             str +='<li class="blue-color">'+counter.fname+',</li></ul><ul class="gary-txt2">';
             str +='<li>'+counter.date_time+'</li></ul>';
             str +='<p>'+counter.message+'</p></div>';
         }

         $('.border-gray2').html(str);

        return false;
     }).fail(function (reason) {
        console.log("Error: "+JSON.stringify(reason));

     });
}

function dashboard()
{
    window.location="appointment-dashboard.html";
}