// Set up the SVG width and height
var svgWidth = 600;
var svgHeight = 400;

// Set up the margins
var margin = { top: 20, right: 20, bottom: 30, left: 40 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create SVG element
var svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load data from CSV file
d3.csv("array_2.csv").then(function(data) {
    data.forEach(function(d) {
        d.value = +d.value; // Convert string to number
    });

    // Define the scale for x-axis
    var x = d3.scaleBand()
        .domain(data.map(function(d) { return d.label; }))
        .range([0, width])
        .padding(0.1);

    // Define the scale for y-axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.value; })])
        .nice()
        .range([height, 0]);

    // Add x-axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add y-axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add bars
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.label); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });
}).catch(function(error) {
    console.log(error);
});