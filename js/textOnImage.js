var backgroundColor = "";
var gradientActive = false;

var titleX = 80;
var titleY = 110;
var titleWidth = 500;

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
    logo.src = 'Images/Hiring.png';

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

        console.log(picture.src);
        
        context.drawImage(logo, 0, 0);

        context.drawImage(picture, 0, 0);

        context.font = "48px albert-bold";
        context.fillStyle = "#333";
        wrapText(context, title, titleX, titleY, titleWidth, 52);
        
        context.font = "28px albert-reg";
        context.fillStyle = "#333";
        wrapText(context, quote, quoteX, quoteY, quoteWidth, 34);

        context.font = "28px albert-reg";
        context.fillStyle = "#333";
        context.fillText('"', (quoteX - 10), (quoteY) );

        context.font = "18px albert-reg";
        context.fillStyle = "#333";
        context.fillText(author, authorX, authorY);       
    }

    $("#download").on("click", function(){
        downloadCanvas(this, 'myCanvas', 'RussIsAce.png');
    });

    $(".color-picker").on("change", function(){
        gradientActive = false;
        backgroundColor = $('.color-picker').val();
        drawCanvas();        
    });

    $(".pls-grad").on("click", function(){
        gradientActive = true;
        colorStop1 = "#6a3178";
        colorStop2 = "#217cbc";  
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

    $(".add-lawyer").on("click", function(){
        drawCanvas();
    });


});