function energy_ridgeline(country) {
    // set the dimensions and margins of the graph
    var margin = {
            top: 70,
            right: 10,
            bottom: 50,
            left: 70,
        },
        width = 560 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
    // var margin = { top: 30, right: 10, bottom: 30, left: 300 },
    //     width = 700 - margin.left - margin.right,
    //     height = 600 - margin.top - margin.bottom;

    let overlap = 0.8;

    d3.select("#energyRidgeline").html('');
    // append the svg object to the body of the page
    var svg = d3.select("#energyRidgeline")
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

    let x = function(d) { return d.year; },
        xScale = d3.scaleLinear().range([0, width]),
        xValue = function(d) { return xScale(x(d)); },
        xAxis = d3.axisBottom(xScale);

    const y = function(d) { return d.value; },
        yScale = d3.scaleLinear(),
        yValue = function(d) { return yScale(y(d)); };

    let src = function(d) { return d.key; },
        srcScale = d3.scaleBand().range([0, height]),
        srcValue = function(d) { return srcScale(src(d)); },
        srcAxis = d3.axisLeft(srcScale);

    let area = d3.area()
        .x(xValue)
        .y1(yValue);

    let line = area.lineY1();


    //read data
    d3.csv("JS/electricity_emissions.csv", function (data) {
        data = data.filter(function (object) {
            return object.Entity == country;
        });
        // Get the different categories and count them
        var categories = ["coal", "oil", "gas", "nuclear", "solar", "hydro", "wind", "other renewables"];
        var n = categories.length;

        let years = data.map(d => d['Year']);
        const coal = data.map (d => (d['coal'] !== "" ? d['coal'] : "0")),
        oil = data.map (d => (d['oil'] !== "" ? d['oil'] : "0")),
        gas = data.map (d => (d['gas'] !== "" ? d['gas'] : "0")),
        nuclear = data.map (d => (d['nuclear'] !== "" ? d['nuclear'] : "0")),
        solar = data.map (d => (d['solar'] !== "" ? d['solar'] : "0")),
        hydro = data.map (d => (d['hydro'] !== "" ? d['hydro'] : "0")),
        wind = data.map (d => (d['wind'] !== "" ? d['wind'] : "0")),
        other = data.map (d => (d['other renewables'] !== "" ? d['other renewables'] : "0"));
        let sourceArray = [coal, oil, gas, nuclear, solar, hydro, wind, other];

        let dataFlat = []
        categories.map((source, idx) => {
             years.map((year, id) => {
                dataFlat.push({
                    source: source,
                    year: parseInt(year),
                    value: parseFloat(sourceArray[idx][id]),
                });
            })
        })
        console.log("My dataflat is:", dataFlat);
        console.log("My dataflat is:", typeof dataFlat);

        data = d3.nest()
            .key(function(d) { return d.source; })
            .entries(dataFlat);


        console.log("My data is:", data);

        xScale.domain(d3.extent(dataFlat, x));

        srcScale.domain(data.map(function(d) { return d.key; }));

        let areaChartHeight = (1 + overlap) * (height / srcScale.domain().length);

        yScale.domain(d3.extent(dataFlat, y)).range([areaChartHeight, 0]);

        area.y0(yScale(0));

        svg.append('g').attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        svg.append('g').attr('class', 'axis axis--activity')
            .call(srcAxis);

        let gSrc = svg.append('g').attr('class', 'activities')
            .selectAll('.activity').data(data)
            .enter().append('g')
            .attr('class', function(d) { return 'activity activity--' + d.key; })
            .attr('transform', function(d) {
                let ty = srcValue(d) - srcScale.bandwidth() + 5;
                return 'translate(0,' + ty + ')';
            });

        const color = ["#a31621", "#FF890A", "#FCBF49", "#A6994F", "#4C7F4F", "#488B49", "#4AAD52", "#034732"];

        gSrc.append('path').attr('class', 'area')
            .datum(function(d) { return d.values; })
            .style('fill', function(d,idx) {return color[idx]})
            .attr('d', area);

        gSrc.append('path').attr('class', 'line')
            .datum(function(d) { return d.values; })
            .attr('d', line);
    });
}


//         years = years.map(year => parseInt(year));
//         // Compute the mean of each group
//         allMeans = []
//         for (i in categories) {
//             currentGroup = categories[i]
//             mean = d3.mean(data, function (d) {
//                 return +d[currentGroup]
//             })
//             allMeans.push(mean)
//         }
//
//         // Create a color scale using these means.
//         var myColor = d3.scaleSequential()
//             .domain([0, 100])
//             .interpolator(d3.interpolateViridis);
//
//         const max_year = d3.max(years);
//         const min_year = d3.min(years);
//
//         console.log("Min year is", min_year);
//         console.log("Max year is", max_year)
//         // Add X axis
//         var x = d3.scaleLinear()
//             .domain([min_year -1, max_year + 1])
//             .range([0, width]);
//         var xAxis = svg.append("g")
//             .attr("class", "xAxis")
//             .attr("transform", "translate(0," + height + ")")
//             .call(d3.axisBottom(x).tickValues(years).tickSize(-height))
//
//         // Add X axis label:
//         svg.append("text")
//             .attr("text-anchor", "end")
//             .attr("x", width)
//             .attr("y", height + 40)
//             .text("Percentage (%)");
//
//         // Create a Y scale for densities
//         var y = d3.scaleLinear()
//             .domain([0, 0.25])
//             .range([height, 0]);
//
//         // Create the Y axis for names
//         var yName = d3.scaleBand()
//             .domain(categories)
//             .range([0, height])
//             .paddingInner(1)
//         svg.append("g")
//             .call(d3.axisLeft(yName).tickSize(0))
//             .select(".domain").remove()
//
//         // Compute kernel density estimation for each column:
//         var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)) // increase this 40 for more accurate density.
//         var allDensity = []
//         for (i = 0; i < n; i++) {
//             key = categories[i]
//             density = kde(data.map(function (d) {
//                 return d[key];
//             }))
//             allDensity.push({
//                 key: key,
//                 density: density
//             })
//         }
//
//         // Add areas
//         var myCurves = svg.selectAll("areas")
//             .data(allDensity)
//             .enter()
//             .append("path")
//             .attr("class", "myCurves")
//             .attr("transform", function (d) {
//                 return ("translate(0," + (yName(d.key) - height) + ")")
//             })
//             .attr("fill", function (d) {
//                 grp = d.key;
//                 index = categories.indexOf(grp)
//                 value = allMeans[index]
//                 return myColor(value)
//             })
//             .datum(function (d) {
//                 return (d.density)
//             })
//             .attr("opacity", 0.7)
//             .attr("stroke", "#000")
//             .attr("stroke-width", 0.1)
//             .attr("d", d3.line()
//                 .curve(d3.curveBasis)
//                 .x(function (d) {
//                     return x(0);
//                 })
//                 .y(function (d) {
//                     return y(d[1]);
//                 })
//             )
//
//         // Animate X axis apparition
//         x.range([0, width]);
//         xAxis
//             // .transition()
//             // .duration(5000)
//             .call(d3.axisBottom(x).tickValues([years]).tickSize(-height))
//             .select(".domain").remove()
//
//         // Animate densities apparition
//         myCurves
//             .transition()
//             .duration(5000)
//             .attr("d", d3.line()
//                 .curve(d3.curveBasis)
//                 .x(function (d) {
//                     return x(d[0]);
//                 })
//                 .y(function (d) {
//                     return y(d[1]);
//                 })
//             )
//
//     })
//
//     // This is what I need to compute kernel density estimation
//     function kernelDensityEstimator(kernel, X) {
//         return function (V) {
//             return X.map(function (x) {
//                 return [x, d3.mean(V, function (v) {
//                     return kernel(x - v);
//                 })];
//             });
//         };
//     }
//
//     function kernelEpanechnikov(k) {
//         return function (v) {
//             return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
//         };
//     }
// }
