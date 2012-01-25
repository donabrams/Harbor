var replaceAll = function(str, substr, replaceWith) {
	if (str == null) {
		return null;
	}
	var out = str.replace(substr, replaceWith);
	while (out.indexOf(substr) >= 0) {
		out = out.replace(substr, replaceWith);
	}
	return out;
};
$(function() {
	/*
	var setup;
	var ws;
	setup = function() {
		ws = new WebSocket("ws://184.106.177.88:8080");
		var $log = $("#log");
		ws.onopen = function(evt) {
			("<p>Connection open</p>");
		}
		ws.onmessage = function(evt) {
			console.log("<p>Received:" + evt.data + "</p>");
		}
		ws.onclose = function(evt) {
			console.log("<p>Connection closed</p>");
			$("#send").unbind('click');
			setTimeout(setup, 1000);
		}
		$("#send").click(function(event) {
			var msg = $("#command").val();
			ws.send(msg);
			console.log("sending message:" + msg);
			console.log("<p>Sent: " + msg + "</p>");
			event.stopPropagation();
		});
		console.log("<p>Connection open</p>");
	}
	setup();
	*/
	
  var appid = "b6f343a25cac4b39a7aa799bdd8c0f47";
  var apikey = "99ca2c5973394422a839c30948d46b87";
  cloudmine.init({app_id: appid, api_key: apikey});
  var dataCache = {};

	var pushData = function(callback) {
		console.log("Pushing:");
		console.log(dataCache);
		cloudmine.updateValue(teacher, dataCache, callback);
	}

	var addUrl = function(url, doUpdate) {
		if (url.indexOf("http") != 0) {
			url = "http://" + url;
		}
		var li = document.createElement("li");
		var $li = $(li);
		$li.html(replaceAll($("#builderEntity").html(),"${url}", url));
		var list = $("#builder ul");
		$(".eyesOn", li).click(function() {
			var url = $("h3", li).html();
			dataCache.eyesOn = url;
			$("#viewer iframe").attr("src", url).show();
			pushData();
		});
		$(".delete", li).click(function() {
			var url = $("h3", li).html();
			console.log("Removing " + url);
			for (var i in dataCache.sites) {
				if (dataCache.sites[i] == url) {
					dataCache.sites.splice(i, 1);
					pushData();
					break;
				}
			}
			$li.remove();
		})
		dataCache.sites = dataCache.sites || [];
		dataCache.sites.push(url);
		if (typeof doUpdate == "undefined" || doUpdate) {
			pushData(function() {		
				list.append(li);
				$("#newUrl").val("").blur();
			});
		}
		else {
			list.append(li);
			$("#newUrl").val("").blur();
		}
	};
	
   var fetch = function() {
       cloudmine.getValues(null, {
           success: function(success){
               success.forEach(function(key, value) {
								if (key == teacher) {
									if (value.sites) {
								 		for (var i in value.sites) {
											addUrl(value.sites[i], false);
										}
									}
                  dataCache = value;
								}
               });
           }
       });
   };
   fetch();

	var fixSites = function() {};
	
	$("form").submit(function() {
		try {
			var url = $("#newUrl").val();
			addUrl(url);
		} catch(err) {
			alert("There was an error adding this page.");
		}
		return false;
	});
	$('#builder input[title!=""]').hint();
	
	$("#builder p").fitText(.9);
});