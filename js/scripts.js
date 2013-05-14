$(function() {
	//$('input textarea').click(function() { this.select(); });
	$('#css-box').val('#id { font-size: 1.25em } \na #wrapper.mod { color: red; text-align: left } \nb section { margin: 1em }');
	// search through css
	$('#search-btn').click(function() {
		// get values
		var given_css = $('#css-box').val();
		var given_value = $('#search-box').val();
		
		
		//make sure something was entered
		if(given_value != 'Paste class, id or attribute to search for in stylesheet') {
			// match given value with given css
			var found = given_css.match(new RegExp(given_value));
			
			
			// could not find handling
			if(found != null) {
				// prep to find entire selector series
				var selector = given_css.substring(0, given_css.indexOf(given_value));
				// searching for entire selector series
				var neg_index = 0;
				var stopping_power = 0;
				
				
				if(selector.length > 1) {
					while(neg_character != '}') {
						var neg_character = selector.slice( neg_index , neg_index+1 );
						var neg_character_index = given_css.indexOf(selector.slice( neg_index , neg_index+1 ));
						console.log(neg_character_index +' - Negative - '+ neg_character); // '}'
						neg_index--;
						if(neg_character == '') { stopping_power++; }
						if(stopping_power == 2000) { break; }
					}
					// locate the start position
					var start_pos = given_css.indexOf(found) + neg_index;
					// strip away everything before the given css
					var the_rest = given_css.substring(given_css.indexOf(found) + neg_index); // section { } div { } 
					// strip away everything after the given css
					var selector_series_and_attributes = the_rest.split('}')[1] + '}'; // section { }
					

					// other options (not used)
					var explicit_id = given_css.substring(given_css.indexOf(given_value) - 1).split('}')[0] + ' }';
					var attributes = given_value + ' ' + given_css.split(given_value)[1].split('}')[0] + '}';

					// write to the screen
					$('#result').html('<br><b>RESULT:</b><br><br><blockquote>' + selector_series_and_attributes + '</blockquote>');
				}
				else
					$('#result').html('Oops, something went wrong. Gotta squash this bug...');
			}
			else
				$('#result').html('<br><b>RESULT:</b><br><br><blockquote>Not Found</blockquote>');
		}
		else
			$('#result').html('Please input a value');

	});
});