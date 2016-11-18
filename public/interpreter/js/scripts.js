$(document).ready(function() {

	var socket = io();

	var idproject = $('#idPro').text();

	socket.emit('columnsbyproject', idproject);

	socket.on('loadcolumns', function (data) {
		clearAll();
		renderAll(data);
		$('video').mediaelementplayer({
	    	loop: true,
	    	enableAutosize: true,
	    	features: ['volume'],
	    	startVolume: 0,
	    	plugins: ['youtube']
	    });
	});


	socket.on('loadcolumnsinview' + idproject + '', function (data) {
		clearAll();
		renderAll(data);
		$('video').mediaelementplayer({
	    	loop: true,
	    	enableAutosize: true,
	    	features: ['volume'],
	    	startVolume: 0,
	    	plugins: ['youtube']
	    });
	});

	var contentBox = $("#content");

	function clearAll(){
		contentBox.children().remove();
	}
	
	function renderAll(modules){
		for(x in modules){
			switch(modules[x].type) {
			    case "text":
			    	if (modules[x].template == 1){
			    		renderTextOne(modules[x], x);
			    	} else if (modules[x].template == 2){
			    		renderTextTwo(modules[x], x);
			    	}
			        break;
			    case "image":
			        renderImage(modules[x], x);
			        break;
			    case "video":
			        renderVideo(modules[x]);
			        break;
			    default:
			        console.log("No se reconoce tipo de modulo");
			} 
		}
	}

    function renderTextOne(data, index){
	    var idText = 'text-' + index; 
	    var textModel = `<div id="${idText}" class="modulo content-text content-text-one">
	              			<div class="text">
	              				<h1>${data.t1}</h1>
	              				<h4>${data.t2}</h4>
	              			</div>
	            		</div>`;
	    contentBox.append(textModel); 
	    // espacio al titulo
	    var title1 = "" + $('#' + idText + ' .text h1').text();
	    var res = title1.split(" ");
	    var result = "";
	    for(x in res){
	    	if (x == 1){
	    		result += res[x] + "</br>";
	    	} else {
	    		result += res[x] + " ";
	    	}  	
	    }
	    $('#' + idText + ' .text h1').html(result);
		// Agregar emojis
		var original = $('#' + idText + ' .text').html();
		var converted = emojione.shortnameToImage(original);
		var original = $('#' + idText + ' .text').html(converted);
    }

    function renderTextTwo(data, index){
	    var idText = 'text-' + index; 
	    var textModel = `<div id="${idText}" class="modulo content-text content-text-two">
	              			<div class="text">
	              				<h1>${data.t1}</h1>
	              				<p>${data.t2}</p>
	              			</div>
	            		</div>`;
	    contentBox.append(textModel);   
		// Agregar emojis
		var original = $('#' + idText + ' .text').html();
		var converted = emojione.shortnameToImage(original);
		var original = $('#' + idText + ' .text').html(converted);
    }

    function renderImage(data, index){
	    var idImage = 'img-' + index; 
	    var imgModel = `<div id="${idImage}" class="modulo content-img">
	    					<div class="filterImg"></div>	
	            		</div>`;
	    contentBox.append(imgModel); 
		$('#' + idImage).css({
			'background-image'  	: "url('" + data.url + "')",
			'background-position'  	: "center"
		});
    }

     function renderVideo(data){
	    var imgModel = `<div class="modulo">
							<video width="100%" height="100%" autoplay="" controls="false">
					   			 <source type="video/youtube" src="${data.url}" />
							</video>
						</div>`;
	    contentBox.append(imgModel); 
    }

});