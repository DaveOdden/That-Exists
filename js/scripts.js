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
	$('form').keydown(function(event){    
	    if(event.keyCode==13){ $('#search-btn').trigger('click'); return false;}
	});

	// search through css
	$('#search-btn').click(function() {
		var str = $('#css-box').val();
		var given_value = $('#search-box').val();
		
		// ALL
		if($('#all-radio').is(':checked')) {
			var tokens = str.split('}');

			$('#result').html('');
			for (var i = 0; i < tokens.length; i++) {
				if(tokens[i].indexOf(given_value) != -1) {
					$('#result').html($('#result').html() + tokens[i] + '} <br>');
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