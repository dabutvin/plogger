    Plogger = function($){

        var init = function(){
            buildBoard();
            bindEvents();
            $(".block[data-spot='5']").addClass("block-built");
            $("#man").draggable({
                axis: "x",
                containment: "#blocks",
                start: dragStart,
                stop: dragStop
            });
        }

        var bindEvents = function(){
            $("#timer-toggle").click(function(){
                startTimer();
            });

            $(".block").click(function(){
                blockClick($(this));
            });

            $("body").keydown(function(e){
                keyDown(e.which);
            });
        };

        var dragStart = function(){

        };

        var dragStop = function(){

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
            var clickedSpot = jq.attr("data-spot"),
                clickedCol = getColumn(clickedSpot);

            setManSpot(clickedCol);
            moveMan();
        };

        var keyDown = function(code){
            if (code === 37 || code === 39) {
                var currentColumn = getColumn(settings.manSpot);

                    if (code === 37) {
                        // left
                        setManSpot(currentColumn + 1);
                    } else if (code === 39){
                        // right
                        setManSpot(currentColumn - 1);
                    }
                moveMan();
            }
        };

        var setManSpot = function(clickedCol){
            var currentColumn = getColumn(settings.manSpot),
                nextColumn = currentColumn;

            if (currentColumn < clickedCol) {
                nextColumn = currentColumn + 1;
            } else if(currentColumn > clickedCol){
                nextColumn = currentColumn - 1;
            } else{

            }

            settings.manSpot = firstAvailableBlock(nextColumn);
        };

        var firstAvailableBlock = function(column){
            var block = $(".block[data-spot='"+ column +"']");
            if (block.hasClass("block-built")) {
                return firstAvailableBlock(column + settings.spotsPerRow);
            } else{
                return column;
            }
        };

        var moveMan = function(){
            var man = $("#man"),
                block = $(".block[data-spot='"+settings.manSpot+"']");

            block.append(man);
        };

        var getColumn = function(block){
            return block % settings.spotsPerRow;
        }

        var settings = {
            freeze : false,
            manSpot : 0,
            numSpots : 99,
            spotsPerRow : 11
        };

        return{
            Init:init
        };

}(jQuery);