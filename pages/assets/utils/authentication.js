urlParams = new URLSearchParams(window.location.search);
var service = urlParams.get('service')
console.debug("Service : " + service);

// var secret = $.cookie('ITEXPERT-OAUTH-AUTHENTICATION-TOKEN');
// console.debug("Secret : " + secret);

$( "#submit" ).click(function() {

    if( !urlParams.has('service') ) {
        alert("You need to pass Url service redirection after authentication in url !!");
    } else {
        var username = $("input[name=email]").val();
        var password = CryptoJS.MD5($("input[name=password]").val()).toString();

        var body = {
            "client_id": username,
            "client_secret": password
        };

        $.ajax({
            url : './authorize',
            type: 'POST',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify(body),
            success: function(secret) {
                if(service.includes('?'))
                   window.location.replace(service+"&ticket="+secret);
               else
                   window.location.replace(service+"?ticket="+secret);
            },
            error:  function (error){
                $('#authenticationErrorAlert').show();
            }
        });
    }
});