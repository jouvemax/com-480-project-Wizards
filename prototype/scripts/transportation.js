  function displayTransportationPlot() {

  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#transportation")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  // read json data
  d3.json("http://127.0.0.1:8887/data/transport.json", function(data) {

    // Give the data to this cluster layout:
    var root = d3.hierarchy(data).sum(function(d){ return d.value}) // Here the size of each leave is given in the 'value' field in input data

    // Then d3.treemap computes the position of each element of the hierarchy
    d3.treemap()
      .size([width-155, height-155])
      //.paddingTop(28)
      //.paddingRight(7)
      .paddingInner(3)      // Padding between each rectangle
      .paddingOuter(6)
      //.padding(3)
      (root)

    // prepare a color scale
    var color = d3.scaleOrdinal()
      .range([ "#04009a", "#77acf1", "#3edbf0", "#c0fefc","#1597bb","#8fd6e1"])

    // And a opacity scale
    var opacity = d3.scaleLinear()
      .domain([10, 30])
      .range([.5,1])

    // use this information to add rectangles:
    svg
      .selectAll("rect")
      .data(root.leaves())
      .enter()
      .append("rect")
        .attr('x', function (d) { return d.x0; })
        .attr('y', function (d) { return d.y0; })
        .attr('width', function (d) { return d.x1 - d.x0; })
        .attr('height', function (d) { return d.y1 - d.y0; })
        .style("fill", function(d){ 
          return color(d.data.name)} )
   
    d3.select("body")
       .append("svg")
       .attr("href", "train.svg")
       .attr("width", 40)
       .attr("height", 40)
       .attr("x", 100)
       .attr("y",60);


    var myimage = svg.append('image')
      .attr('xlink:href', "img/baby-car.svg")
      .attr('width', 50)
      .attr('height', 50)
      .attr("x", 450)
      .attr("y",25);

    var myimage = svg.append('image')
      .attr('xlink:href', "img/yatch.svg")
      .attr('width', 50)
      .attr('height', 50)
      .attr("x", 450)
      .attr("y",100);


    var myimage = svg.append('image')
      .attr('xlink:href', "img/plane.svg")
      .attr('width', 50)
      .attr('height', 70)
      .attr("x", 450)
      .attr("y",175);

    var myimage = svg.append('image')
      .attr('xlink:href', "img/truck.svg")
      .attr('width', 50)
      .attr('height', 50)
      .attr("x", 450)
      .attr("y",250);

    var myimage = svg.append('image')
      .attr('xlink:href', "img/train.svg")
      .attr('width', 50)
      .attr('height', 50)
      .attr("x", 450)
      .attr("y",325);
        
        var dragHandler = d3.drag()
            .on("drag", function () {
                d3.select(this)
                    .attr("x", d3.event.x)
                    .attr("y", d3.event.y);
            });
        
        dragHandler(svg.selectAll("use"));
    // and to add the text labels
    svg
      .selectAll("text")
      .data(root.leaves())
      .enter()
      .append("text")
        .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
        .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
        .text(function(d){ return d.data.name })
        .attr("font-size", "13px")
        .attr("fill", "white")

    // and to add the text labels
    svg
      .selectAll("vals")
      .data(root.leaves())
      .enter()
      .append("text")
        .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
        .attr("y", function(d){ return d.y0+35})    // +20 to adjust position (lower)
        .attr("font-size", "11px")
        .attr("fill", "white")

  })
  }
