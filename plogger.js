$(document).ready(function(){

    startTimer();
});

function startTimer(){
    $("#timer").animate({
        "height": "0%"
    }, 7000, function(){
        alert("Time!");
    });
}