$( "#submit" ).click(function() {
        var username = $("input[name=email]").val();
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
});