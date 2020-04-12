const data = [2, 1, 3]

const svg = d3.select('svg')

svg.selectAll('rect')
  .data(data).enter().append('rect')
    .attr('width', (d, i) => d * 100)
    .attr('height', 50)
    .attr('x', 0)
    .attr('y', (d, i) => i * 100)