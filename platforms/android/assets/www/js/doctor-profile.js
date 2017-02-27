function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    //document.addEventListener("deviceready", deviceInfo, true);
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
                 document.getElementById("doctor_since").innerHTML = data.response.doctor_since;
                 document.getElementById("qualification").innerHTML = data.response.qualification;
                 document.getElementById("about_me").innerHTML = data.response.aboutme;
                 document.getElementById("identity_location").value = data.response.identity_location;
                 document.getElementById("dname").innerHTML = data.response.fname+" "+data.response.lname;
             }

        }).fail(function (reason) {
            console.log("Error: "+JSON.stringify(reason));

        });
    }

    function mydata()
    {
        var user_id=localStorage.getItem("user_id");
        var about=$("#about_me").val();
        var location=$("#identity_location").val();
        if(about=="")
        {
             alert("Please enter about detail");
        }
        else if(location=="")
        {
             alert("Please enter location detail");
        }
        else
        {
            $(".loading-page").show();
            $.ajax({
                url: 'http://35.162.172.171/doctorapp/api.php?action=save_doctor_profile',
                type: "GET",
                dataType: "json",
                data: {id: user_id,about:about,location:location},
                crossDomain: true
            }).done(function (data) {
                $(".loading-page").hide();
                if(data.response.id==-2)
                    alert(data.response.message);
                else
                {
                     alert(data.response.message);
                }
                }).fail(function (reason) {
                console.log("Error: "+JSON.stringify(reason));

            });
         }
    }