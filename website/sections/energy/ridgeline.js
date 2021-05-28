function Ridgeline(country) {
    // set the dimensions and margins of the graph
    var margin = {
            top: 30,
            right: 30,
            bottom: 30,
            left: 30
        },
        width = 360 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    d3.select("#ridgelineChart").html('');
    // append the svg object to the body of the page
    var svg = d3.select("#ridgelineChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(country);

    //read data
    d3.csv("electricity_emissions.csv", function (data) {
        data = data.filter(function (object) {
            return object.Entity == country;
        });
        console.log(data);
        // Get the different categories and count them
        var categories = ["coal", "oil", "gas", "nuclear", "solar", "hydro", "wind", "other renewables"];
        var n = categories.length;

        years = data.map(d => d['Year']);
        coal = data.map (d => (d['coal'] !== "" ? d['coal'] : "0"));
        oil = data.map (d => (d['oil'] !== "" ? d['oil'] : "0"));
        gas = data.map (d => (d['gas'] !== "" ? d['gas'] : "0"));
        nuclear = data.map (d => (d['nuclear'] !== "" ? d['nuclear'] : "0"));
        solar = data.map (d => (d['solar'] !== "" ? d['solar'] : "0"));
        hydro = data.map (d => (d['hydro'] !== "" ? d['hydro'] : "0"));
        wind = data.map (d => (d['wind'] !== "" ? d['wind'] : "0"));
        other = data.map (d => (d['other renewables'] !== "" ? d['other renewables'] : "0"));
        console.log(years);
        console.log(coal);


        // Compute the mean of each group
        allMeans = []
        for (i in categories) {
            currentGroup = categories[i]
            mean = d3.mean(data, function (d) {
                return +d[currentGroup]
            })
            allMeans.push(mean)
        }

        // Create a color scale using these means.
        var myColor = d3.scaleSequential()
            .domain([0, 100])
            .interpolator(d3.interpolateViridis);

        // Add X axis
        var x = d3.scaleLinear()
            .domain([-10, 120])
            .range([0, 50]);
        var xAxis = svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickValues([0, 25, 50, 75, 100]).tickSize(-height))

        // Add X axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height + 40)
            .text("Percentage (%)");

        // Create a Y scale for densities
        var y = d3.scaleLinear()
            .domain([0, 0.25])
            .range([height, 0]);

        // Create the Y axis for names
        var yName = d3.scaleBand()
            .domain(categories)
            .range([0, height])
            .paddingInner(1)
        svg.append("g")
            .call(d3.axisLeft(yName).tickSize(0))
            .select(".domain").remove()

        // Compute kernel density estimation for each column:
        var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)) // increase this 40 for more accurate density.
        var allDensity = []
        for (i = 0; i < n; i++) {
            key = categories[i]
            density = kde(data.map(function (d) {
                return d[key];
            }))
            allDensity.push({
                key: key,
                density: density
            })
        }

        // Add areas
        var myCurves = svg.selectAll("areas")
            .data(allDensity)
            .enter()
            .append("path")
            .attr("class", "myCurves")
            .attr("transform", function (d) {
                return ("translate(0," + (yName(d.key) - height) + ")")
            })
            .attr("fill", function (d) {
                grp = d.key;
                index = categories.indexOf(grp)
                value = allMeans[index]
                return myColor(value)
            })
            .datum(function (d) {
                return (d.density)
            })
            .attr("opacity", 0.7)
            .attr("stroke", "#000")
            .attr("stroke-width", 0.1)
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(function (d) {
                    return x(0);
                })
                .y(function (d) {
                    return y(d[1]);
                })
            )

        // Animate X axis apparition
        x.range([0, width]);
        xAxis
            .transition()
            .duration(5000)
            .call(d3.axisBottom(x).tickValues([0, 25, 50, 75, 100]).tickSize(-height))
            .select(".domain").remove()

        // Animate densities apparition
        myCurves
            .transition()
            .duration(5000)
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(function (d) {
                    return x(d[0]);
                })
                .y(function (d) {
                    return y(d[1]);
                })
            )

    })

    // This is what I need to compute kernel density estimation
    function kernelDensityEstimator(kernel, X) {
        return function (V) {
            return X.map(function (x) {
                return [x, d3.mean(V, function (v) {
                    return kernel(x - v);
                })];
            });
        };
    }

    function kernelEpanechnikov(k) {
        return function (v) {
            return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
        };
    }
}
