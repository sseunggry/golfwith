function Common() {	
	var preventEvent = function(e) { e.preventDefault(); };
	
	this.blockpage = function() {
		
		$('#bfade').remove();
		$('body').append('<div id="bfade" style="display: none;background: #FFFFFF;filter:alpha(opacity=50) \9;background: rgba(255,255,255,0.5);position: fixed;left: 0;top: 0;width: 100%;height: 100%;z-index: 99999;"></div>');
		$('#bfade').fadeIn(300);

		if(!$(window).data("spinner")) {
			
			$("body").append('<div id="loadingObject" style="width:10px"></div>');		
			var target = $('#loadingObject');			
			var opts = {
			  lines: 13, // The number of lines to draw
			  length: 24, // The length of each line
			  width: 12, // The line thickness
			  radius: 28, // The radius of the inner circle
			  corners: 1, // Corner roundness (0..1)
			  rotate: 5, // The rotation offset
			  direction: 1, // 1: clockwise, -1: counterclockwise
			  color: '#000', // #rgb or #rrggbb or array of colors
			  speed: 1, // Rounds per second
			  trail: 100, // Afterglow percentage
			  shadow: false, // Whether to render a shadow
			  hwaccel: false, // Whether to use hardware acceleration
			  className: 'spinner', // The CSS class to assign to the spinner
			  zIndex: 2e9, // The z-index (defaults to 2000000000)
			  top: '50%', // Top position relative to parent
			  left: '50%', // Left position relative to parent
			  position: 'fixed'
			};
			
			var spinner = new Spinner(opts).spin(target.get(0));			
			$(window).data("spinner", spinner);
		} else {
			$(window).data("spinner").spin($('#loadingObject').get(0));
		}
	}
	
	this.unblockpage = function() {
		$('#bfade').fadeOut(300, function() {

		});
		if($(window).data("spinner")) $(window).data("spinner").stop();
	}

	this.beforeSend = function(xhr) {
		
	};
	
	this.onErrorGetJSON = function(responseData, textStatus, errorThrown) {

	};
	
	this.onCompleteGetJSON = function() {		

	};
	
	this.getJSON = function(url, method, parameters, successFunc, errorFunc) {
		if (typeof errorFunc === 'undefine') {
			errorFunc = this.onErrorGetJSON;
		}
		
		var ithis = this;
		$.ajax({
			type: method,
			url: url,
			data: parameters, 
			dataType: 'text',
			beforeSend: this.beforeSend,
			success: successFunc,
			error: errorFunc,
			complete: this.onCompleteGetJSON
		});
	};
	
	/**
	 * ajax호출시 필요
	 * */
	this.getObjectList = function(url, method, params, successFunc, errorFunc) {
		var ithis = this;
		var po = [];
			po.push(params);
			po.push("rand="+(Math.random()));
		this.getJSON(url, method, 
			po.join("&"),
				function(responseData) {
					//Log(responseData)
					successFunc(responseData);
				}, function(xhr, status, error) {
					
					if(xhr.status==302) {
						
					} else if(xhr.status==401) {
						if(window.authMessage == undefined) {
							window.authMessage = 1;
							common.showMessage("권한이 없습니다. 로그인 해주세요.");
							common.goLoginPage();
						}
					}
				}
			);
	};
	
	this.jsonString = function(params) {
		var myJSONText = JSON.stringify(params, function replacer(key, value) {			
			if (typeof value === 'number' && !isFinite(value)) {		
				return String(value);		
			}		
			return value;
		});
		return myJSONText;
	};
	
	this.getParameterByName = function(name) {
			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
					results = regex.exec(location.search);
			return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};
}


Common.prototype = {
}
Common.prototype.constructor = Common;
var common = new Common();