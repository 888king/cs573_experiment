function pie(){
	var margin = {top: 40, right: 20, bottom: 40, left: 40};
	var width = 600 - margin.left - margin.right;
	var height = 300 - margin.top - margin.bottom;
	var radius = Math.min(width, height) / 2;

	var svg = d3.select("#plot").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + (width / 2 + 50) + "," + (height / 2 + 40) + ")");

	var pie = d3.pie()
			.value(function(d) { return d; });

	var path = d3.arc()
			.outerRadius(radius - 10)
			.innerRadius(0);

	var data = generateData();

	var true_value = 0;

	var index1 = Math.floor(Math.random() * 9);
	var index2 = Math.floor(Math.random() * 9);
	while(index2 == index1)
		index2 = Math.floor(Math.random() * 9);

	if(Number(data[index1]) > Number(data[index2])){
		true_value = Number(data[index2]) / Number(data[index1]) * 100;
	}
	else{
		true_value = Number(data[index1]) / Number(data[index2]) * 100;
	}

	var pos = [path.centroid(pie(data)[index1]), path.centroid(pie(data)[index2])];

	var arc = svg.append("g")
				.selectAll(".arc")
				.data(pie(data))
				.enter().append("g")
				.attr("class", "arc")
				.attr("stroke", "white")
					.style("stroke-width", "2px");

	arc.append("path")
		.attr("d", path)
		.attr("fill", "gray");

	svg.append("g")
		.selectAll("circle1")
		.data(data)
		.enter().append("circle")
		.attr("cx", pos[0][0])
		.attr("cy", pos[0][1])
		.attr("r", 3)
		.style("fill", "white");

	svg.append("g")
		.selectAll("circle2")
		.data(data)
		.enter().append("circle")
		.attr("cx", pos[1][0])
		.attr("cy", pos[1][1])
		.attr("r", 3)
		.style("fill", "white");

	return true_value;

	function randomRange(min, max) {
	    return Math.floor(Math.random() * (max - min)) + min;
	}

	function generateData() {
		var data = [];
		for(var i = 0; i < 10; i++){
			var value = randomRange(10, 50);
			data.push(value);
		}
		console.log(data);
		return data;
	}
}