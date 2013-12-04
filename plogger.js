    Plogger = function($){

        var init = function(){
            bindEvents();
        }

        var bindEvents = function(){
            $("#btnStart").click(function(){
                gameStart();
            });

            $("#timer-toggle").click(function(){
                toggleFreeze();
            });

            $(".block").click(function(){
                blockClick($(this));
            });

            $("body").keydown(function(e){
                keyDown(e.which);
            });

            $("body").swipeleft(function(event){
                manSwipeLeft($(event.target));
            });

            $("body").swiperight(function(event){
                manSwipeRight($(event.target));
            });
        };

        var gameStart = function(){
            buildBoard();
            $("#menu").hide();
            $("#game").show();
            startTimer();
            startDudes();
        };

        var buildBoard = function(){
            var block = $("<li class='block' />"),
                blocks = $("#blocks"),
                i;

            for(i=1; i<settings.numSpots; i++){
                blocks.prepend(block.attr("data-spot",i).clone());
            }

            addBlockBoard(5);
            addBlockBoard(64);
            addDude(93);
            addDude(98);
        };

        var toggleFreeze = function(){
            settings.freeze = true;
        };

        var addBlockBoard = function(spot){
            $(".block[data-spot='"+ spot +"']").addClass("block-board");
        };

        var addBlockBuilt = function(spot){
            $(".block[data-spot='"+ spot +"']").addClass("block-built");
        };

        var addDude = function(spot){
            $(".block[data-spot='"+ spot +"']").append(settings.dude.clone());
        };

        var startTimer = function(){
            var timer = $("#timer");

            timer.animate({
                "height": "0%"
            }, settings.timerLength, function(){
                timesUp();
            });

            $("#timer-toggle").unbind("click")
            .text("Stop Timer").click(function(){
                stopTimer();
            });
        };

        var timesUp = function(){
            settings.freeze = true;
        };

        var startDudes = function(){
            setInterval(function() {
                if (!settings.freeze) {
                    $(".dude").each(function(){
                        var that = $(this),
                            currentSpot = that.parent().data("spot"),
                            nextSpot = lastAvailableBlock(currentSpot - settings.spotsPerRow);

                        if (nextSpot >= 0) {
                            if (nextSpot === settings.manSpot) {
                                that.remove();
                                dudeCollision(nextSpot);
                            } else{
                               that.appendTo($(".block[data-spot='"+nextSpot+"']"));
                            }
                        } else{
                             that.remove();
                        }
                    });
                    seedDudes();
                }
            }, settings.dudeSpeed);
        };

        var seedDudes = function(){
            if (!settings.freeze) {
                var totalDudes = $(".dude").length,
                    maxSpot = settings.numSpots,
                    minSpot = settings.numSpots - settings.spotsPerRow - 1;


                if (totalDudes < settings.maxDudes) {
                    addDude(getRandomInt(minSpot,maxSpot));
                }
        }
        };

        var getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
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

        var manSwipeLeft = function (jq){
            var currentColumn = getColumn(settings.manSpot);

            setManSpot(currentColumn + 1);
            moveMan();
        };

        var manSwipeRight = function (jq){
            var currentColumn = getColumn(settings.manSpot);

            setManSpot(currentColumn - 1);
            moveMan();
        };

        var dudeCollision = function(spot){
            addBlockBuilt(spot);
            settings.manSpot = settings.manSpot + settings.spotsPerRow;
            moveMan();
        };

        var setManSpot = function(clickedCol){
            if (!settings.freeze) {
                var currentColumn = getColumn(settings.manSpot),
                    nextColumn = currentColumn;

                if (currentColumn < clickedCol) {
                    // left
                    if (currentColumn >= settings.spotsPerRow - 1) {
                        currentColumn = -1;
                    }
                    nextColumn = currentColumn + 1;
                } else if(currentColumn > clickedCol){
                    // right
                    if (currentColumn <= 0) {
                        currentColumn = settings.spotsPerRow;
                    }
                    nextColumn = currentColumn - 1;
                } else{
                    // current

                }

                settings.manSpot = firstAvailableBlock(nextColumn);
        }
        };

        var firstAvailableBlock = function(column){
            var block = $(".block[data-spot='"+ column +"']");
            if (block.hasClass("block-built") || block.hasClass("block-board")) {
                return firstAvailableBlock(column + settings.spotsPerRow);
            } else{
                return column;
            }
        };

        var lastAvailableBlock = function(column){
            var block = $(".block[data-spot='"+ column +"']");
            if (block.hasClass("block-built") || block.hasClass("block-board")) {
                return firstAvailableBlock(column - settings.spotsPerRow);
            } else{
                return column;
            }
        };

        var moveMan = function(){
            if (!settings.freeze) {
                var man = $("#man"),
                    block = $(".block[data-spot='"+settings.manSpot+"']");

                block.append(man);
            }
        };

        var getColumn = function(block){
            return block % settings.spotsPerRow;
        };

        var settings = {
            freeze : false,
            manSpot : 0,
            numSpots : 99,
            spotsPerRow : 11,
            timerLength: 1000000,
            dudeSpeed: 250,
            maxDudes: 2,
            dude: $("<div class='dude'></div>")
        };

        return{
            Init:init
        };

}(jQuery);