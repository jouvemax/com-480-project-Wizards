function displayBubblePlot() {

dataset = {
    "children": [{'Food': 'Beef (beef herd)', 'Emissions': 59.6, 'Group': 'Animal', 'Image':'../img/beef.png'},
 {'Food': 'Lamb & Mutton', 'Emissions': 24.5, 'Group': 'Animal', 'Image':'../img/lamb.png'},
 {'Food': 'Cheese', 'Emissions': 21.2, 'Group': 'Animal', 'Image':'../img/cheese.png'},
 {'Food': 'Beef (dairy herd)', 'Emissions': 21.1, 'Group': 'Animal', 'Image':'../img/beef.png'},
 {'Food': 'Dark Chocolate', 'Emissions': 18.7, 'Group': 'Plant', 'Image':'../img/dark-chocolate.png'},
 {'Food': 'Coffee', 'Emissions': 16.5, 'Group': 'Plant', 'Image':'../img/coffee-beans.png'},
 {'Food': 'Shrimps (farmed)', 'Emissions': 11.8, 'Group': 'Animal', 'Image':'../img/shrimp.png'},
 {'Food': 'Palm Oil', 'Emissions': 7.6, 'Group': 'Oil', 'Image':'../img/palm-oil.png'},
 {'Food': 'Pig Meat', 'Emissions': 7.2, 'Group': 'Animal', 'Image':'../img/sausages.png'},
 {'Food': 'Poultry Meat', 'Emissions': 6.1, 'Group': 'Animal', 'Image':'../img/turkey.png'},
 {'Food': 'Olive Oil', 'Emissions': 6.0, 'Group': 'Oil', 'Image':'../img/olive-oil.png'},
 {'Food': 'Soybean Oil', 'Emissions': 6.0, 'Group': 'Oil', 'Image':'../img/soybean-oil.png'},
 {'Food': 'Fish (farmed)', 'Emissions': 5.1, 'Group': 'Animal', 'Image':'../img/fish.png'},
 {'Food': 'Eggs', 'Emissions': 4.5, 'Group': 'Animal', 'Image':'../img/egg.png'},
 {'Food': 'Rice', 'Emissions': 4.0, 'Group': 'Plant', 'Image':'../img/rice-bowl.png'},
 {'Food': 'Rapeseed Oil', 'Emissions': 3.7, 'Group': 'Oil', 'Image':'../img/oil.png'},
 {'Food': 'Sunflower Oil', 'Emissions': 3.5, 'Group': 'Oil', 'Image':'../img/sunflower-oil.png'},
 {'Food': 'Tofu', 'Emissions': 3.0, 'Group': 'Plant', 'Image':'../img/tofu.png'},
 {'Food': 'Milk', 'Emissions': 2.8, 'Group': 'Animal', 'Image':'../img/milk.png'},
 {'Food': 'Cane Sugar', 'Emissions': 2.6, 'Group': 'Plant', 'Image':'../img/sugar-cane.png'},
 {'Food': 'Groundnuts', 'Emissions': 2.4, 'Group': 'Plant', 'Image':'../img/walnut.png'},
 {'Food': 'Other Pulses', 'Emissions': 1.6, 'Group': 'Plant', 'Image':'../img/agricultural.png'},
 {'Food': 'Oatmeal', 'Emissions': 1.6, 'Group': 'Plant', 'Image':'../img/oatmeal.png'},
 {'Food': 'Wheat & Rye (Bread)', 'Emissions': 1.4, 'Group': 'Plant', 'Image':'../img/grain.png'},
 {'Food': 'Tomatoes', 'Emissions': 1.4, 'Group': 'Plant', 'Image':'../img/tomato.png'},
 {'Food': 'Wine', 'Emissions': 1.4, 'Group': 'Plant', 'Image':'../img/wine.png'},
 {'Food': 'Beet Sugar', 'Emissions': 1.4, 'Group': 'Plant', 'Image':'../img/sugar-beet.png'},
 {'Food': 'Maize (Meal)', 'Emissions': 1.1, 'Group': 'Plant', 'Image':'../img/corn.png'},
 {'Food': 'Barley (Beer)', 'Emissions': 1.1, 'Group': 'Plant', 'Image':'../img/wheat.png'},
 {'Food': 'Berries & Grapes', 'Emissions': 1.1, 'Group': 'Plant', 'Image':'../img/grapes.png'},
 {'Food': 'Soymilk', 'Emissions': 1.0, 'Group': 'Plant', 'Image':'../img/soy-milk.png'},
 {'Food': 'Cassava', 'Emissions': 0.9, 'Group': 'Plant', 'Image':'../img/yucca.png'},
 {'Food': 'Bananas', 'Emissions': 0.8, 'Group': 'Plant', 'Image':'../img/banana.png'},
 {'Food': 'Peas', 'Emissions': 0.8, 'Group': 'Plant', 'Image':'../img/peas.png'},
 {'Food': 'Other Fruit', 'Emissions': 0.7, 'Group': 'Plant', 'Image':'../img/fruits.png'},
 {'Food': 'Other Vegetables', 'Emissions': 0.5, 'Group': 'Plant', 'Image':'../img/vegetables.png'},
 {'Food': 'Brassicas', 'Emissions': 0.4, 'Group': 'Plant', 'Image':'../img/flower-pot.png'},
 {'Food': 'Root Vegetables', 'Emissions': 0.3, 'Group': 'Plant', 'Image':'../img/ginger.png'},
 {'Food': 'Potatoes', 'Emissions': 0.3, 'Group': 'Plant', 'Image':'../img/potato.png'},
 {'Food': 'Apples', 'Emissions': 0.3, 'Group': 'Plant', 'Image':'../img/apple.png'},
 {'Food': 'Onions & Leeks', 'Emissions': 0.3, 'Group': 'Plant', 'Image':'../img/onion.png'},
 {'Food': 'Citrus Fruit', 'Emissions': 0.3, 'Group': 'Plant', 'Image':'../img/lemon.png'},
 {'Food': 'Nuts', 'Emissions': 0.2, 'Group': 'Plant', 'Image':'../img/nuts.png'}]
};

var diameter = 600;
var color = d3.scaleOrdinal(d3.schemeCategory10);

var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(3);

var svg = d3.select("#bubbleplot")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var nodes = d3.hierarchy(dataset)
    .sum(function(d) { return d.Emissions; });

var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d){
        return  !d.children
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

var tooltip = floatingTooltip('gates_tooltip', 240);

var fillColor = d3.scaleOrdinal()
    .domain(['low', 'medium', 'high'])
    .range(['#d84b2a', '#beccae', '#7aa25c']);

node.append("title")
    .text(function(d) {
        return d.data.Food + ": " + d.data.Emissions;
    })

 node.filter(d => d.data.Image)
            .append('image')
            .classed('node-icon', true)
            .attr('clip-path', d => `url(#clip-${d.id})`)
            .attr('xlink:href', d => d.data.Image)
            .attr('x', d => - d.r * 0.7)
            .attr('y', d => - d.r * 0.7)
            .attr('height', d => d.r * 2 * 0.7)
            .attr('width', d => d.r * 2 * 0.7)
            // .on('mouseover', showDetail)
            // .on('mouseout', hideDetail);

node.append("circle")
    .attr("r", function(d) {
        return d.r;
    })
    .style("fill", function(d,i) {
        return color(d.data.Group);
        // return 'white';
    })
    .style("opacity", function(d,i) {
        return 0.2;
    })
    .on('mouseover', showDetail)
    .on('mouseout', hideDetail);

node.append("text")
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Food.substring(0, d.r / 3);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", function(d){
        return d.r/5;
    })
            .attr("fill", "white");

node.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Emissions;
    })
    .attr("font-family",  "Gill Sans", "Gill Sans MT")
    .attr("font-size", function(d){
        return d.r/5;
    })
    .attr("fill", "white");

d3.select(self.frameElement)
    .style("height", diameter + "px");

function showDetail(d) {

	d3.select(this).attr('stroke', 'black');

    var content = '<span class="name">Food: </span><span class="value">' +
                  d.data.Food +
                  '</span><br/>' +
                  '<span class="name">Emissions (in kg of Co2 per kg): </span><span class="value">' +
                  d.data.Emissions +
                  '</span><br/>' +
                  '<span class="name">Group: </span><span class="value">' +
                  d.data.Group +
                  '</span>';

    tooltip.showTooltip(content, d3.event);
  }

function hideDetail(d) {
	d3.select(this).attr('stroke', 'none');
    tooltip.hideTooltip();
  }

/*
 * Creates tooltip with provided id that
 * floats on top of visualization.
 * Most styling is expected to come from CSS
 * so check out bubble_chart.css for more details.
 */
function floatingTooltip(tooltipId, width) {
  // Local variable to hold tooltip div for
  // manipulation in other functions.
  var tt = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .attr('id', tooltipId)
    .style('pointer-events', 'none');

  // Set a width if it is provided.
  if (width) {
    tt.style('width', width);
  }

  // Initially it is hidden.
  hideTooltip();

  /*
   * Display tooltip with provided content.
   *
   * content is expected to be HTML string.
   *
   * event is d3.event for positioning.
   */
  function showTooltip(content, event) {
    tt.style('opacity', 1.0)
      .html(content);

    updatePosition(event);
  }

  /*
   * Hide the tooltip div.
   */
  function hideTooltip() {
    tt.style('opacity', 0.0);
  }

  /*
   * Figure out where to place the tooltip
   * based on d3 mouse event.
   */
  function updatePosition(event) {
    var xOffset = 20;
    var yOffset = 10;

    var ttw = tt.style('width');
    var tth = tt.style('height');

    var wscrY = window.scrollY;
    var wscrX = window.scrollX;

    var curX = (document.all) ? event.clientX + wscrX : event.pageX;
    var curY = (document.all) ? event.clientY + wscrY : event.pageY;
    var ttleft = ((curX - wscrX + xOffset * 2 + ttw) > window.innerWidth) ?
                 curX - ttw - xOffset * 2 : curX + xOffset;

    if (ttleft < wscrX + xOffset) {
      ttleft = wscrX + xOffset;
    }

    var tttop = ((curY - wscrY + yOffset * 2 + tth) > window.innerHeight) ?
                curY - tth - yOffset * 2 : curY + yOffset;

    if (tttop < wscrY + yOffset) {
      tttop = curY + yOffset;
    }

    tt
      .style('top', tttop + 'px')
      .style('left', ttleft + 'px' );
  }

  return {
    showTooltip: showTooltip,
    hideTooltip: hideTooltip,
    updatePosition: updatePosition
  };
}
}