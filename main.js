function translate(x, y) {
  return `translate(${x}, ${y})`
}

const data = raw_data.map(d => ({
  us_gross: parseFloat(d.us_gross),
  rotten_rating: parseFloat(d.rotten_rating),
  rating: d.rating
}))

const [svgWidth, svgHeight] = [550, 550]
const margin = {top: 20, right: 10, bottom: 30, left: 40}
const width = svgWidth - margin.left - margin.right
const height = svgHeight - margin.top - margin.bottom

const svg = d3.select('svg').attr('width', svgWidth).attr('height', svgHeight)
const container = svg.append('g').attr('transform', translate(margin.left, margin.top))

const x = d3.scaleLinear()
          .domain([
            d3.min(data, d => d.rotten_rating),
            d3.max(data, d => d.rotten_rating),
          ])
          .range([0, width])

const y = d3.scaleLinear()
          .domain([
            d3.min(data, d => d.us_gross),
            d3.max(data, d => d.us_gross),
          ])
          .range([height, 0])

const color = d3.scaleOrdinal()
              .domain(['전체관람가', '7세이상', '15세이상', '19세이상'])
              .range(['#3366cc', '#109618', 'ff9900', 'dc3912'])

container
  .selectAll('circle').data(data).enter()
  .append('circle')
    .attr('r', 3.5).attr('cx', d => x(d.rotten_rating)).attr('cy', d => y(d.us_gross))
    .style('fill', d => color(d.rating))
    .on('mouseenter', function() {
      d3.select(this)
        .style('stroke', 'black').style('stroke-width', 3)
        .transition().duration(1000)
        .attr('r', 35)
    })
    .on('mouseleave', function() {
      d3.select(this).style('stroke', null)
        .transition().duration(1000)
        .attr('r', 3.5)
    })
    .on('click', function() {
      const data = d3.select(this).data()[0]
      const {us_gross, rotten_rating, rating} = data
      alert(`${us_gross}, ${rotten_rating}, ${rating}`)
    })

const xAxis = d3.axisBottom(x)
const yAxis = d3.axisLeft(y)

container.append('g').call(xAxis)
  .attr('transform', translate(0, height))
container.append('g').call(yAxis)
