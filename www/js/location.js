$(document).ready(function(){
    $("#tag").val("");
    $("#tag").keyup(function(){
        var tag = $("#tag").val();
        if(tag != ''){
            $.ajax({
                    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + tag +'&key=AIzaSyCN9vWBLm1My_T78Q9YWs1JlX1rjBB99T0',
                    type: "GET",
                    dataType: 'json',
                    crossDomain: true
                }).done(function(data){
                    //alert(JSON.stringify(data));
                    var html = '';
                    for(var i = 0; i < data.results.length; i++){
                        html += "<li><a class='loc' data='"+ JSON.stringify(data.results[i].address_components) + "'>" + data.results[i].formatted_address +  "</a></li>";
                    }

                    $("#results").html(html);

                    $(".loc").click(function(){
                        var data = $(this).attr("data");
                        localStorage.setItem("location_info", data);
                        window.location = "update-patient-detail.html";
                    });
                }).fail(function(reason){
                    console.log(JSON.stringify(reason));
                });
        }
    });

    $(".loc").click(function(){
        alert("location set");
    });
});