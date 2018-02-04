/*************************************************
 ** course   : CT30A3202 WWW-sovellukset         **
 ** author   : Teemu Tanninen                    **
 ** id       : 508505                            **
 ** date     : 07.10.17                          **
 ** exercise : week 4 - 1-5                      **
 *************************************************/

"use strict";
$(document).ready(function(){
    $("button").click(addItem);
    $("#field").on('keyup', function(event) {
        if (event.which === 13)
            addItem();
    });

    $("ul").on('click', 'li', function() {
        $(this).fadeOut(300, function () {
            $(this).remove();
        $("li:even").css("background-color", "");
        $("li:odd").css("background-color", "");
        });

    });
    $("ul").on('mouseenter','li',function() {
        //OnHover 
        $( this ).css("background-color", LightenDarkenColor(rgb2hex($( this ).css("background-color")), 20)); 
    }); 
    $("ul").on('mouseout', 'li', function() {    
        //AfterHover
        $( this ).css("background-color", LightenDarkenColor(rgb2hex($( this ).css("background-color")), -20)); 
    });
});

function addItem() {
    var input = $("#field").val();
    if (input.trim() != '') {
        $("#list-area").children().append("<li>"+input+"</li>"); 
    }
    $("#field").val('');

}
    

function LightenDarkenColor(col, amt) {
  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}

var hexDigits = new Array
        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
 }

function rgb2hex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
