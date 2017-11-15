$(function() {
    positionX = 0;
    positionY = 0;
    moves = 0;

    //animateTitle();
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

        $('#movimientos-text').html(moves);
        $('.panel-tablero').show();
        $('.panel-score').attr('style', 'position: relative; ');
        $('.time').attr('style', 'display:block; ');

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
        setTimeout(function(){ init(); }, 3000);
    }

    function verifyMove(){
        var won = 0;
        limitx1 = 1;
        limitx2 = 42;
        limity1 = 1;
        limity2 = 7;
        for (i = 1; i <= 49; i++) {
            var elementLeft = $('#'+(i-7) +" img").attr("src");
            var currentElement = $('#'+(i) +" img").attr("src");
            var elementRigth = $('#'+(i+7) +" img").attr("src");
            var elementTop = $('#'+(i-1) +" img").attr("src");
            var elementButtom = $('#'+(i+1) +" img").attr("src");

            var elementsWon = [];


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
                    elementsWon.push(contx);
                    if($('#'+(Number(contx)+7)).length > 0)
                        contx +=7;
                    else{
                        next = false;
                    }
                }
            }
            console.log(i,elementsWon);
            elementsWon = [];
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
                console.log(conty);
                next = true;
                while($('#'+conty +" img").attr("src") == currentElement && next  && (conty >= limity1 && conty <= limity2)){
                    elementsWon.push(conty);
                    if($('#'+(Number(conty)+1)).length > 0)
                        conty++;
                    else{
                        next = false;
                    }
                }
            }
            console.log(i,elementsWon);

        }
    }

    function endGame() {
        var duration = 1500;
        $('#timer').html(millisToMinutesAndSeconds(0));

        $('.panel-score').attr('style', 'position: absolute; margin-left: 75%; margin-top: 9em;');
        $('.panel-tablero').hide("slide", { direction: "left", easing: 'linear', queue: false }, duration);

        $( ".panel-score" ).animate({
            width: "89%",
            marginLeft: "0%",
            queue: false
        },  {easing: 'linear', duration: duration, queue: false } );

        $( ".time" ).effect( "size", { to: { width: 20, height: 20 } }, duration, function callback() {
            $( ".time" ).attr('style', 'display:none;');
        });
    }


    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return "0" + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    var myTimer = new Timer({
        tick    : 1,
        ontick  : function(ms) {
            $('#timer').html(millisToMinutesAndSeconds(ms));
        },
        onend   : function() {
            endGame();
        }
    });


    $('.btn-reinicio').on('click', function () {
        if($('.btn-reinicio').html() == "Iniciar"){
            $('.btn-reinicio').html("Reiniciar");
            myTimer.stop();
            myTimer.start(12000);
            startGame();
        }
        else {
            $('.btn-reinicio').html("Iniciar");
            myTimer.stop();
            endGame();
        }
    });


    function init() {
        for (i = 1; i <= 49; i++) {

            $('#' + i).off('mousedown');
            $('#' + i).on('mousedown', function () {
                positionX = $(this).offset().left;
                positionY = $(this).offset().top;
            });

            x1 = Number($('#' + i).offset().left) - Number($($('.candy')[0]).width());
            y1 = Number($('#' + i).offset().top) - Number($($('.candy')[0]).height());
            x2 = Number($('#' + i).offset().left) + Number($($('.candy')[0]).width());
            y2 = Number($('#' + i).offset().top) + Number($($('.candy')[0]).height());

            if (x1 < Number($('#' + 1).offset().left)) {
                x1 = Number($('#' + 1).offset().left);
            }
            if (x2 > Number($('#' + 49).offset().left)) {
                x2 = Number($('#' + 49).offset().left);
            }
            if (y1 < Number($('#' + 1).offset().top)) {
                y1 = Number($('#' + 1).offset().top);
            }
            if (y2 > Number($('#' + 49).offset().top)) {
                y2 = Number($('#' + 49).offset().top);
            }

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

                if (dropElement == (Number(dragElement)+1) || dropElement == (dragElement-1)
                    || dropElement == (Number(dragElement)+7) || dropElement == (dragElement-7)){
                    ui.draggable.draggable({ revert: "invalid"});

                    moves++;
                    $('#movimientos-text').html(moves);

                    //cambiar posicion
                    img1 = $('#'+dragElement+" img").attr("src");
                    img2 = $('#'+dropElement+" img").attr("src");
                    //abajo
                    if(dropElement == (Number(dragElement)+1)){
                        $('#'+dropElement).animate({
                            top: -($('#'+dropElement).offset().top - positionY),
                            queue: false
                        },  {easing: 'linear', duration: 1000, queue: false, complete: function() {
                            cordx1 = $('#'+dragElement).offset().left;
                            cordy1 = $('#'+dragElement).offset().top;
                            cordx2 = $('#'+dropElement).offset().left;
                            cordy2 = $('#'+dropElement).offset().top;

                            $("#"+dragElement).offset({ top: cordy2 , left: cordx2});
                            $("#"+dropElement).offset({ top: cordy1 , left: cordx1});
                            $('#'+dragElement+" img").attr("src", img2);
                            $('#'+dropElement+" img").attr("src", img1);
                            verifyMove();
                        } } );
                    }
                    //arriba
                    if(dropElement == (Number(dragElement)-1)){
                        $('#'+dropElement).animate({
                            top: Number(positionY) - $('#'+dropElement).offset().top,
                            queue: false
                        },  {easing: 'linear', duration: 1000, queue: false, complete: function() {
                            cordx1 = $('#'+dragElement).offset().left;
                            cordy1 = $('#'+dragElement).offset().top;
                            cordx2 = $('#'+dropElement).offset().left;
                            cordy2 = $('#'+dropElement).offset().top;

                            $("#"+dragElement).offset({ top: cordy2 , left: cordx2});
                            $("#"+dropElement).offset({ top: cordy1 , left: cordx1});
                            $('#'+dragElement+" img").attr("src", img2);
                            $('#'+dropElement+" img").attr("src", img1);
                            verifyMove();
                        } } );
                    }
                    //izquierda
                    if(dropElement == (Number(dragElement)-7)){
                        $('#'+dropElement).animate({
                            left: -($('#'+dropElement).offset().left - positionX),
                            queue: false
                        },  {easing: 'linear', duration: 1000, queue: false, complete: function() {
                            cordx1 = $('#'+dragElement).offset().left;
                            cordy1 = $('#'+dragElement).offset().top;
                            cordx2 = $('#'+dropElement).offset().left;
                            cordy2 = $('#'+dropElement).offset().top;

                            $("#"+dragElement).offset({ top: cordy2 , left: cordx2});
                            $("#"+dropElement).offset({ top: cordy1 , left: cordx1});
                            $('#'+dragElement+" img").attr("src", img2);
                            $('#'+dropElement+" img").attr("src", img1);
                            verifyMove();
                        }} );
                    }
                    //derecha
                    if(dropElement == (Number(dragElement)+7)){
                        $('#'+dropElement).animate({
                            left: Number(positionX) - $('#'+dropElement).offset().left,
                            queue: false
                        },  {easing: 'linear', duration: 1000, queue: false, complete: function() {
                            cordx1 = $('#'+dragElement).offset().left;
                            cordy1 = $('#'+dragElement).offset().top;
                            cordx2 = $('#'+dropElement).offset().left;
                            cordy2 = $('#'+dropElement).offset().top;

                            $("#"+dragElement).offset({ top: cordy2 , left: cordx2});
                            $("#"+dropElement).offset({ top: cordy1 , left: cordx1});
                            $('#'+dragElement+" img").attr("src", img2);
                            $('#'+dropElement+" img").attr("src", img1);
                            verifyMove();
                        } } );
                    }



                    $("#"+dragElement).offset({ top: $('#'+dropElement).offset().top , left: $('#'+dropElement).offset().left});
                } else {
                    ui.draggable.draggable({ revert: true  });

                }
            },
        });

    }



} );