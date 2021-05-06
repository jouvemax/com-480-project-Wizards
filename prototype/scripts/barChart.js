function emissionChart() {
    var margin = {top: 50, right: 20, bottom: 10, left: 120},
        width = 800 - margin.left - margin.right,
        height = 4800 - margin.top - margin.bottom;

    var y = d3.scaleBand()
        .domain([0, height], .3);

    var x = d3.scaleLinear()
        .domain([0, width]);

    var color = d3.scaleBand()
        .domain(["#A31621", "#FF890A", "#FCBF49", "#A6994F", "#4C7F4F","#488B49","#4AAD52","#034732"]);

    var xAxis = d3.axisTop(x)

    var yAxis = d3.axisLeft(y)

    var svg = d3.select("#stackedBarChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "d3-plot")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    color.domain(["coal", "oil", "gas", "nuclear", "solar", "hydro", "wind", "other renewables"]);
    let sources = ["coal", "oil", "gas", "nuclear", "solar", "hydro", "wind", "other renewables"]

    d3.csv("http://127.0.0.1:8887/data/electricity_emissions.csv", function(error, data) {
        const current_year = "2019";
        let current_data = [];

        data.forEach( (d, i) => {

            if ((d["Year"]) == current_year){
                console.log(d);
                let total = 0;
                sources.map(name => {
                    //from string to number
                    d[name] = Number(d[name]);
                    total += d[name];
                });
                // calc percentages
                sources.map(name => {
                    //from string to number
                    d[name] = d[name]*100/total;
                });

                // Where the bar starts to the left
                var x0 = - (d["coal"]+d["oil"]+d["gas"] + d["nuclear"]/4);
                d.boxes = sources.map(name => { return {name: name, x0: x0, x1: x0 += d[name], N: total, n: i}; });
                current_data.push(d);
            }
        });
        data = current_data;
        var min_val = d3.min(data, d => {
            return d.boxes["0"].x0;
        });

        var max_val = d3.max(data, d => {
            return d.boxes["7"].x1;
        });

        x.domain([min_val, max_val]).nice();
        y.domain(data.map(d => { return d.Entity; }));

        svg.append("g")
            .attr("class", "x axis")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var vakken = svg.selectAll(".question")
            .data(data)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", d => { return "translate(0," + y(d.Entity) + ")"; });

        console.log("vakken is", vakken);

        var bars = vakken.selectAll("rect")
            .data(d => { return d.boxes; })
            .enter().append("g").attr("class", "subbar");

        console.log("Y is", y.range());

        bars.append("rect")
            .attr("height", y.bandwidth())
            .attr("x", d => {
                return x(d.x0 || 0);
            })
            .attr("width", function(d) { return (x(d.x1) - x(d.x0) || 0); })
            .style("fill", function(d) { return color(d.name); });

        bars.append("text")
            .attr("x", function(d) { return x(d.x0 || 0); })
            .attr("y", y.bandwidth()/2)
            .attr("dy", "0.5em")
            .attr("dx", "0.5em")
            .style("font" ,"10px sans-serif")
            .style("text-anchor", "begin")
            .text(function(d) { return (d.x1-d.x0)>3 ? (d.x1-d.x0).toFixed(1) : "" });

        vakken.insert("rect",":first-child")
            .attr("height", y.bandwidth())
            .attr("x", "1")
            .attr("width", width)
            .attr("fill-opacity", "0.5")
            .style("fill", "#F5F5F5")
            .attr("class", function(d,index) { return index%2==0 ? "even" : "uneven"; });

        svg.append("g")
            .attr("class", "y axis")
            .append("line")
            .attr("x1", x(0))
            .attr("x2", x(0))
            .attr("y2", height);

        var startp = svg.append("g").attr("class", "legendbox").attr("id", "mylegendbox");
        // this is not nice, we should calculate the bounding box and use that
        var legend_tabs = [0, 90, 180, 270, 360, 450, 540, 630];
        var legend = startp.selectAll(".legend")
            .data(color.domain().slice())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(" + legend_tabs[i] + ",-45)"; });

        legend.append("rect")
            .attr("x", 0)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .attr("x", 22)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "begin")
            .style("font" ,"10px sans-serif")
            .text(function(d) { return d; });

        d3.selectAll(".axis path")
            .style("fill", "none")
            .style("stroke", "#000")
            .style("shape-rendering", "crispEdges")

        d3.selectAll(".axis line")
            .style("fill", "none")
            .style("stroke", "#000")
            .style("shape-rendering", "crispEdges")

        var movesize = width/2 - startp.node().getBBox().width/2;
        d3.selectAll(".legendbox").attr("transform", "translate(" + movesize  + ",0)");


    });

}
