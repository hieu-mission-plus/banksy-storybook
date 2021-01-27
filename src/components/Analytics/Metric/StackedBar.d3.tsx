import * as d3 from 'd3'
import './styles.css'

class StackedBar {
  constructor(element: Element, data: any[]) {
    let vis: any = this
    vis.data = data

    vis.svg = d3.select(element).append('svg').attr('width', 0).attr('height', 0)
    vis.g = vis.svg.append('g')

    // fix for format values
    const formatSi = d3.format('.2s')
    vis.formatAbbreviation = function (x: number) {
      const s = formatSi(x)
      switch (s[s.length - 1]) {
        case 'G':
          return s.slice(0, -1) + 'B' // billions
        case 'k':
          return s.slice(0, -1) + 'K' // thousands
      }
      return s
    }

    // vis.xAxisCall = d3.axisBottom()
    // vis.yAxisCall = d3.axisLeft()

    vis.xAxisGroup = vis.g.append('g').attr('class', 'x axis invisible')

    // vis.yAxisGroup = vis.g.append("g")
    //   .attr("class", "y axis")

    vis.stack = d3.stack()
    vis.t = () => d3.transition().duration(1000)
    vis.color = d3.scaleOrdinal(['#4BC37A', '#3E4F5F', '#79899C', ...d3.schemeSet2])
  }

  setDimensions(width: number, height: number, margin: number) {
    let vis: any = this

    vis.MARGIN = { TOP: 60, BOTTOM: margin, LEFT: 30, RIGHT: 140 }
    vis.WIDTH = width - vis.MARGIN.LEFT - vis.MARGIN.RIGHT
    vis.HEIGHT = height - vis.MARGIN.TOP - vis.MARGIN.BOTTOM

    vis.svg
      .attr('width', vis.WIDTH + vis.MARGIN.LEFT + vis.MARGIN.RIGHT)
      .attr('height', vis.HEIGHT + vis.MARGIN.TOP + vis.MARGIN.BOTTOM)

    vis.g.attr('transform', `translate(${vis.MARGIN.LEFT}, ${vis.MARGIN.TOP})`)

    vis.x = d3.scaleBand().range([0, vis.WIDTH]).padding(0.3)
    vis.y = d3.scaleLinear().range([vis.HEIGHT, 0])

    vis.xAxisGroup.attr('transform', `translate(0, ${vis.HEIGHT})`)
  }

  update(
    data: [],
    yValue = 'Amount',
    gValue = 'ReportRegion1',
    fromDate = '2014-01-01',
    toDate = '2021-01-01'
  ) {
    let vis: any = this
    vis.data = data || vis.data

    vis.gKeys = vis.data.reduce(
      (acc: any[], curr: any) => [...Array.from(new Set([...acc, curr[gValue]]))],
      []
    )

    vis.stack.keys(vis.gKeys)
    vis.stack.order(d3.stackOrderNone)
    vis.stack.offset(d3.stackOffsetNone)

    const reducer = (v: any) => {
      if (yValue === 'number') {
        return v.reduce(
          (acc: any[], curr: any) => [...Array.from(new Set([...acc, curr['Company']]))],
          []
        ).length
      } else {
        return d3.sum(
          v,
          (d: any) => Number(d[yValue]?.replace(/,/g, '') || 0) // remove commas
        )
      }
    }

    const dataByFunding = d3.rollups(
      vis.data,
      reducer,
      (d: any) => d['FundingYear'],
      (d: any) => d[gValue]
    )

    const stringToYear = (str: string) => str.split('-')[0]

    const timeFilteredDataByFunding = dataByFunding.filter(
      ([year, _]) =>
        Number(year) >= Number(stringToYear(fromDate)) &&
        Number(year) <= Number(stringToYear(toDate))
    )

    const dataAsObjects = timeFilteredDataByFunding
      .map(([year, values]) => {
        const vals = values.reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {})
        // get rid of NaNs
        const blankVals = vis.gKeys.reduce((acc: any[], key: string) => ({ ...acc, [key]: 0 }), {})
        return {
          year,
          ...blankVals,
          ...vals,
        }
      })
      .sort((a, b) => Number(a.year) - Number(b.year))

    const yearTotals = dataAsObjects.map((d: any) => ({
      ...d,
      total: d3.sum(vis.gKeys, (r: any) => d[r]),
    }))

    vis.x.domain(dataAsObjects.map(d => d.year))
    vis.y.domain([0, d3.max(yearTotals, d => d.total)])
    const x = d3.axisBottom(vis.x)
    vis.xAxisCall = x
    vis.xAxisCall.scale(vis.x)
    vis.xAxisGroup.transition(vis.t).call(vis.xAxisCall)
    // vis.yAxisCall.scale(vis.y)
    // vis.yAxisGroup.transition(vis.t).call(vis.yAxisCall.tickFormat(vis.formatAbbreviation))

    vis.groups = vis.g
      .selectAll('g.bars1')
      .data(vis.stack(dataAsObjects), (d: any) => d.key)
      .join(
        (enter: any) =>
          enter
            .append('g')
            .attr('class', 'bars1')
            .style('fill', (d: any, i: any) => vis.color(d.key)),
        (update: any) => update.style('fill', (d: any, i: any) => vis.color(d.key)),
        (exit: any) => exit.remove()
      )

    vis.topLabels = vis.g
      .selectAll('text.top-label')
      .data(yearTotals, (d: any) => d.year)
      .join(
        (enter: any) =>
          enter
            .append('text')
            .attr('class', 'top-label')
            .attr('y', (d: any) => vis.y(d.total))
            .attr('x', (d: any) => vis.x(d.year) + vis.x.bandwidth() / 2)
            .attr('dy', -10)
            .style('fill', '#333333')
            .attr('text-anchor', 'middle'),
        (update: any) =>
          update.call((update: any) =>
            update
              .transition(vis.t)
              .attr('y', (d: any) => vis.y(d.total))
              .attr('x', (d: any) => vis.x(d.year) + vis.x.bandwidth() / 2)
          ),
        (exit: any) => exit.remove()
      )
      .text((d: any) => (yValue === 'Amount' ? vis.formatAbbreviation(d.total) : d.total))

    vis.rects = vis.groups
      .selectAll('.bar')
      .data(
        (d: any) => d,
        (d: any) => d.data.year
      )
      .join(
        (enter: any) =>
          enter
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d: any) => vis.x(d.data.year))
            .attr('y', (d: any) => vis.y(d[1]))
            .attr('height', (d: any) => vis.y(d[0]) - vis.y(d[1]))
            .attr('width', vis.x.bandwidth),
        (update: any) =>
          update.call((update: any) =>
            update
              .transition(vis.t)
              .attr('x', (d: any) => vis.x(d.data.year))
              .attr('y', (d: any) => vis.y(d[1]))
              .attr('height', (d: any) => vis.y(d[0]) - vis.y(d[1]))
              .attr('width', vis.x.bandwidth)
          ),
        (exit: any) => exit.remove()
      )

    vis.labels = vis.groups
      .selectAll('.bar-label')
      .data(
        (d: any) => d,
        (d: any) => d.data.year
      )
      .join(
        (enter: any) =>
          enter
            .append('text')
            .attr('class', 'bar-label')
            .attr('y', (d: any) => vis.y(d[1]) + (vis.y(d[0]) - vis.y(d[1])) / 2)
            .attr('x', (d: any) => vis.x(d.data.year) + vis.x.bandwidth() / 2)
            .attr('dy', 6)
            .style('fill', '#ffffff')
            .attr('text-anchor', 'middle'),
        (update: any) =>
          update.call((update: any) =>
            update
              .transition(vis.t)
              .attr('y', (d: any) => vis.y(d[1]) + (vis.y(d[0]) - vis.y(d[1])) / 2)
              .attr('x', (d: any) => vis.x(d.data.year) + vis.x.bandwidth() / 2)
          ),
        (exit: any) => exit.remove()
      )
      .style('display', (d: any) =>
        vis.y(d[0]) - vis.y(d[1]) < 15 || vis.x.bandwidth() < 20 ? 'none' : 'inline'
      )
      .text((d: any) => (yValue === 'Amount' ? vis.formatAbbreviation(d[1] - d[0]) : d[1] - d[0]))

    vis.updateLegend()
  }

  updateLegend() {
    const vis: any = this

    vis.g.selectAll('.legendGroup').remove()

    const legend: any = vis.g
      .append('g')
      .attr('class', 'legendGroup')
      .attr('transform', `translate(${vis.WIDTH + 110}, 0)`)

    const legendArray = vis.gKeys.map((k: any) => ({ label: k, color: vis.color(k) }))

    const legendRow = legend
      .selectAll('.legendRow')
      .data(legendArray)
      .enter()
      .append('g')
      .attr('class', 'legendRow')
      .attr('transform', (d: any, i: any) => `translate(0, ${i * 20})`)

    legendRow
      .append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', (d: any) => d.color)

    legendRow
      .append('text')
      .attr('x', -10)
      .attr('y', 10)
      .attr('text-anchor', 'end')
      .style('text-transform', 'capitalize')
      .text((d: any) => d.label)
  }
}

export default StackedBar
