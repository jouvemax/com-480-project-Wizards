function industry() {
  // set the dimensions and margins of the graph
  var margin = {top: 50, right: 30, bottom: 40, left: 50},
      width = 600 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
  var svg = d3.select("#industryviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom )
      .append("g")
      .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data


// d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv", function(data) {
  d3.csv("JS/industry.csv", function(data) {

    // List of groups = header of the csv files
    var keys = data.columns.slice(1)
    console.log(keys)
    // Add X axis
    /* var x = d3.scaleLinear()
       .domain(d3.extent(data, function(d) { return d.year; }))
       .range([ 0, width ]);
     svg.append("g")
       //.attr("transform", "translate(0," + height*0.8 + ")")
       .attr("transform", "translate(0," + height*0.5+ ")")
       .call(d3.axisBottom(x));*/

    //.call(d3.axisBottom(x).tickSize(-height*1).tickValues([1995, 1996, 1997] ))
    //.select(".domain").remove()
    // Customization[1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
    //svg.selectAll(".tick line").attr("stroke", "#b8b8b8")//.attr("padding", 5)
    //svg
    //append("g")
    //.attr("transform", "translate(0,50)")      // This controls the vertical position of the Axis
    //.call(d3.axisBottom(x));

    // Add X axis label:
    //svg.append("text")
    //  .attr("text-anchor", "end")
    //.attr("x", width)
    //.attr("y", height-20 )
    //.attr("y", height + margin.top + 20)
    //.text("Year");

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 35 )
        .attr("font-family", "Helvetica")
        .attr("font-weight", "bold")
        .text("Year");
    

    // Add Y axis
    /*var y = d3.scaleLinear()
      .domain([-10, 10])
      //.domain(d3.extent(data, function(d) { return d.emission; }))
      .range([ height, 0 ]);
      //.call(d3.axisLeft(y));
      svg
        .append("g")
        .call(d3.axisLeft(y));*/

// Add Y axis

    // Add Y axis label:
    //svg.append("text")
    // .attr("text-anchor", "end")
    //.attr("x", width-335)
    // .attr("y", height -400)
    //.text("Total emission");

//new one
    // Add X axis
    var x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.year; }))
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 12])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));
    // Y axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left+15)
        .attr("x", -margin.top+100)
        .text("Total emissions (in million of tons of CO2)")
        .attr("font-family", "Helvetica")
        .attr("font-weight", "bold")

    // color palette
    var color = d3.scaleOrdinal()
        .domain(keys)
        //.range(d3.schemeDark2);

        .range(d3.schemeBrBG[8]);
    //.range([ "#4ABCC4", "#388E94", "#44AEB5", "#45736B","#6F9B97","#528782"]);
    //stack the data?
    var stackedData = d3.stack()
        .keys(keys)
        (data)

    // create a tooltip
    var Tooltip = svg
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .style("opacity", 0)
        .style("font-size", 17)

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
      Tooltip.style("opacity", 1)
      d3.selectAll(".myArea").style("opacity", .2)
      d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)
    }
    var mousemove = function(d,i) {
      grp = keys[i]
      Tooltip.text(grp)
    }
    var mouseleave = function(d) {
      Tooltip.style("opacity", 0)
      d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
    }

    // Area generator
    var area = d3.area()
        .x(function(d) { return x(d.data.year); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); })

    // Show the areas
    svg
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
        .attr("class", "myArea")
        .style("fill", function(d) { return color(d.key); })
        .attr("d", area)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

  })

}
