$(function() {

	var userSettings = "; ===== DO NOT REMOVE THIS SECTION ONLY EDIT YOUR OWN SETTINGS ======";
	var defaultSettings = "isConsole = false";

	var $row = $('<tr>');

	var $rowTemplate = $("<tr>");
	$("<td>").addClass("cname").appendTo($rowTemplate);


	var _init = function(file) {
		$.get(file, function(data) {
			getWhiteLabelItems(data);
		});
	};

	var getWhiteLabelItems = function (rawData) {
		var getData = rawData.split(userSettings);
		getDefaults(getData[0]);
	};

	var getDefaults = function(data) {
		var getData = data.split(defaultSettings);
		var fullData = getData[0] + defaultSettings;
		var list = fullData.match(/[^\r\n]+/g);
		var $row2 = $('<tr>');
		$("<th>").addClass("cname").appendTo($row).html("cname");
		$("<td>").addClass("cname").appendTo($row2);
		for	(var i = 1; i < list.length; i++) {
			var parts = list[i].split(" = ");
			var title = parts[0].replace('styles.', '');
			var value = parts[1].replace(/"/g, '');
			$('<th>')
				.addClass(title)
				.html(title)
				.appendTo($row);
			$("<td>")
				.addClass(title)
				.html(value)
				.appendTo($row2);
			$("<td>")
				.addClass(title)
				.html('n/a')
				.css("color", "lightgray")
				.appendTo($rowTemplate);
		};

		$row.appendTo('table');
		$row2.appendTo('table');

		buildRows(getData[1]);

	};

	var buildRows =function(data) {
		var getData = data.split(/^\s*\n/gm);
		for(var i = 1; i < getData.length -1; i++) {

			var $nr = $rowTemplate.clone();

			var list = getData[i].match(/[^\r\n]+/g);
			for (var j = 0; j < list.length; j++) {
				var item = list[j];

				if(item.indexOf(";") ==0) {
					continue;
				}
				else if (item.indexOf("[") == 0) {

					$nr.find(".cname").html(
						'<a href="http://dhahn.devnxs.net/v2/advertiser?whitelabel='+ getWlName(item)[0] +'" target="new-window">'+ getWlName(item)[0] +'</a>'
					);
				}
				else {

					var propData = getPropData(item);
					var items = propData[1].replace(/"/g, '');
					var colName = "." + propData[0].replace("styles.", "");
					var value = items.replace(/"/g, '');

					var $find = $nr.find(colName);

					$find.html(value).css({
						"font-weight": "bold",
						"color" : "#333"
					});
					if(items.indexOf("#") == 0) {
						$find.css("background-color", items)
					}

					if(items.indexOf("rgb") == 0) {
						$find.css({
							"background-color" : items
						})
					}
					if(items.indexOf("/images/") == 0) {
						$find.html(
							'<img src="https://dhahn.devnxs.net'+ value +'">'
						);
					}
				}
			}
			$nr.appendTo("table")
		}
	};

	var getWlName = function(data) {
		return data
			.replace("[", "")
			.replace("]", "")
			.split(" : ");
	};

	var getPropData = function(data) {
		return data
			.split(" = ");
	};


	_init('files/whitelabel.ini.txt');

});