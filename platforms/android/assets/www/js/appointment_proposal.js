function init() {
     var check_appoint_id=localStorage.getItem("check_appoint_id");
     window.localStorage.removeItem("doc_id");
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
                 var str = $('.border-gray1').html();
                 var res_data = JSON.stringify(data);
                 var jsonData = JSON.parse(res_data);
                 for (var i = 0; i < jsonData.response.length; i++) {
                     var counter = jsonData.response[i];
                     str += '<div class="border-gray" id="'+counter.appointment_id+'" onclick=appointmentid('+counter.appointment_id+','+counter.doctor_id+')>';
                     str += '<div class="col-lg-12 col-md-12 col-sm-12">';
                     str +='<div class="projects">';
                     str +='<ul><li style="margin-bottom:20px"><div  class="left-profile"><img src=http://mobile.csgroupdevhub.com/doctorapp/proofs/'+counter.profile_pic+' id="doc_img" alt="doctor"></div><div>'+counter.fname+" "+counter.lname+'</div><div>GP, Family Health</div></li>';
                     str+='<li><h2>Appointment Time Available</h2> <span>'+counter.proposed_time+' '+counter.proposed_day+'</span></li>';
                     str+='<li><h2>Billing Fees</h2> <span>'+counter.billing_type+'</span></li>';
                     str+='<li><h2>No. of Patient Seen</h2> <span>5</span></li>';
                     str+='<li><h2>Rating</h2> <span>4/5</span></li>';
                     str+='<li><h2>Notes from Doctor</h2><span>'+counter.note_on_patient+'</span></li>';
                     str+= '</ul></div></div></div>';
                 }

                 $('.border-gray1').html(str);
            }

        }).fail(function (reason) {
            console.log("Error: "+JSON.stringify(reason));

        });

}
function appointmentid(id,doc_id)
{
   //document.getElementById(id).style.backgroundColor='#000000';
   $('.border-gray1').find('div').each(function(){
       var innerDivId = $(this).attr('id');

        if(!isNaN(innerDivId))
        {
           if(innerDivId==id)
           {
                 document.getElementById(id).style.backgroundColor='#cecece';
                 window.localStorage.setItem("doc_id", doc_id);
           }
           else
           {
                document.getElementById(innerDivId).style.backgroundColor='#ffffff';
           }
        }

   });

}

function submit_proposal()
{
    var check_appoint_id=localStorage.getItem("check_appoint_id");
    var doc_id=localStorage.getItem("doc_id");
    var pid=localStorage.getItem("user_id");
    if(check_appoint_id===null)
    {
        alert("Please select detail first.");
        return false;
    }
    else
    {
         $(".loading-page").show();

        $.ajax({
            url: BASE_URL,
            type: "POST",
            dataType: "json",
            data: {appointment_id: check_appoint_id,doctor_id:doc_id,pid:pid,action: 'approve_doctor_by_patient'},
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
}
function appointment_dashborad()
{
    window.location="appointment-dashboard.html";
}