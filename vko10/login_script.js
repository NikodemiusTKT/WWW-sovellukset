"use strict";
$(document).ready(function() {

    $.validator.addMethod( "passcheck", function( value, element ) {
        return this.optional( element ) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
    }, "Salasanan on sisällettävä sekä numeroita sekä isoja ja pieniä kirjaimia" );
    $("#register").validate( {
        errorClass: "is-invalid",
        // focusCleanup: true,
        errorPlacement: function(error,element) {
            error.addClass("invalid-feedback");
            error.insertAfter(element);
        },
        submitHandler: function() {
            var formdata = $("#register").serialize();
            $.post( "register.php", formdata, function(data, event) {
                if (data !== "") {
                    var error_message =
                        '<div\
                    class="alert alert-info alert-dismissable fade show" role="alert"> '+data+' \
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>\
                        </div>';
                    $("#register").find("h1").after(error_message);
                } else {
                    var msg = "Uusi käyttäjä lisättiin onnistuneesti, kirjaudu sisään uudella tunnuksella";
                    var success_message =
                        '<div\
                    class="alert alert-success alert-dismissable fade show" role="alert"> '+msg+' \
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>\
                        </div>';
                    $("#register").find("h1").after(success_message);
                    setTimeout('redirect()', 5000);
                }

            });

        },
        rules: {
            reguser: {
                required: true,
                alphanumeric: true
            },
            regpassword: {
                required: true,
                minlength: 8,
                maxlength: 255,
                passcheck: true,
                alphanumeric: true
            },
            confpass: {
                required: true,
                equalTo: "#regpassword"
            }
        },
        messages: {
            reguser: {
                required: "Et ole antanut käyttäjänimeä",
                alphanumeric: "Käyttäjänimi saa sisältää vain kirjaimia ja numeroita"
            },
            regpassword: {
                required: "Et ole antanut salasanaa",
                minlength: "Salasanan on oltava vähintään 8 merkkiä pitkä",
                maxlength: "Salasana voi olla korkeintaan 255 merkkiä pitkä",
                alphanumeric: "Salasana ei saa sisältää erikoismerkkejä"
            },
            confpass: { 
                equalTo: "Salasana ei täsmännyt",
                required: "Et ole antanut salasanan varmistusta"
            }
        }
    });
    $("#login").validate( {
        errorClass: "is-invalid",
        // focusCleanup: true,
        errorPlacement: function(error,element) {
            error.addClass("invalid-feedback");
            error.insertAfter(element);
        },

        rules: {
            loguser: {
                required: true
            },
            logpassword: {
                required: true
            }
        },
        messages: {
            loguser: {
                required: "Et ole antanut käyttäjänimeä"
            },
            logpassword: {
                required: "Et ole antanut salasanaa"
            }
        },
        submitHandler: function () {
            var formdata = $("#login").serialize();
            $.post( "login.php", formdata, function(data) {
                var json = $.parseJSON(data);
                if (!json.success) {
                    var error_message =
                        '<div\
                    class="alert alert-info alert-dismissable fade show" role="alert"> '+json.message+' \
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>\
                        </div>';
                    $("#login").find("h1").after(error_message);
                } else {
                    window.location.href=json.location;
                } 
            
            });
        }
    });

});

function redirect() {
    window.location = "index.php";
}

