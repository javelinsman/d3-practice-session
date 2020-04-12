const old_data = [
  {name: 'A', value: 10},
  {name: 'B', value: 20},
  {name: 'C', value: 15},
]

const svg = d3.select('svg')

svg.selectAll('rect').data(old_data, d => d.name)
  .enter().append('rect')
    .attr('width', 30)
    .attr('height', (d, i) => d.value * 10)
    .attr('x', (d, i) => i * 40)
    .attr('y', 0)

const new_data = [
  {name: 'B', value: 10},
  {name: 'C', value: 15},
  {name: 'D', value: 5},
]

let bars = svg.selectAll('rect').data(new_data, d => d.name)
bars.enter().append('rect').merge(bars)
  .attr('width', 30)
  .attr('height', (d, i) => d.value * 10)
  .attr('x', (d, i) => i * 40)
  .attr('y', 0)

bars.exit().remove()
