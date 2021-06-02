function transportation() {

// set the dimensions and margins of the graph
    var margin = {top: 20, right: 10, bottom: 10, left: 10},
        width = 700 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
    var svg = d3.select("#transportationViz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// read json data
    d3.json("JS/transport.json", function(data) {

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
            //.range([ "#04009a", "#77acf1", "#3edbf0", "#c0fefc","#1597bb","#8fd6e1"])
            .range([ "#4ABCC4", "#388E94", "#44AEB5", "#45736B","#6F9B97","#528782"])
        //.range([ "#4ABCC4", "#388E94", "#44AEB5"])
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
            //.style("stroke", "black")
            .style("fill", function(d){
                console.log(d)
                return color(d.data.name)} )
        //.style("fill", "#4ABCC4" )
        //.style("opacity", function(d){ return opacity(d.value)})




//For icons

        var carImg = svg.append('image')
            .attr('xlink:href', "imgs/baby-car.svg")
            .attr('width', 50)
            .attr('height', 50)
            .attr("x", 540)
            .attr("y",25);

        var yatchImg = svg.append('image')
            .attr('xlink:href', "imgs/yatch.svg")
            .attr('width', 50)
            .attr('height', 50)
            .attr("x", 540)
            .attr("y",100);


        var planeImg= svg.append('image')
            .attr('xlink:href', "imgs/plane.svg")
            .attr('width', 50)
            .attr('height', 70)
            .attr("x", 540)
            .attr("y",175);

        var truckImg = svg.append('image')
            .attr('xlink:href', "imgs/truck.svg")
            .attr('width', 50)
            .attr('height', 50)
            .attr("x", 540)
            .attr("y", 250);


        var trainImg = svg.append('image')
            .attr('xlink:href', "imgs/train.svg")
            .attr('width', 50)
            .attr('height', 50)
            .attr("x", 540)
            .attr("y",325);




        // and to add the text labels
        //svg
        //.selectAll("text")
        //.data(root.leaves())
        //.enter()
        //.append("text")
        //.attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
        //.attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
        //.text(function(d){ return d.data.name })
        //.attr("font-size", "13px")
        //.attr("fill", "white")















        //drag and drop selection
        var deltaX, deltaY;

        var dragHandler = d3.drag()
            .on("start", function () {
                var current = d3.select(this);
                deltaX = current.attr("x") - d3.event.x;
                deltaY = current.attr("y") - d3.event.y;
            })
            .on("drag", function () {
                d3.select(this)
                    .attr("x", d3.event.x + deltaX)
                    .attr("y", d3.event.y + deltaY);
            });

        dragHandler(svg.selectAll("image"));

//event for the correct me
        d3.select('#correct-button')
            .on('click', function() {
                //carImg.attr("x", 500).attr("y", 200);
                carImg.transition()
                    .duration(2000)
                    .attr("x", 200)
                    .attr("y", 150);
                yatchImg.transition()
                    .duration(2000)
                    .attr("x", 520)
                    .attr("y", 380);
                planeImg.transition()
                    .duration(2000)
                    .attr("x", 520)
                    .attr("y", 100);
                truckImg.transition()
                    .duration(2000)
                    .attr("x", 200)
                    .attr("y", 480);
                trainImg.transition()
                    .duration(2000)
                    .attr("x", 460)
                    .attr("y", 560);


                svg.selectAll("text")


                    .data(root.leaves())
                    .enter()


                    .append("text")
                    .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
                    .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
                    .text(function(d){ return d.data.name })
                    .attr("font-size", "13px")
                    .attr("fill", "white")
                    .transition()
                    .duration(10000)

            })




    })

}
