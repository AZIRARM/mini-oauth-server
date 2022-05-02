
$( "#submit" ).click(function() {

        var username = $("input[name=email]").val();
        var password = $("input[name=password]").val();
        var passwordCheck = $("input[name=password-repeat]").val();
        var fname = $("input[name=firstname]").val();
        var lname = $("input[name=lastname]").val();
        var checkAcceptation = $("input[name=checkAcceptation]").val();


        if(!username || !validateEmail(username)) {
            $('#emailAlert').show();
            return;
        }

        if(!$('#checkAcceptationId').prop('checked')) {
            $('#licenseAlert').show();
            return;
        }
        if( password.length< 6 || passwordCheck.length < 6  || password !== passwordCheck ) {
            $('#passwordAlert').show();
            return;
        }
        if( !validatePassword(password) ) {
            $('#passwordFormatAlert').show();
            return;
        }
        alert( CryptoJS.MD5(password));
        $.ajax({
            url : './register',
            type: 'post',
            data:
            {
                email: username,
                firstName: fname,
                lastName: lname,
                pwd: CryptoJS.MD5(password)
            },
            dataType: '*',
            success: function (data) {
                if(service.includes('?'))
                    window.location.replace(service+"&ticket="+data);
                else
                    window.location.replace(service+"?ticket="+data);
            }
        });

});



const validatePassword = (pwd) => {
    let pattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,16}$/;
    return pattern.test(pwd);
};

const validateEmail = (email) => {
    let pattern =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
};