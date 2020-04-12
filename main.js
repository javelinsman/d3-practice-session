const data = raw_data.map(d => ({
  us_gross: parseFloat(d.us_gross),
  rotten_rating: parseFloat(d.rotten_rating)
}))

const svg = d3.select('svg')

svg.selectAll('circle').data(data).enter()
  .append('circle')
    .attr('r', 3.5).attr('cx', d => d.rotten_rating * 5).attr('cy', d => d.us_gross / 5)