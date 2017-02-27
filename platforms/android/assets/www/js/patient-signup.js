function init() {
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
      fromdate();
      function fromdate()
      {
          var i=0;
          //get year
          var yeart='<select id="yearselect" style="font-size:75%;" onchange=showYear(this.id)>';
          yeart=yeart+'<option>YYYY</option>';
          for(i=2017;i>1900;i--)
          {
              yeart=yeart+'<option>'+i+'</option>'
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
              dayt=dayt+'<option>'+i+'</option>'
              day_array1[i]=i;
          }
          dayt=dayt+"</select>";
          var divResult = document.getElementById("daydiv");
          divResult.innerHTML = dayt;
          //get month
          var mont='<select id="monthselect" style="font-size:75%;" onchange=showYear(this.id)  >';
          mont=mont+'<option>MM</option>';
          for(i=0;i<monthname.length;i++)
          {
              mont=mont+'<option>'+monthname[i]+'</option>'
              month_array1[i]=i;
          }
          mont=mont+"</select>";
          var divResult = document.getElementById("monthdiv");
          divResult.innerHTML = mont;
      }
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

function patient_signup()
{

         var fname=$('#fname').val();
         var lname=$('#lname').val();
         var dayselect=$('#dayselect').val();
         var monthselect=$('#monthselect').val();
         var yearselect=$('#yearselect').val();
         var gender=$('#gender').val();
         var mob=$('#mob').val();
         var email=$('#email').val();
         var password=$('#password').val();
         var stno=$('#stno').val();
         var stname=$('#stname').val();
         var suburb=$('#suburb').val();
         var pincode=$('#postcode').val();
         var state=$('#state').val();
         var card_no=$('#card_no').val();
         var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
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
        }else if (email == "") {
            alert("Please Enter Email-ID.");
            $('#email').focus();
            return false;
         }else if (!reg.test(email)){
            alert("Incorrect Email-ID format");
            $('#email').focus();
            return false;
         }else if (password == "") {
            alert("Please Enter Password.");
            $('#password').focus();
            return false;
         }else if (password.length <6 || password.length >12) {
                  alert("Password must be between 6 to 12 digit.");
                  $('#password').focus();
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
            alert("Please Select Suburb.");
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
             $(".loading-page").show();
             $.ajax({
                url: BASE_URL,
                type: "GET",
                dataType: "json",
                data: {action:'register',type:'patient',fname:fname,lname:lname,dayselect:dayselect,monthselect:monthselect,yearselect:yearselect,gender:gender,
                mob:mob,email:email,password:password,stno:stno,stname:stname,suburb:suburb,pincode:pincode,state:state,card_type:card_type,card_no:card_no},
                crossDomain: true
             }).done(function (data) {
             $(".loading-page").hide();
                if(data.response.id>0)
                {
                       alert(data.response.message);
                       window.location="index.html";
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