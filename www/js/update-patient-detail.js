function init() {
//http://mobile.csgroupdevhub.com/doctorapp/api.php?action=return_patient_detail&id=1

     var user_id=localStorage.getItem("user_id");
     $(".loading-page").show();
     $.ajax({
        url: BASE_URL,
        type: "GET",
        dataType: "json",
        data: {action:'return_patient_detail',id:user_id},
        crossDomain: true
     }).done(function (data) {
     $(".loading-page").hide();
        if(data.response.id<0)
        {
               alert(data.response.message);
               window.location="patient_dashboard.html";
        }
        else
        {
             document.getElementById("fname").value = data.response.fname;
             document.getElementById("lname").value = data.response.lname;
             document.getElementById("mob").value = data.response.phone_no;
             document.getElementById("stno").value = data.response.street_no;
             document.getElementById("stname").value = data.response.street_name;
             document.getElementById("suburb").value = data.response.suburb;
             document.getElementById("state").value = data.response.state;
             document.getElementById("postcode").value = data.response.pincode;
             document.getElementById("card_no").value = data.response.card_no;
             var gender = data.response.gender;
             var card_type = data.response.card_type;
             if(card_type=='veteran')
                document.getElementById('2').checked = true;
             else if(card_type=='private')
                document.getElementById('3').checked = true;
             else if(card_type=='visa')
                document.getElementById('4').checked = true;
             else
                document.getElementById('1').checked = true;
             var dob=data.response.dob;
             var splits = dob.split(" ");
               var year_array1=[];
               var month_array1=[];
               var day_array1=[];
               var monthname = new Array();
               monthname[0] = "January";
               monthname[1] = "February";
               monthname[2] = "March";
               monthname[3] = "April";
               monthname[4] = "May";
               monthname[5] = "June";
               monthname[6] = "July";
               monthname[7] = "August";
               monthname[8] = "September";
               monthname[9] = "October";
               monthname[10] = "November";
               monthname[11] = "December";
               var gendertype = new Array();
               gendertype[0] = "Male";
               gendertype[1] = "Female";
               fromdate();
               function fromdate()
               {
                   var i=0;
                   //get year
                   var yeart='<select id="yearselect" style="font-size:75%;" onchange=showYear(this.id)>';
                   yeart=yeart+'<option>YYYY</option>';
                   for(i=2017;i>1900;i--)
                   {
                       if(splits[2]==i)
                       yeart=yeart+'<option selected>'+i+'</option>';
                       else
                       yeart=yeart+'<option>'+i+'</option>';
                       year_array1[i]=i;
                   }
                   yeart=yeart+"</select>";
                   var divResult = document.getElementById("yeardiv");
                   divResult.innerHTML = yeart;
                   //get day
                   var dayt='<select id="dayselect" style="font-size:75%;"  onchange=showYear(this.id)>';
                   dayt=dayt+'<option>DD</option>';
                   for(i=1;i<=31;i++)
                   {
                       if(splits[0]==i)
                       dayt=dayt+'<option selected>'+i+'</option>'
                       else
                       dayt=dayt+'<option>'+i+'</option>'
                   }
                   dayt=dayt+"</select>";
                   var divResult = document.getElementById("daydiv");
                   divResult.innerHTML = dayt;
                   //get month
                   var mont='<select id="monthselect" style="font-size:75%;" onchange=showYear(this.id)  >';
                   mont=mont+'<option>MM</option>';
                   for(i=0;i<monthname.length;i++)
                   {
                       if(splits[1]==monthname[i])
                            mont=mont+'<option selected>'+monthname[i]+'</option>';
                       else
                            mont=mont+'<option>'+monthname[i]+'</option>';
                   }
                   mont=mont+"</select>";
                   var divResult = document.getElementById("monthdiv");
                   divResult.innerHTML = mont;
                   //get gender
                   var gentype='<select id="gender" name="" style="font-size:75%;" >';
                   gentype=gentype+'<option>Select Gender</option>';
                   for(i=0;i<2;i++)
                   {
                       if(gender==gendertype[i])
                            gentype=gentype+'<option selected>'+gendertype[i]+'</option>';
                       else
                            gentype=gentype+'<option>'+gendertype[i]+'</option>';
                   }
                   gentype=gentype+"</select>";
                   var divResult = document.getElementById("gen");
                   divResult.innerHTML = gentype;
               }

            var location_id = localStorage.getItem("location_info");
             if(location_id != 'null'){
                var location = JSON.parse(location_id);
                localStorage.setItem("location_info", null);

                document.getElementById("stno").value = "";
                document.getElementById("stname").value = "";
                document.getElementById("state").value = "";
                document.getElementById("suburb").value = "";
                document.getElementById("postcode").value = "";

                for(var i = 0; i < location.length; i++){
                    if(location[i].types.indexOf("subpremise") != -1){
                        document.getElementById("stno").value = location[i].long_name;
                    }

                    if(location[i].types.indexOf("street_number") != -1){
                        if(document.getElementById("stno").value != ""){
                            document.getElementById("stno").value += "/" + location[i].long_name;
                        }else{
                            document.getElementById("stno").value = location[i].long_name;
                        }
                    }

                    if(location[i].types.indexOf("route") != -1){
                        document.getElementById("stname").value = location[i].long_name;
                    }

                    if(location[i].types.indexOf("administrative_area_level_1") != -1){
                        document.getElementById("state").value = location[i].short_name;
                    }

                    if(location[i].types.indexOf("locality") != -1){
                        document.getElementById("suburb").value = location[i].long_name;
                    }

                    if(location[i].types.indexOf("postal_code") != -1){
                        document.getElementById("postcode").value = location[i].long_name;
                    }
                }
             }
        }

     }).fail(function (reason) {
        console.log("Error: "+JSON.stringify(reason));

     });


}

function enable_postcode()
{
    var state=$('#state').val();
    if(state!='Select State')
    {
        document.getElementById("postcode").disabled = false;
        $('#postcode').focus();
    }
    else
    {
         document.getElementById("postcode").disabled = true;
         document.getElementById('postcode').value='';
    }
}

function update_patient_detail()
{
         var fname=$('#fname').val();
         var lname=$('#lname').val();
         var dayselect=$('#dayselect').val();
         var monthselect=$('#monthselect').val();
         var yearselect=$('#yearselect').val();
         var gender=$('#gender').val();
         var mob=$('#mob').val();
         var stno=$('#stno').val();
         var stname=$('#stname').val();
         var suburb=$('#suburb').val();
         var pincode=$('#postcode').val();
         var state=$('#state').val();
         var card_no=$('#card_no').val();

         if (fname == "") {
            alert("Please Enter First Name.");
            $('#fname').focus();
            return false;
         }else if (lname == "") {
            alert("Please Enter Last Name.");
            $('#lname').focus();
            return false;
         }else if (dayselect == "DD") {
             alert("Please select day.");
             return false;
         }else if (monthselect == "MM") {
               alert("Please select month.");
               return false;
         }else if (yearselect == "YYYY") {
               alert("Please select year.");
               return false;
         }else if (gender == "Select Gender") {
               alert("Please select gender.");
               return false;
         }
         else if (mob == "") {
             alert("Please Enter Mobile Number.");
             $('#mob').focus();
             return false;
         }else if (isNaN(mob)) {
               alert("Phone number must be a number.");
               $('#mob').focus();
               return false;
        }else if (mob.length!=10) {
               alert("Please Enter 10 digit phone no.");
               $('#mob').focus();
               return false;
        }else if (stno == "") {
            alert("Please Enter Street No.");
            $('#stno').focus();
            return false;
         }
         else if (stname == "") {
            alert("Please Enter Street Name.");
            $('#stname').focus();
            return false;
         }else if (suburb == "Select Suburb") {
            alert("Please Enter Suburb.");
            $('#suburb').focus();
            return false;
         }else if (state == "Select State") {
            alert("Please Select State.");
            $('#state').focus();
            return false;
         }else if (pincode == "") {
            alert("Please Enter postcode.");
             $('#postcode').focus();
            return false;
         }else if (isNaN(pincode)) {
            alert("Postcode must be a number.");
             $('#postcode').focus();
            return false;
         }else if (pincode.length!=4) {
            alert("Please Enter 4 digit postcode.");
             $('#postcode').focus();
            return false;
         }else if (card_no == "") {
              alert("Please Enter card no.");
               $('#card_no').focus();
              return false;
         }else if (isNaN(card_no)) {
              alert("Card no must be a number.");
               $('#card_no').focus();
              return false;
         }
         else if (card_no.length!=12) {
            alert("Please Enter 12 digit card no.");
             $('#card_no').focus();
            return false;
         }
         else
         {
            if(document.getElementById('1').checked) {
               var card_type="medicare";
             }else if(document.getElementById('2').checked) {
               var card_type="veteran";
             }else if(document.getElementById('3').checked) {
                var card_type="private";
             }else {
                var card_type="visa";
             }
             var user_id=localStorage.getItem("user_id");
             $(".loading-page").show();
             $.ajax({
                url: BASE_URL,
                type: "GET",
                dataType: "json",
                data: {action:'update_patient_detail',user_id:user_id,fname:fname,lname:lname,dayselect:dayselect,monthselect:monthselect,yearselect:yearselect,gender:gender,
                mob:mob,stno:stno,stname:stname,suburb:suburb,pincode:pincode,state:state,card_no:card_no,card_type:card_type},
                crossDomain: true
             }).done(function (data) {
             $(".loading-page").hide();
                if(data.response.id>0)
                {
                       alert(data.response.message);
                       window.location="patient_dashboard.html";
                }
                else
                {
                    alert(data.response.message);
                }

             }).fail(function (reason) {
                console.log("Error: "+JSON.stringify(reason));

             });
             return false;

         }
}
function cancel()
{
window.location="patient_dashboard.html";
}

function enter_location(){
    window.location = "location.html";
}