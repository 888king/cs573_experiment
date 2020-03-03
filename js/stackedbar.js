function stackedbar() {
	var margin = {top: 40, right: 20, bottom: 40, left: 40};
	var width = 600 - margin.left - margin.right;
	var height = 300 - margin.top - margin.bottom;

	var xAxis = d3.scaleBand().range ([0, width]).padding(0.75);

	var yAxis = d3.scaleLinear().range([height, 0]);

	var svg = d3.select("#plot").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var data = generateData();

	var true_value = 0;

	var index1 = Math.floor(Math.random() * 9);
	var index2 = Math.floor(Math.random() * 9);
	while(index2 == index1)
		index2 = Math.floor(Math.random() * 9);

	if(Number(data[0]["value" + index1]) > Number(data[0]["value" + index2])){
		true_value = Number(data[0]["value" + index2]) / Number(data[0]["value" + index1]) * 100;
	}
	else{
		true_value = Number(data[0]["value" + index1]) / Number(data[0]["value" + index2]) * 100;
	}

	console.log(data[0]["value" + index1]);
	console.log(data[0]["value" + index2]);
	console.log(true_value);

	xAxis.domain(data.map(function(d) { return 1; }));
	yAxis.domain([0, 350]);

	svg.append("g")
		.attr("transform", "translate(" + 0 + "," + height + ")")
		.call(d3.axisBottom(xAxis).tickFormat((domainn,number)=>{return ""}));

	svg.append("g")
		.call(d3.axisLeft(yAxis).tickFormat((domainn,number)=>{return ""}));

	var stack = d3.stack().keys(["value0", "value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "value9"]);
	var stackedData = stack(data);
	console.log(stackedData);
	var data2 = [stackedData[index1][0], stackedData[index2][0]];

	svg.append("g")
		.selectAll("g")
		.data(stackedData)
		.enter().append("g")
		.selectAll("rect")
		.data(function(d) { return d; })
		.enter().append("rect")
		.attr("x", function(d){ return xAxis(1)})
		.attr("y", function(d){ return yAxis(d[1]); })
		.attr("height", function(d){ return yAxis(d[0])-yAxis(d[1]); })
		.attr("width", xAxis.bandwidth())
		.attr("stroke", "black")
		.style("fill", "white");

	svg.append("g")
		.selectAll("circle")
		.data(data2)
		.enter().append("circle")
		.attr("cx", function(d) { return xAxis(1) + 0.5 * xAxis.bandwidth(); })
		.attr("cy", function(d) { return yAxis(0.5 * (d[0] + d[1])); })
		.attr("r", 3)
		.style("fill", "black");

	return true_value;


	function randomRange(min, max) {
	    return Math.floor(Math.random() * (max - min)) + min;
	}

	function generateData() {
		var data = [];
		var values = []
		for(var i = 0; i < 10; i++){
			var value = randomRange(10, 50);
			values.push(value);
		}
		var record = {};
		record["value0"] = values[0];
		record["value1"] = values[1];
		record["value2"] = values[2];
		record["value3"] = values[3];
		record["value4"] = values[4];
		record["value5"] = values[5];
		record["value6"] = values[6];
		record["value7"] = values[7];
		record["value8"] = values[8];
		record["value9"] = values[9];
		data.push(record);
		console.log(data);
		return data;
	}
}
