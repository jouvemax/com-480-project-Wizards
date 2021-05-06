function displayMap() {

const format = d3.format(',');

// Set tooltips
const tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(d => {
    if (d.emissions != null) {
      return `<strong>Country: </strong><span class='details'>${d.properties.name}<br></span><strong>Emissions: </strong><span class='details'>${format(d.emissions)} MtCo2e</span>`
    }
    else {
      return `<strong>Country: </strong><span class='details'>${d.properties.name}<br></span><strong>Emissions: </strong><span class='details'>not available</span>`
    }
});

const margin = {top: 0, right: 0, bottom: 0, left: 0};
const width = 1000 - margin.left - margin.right;
const height = 550 - margin.top - margin.bottom;

const color = d3.scaleThreshold()
  .domain([
    -0.01,
    0,
    50,
    100,
    250,
    500,
    750,
    1000,
    2000,
    3000,
    5000
  ])
  .range([
    'rgb(82, 183, 136)',
    'rgb(255, 255, 255)',
    'rgb(252, 225, 225)', 
    'rgb(249, 195, 195)', 
    'rgb(245, 162, 162)',
    'rgb(242, 132, 132)',
    'rgb(240, 101, 101)',
    'rgb(237, 75, 75)',
    'rgb(238, 41, 41)',
    'rgb(202, 11, 11)',
    'rgb(130, 0, 0)'
  ]);

const svg = d3.select('#worldmap')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('class', 'map');

const projection = d3.geoRobinson()
  .scale(180)
  .rotate([352, 0, 0])
  .translate( [width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

svg.call(tip);

queue()
  .defer(d3.json, 'http://127.0.0.1:8887/data/world_countries.json')
  .defer(d3.tsv, 'http://127.0.0.1:8887/data/world_emissions.tsv')
  .await(ready);

function ready(error, data, emissions) {
  const countryById = {};

  emissions.forEach(d => { countryById[d.id] = +d.emissions; });
  data.features.forEach(d => { d.emissions = countryById[d.id] });

  var currentCountry = "";

  svg.append('g')
    .attr('class', 'countries')
    .selectAll('path')
    .data(data.features)
    .enter().append('path')
      .attr('d', path)
      .style('fill', d => {
        if (d.emissions == null) {
          return "grey"
        }
        else {
          return color(countryById[d.id])
        }

      })
      .style('stroke', 'black')
      .style('opacity', 0.8)
      .style('stroke-width', 0.3)
      // tooltips
      .on('mouseover',function(d){
        tip.show(d);
        d3.select(this)
          .style('opacity', 1)
          // .style('stroke-width', 3)
          // .style('stroke', 'white');
      })
      .on('mouseout', function(d){
        tip.hide(d);
        d3.select(this)
          .style('opacity', 0.8)
          // .style('stroke-width',0.3);
      })
      .on('click', function(d) {
        if (event.defaultPrevented) return;
        console.log("click")
        tip.show(d);

        if (currentCountry != "") {
        currentCountry.style('stroke-width', 0.3)
        }

        currentCountry = d3.select(this)
        currentCountry.style('stroke-width', 3)
          .style('stroke', "black");
      });

  svg.append('path')
    .datum(topojson.mesh(data.features, (a, b) => a.id !== b.id))
    .attr('class', 'names')
    .attr('d', path);
}
}