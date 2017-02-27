function init() {
        get_patient_detail();
}

function get_patient_detail()
{
    var check_appoint_id=localStorage.getItem("check_appoint_id");
     $(".loading-page").show();
    $.ajax({
        url: BASE_URL,
        type: "GET",
        dataType: "json",
        data: {appointment_id: check_appoint_id,action:'return_edit_current_open_appointment'},
        crossDomain: true
    }).done(function (data) {
     $(".loading-page").hide();
        if(data.response.id<=0)
            alert(data.response.message);
        else
        {
             document.getElementById("fname").value = data.response.fname;
             document.getElementById("lname").value = data.response.lname;
             document.getElementById("phone_no").value = data.response.phone_no;
             document.getElementById("st").value = data.response.p_street_no+", "+data.response.p_street_name;
             document.getElementById("suburb").value = data.response.p_suburb;
             document.getElementById("pincode").value = data.response.p_pincode;
             document.getElementById("state").value = data.response.p_state;
             document.getElementById("quick_desc").innerHTML = data.response.quick_desc;
             document.getElementById("skills").innerHTML = data.response.skill_require;
             var loc_type=data.response.location_type;
             if(loc_type=="temporary")
             {
                 document.getElementById("temp_add").checked = true;
                 $("#main_add").hide();
                 $("#temp_div").show();

                 document.getElementById("st1").value = data.response.street_no;
                 document.getElementById("st_name").value = data.response.street_name;
                 document.getElementById("suburb1").value = data.response.suburb;
                 document.getElementById("state2").value = data.response.state;
                 document.getElementById("pincode1").value = data.response.pincode;


                 window.localStorage.setItem("stno", data.response.street_no);
                 window.localStorage.setItem("sub", data.response.suburb);
                 window.localStorage.setItem("pin", data.response.pincode);
                 window.localStorage.setItem("state", data.response.state);
             }
             else
             {
                 document.getElementById("temp_add").checked = false;
                 window.localStorage.setItem("stno", data.response.street_no);
                 window.localStorage.setItem("sub", data.response.suburb);
                 window.localStorage.setItem("pin", data.response.pincode);
                 window.localStorage.setItem("state", data.response.state);
             }



         }

    }).fail(function (reason) {
        console.log("Error: "+JSON.stringify(reason));

    });
}


function enable_postcode()
{
    var state=$('#state2').val();
    if(state!='Select State')
    {
        document.getElementById("pincode1").disabled = false;
        $('#pincode1').focus();
    }
    else
    {
         document.getElementById("pincode1").disabled = true;
         document.getElementById('pincode1').value='';
    }
}

function update_patient_appointment()
{
     var st1="";
     var st_name="";
     var suburb1="";
     var pincode1="";
     var state1="";
     var temp_add=document.getElementById('temp_add').checked;
     var quick_desc=document.getElementById('quick_desc').value;
     var skills=document.getElementById('skills').value;
     if(temp_add)
     {
         st1=$('#st1').val();
         st_name=$('#st_name').val();
         suburb1=$('#suburb1').val();
         pincode1=$('#pincode1').val();
         state1=$('#state2').val();
         var location_type='temporary';
        if (st1 == "") {
            alert("Please Enter Street No.");
            $('#st1').focus();
            return false;
        }
        else if (st_name == "") {
            alert("Please Enter Street Name.");
            $('#st_name').focus();
            return false;
        }else if (suburb1 == "Select Suburb") {
            alert("Please Select Suburb.");
            return false;
        }else if (state1 == "Select State") {
             alert("Please Select State.");
             return false;
        }
        else if (pincode1 == "") {
            alert("Please Enter Postcode.");
            $('#pincode1').focus();
            return false;
        }else if (isNaN(pincode1)) {
             alert("Postcode must be a number.");
             $('#pincode1').focus();
             return false;
        }else if (pincode1.length!=4) {
            alert("Please Enter 4 digit postcode.");
            $('#pincode1').focus();
            return false;
        }
     }
     else
      {
           st1=localStorage.getItem("stno");
           st_name=localStorage.getItem("stnm");
           suburb1=localStorage.getItem("sub");
           pincode1=localStorage.getItem("pin");
           state1=localStorage.getItem("state");
           var location_type='permanent';
      }
     if(quick_desc=='')
     {
           alert("Please Enter Quick Description.");
           $('#quick_desc').focus();
           return false;
     }
     var check_appoint_id=localStorage.getItem("check_appoint_id");
      $(".loading-page").show();
     $.ajax({
         url: 'http://35.162.172.171/doctorapp/api.php?action=update_current_open_appointment',
         type: "POST",
         dataType: "json",
         data: {appointment_id:check_appoint_id,location_type:location_type,street: st1,st_name: st_name,suburb: suburb1,pincode: pincode1,state: state1,quick_desc: quick_desc,
         skills: skills},
         crossDomain: true
     }).done(function (data) {
      $(".loading-page").hide();
         if(data.response.id<=0)
             alert(data.response.message);
         else
         {
                window.location="appointment_submission_updated.html";

          }

     }).fail(function (reason) {
         console.log("Error: "+JSON.stringify(reason));

     });
}

function show_temp_address(chk)
{
    if($('#temp_add').is(":checked"))
    {
       $("#temp_div").show();
       $("#main_add").hide();
    }
    else
    {
       $("#temp_div").hide();
       $("#main_add").show();
    }

}
function cancel()
{
window.location="patient_dashboard.html";
}
