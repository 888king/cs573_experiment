function bar(){
	var margin = {top: 40, right: 20, bottom: 40, left: 40};
	var width = 600 - margin.left - margin.right;
	var height = 300 - margin.top - margin.bottom;

	var xAxis = d3.scaleBand().range ([0, width]).padding(0.4);

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

	if(Number(data[index1].value) > Number(data[index2].value)){
		true_value = Number(data[index2].value) / Number(data[index1].value) * 100;
	}
	else{
		true_value = Number(data[index1].value) / Number(data[index2].value) * 100;
	}

	var data2 = [data[index1], data[index2]];


	xAxis.domain(data.map(function(d) { return d.index; }));
	yAxis.domain([0, 50]);

	svg.append("g")
		.attr("transform", "translate(" + 0 + "," + height + ")")
		.call(d3.axisBottom(xAxis).tickFormat((domainn,number)=>{return ""}));

	svg.append("g")
		.call(d3.axisLeft(yAxis).tickFormat((domainn,number)=>{return ""}));

	svg.append("g")
		.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return xAxis(d.index); })
		.attr("y", function(d) { return yAxis(d.value); })
		.attr("width", xAxis.bandwidth())
		.attr("height", function(d) { return height - yAxis(d.value); })
		.style("fill", "gray");

	svg.append("g")
		.selectAll("circle")
		.data(data2)
		.enter().append("circle")
		.attr("cx", function(d) { return xAxis(d.index) + 0.5 * xAxis.bandwidth(); })
		.attr("cy", function(d) { return 0.5 * (height + yAxis(d.value)); })
		.attr("r", 3)
		.style("fill", "white");

	return true_value;

	function randomRange(min, max) {
	    return Math.floor(Math.random() * (max - min)) + min;
	}

	function generateData() {
		var data = [];
		for(var i = 0; i < 10; i++){
			var record = {};
			record['index'] = i+1;
			record['value'] = randomRange(10, 50);
			data.push(record);
		}
		return data;
	}
}

