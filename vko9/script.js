var api_url = "http://api.openweathermap.org/data/2.5/find?q="; 
var api_key = "d405aa98fc5868a493c9bf29b033492d";
var units = "metric";
var lang = "fi";
var country = "fi";
var dateformat = "hh:mm MMM DD"
var validInput = /^[A-Za-z]+$/; 

"use strict";
$(document).ready(function() {

    $("#register").on("click", function(event) {
        $(event.target).closest("#card").fadeOut("normal",function() {
            $(this).remove();
        });
    });
    $('#form').bootstrapValidator({
        // container: '#helpblock',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            inputCity: {
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'Haettava paikkakunta ei saa olla tyhjä</br>'
                    },
                    regexp: {
                        regexp: /^[A-Za-z]+$/, 
                        message: 'Paikkakunta saa sisältää vain isoja ja pieniä kirjaimia'
                    },
                    remote: {
                        message: "Paikkakunnalla ei löydy säätietoja",

                        url: 'getData.php',
                    }

                }
            }
        },
        onSuccess:(function(e,data) {
            e.preventDefault();
        })
    })
        .on('success.field.fv', function(e, data) {
            if (data.fv.getInvalidFields().length > 0) {    // There is invalid field
                data.fv.disableSubmitButtons(true);
            }
        })
    .on('error.validator.bv', function(e, data) {

        data.element
            .data('bv.messages')
        // Hide all the messages
            .find('.help-block[data-bv-for="' + data.field + '"]').hide()
        // Show only message associated with current validator
            .filter('[data-bv-validator="' + data.validator + '"]').show();
    });
    $("#input-button").on('click', function() {
            getData($("#inputCity").val());
    });
});
function getData(input_text) {
    var url = `${api_url}${input_text},${country}&units=${units}&lang=${lang}&APPID=${api_key}`;
    $.ajax( {
        type: 'POST',
        url: "getData.php",
        data: {'url': url, 'name': input_text},
        success: function(json) {
            if (json) {
                var data = JSON.parse(json);
                var utc = data.time;
                moment.locale("fi");
                data.time = moment.unix(utc).format(dateformat);
                var template = $("#card-template").html();
                var html;
                html = Mustache.render(template,data);
                $('#cards').append(html);
            }
        },
        error: function() {
            $("cityHelp").text("Jotain meni vikaan tiedonhaussa.")
        }
    });
}
