function translate(x, y) {
  return `translate(${x}, ${y})`
}

const data = raw_data.map(d => ({
  us_gross: parseFloat(d.us_gross),
  rotten_rating: parseFloat(d.rotten_rating)
}))

const svg = d3.select('svg')
const [width, height] = [500, 500]

let x = d3.scaleLinear()
          .domain([
            d3.min(data, d => d.rotten_rating),
            d3.max(data, d => d.rotten_rating),
          ])
          .range([50, width + 50])

let y = d3.scaleLinear()
          .domain([
            d3.min(data, d => d.us_gross),
            d3.max(data, d => d.us_gross),
          ])
          .range([0, height])

svg
  .selectAll('circle').data(data).enter()
  .append('circle')
    .attr('r', 3.5).attr('cx', d => x(d.rotten_rating)).attr('cy', d => y(d.us_gross))

let xAxis = d3.axisBottom(x)
let yAxis = d3.axisLeft(y)

svg.append('g').call(xAxis)
  .attr('transform', translate(0, height))
svg.append('g').call(yAxis)
  .attr('transform', translate(50, 0))