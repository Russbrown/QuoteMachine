var backgroundColor = "";
var gradientActive = false;
var textColor = "#333";

var titleX = 80;
var titleY = 110;
var titleWidth = 500;
var titleSize = 48;

var quoteX = 80;
var quoteY = 160;
var quoteWidth = 500;

var authorX = 80;
var authorY = 300;
var authorWidth = 500;



$(document).ready(function () {

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    
    var logo = new Image();
    logo.src = 'Images/Logo-dark.png';

    var picture = new Image();
    picture.src = 'Images/people/Annett.png';

    function wrapText (context, text, x, y, maxWidth, lineHeight) {
        
        var words = text.split(' '),
            line = '',
            lineCount = 0,
            i,
            test,
            metrics;

        for (i = 0; i < words.length; i++) {
            test = words[i];
            metrics = context.measureText(test);
            while (metrics.width > maxWidth) {
                // Determine how much of the word will fit
                test = test.substring(0, test.length - 1);
                metrics = context.measureText(test);
            }
            if (words[i] != test) {
                words.splice(i + 1, 0,  words[i].substr(test.length))
                words[i] = test;
            }  

            test = line + words[i] + ' ';  
            metrics = context.measureText(test);
            
            if (metrics.width > maxWidth && i > 0) {
                context.fillText(line, x, y);
                line = words[i] + ' ';
                y += lineHeight;
                lineCount++;
            }
            else {
                line = test;
            }
        }
                
        context.fillText(line, x, y);
    }

	function downloadCanvas(link, canvasId, filename) {
	    link.href = document.getElementById(canvasId).toDataURL();
	    link.download = filename;
	}
    
    function clearCanvas(cnv) {
      var ctx = cnv.getContext('2d');     // gets reference to canvas context
      ctx.beginPath();    // clear existing drawing paths
      ctx.save();         // store the current transformation matrix

      // Use the identity matrix while clearing the canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cnv.width, cnv.height);

      ctx.restore();        // restore the transform
    }
    
    $(".add-text").on("click", function(){
        drawCanvas();
    });

    function drawCanvas(){
        var title = $('.title-input').val();
        var quote = $('.quote-input').val();
        var author = $('.author-input').val();
        
        clearCanvas(document.getElementById('myCanvas'));
        
        if (gradientActive) {
            gradient = context.createLinearGradient(0,0,canvas.width,canvas.height);
            gradient.addColorStop(0,colorStop1);
            gradient.addColorStop(1,colorStop2);
            context.fillStyle = gradient;
            context.fillRect(0,0, canvas.width, canvas.height);
        } else {
            context.fillStyle = "#" + backgroundColor;
            context.fillRect(0,0, canvas.width, canvas.height);
        }

        context.drawImage(logo, 0, 0); // draw the image if its already there

        $(logo).on('load', function(){ // draw it after load if its new
            context.drawImage(logo, 0, 0);
        });

        context.drawImage(picture, 0, 0); // draw the image if its already there

        $(picture).on('load', function(){ // draw it after load if its new
            context.drawImage(picture, 0, 0);
        });

        context.font = titleSize + "px albert-bold";
        context.fillStyle = textColor;
        wrapText(context, title, titleX, titleY, titleWidth, 52);
        
        context.font = "28px albert-reg";
        context.fillStyle = textColor;
        wrapText(context, quote, quoteX, quoteY, quoteWidth, 34);

        context.font = "28px albert-reg";
        context.fillStyle = textColor;
        context.fillText('"', (quoteX - 10), (quoteY) );

        context.font = "18px albert-reg";
        context.fillStyle = textColor;
        context.fillText(author, authorX, authorY);       
    }

    $("#download").on("click", function(){
        downloadCanvas(this, 'myCanvas', 'Quote.png');
    });

    $(".color-picker").on("change", function(){
        gradientActive = false;
        backgroundColor = $('.color-picker').val();
        drawCanvas();        
    });

    $(".pls-grad").on("click", function(){
        gradientActive = true;
        colorStop1 = "#6F3075";
        colorStop2 = "#A2266B";  
        drawCanvas();      
    });

    $(".bls-grad").on("click", function(){
        gradientActive = true;
        colorStop1 = "#594897";
        colorStop2 = "#1C6DAF";  
        drawCanvas();      
    });

    $(".dark-text").on("click", function(){
        textColor = "#333";
        logo.src = 'Images/Logo-dark.png';
        drawCanvas();
    });

    $(".light-text").on("click", function(){
        textColor = "#eee";
        logo.src = 'Images/Logo-light.png';
        drawCanvas();
    });

    $(".title-input").on("input", function(){
        var title = $('.title-input').val();
        drawCanvas();
    });    

    $(".up-title").on("click", function(){
        titleY = titleY - 10;
        drawCanvas();
    });

    $(".down-title").on("click", function(){
        titleY = titleY + 10;
        drawCanvas();
    });

    $(".widen-title").on("click", function(){
        titleWidth = titleWidth + 10;
        drawCanvas();
    });

    $(".shorten-title").on("click", function(){
        titleWidth = titleWidth - 10;
        drawCanvas();
    });

    $(".bigger-title").on("click", function(){
        titleSize = titleSize + 2;
        drawCanvas();
    });

    $(".smaller-title").on("click", function(){
        titleSize = titleSize - 2;
        drawCanvas();
    });

    $(".quote-input").on("input", function(){
        var quote = $('.quote-input').val();
        drawCanvas();
    }); 

    $(".up-quote").on("click", function(){
        quoteY = quoteY - 10;
        drawCanvas();
    });

    $(".down-quote").on("click", function(){
        quoteY = quoteY + 10;
        drawCanvas();
    });

    $(".widen-quote").on("click", function(){
        quoteWidth = quoteWidth + 10;
        drawCanvas();
    });

    $(".shorten-quote").on("click", function(){
        quoteWidth = quoteWidth - 10;
        drawCanvas();
    });

    $(".author-input").on("input", function(){
        var author = $('.author-input').val();
        drawCanvas();
    });

    $(".up-author").on("click", function(){
        authorY = authorY - 10;
        drawCanvas();
    });

    $(".down-author").on("click", function(){
        authorY = authorY + 10;
        drawCanvas();
    });

    $(".lawyer-select").on("change", function(){
        var lawyer = $(this).find(":selected").attr('data-src');
        picture.src = 'Images/people/' + lawyer;
        drawCanvas();
    });


});