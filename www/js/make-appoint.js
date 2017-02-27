function init() {
        getDateTime();
        get_patient_detail();
        fromdate();

}

function getDateTime()
{
    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    //first date
    var myDate = new Date();
    var i;
    for(i=1;i<=7;i++)
    {
        var d=myDate.setDate(myDate.getDate() + 1);
        var d = new Date(d);
        var day_var="day"+i;
        var date_var="nextdate"+i;
        document.getElementById(day_var).innerHTML=weekday[d.getDay()];
        var checkmonth=d.getMonth()+1;
        if(checkmonth<10)
            var checkmonth="0"+checkmonth;

        var checkdate=d.getDate();
        if(checkdate<10)
            var checkdate="0"+checkdate;
        document.getElementById(date_var).innerHTML =checkdate+ '/' + checkmonth + '/' + d.getFullYear();
    }
}

function get_patient_detail()
{
    var user_id=localStorage.getItem("user_id");
    $(".loading-page").show();
    $.ajax({
        url: 'http://35.162.172.171/doctorapp/api.php?action=return_doctor_profile',
        type: "GET",
        dataType: "json",
        data: {id: user_id},
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
             document.getElementById("st").value = data.response.street_no+", "+data.response.street_name;
             document.getElementById("suburb").value = data.response.suburb;
             document.getElementById("pincode").value = data.response.pincode;
             document.getElementById("state").value = data.response.state;

             window.localStorage.setItem("stno", data.response.street_no);
             window.localStorage.setItem("stnm", data.response.street_name);
             window.localStorage.setItem("sub", data.response.suburb);
             window.localStorage.setItem("pin", data.response.pincode);
             window.localStorage.setItem("state", data.response.state);

         }

    }).fail(function (reason) {
        console.log("Error: "+JSON.stringify(reason));

    });
}

function valueChanged(chk)
{
    if($('#chk1').is(":checked"))
    {
       $(".main-other-part").show();
       fromdate();
       var idd='h1';
       check(idd);
    }
    else
    {
       $(".main-other-part").hide();
      // $('input[name=chkdate]').attr('checked',false);
       fromdate();
    }

}

function check(data)
{
    if(data=='h1')
    {
        document.getElementById("h1").checked = true;
        document.getElementById("hrs_select1").disabled=false;
        document.getElementById("min_select1").disabled=false;
        document.getElementById("pm-time1").disabled=false;
        document.getElementById("hrs_select2").disabled=false;
        document.getElementById("min_select2").disabled=false;
        document.getElementById("pm-time2").disabled=false;

    }else if(data=='h2')
    {
        fromdate();
         document.getElementById("hrs_select3").disabled=false;
         document.getElementById("min_select3").disabled=false;
         document.getElementById("pm-time3").disabled=false;
         document.getElementById("hrs_select4").disabled=false;
         document.getElementById("min_select4").disabled=false;
         document.getElementById("pm-time4").disabled=false;

    }else if(data=='h3')
    {
        fromdate();
         document.getElementById("hrs_select5").disabled=false;
         document.getElementById("min_select5").disabled=false;
         document.getElementById("pm-time5").disabled=false;
         document.getElementById("hrs_select6").disabled=false;
         document.getElementById("min_select6").disabled=false;
         document.getElementById("pm-time6").disabled=false;
    }else if(data=='h4')
    {
        fromdate();
         document.getElementById("hrs_select7").disabled=false;
         document.getElementById("min_select7").disabled=false;
         document.getElementById("pm-time7").disabled=false;
         document.getElementById("hrs_select8").disabled=false;
         document.getElementById("min_select8").disabled=false;
         document.getElementById("pm-time8").disabled=false;
    }else if(data=='h5')
    {
        fromdate();
         document.getElementById("hrs_select9").disabled=false;
         document.getElementById("min_select9").disabled=false;
         document.getElementById("pm-time9").disabled=false;
         document.getElementById("hrs_select10").disabled=false;
         document.getElementById("min_select10").disabled=false;
         document.getElementById("pm-time10").disabled=false;
    }else if(data=='h6')
    {
        fromdate();
         document.getElementById("hrs_select11").disabled=false;
         document.getElementById("min_select11").disabled=false;
         document.getElementById("pm-time11").disabled=false;
         document.getElementById("hrs_select12").disabled=false;
         document.getElementById("min_select12").disabled=false;
         document.getElementById("pm-time12").disabled=false;
    }else if(data=='h7')
    {
        fromdate();
         document.getElementById("hrs_select13").disabled=false;
         document.getElementById("min_select13").disabled=false;
         document.getElementById("pm-time13").disabled=false;
         document.getElementById("hrs_select14").disabled=false;
         document.getElementById("min_select14").disabled=false;
         document.getElementById("pm-time14").disabled=false;
    }
}

function fromdate()
{
    var hrs1=[];
    var mins1=[];
    var timearr = new Array();
    timearr[1] = "01";
    timearr[2] = "02";
    timearr[3] = "03";
    timearr[4] = "04";
    timearr[5] = "05";
    timearr[6] = "06";
    timearr[7] = "07";
    timearr[8] = "08";
    timearr[9] = "09";
    timearr[10] = "10";
    timearr[11] = "11";
    timearr[12] = "12";

    var minarr = new Array();
    minarr[1] = "00";
    minarr[2] = "15";
    minarr[3] = "30";
    minarr[4] = "45";
    first_drop();
    function first_drop()
    {
        var i=0;
        var j=0;
        //get year
        for(k=1;k<=14;k++)
        {
            var hrs='<select id="hrs_select'+k+'" disabled="disabled">';
            hrs=hrs+'<option>HH</option>';
            for(i=1;i<=12;i++)
            {
                hrs=hrs+'<option>'+timearr[i]+'</option>'
                hrs1[i]=i;
            }
            hrs=hrs+"</select>";
            var mins='<select id="min_select'+k+'" disabled="disabled">';
            mins=mins+'<option>MM</option>';
            for(j=1;j<=4;j++)
            {
                mins=mins+'<option>'+minarr[j]+'</option>'
                mins1[j]=j;
            }
            mins=mins+"</select>";
            var pm='<select class="pm-time" id="pm-time'+k+'" disabled="disabled"><option>AM</option><option>PM</option></select>';
            var fianlmins=hrs+"    "+mins+"    "+pm;
            var hors="hours"+k;
            document.getElementById(hors).innerHTML=fianlmins;
        }

     }

}

function enable_postcode()
{
    var state=$('#state1').val();
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

function save_patient_appointment()
{
     var st1="";
     var st_name="";
     var suburb1="";
     var pincode1="";
     var state1="";
     var todate="";
     var fromdate1="";
     var final_date="";
     var temp_add=document.getElementById('temp_add').checked;
     var chk2=  document.getElementById('chk2').checked;
     var chk1=  document.getElementById('chk1').checked;
     var h1=  document.getElementById('h1').checked;
     var h2=  document.getElementById('h2').checked;
     var h3=  document.getElementById('h3').checked;
     var h4=  document.getElementById('h4').checked;
     var h5=  document.getElementById('h5').checked;
     var h6=  document.getElementById('h6').checked;
     var h7=  document.getElementById('h7').checked;
     var quick_desc=document.getElementById('quick_desc').value;
     var skills=document.getElementById('skills').value;
     if(temp_add)
     {
         st1=$('#st1').val();
         st_name=$('#st_name').val();
         suburb1=$('#suburb1').val();
         pincode1=$('#pincode1').val();
         state1=$('#state1').val();
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
            $('#suburb1').focus();
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
     }else if(chk2)
     {
            var final_date = 'ASAP';
            var final_date_timestamp=Math.floor((new Date()).getTime() / 1000);
     }
     else if(chk1)
     {
            if(h1)
            {
                var codes = newCodes(1);
            }else if(h2)
            {
                var codes = newCodes(3);
            }else if(h3)
            {
                var codes = newCodes(5);
            }else if(h4)
            {
                var codes = newCodes(7);
            }else if(h5)
            {
                var codes = newCodes(9);
            }else if(h6)
            {
                var codes = newCodes(11);
            }else if(h7)
            {
                var codes = newCodes(13);
            }

            var status = codes.status;
            if(status=='-1')
            {
                alert("Please select hours");
                return false;

            }
            else if(status=='-2')
            {
                alert("Please select minutes");
                return false;
            }else
            {
                 var fromdate1 = codes.fromdate1;
                 var todate = codes.todate;
                 var final_date = codes.final_date;
                 var final_date_timestamp ='';
            }
     };
     var user_id=localStorage.getItem("user_id");
     $(".loading-page").show();
     $.ajax({
         url: 'http://35.162.172.171/doctorapp/api.php?action=save_patient_appointment',
         type: "POST",
         dataType: "json",
         data: {id: user_id,street: st1,st_name: st_name,suburb: suburb1,pincode: pincode1,state: state1,quick_desc: quick_desc,
         skills: skills,fromdate: fromdate1,todate: todate,location_type:location_type,final_date: final_date,final_date_timestamp:final_date_timestamp},
         crossDomain: true
     }).done(function (data) {
     $(".loading-page").hide();
         if(data.response.id<=0)
             alert(data.response.message);
         else
         {
                 // alert(data.response.message);
                 window.location="appointment_submission.html";

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

var newCodes = function(id) {
    if(id==1)
    {
        var day="day1";
        var nextdate="nextdate1";
    }
    else if(id==3)
    {
        var day="day2";
            var nextdate="nextdate2";
    }else if(id==5)
    {
        var day="day3";
            var nextdate="nextdate3";
    }else if(id==7)
    {
        var day="day4";
            var nextdate="nextdate4";
    }else if(id==9)
    {
        var day="day5";
            var nextdate="nextdate5";
    }else if(id==11)
    {
        var day="day6";
            var nextdate="nextdate6";
    }else if(id==13 )
    {
        var day="day7";
            var nextdate="nextdate7";
    }


    var hrs_select1="hrs_select"+id;
    var min_select1="min_select"+id;
    var pm_time1="pm-time"+id;
    var new_id=id+1;
    var hrs_select2="hrs_select"+new_id;
    var min_select2="min_select"+new_id;
    var pm_time2="pm-time"+new_id;
    //get values from dropdownlist
    var chk_hrs1=document.getElementById(hrs_select1).value;
    var chk_mins1=document.getElementById(min_select1).value;
    var chk_time1=document.getElementById(pm_time1).value;
    var chk_hrs2=document.getElementById(hrs_select2).value;
    var chk_mins2=document.getElementById(min_select2).value;
    var chk_time2=document.getElementById(pm_time2).value;
    //Validations
    if((chk_hrs1=='HH') || (chk_hrs2=='HH'))
    {
        return {
                    status: -1
                };
    }else if(chk_mins1=='MM' || chk_mins2=='MM')
    {
        return {
                status: -2
            };
    }
    //get day
    var day=document.getElementById(day).innerHTML;
    //get date
    var date=document.getElementById(nextdate).innerHTML;
    var final_date=day+" "+date;
    var fromdate1=chk_hrs1+":"+chk_mins1+" "+chk_time1;
    var todate=chk_hrs2+":"+chk_mins2+" "+chk_time2;
    return {
            status: 1,
            fromdate1: fromdate1,
            todate: todate,
            final_date: final_date
        };
};

function cancel()
{
window.location="patient_dashboard.html";
}