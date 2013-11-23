    Plogger = function($){

        var init = function(){
            buildBoard();
            bindEvents();
        }

        var bindEvents = function(){
            $("#timer-toggle").click(function(){
                startTimer();
            });

            $(".block").click(function(){
                blockClick($(this));
            })
        };

        var buildBoard = function(){
            var block = $("<li class='block' />"),
                blocks = $("#blocks"),
                i;

            for(i=1; i<settings.numSpots; i++){
                blocks.prepend(block.attr("data-spot",i).clone());
            }
        };

        var startTimer = function(){
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
        };

        var stopTimer = function(){
            var timer = $("#timer");

            timer.stop();

            $("#timer-toggle").unbind("click")
            .text("Start Timer").click(function(){
                startTimer();
            });
        };

        var blockClick = function(jq){
            var clickedSpot = jq.attr("data-spot");
            if (settings.manSpot < clickedSpot) {
                settings.manSpot++;
            } else if (settings.manSpot > clickedSpot) {
                settings.manSpot--;
            }
            moveMan();
        };

        var moveMan = function(){
            var man = $("#man"),
                block = $(".block[data-spot='"+settings.manSpot+"']");

            block.append(man);
        };

        var settings = {
            freeze : false,
            manSpot : 0,
            numSpots : 99,
        };

        return{
            Init:init
        };

}(jQuery);