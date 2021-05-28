function energy() {
    var margin = {
            top: 50,
            right: 20,
            bottom: 10,
            left: 100
        },
        width = 700 - margin.left - margin.right,
        height = 4800 - margin.top - margin.bottom;

    var y = d3.scaleBand()
        .rangeRound([0, height]).padding(0.3);

    var x = d3.scaleLinear().rangeRound([0, width]);

    var color = d3.scaleOrdinal().range(["#A31621", "#FF890A", "#FCBF49", "#A6994F", "#4C7F4F", "#488B49", "#4AAD52", "#034732"]);

    var xAxis = d3.axisTop(x);

    var yAxis = d3.axisLeft(y);

    var svg = d3.select("#energyChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "d3-plot")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    color.domain(["coal", "oil", "gas", "nuclear", "solar", "hydro", "wind", "other renewables"]);
    let sources = ["coal", "oil", "gas", "nuclear", "solar", "hydro", "wind", "other renewables"]

    d3.csv("electricity_emissions.csv", function (error, data) {
        const current_year = "2019";
        let current_data = [];

        data.forEach((d, i) => {

            if ((d["Year"]) == current_year) {
                let total = 0;
                sources.map(name => {
                    //from string to number
                    d[name] = Number(d[name]);
                    total += d[name];
                });
                // calc percentages
                sources.map(name => {
                    //from string to number
                    d[name] = d[name] * 100 / total;
                });

                // Where the bar starts to the left
                var x0 = -(d["coal"] + d["oil"] + d["gas"]);
                d.boxes = sources.map(name => {
                    return {
                        name: name,
                        x0: x0,
                        x1: x0 += d[name],
                        N: total,
                        n: i
                    };
                });
                current_data.push(d);
            }
        });
        data = current_data;

        var startp = svg.append("g").attr("class", "legendbox").attr("id", "mylegendbox");
        // this is not nice, we should calculate the bounding box and use that
        var legend_tabs = [0, 90, 180, 270, 360, 450, 540, 630];
        var legend = startp.selectAll(".legend")
            .data(color.domain().slice())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {
                return "translate(" + legend_tabs[i] + ",-45)";
            })
            .on("click", function () {
                d3.selectAll(".legend")
                    .attr("fill", "black");


                data = Sort(data, this.textContent);
                d3.select(this)
                    .attr("fill", "white");
                Draw(data);
            });

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
            .style("font", "10px sans-serif")
            .text(function (d) {
                return d;
            });

        var movesize = width / 2 - startp.node().getBBox().width / 2;
        d3.selectAll(".legendbox").attr("transform", "translate(" + movesize + ",0)");


        Draw(data);
    });

    function Sort(data, sortKey) {
        data.sort(function (a, b) {
            // return parseFloat(b[sortKey]) - parseFloat(a[sortKey]);
            return d3.descending(a[sortKey], b[sortKey]);
        });
        return data;
    }

    function Draw(data) {
        var min_val = d3.min(data, d => {
            return d.boxes["0"].x0;
        });

        var max_val = d3.max(data, d => {
            return d.boxes["7"].x1;
        });

        x.domain([min_val, max_val]).nice();
        y.domain(data.map(d => {
            return d.Entity;
        }));
        svg = svg.append("g").attr("id", "sdgImage");
        d3.selectAll(".bar").remove();

        d3.selectAll(".tick").remove();



        svg.append("g")
            .attr("class", "x axis")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var countries = svg.selectAll(".countries")
            .data(data)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", d => {
                return "translate(0," + y(d.Entity) + ")";
            });

        var bars = countries.selectAll("rect")
            .data(d => {
                return d.boxes;
            })
            .enter().append("g").attr("class", "subbar");

        bars.append("rect")
            .attr("height", y.bandwidth())
            .attr("x", d => {
                return x(d.x0 || 0);
            })
            .attr("width", function (d) {
                return (x(d.x1) - x(d.x0) || 0);
            })
            .style("fill", function (d) {
                return color(d.name);
            });

        bars.append("text")
            .attr("x", function (d) {
                return x(d.x0 || 0);
            })
            .attr("y", y.bandwidth() / 2)
            .attr("dy", "0.5em")
            .attr("dx", "0.5em")
            .style("font", "10px sans-serif")
            .style("text-anchor", "begin")
            .text(function (d) {
                return (d.x1 - d.x0) > 3 ? (d.x1 - d.x0).toFixed(1) : ""
            });

        countries.insert("rect", ":first-child")
            .attr("height", y.bandwidth())
            .attr("x", "1")
            .attr("width", width)
            .attr("fill-opacity", "0.5")
            .style("fill", "#F5F5F5")
            .attr("class", function (d, index) {
                return index % 2 == 0 ? "even" : "uneven";
            });

        svg.append("g")
            .attr("class", "y axis")
            .append("line")
            .attr("x1", x(0))
            .attr("x2", x(0))
            .attr("y2", height);

        d3.selectAll(".axis path")
            .style("fill", "none")
            .style("stroke", "#000")
            .style("shape-rendering", "crispEdges")

        d3.selectAll(".axis line")
            .style("fill", "none")
            .style("stroke", "#000")
            .style("shape-rendering", "crispEdges")

        d3.selectAll(".tick text").on("click", function () {
            energy_ridgeline(this.textContent);
        });


    }

}
