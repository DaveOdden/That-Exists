$(function() {
	// set fade height
	var fade_height = $('#result').height();
	$('#results-section span').css('height',fade_height);
		
	// selecting input & textarea
	$('input[type="text"], textarea').focus(function() {
		var _self = this;
		setTimeout(function(){ console.log(_self.select())},100);
	});

	// executing search on enter
	$('#search-box').keydown(function(event){    
	    if(event.keyCode==13){ $('#search-btn').trigger('click'); return false;}
	});

	// search through css
	$('#search-btn').click(function() {
		var str = $('#css-box').val();
		var given_value = $('#search-box').val();
		
		// ALL
		if($('#all-radio').is(':checked')) {
			var tokens = str.split('}');
			
			
			//t = t.split("\n")
			//var tok_index = str.indexOf(tokens[3].charAt(0));
			//alert(tok_index);
			//var lines = str.slice(0,tok_index).split("\n");
			//alert(str.slice(0,tok_index - tokens[2].length));
			
			//var lines = $("#ptest").val().split("\n");  
			//alert(lines.length);
			
			
			var ticker = 1;
			$('#result, #lines').html('');
			for (var i = 0; i < tokens.length; i++) {
				if(tokens[i].indexOf(given_value) != -1) {
					//if (lines[i].Contains(someString)) {
					//console.log(str.split(/\r?\n|\r/).length);
					//var lines = str.split(tokens[i]);
					//console.log(str.indexOf(tokens[i]));
					var ini_height = $('#result').height();
					var t = tokens[i];
					t = str.indexOf(t);
					var v = str.slice(0,t);
					var lines = v.split("\n");
					$('#lines').html($('#lines').html() + '<div>'+(lines.length+1)+'</div>');
					$('#result').html($('#result').html() + tokens[i] + '} <br>');
					var nudge = $('#result').height() - ini_height;
					$('#lines div:nth-child('+ticker+')').css('marginTop',ini_height);
					ticker++;
				}
			}
		}
		
		// SELECTOR
		if($('#selector-radio').is(':checked')) {
			var selectors_array = new Array();
			var selector_token = str.split('{');
			var tokens = str.split('}');

			for (var i = 0; i < selector_token.length; i++) {
				selectors_array.push(selector_token[i].substr(selector_token[i].indexOf("}") + 1));
			}
			
			$('#result').html('');
			for (var i = 0; i < selector_token.length; i++) {
				if(selectors_array[i].indexOf(given_value) != -1) {
					$('#result').html($('#result').html() + tokens[i] + '} <br>');
				}
			}
		}
		
		// ATTRIBUTE
		if($('#attribute-radio').is(':checked')) {
			var attribute_array = new Array();
			var attribute_token = str.split('}');
			var tokens = str.split('}');
			
			for (var i = 0; i < attribute_token.length; i++) {
				attribute_array.push(attribute_token[i].substr(attribute_token[i].indexOf("{") + 1));
			}

			$('#result').html('');
			for (var i = 0; i < attribute_token.length; i++) {
				if(attribute_array[i].indexOf(given_value) != -1) {
					$('#result').html($('#result').html() + tokens[i] + '} <br>');
				}
			}
		}
		
		// reset fade height
		fade_height = $('#result').height();
		$('#results-section span').css('height',fade_height);
	});
});