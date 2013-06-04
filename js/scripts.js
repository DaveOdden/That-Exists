$(function() {
	$('#css-box').val('body {\nmargin: 0;\nfont-family: "Helvetica Neue", Helvetica, Arial, sans-serif;\nfont-size: 13px;\nline-height: 18px;\ncolor: #333333;\nbackground-color: #ffffff;\n}\n\na {\ncolor: #0088cc;\ntext-decoration: none;\n}\n\na:hover {\ncolor: #005580;\ntext-decoration: underline;\n}\n\n');
	
	// initialize editor
	var editor = CodeMirror.fromTextArea(document.getElementById("css-box"), {
  		mode: "text/css",
  		styleActiveLine: true,
  		lineNumbers: true,
  		lineWrapping: true
	});
	
	// clearing white spaces from specific result spans
	jQuery.fn.htmlClean = function() {
	    this.contents().filter(function() {
	        if (this.nodeType != 3) {
	            $(this).htmlClean();
	            return false;
	        }
	        else {
	            this.textContent = $.trim(this.textContent);
	            return !/\S/.test(this.nodeValue);
	        }
	    }).remove();
	    return this;
	}
	
	// handling input & textarea selection on click
	$('input[type="text"], textarea').focus(function() {
		var _self = this;
		setTimeout(function(){ console.log(_self.select())},100);
	});

	// executing search on enter
	$('#search-section').keydown(function(event){   
	    if(event.keyCode==13){ $('#search-btn-two').trigger('click'); return false;}
	});
	
	// search again
	$('.back-btn').click(function() {
		$('#results-section').removeClass('translate');
		$('#search-box-two').focus();
	});


	// search through css
	$('#search-btn-two').click(function() {
		var str = editor.getValue();
		var given_value = $('#search-box-two').val();
		var pilr = new Array();
		
		// ALL
		if($('#all-radio').is(':checked')) {
			var tokens = str.split('}');
			
			$('#result').html('');
			for (var i = 0; i < tokens.length; i++) {
				if(tokens[i].indexOf(given_value) != -1) {
					var t = tokens[i];
					t = str.indexOf(t);
	                   var v = str.slice(0,t);
	                   var lines = v.split("\n");
					var	line_num = lines.length+1;
					pilr.push('<div line="'+line_num+'">' + tokens[i] + '}</div><br>');
				}
			}
			$('#result').html(prettyPrintOne(pilr.join("")));
			$('#result div span:nth-child(1)').htmlClean();
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
					var t = tokens[i];
					t = str.indexOf(t);
                    var v = str.slice(0,t);
                    var lines = v.split("\n");
					var	line_num = lines.length+1;
					pilr.push('<div line="'+line_num+'">' + tokens[i] + '}</div><br>');
				}
			}
			$('#result').html(prettyPrintOne(pilr.join("")));
			$('#result div span:nth-child(1)').htmlClean();
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
					var t = tokens[i];
					t = str.indexOf(t);
                    var v = str.slice(0,t);
                    var lines = v.split("\n");
					var	line_num = lines.length+1;
					pilr.push('<div line="'+line_num+'">' + tokens[i] + '}</div><br>');
				}
			}
			$('#result').html(prettyPrintOne(pilr.join("")));
			$('#result div span:nth-child(1)').htmlClean();
		}
		
		$('#results-section').addClass('translate');
		
		if($('#result').text() == '') {
			$('#result').html('<div id="no-content">No Results</div>');
		}
	});
});