$(function() {
    positionX = 0;
    positionY = 0;
    moves = 0;
    points = 0;

    animateTitle();
    function animateTitle() {
        var state = true;
        setInterval(function() {
            if ( state ) {
                $( ".main-titulo" ).animate({
                    color: "#fff",
                }, 1000 );
            } else {
                $( ".main-titulo" ).animate({
                    color: "#DCFF0E",
                }, 200 );
                $( ".main-titulo" ).animate({
                    color: "#fff",
                }, 200 );
                $( ".main-titulo" ).animate({
                    color: "#DCFF0E",
                }, 1000 );
            }
            state = !state;
        }, 1000);
    }

    function startGame() {
        var cantCandies = 4;
        moves=0;
        points=0;

        $('#movimientos-text').html(moves);
        $('#score-text').html(points);
        $('.panel-tablero').show();
        $('.panel-score').attr('style', 'position: relative; height: 700px;');
        $('.time').attr('style', 'display:block; ');
        if($('#gameFinishTittle').length > 0){$('#gameFinishTittle').remove()};

        //create candies
        for(var i=1; i <= 7; i++){
            for(var j=1; j <= 7; j++) {
                var x = Math.floor(Math.random() * cantCandies) + 1;
                if($('#'+((7*(i-1))+j)).length > 0){ $('#'+((7*(i-1))+j)).remove();  }
                $('.col-'+i).html($('.col-'+i).html() + '<div class="candy" id="'+((7*(i-1))+j)+'" style="flex: 1; box-sizing: border-box; max-width: 91px;"><img src="image/' + x + '.png" width="100%" alt=""><div>');
            }
        }

        //animation
        for(var i=7; i >= 1; i--) {
            for (var j = 1; j <= 7; j++) {
                posx = $('#' + (i*j)).offset().left;
                posy = $('#' + i*j).offset().top;
                $("#" + i*j).offset({top: 0, left: posx});
                $('#' + i*j).animate({
                    top: 0,
                    queue: false
                }, {
                    easing: 'linear', duration: 3000, queue: false, complete: function () {
                    }
                });
            }
        }
        setTimeout(function(){ initDragAndDrop(); verifyMove();
        }, 3000);
    }

    function verifyMove(){
        var won = 0;
        limitx1 = 1;
        limitx2 = 42;
        limity1 = 1;
        limity2 = 7;
        var elementsWon = [];
        for (i = 1; i <= 49; i++) {
            var elementLeft = $('#'+(i-7) +" img").attr("src");
            var currentElement = $('#'+(i) +" img").attr("src");
            var elementRigth = $('#'+(i+7) +" img").attr("src");
            var elementTop = $('#'+(i-1) +" img").attr("src");
            var elementButtom = $('#'+(i+1) +" img").attr("src");
            var elementsWonIteration = [];
            var elementsWonVertically = [];
            var elementsWonHorizontally = [];

            if(i <= 7 ){ elementLeft = ""; }
            if(i >= 43 ){ elementRigth = ""; }
            if(((Number(i)-1) % 7) == 0 ){
                limity1 = i;
                limity2 = i+6;
                elementTop = "";
            }
            if(i % 7 == 0 ){ elementButtom = ""; }

            if(((Number(i)-1) % 7) == 0){
                limitx1 = 1;
                limitx2 = 43;
            }
            if(((Number(i)-2) % 7) == 0){
                limitx1 = 2;
                limitx2 = 44;
            }
            if(((Number(i)-3) % 7) == 0){
                limitx1 = 3;
                limitx2 = 45;
            }
            if(((Number(i)-4) % 7) == 0){
                limitx1 = 4;
                limitx2 = 46;
            }if(((Number(i)-5) % 7) == 0){
                limitx1 = 5;
                limitx2 = 47;
            }
            if(((Number(i)-6) % 7) == 0){
                limitx1 = 6;
                limitx2 = 48;
            }if(((Number(i)-7) % 7) == 0){
                limitx1 = 7;
                limitx2 = 49;
            }



            if( currentElement == elementLeft && currentElement == elementRigth){
                won = 1;

                contx = ($('#'+(i-7)).length > 0) ? (($('#'+(i-7) +" img").attr("src") == currentElement) ? (i-7) : i) : i;

                var next = true;
                while($('#'+contx +" img").attr("src") == currentElement && next && (contx >= limitx1 && contx <= limitx2)){
                    if($('#'+(contx-7)).length > 0) {
                        if ($('#' + (contx - 7) + " img").attr("src") == currentElement
                            && ((contx-7) >= limitx1 && (contx-7) <= limitx2))
                            contx -= 7;
                        else
                            next = false;
                    }
                    else{
                        next = false;
                    }
                }
                next = true;
                while($('#'+contx +" img").attr("src") == currentElement && next && (contx >= limitx1 && contx <= limitx2)){
                    points+=10;
                    $('#score-text').html(points);
                    elementsWonVertically.push(contx);
                    if($('#'+(Number(contx)+7)).length > 0)
                        contx +=7;
                    else{
                        next = false;
                    }
                }
            }
            if( currentElement == elementTop && currentElement == elementButtom){
                won = 1;
                conty = ($('#'+(i-1)).length > 0) ? (($('#'+(i-1) +" img").attr("src") == currentElement) ? (i-1) : i) : i;

                var next = true;
                while($('#'+conty +" img").attr("src") == currentElement && next && (conty >= limity1 && conty <= limity2)){
                    if($('#'+(conty-1)).length > 0 && ((conty-1) >= limity1 && (conty-1) <= limity2)) {
                        if ($('#' + (conty -1) + " img").attr("src") == currentElement)
                            conty--;
                        else
                            next = false;
                    }
                    else
                        next = false;
                }
                next = true;
                while($('#'+conty +" img").attr("src") == currentElement && next  && (conty >= limity1 && conty <= limity2)){
                    points+=10;
                    $('#score-text').html(points);
                    elementsWonHorizontally.push(conty);
                    if($('#'+(Number(conty)+1)).length > 0)
                        conty++;
                    else{
                        next = false;
                    }
                }
            }


            $.each(elementsWonVertically, function(i, el){
                if($.inArray(el, elementsWonIteration) === -1) elementsWonIteration.push(el);
            });
            $.each(elementsWonHorizontally, function(i, el){
                if($.inArray(el, elementsWonIteration) === -1) elementsWonIteration.push(el);
            });
            elementsWon = elementsWon.concat(elementsWonIteration);
        }
        eWon = [];
        $.each(elementsWon, function(i, el){
            if($.inArray(el, eWon) === -1) eWon.push(el);
        });

        if(eWon.length > 0) {
            onPuntuation(eWon);
        }else{
            $('.candy').draggable( 'enable' );
        }
    }
    
    function onPuntuation(elementsWon) {
        $.each(elementsWon, function( i, value ) {
            for(var t=0; t<3;t++) {
                $('#' + value).animate({
                    opacity: 0,
                }, 250);
                $('#' + value).animate({
                    opacity: 100,
                }, 250);
            }

        });
        setTimeout(function(){
            $.each(elementsWon, function( i, value ) {
                $('#'+value+" img").attr("src","");
            });

            for(column=0; column < 7; column++){
                var element1 = (Number(7*column)+1);
                if($('#'+element1+" img").attr("src") == ""){
                    var x = Math.floor(Math.random() * 4) + 1;
                    $('#'+element1+" img").attr("src","image/" + x + ".png");
                    posx = $('#' + element1).offset().left;
                    posy = $('#' + element1).offset().top;
                    $("#" + element1).offset({top: 0, left: posx});
                    parameters = {top: 0};

                    $('#'+element1).animate(parameters,
                        {easing: 'linear', duration: 1000, queue: false } );
                }
                row = 7;
                for(c=(Number(element1 + 6)); c >= element1; c--) {
                    setImg = false;
                    if ($('#' + c + " img").attr("src") == "") {
                        posy = 0;
                        for (d = 1; d <= (row - 1); d++) {
                            if ($('#' + (c - d) + " img").attr("src") != "" && setImg == false) {
                                $('#' + (c) + " img").attr("src", $('#' + (c - d) + " img").attr("src"));
                                $('#' + (c - d) + " img").attr("src", "");
                                posy = $('#' + (c - d)).offset().top;
                                setImg = true;
                            }
                        }
                        if (!setImg) {
                            var x = Math.floor(Math.random() * 4) + 1;
                            $('#' + c + " img").attr("src", "image/" + x + ".png");
                        }
                        posx = $('#' + c).offset().left;

                        $("#" + c).offset({top: posy, left: posx});
                        parameters = {top: 0};
                        $('#' + c).animate(parameters,
                            {easing: 'linear', duration: 1000, queue: false});
                    }
                    row--;
                }
            }
            setTimeout(function () {
                verifyMove();
            }, 1000);
        }, 1500);

    }

    function endGame() {
        $('.btn-reinicio').html("Iniciar");
        var duration = 1500;
        $('#timer').html(millisToMinutesAndSeconds(0));

        $('.panel-score').attr('style', 'position: absolute; margin-left: 75%; margin-top: 13em; height: 70vh;');
        $('.panel-tablero').hide("slide", { direction: "left", easing: 'linear', queue: false }, duration);

        $( ".panel-score" ).animate({
            width: "89%",
            marginLeft: "0%",
            queue: false
        },  {easing: 'linear', duration: duration, queue: false } );

        $( ".time" ).effect( "size", { to: { width: 20, height: 20 } }, duration, function callback() {
            $( ".time" ).attr('style', 'display:none;');
        });
        $('.panel-score').before('<div style="text-align: center" id="gameFinishTittle" class="main-titulo">Juego Terminado</div>');
    }

    $('.btn-reinicio').off('click');
    $('.btn-reinicio').on('click', function () {
        if($('.btn-reinicio').html() == "Iniciar"){
            $('.btn-reinicio').html("Reiniciar");
            myTimer.stop();
            myTimer.start(120);
            startGame();
        }
        else {
            myTimer.stop();
            endGame();
        }
    });


    function initDragAndDrop() {
        for (i = 1; i <= 49; i++) {

            $('#' + i).off('mousedown');
            $('#' + i).on('mousedown', function () {
                positionX = $(this).offset().left;
                positionY = $(this).offset().top;
            });

            x1 = $('#' + (i-7)).length > 0 ? Number($('#' + (i-7)).offset().left) : Number($('#' + (1)).offset().left);
            y1 = $('#' + (i-1)).length > 0 ? Number($('#' + (i-1)).offset().top) : Number($('#' + (1)).offset().top);
            x2 = $('#' + (i+7)).length > 0 ? Number($('#' + (i+7)).offset().left) : Number($('#' + (49)).offset().left);
            y2 = $('#' + (i+1)).length > 0 ? Number($('#' + (i+1)).offset().top) : Number($('#' + (49)).offset().top);

            if(((Number(i)-1) % 7) == 0 ){ y1 = $('#' + i).offset().top; }
            if((i % 7) == 0){ y2 = $('#' + i).offset().top; }
            if(i >= 1 && i <= 7){ x1 = $('#' + i).offset().left; }
            if(i >= 43 && i <= 49){ x2 = $('#' + i).offset().left; }

            $('#' + i).draggable({
                cursor: 'move',
                revert: "invalid",
                zIndex: 10000,
                containment: [x1, y1, x2, y2]
            });
        }
        $('.candy').droppable({
            drop: function( event, ui ) {
                dragElement = ui.draggable[0].id;
                dropElement = this.id;

                var objectButtom = (Number(dragElement)+1);
                var objectTop = (Number(dragElement)-1);
                var objectLeft= (Number(dragElement)-7);
                var objectRigth = (Number(dragElement)+7);

                if (dropElement == objectButtom || dropElement == objectTop
                    || dropElement == objectRigth || dropElement == objectLeft){

                    ui.draggable.draggable({ revert: "invalid"});
                    $('.candy').draggable( 'disable' );

                    moves++;
                    $('#movimientos-text').html(moves);

                    //cambiar posicion
                    img1 = $('#'+dragElement+" img").attr("src");
                    img2 = $('#'+dropElement+" img").attr("src");

                    var parameters = {};
                    var afterMoveElement = function () {
                        cordx1 = $('#'+dragElement).offset().left;
                        cordy1 = $('#'+dragElement).offset().top;
                        cordx2 = $('#'+dropElement).offset().left;
                        cordy2 = $('#'+dropElement).offset().top;

                        $("#"+dragElement).offset({ top: cordy2 , left: cordx2});
                        $("#"+dropElement).offset({ top: cordy1 , left: cordx1});
                        $('#'+dragElement+" img").attr("src", img2);
                        $('#'+dropElement+" img").attr("src", img1);
                        verifyMove();
                    }

                    if(dropElement == objectButtom){
                        parameters = {top: -($('#'+dropElement).offset().top - positionY), queue: false};
                    }
                    if(dropElement == objectTop){
                        parameters = {top: Number(positionY) - $('#'+dropElement).offset().top, queue: false};
                    }
                    if(dropElement == objectLeft){
                        parameters = {left: -($('#'+dropElement).offset().left - positionX), queue: false};
                    }
                    if(dropElement == objectRigth){
                        parameters = {left: Number(positionX) - $('#'+dropElement).offset().left, queue: false};
                    }

                    $('#'+dropElement).animate(parameters,
                        {easing: 'linear', duration: 1000, queue: false, complete: afterMoveElement } );

                    $("#"+dragElement).offset({ top: $('#'+dropElement).offset().top , left: $('#'+dropElement).offset().left});
                } else {
                    ui.draggable.draggable({ revert: true  });
                }
            },
        });
    }

    var myTimer = new Timer({
        tick    :1,ontick  : function(ms) {
            $('#timer').html(millisToMinutesAndSeconds(ms));
        },
        onend   : function() {
            endGame();
        }
    });

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return "0" + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
} );