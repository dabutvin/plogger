$(document).ready(function(){

    $("#timer-toggle").click(function(){
        startTimer();
    });
});


function startTimer(){
    var timer = $("#timer");

    timer.animate({
        "height": "0%"
    }, 7000, function(){
        alert("Time!");
    });

    $("#timer-toggle").unbind("click")
    .text("Stop Timer").click(function(){
        stopTimer();
    });
}

function stopTimer(){
    var timer = $("#timer");

    timer.stop();

    $("#timer-toggle").unbind("click")
    .text("Start Timer").click(function(){
        startTimer();
    });
}