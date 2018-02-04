/*************************************************
 ** course   : CT30A3202 WWW-sovellukset         **
 ** author   : Teemu Tanninen                    **
 ** id       : 508505                            **
 ** date     : 05.11.17                          **
 ** exercise : week 7 - 1-5                      **
 *************************************************/

"use strict";
$(document).ready(function() {
    refresh();
    $("form").submit(addMemo);

    $("ul").on('mouseenter','li', function() {
        //OnHover 
        $(this).addClass("lighter");  
    }); 

    $("ul").on('mouseout','li', function() {    
        // AfterHover
            $(this).removeClass("lighter"); 
    });
    $("ul").on("click", ".rm-button", removeMemo);
    $(".logout-button").on('click', function() {
        $.post("logout.php", function() {
            window.location.reload(true);
        });
    });
});

function loadTasks() {
    $.getJSON("gettasks.php", function(data) {
        $("ul").empty();
        if (data.tasks.length == 0) {
            $("#info").text("Tietokannasta ei löytynyt yhtään alkiota.");
        } else {
            $("#info").empty();
            $.each(data.tasks, function() {
                var task = this['task'];
                var task_id = this['taskid'];
                var bt = "<button class='rm-button' method='POST' data-id="+task_id+">Poista</button>";
                $("ul").append("<li>"+task+""+bt+"</li>");
            });
        }
    });

}

function refresh() {
    setTimeout( function() {
        loadTasks();
        refresh();
    }, 200);
}

function removeMemo() {
    $.post("removememo.php", {
        "task_id": $(this).data("id")
    }, function() {
        loadTasks();
    });
}

function addMemo(e) {
    e.preventDefault();
    var newtask = $("input").val();
    $.post("addmemo.php", {task: newtask});
    $("#field").val("");
    loadTask();
}



