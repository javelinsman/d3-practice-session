function translate(x, y) {
  return `translate(${x}, ${y})`
}

const data = raw_data.map(d => ({
  us_gross: parseFloat(d.us_gross),
  rotten_rating: parseFloat(d.rotten_rating)
}))

const [svgWidth, svgHeight] = [550, 550]
const margin = {top: 20, right: 10, bottom: 30, left: 40}
const width = svgWidth - margin.left - margin.right
const height = svgHeight - margin.top - margin.bottom

const svg = d3.select('svg').attr('width', svgWidth).attr('height', svgHeight)
const container = svg.append('g').attr('transform', translate(margin.left, margin.top))

let x = d3.scaleLinear()
          .domain([
            d3.min(data, d => d.rotten_rating),
            d3.max(data, d => d.rotten_rating),
          ])
          .range([0, width])

let y = d3.scaleLinear()
          .domain([
            d3.min(data, d => d.us_gross),
            d3.max(data, d => d.us_gross),
          ])
          .range([0, height])

container
  .selectAll('circle').data(data).enter()
  .append('circle')
    .attr('r', 3.5).attr('cx', d => x(d.rotten_rating)).attr('cy', d => y(d.us_gross))

let xAxis = d3.axisBottom(x)
let yAxis = d3.axisLeft(y)

container.append('g').call(xAxis)
  .attr('transform', translate(0, height))
container.append('g').call(yAxis)
