"use strict";
var template_dir = "./templates";

// Define how often to check new messages from the database
var updateTime = 5*1000;

// Global variables for keeping track of current user and on going updates
var curUser = null;
var update = null;


$(function() {
    // check for valid form and only get messages if all the fields are valid
    $("#form").on('click', "#authButton", function(event) {
        if($("#authNumber")[0].checkValidity()) {
            clearTimeout(update);
            curUser = $("#authNumber").val();
            upMessages(curUser);
            $(event.target).closest(".form-group").find(".invalid-feedback").hide();
        } else {
            $(event.target).closest(".form-group").find(".invalid-feedback").show();
        }
    });
    $('#authNumber').keyup(updateUserInput);

    $('#form').on('click', "#sendButton", sendMessage);

});


// Update user input validation class on keypress, depending on whether the current input is valid or not
function updateUserInput() {
    if(!$("#authNumber")[0].checkValidity()) {
        $("#authNumber").addClass("is-invalid");
    } else {
        $("#authNumber").removeClass("is-invalid").addClass("is-valid");
    }
}

function sendMessage(event) {
    var form = $("#form");
    // Send message only if all forum fiels are valid
    if (!form[0].checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        var sendData = form.serialize();

        // Render and fill in mustache template for success message
        var msg = `Viesti lähetetty käyttäjälle ${$("#receiver").val()}`;
        var rendered;
        var temp_src = template_dir.concat("/alerts.mst");
        $.get(temp_src, function(template) {
            rendered = Mustache.render(template, {msg: msg});
        });
        // Send serialized forum data using post
        $.post("sendMessage.php",sendData, function(data) {
            $("#helpblock").find(".alert").remove(); 
            $("#helpblock").append(rendered);

            // show success message for the user for two seconds
            setTimeout(() => {
                $(".alert").alert('close');
            },2000);

            // reset all input fields and remove validation classes from form
        }).done(function() {
            form.find('input[type=tel],input[type=text],textarea,input[type=number]').not("#authNumber").val("");
            form.removeClass('was-validated');
        });
    }
    // Add was-validated class to form to display all validation colors and messages
    form.addClass('was-validated');
}

function upMessages() {
    var showTime;
    var cuUpdate;
    var msgCount;
    var elemCard = $("#messageCard");
    var elemCount = $("#msgCount");
    var elemSender = $("#sender");
    var elemMsg = $("#cumessage");
    var url = "getMessages.php";
    $.ajax({
        type: "POST",
        url: url,
        data: {phone: curUser},
        cache: false,
        success: function(response) {
            // parse data from json
            var data = JSON.parse(response);

            // Update current messages count on label
            msgCount = data.count;
            elemCount.text(msgCount);

            // check if user has any messages
            if (msgCount > 0) {

                // show message
                elemCard.removeAttr('hidden');

                // fill in the message and sender
                elemMsg.text(data.data.message);
                elemSender.text(data.data.sender_number);

                // calculate message show time
                showTime = data.data.time_to_show*1000;

                // fade in the message and, after the specified time fade it out
                elemCard.fadeIn('fast').delay(showTime).fadeOut('fast', function() {
                    elemMsg.val("");
                    elemSender.val("");
                });
            }
        }
    }).done( function() {
        // Do after every post whether it succeeds or not
        // show current message count badge
        elemCount.parent().removeAttr('hidden');
        // clear current timeout for ajax refresh
        clearTimeout(update);
        // if messages's showtime is longer than current ajax refresh time set refresh time to message's show time
        if (showTime > updateTime) {
            cuUpdate = showTime;
        } else {
            cuUpdate = updateTime;
        }
        // recursively call this function in specified interval to keep getting messages from the database
        update = setTimeout(function() {
            upMessages(curUser);
        },cuUpdate);

    });
}

