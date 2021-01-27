import * as d3 from "d3"
import "./styles.css"

class D32X2 {
  constructor(element: Element, data: any[]) {
    let vis: any = this
    vis.data = data

    vis.svg = d3.select(element)
      .append("svg")
        .attr("width", 0)
        .attr("height", 0)
    vis.g = vis.svg.append("g")

    // arrowhead
    vis.defs = vis.svg.append("defs")
    vis.defs.append("marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 0 12 12")
    .attr("refX", 6)
    .attr("refY", 6)
    .attr("markerWidth", 12)
    .attr("markerHeight", 12)
    .attr("orient", "auto")
    .append("path")
      .attr("d", "M 0 0 12 6 0 12 3 6")
      .attr("class","arrowHead")

    vis.xAxisGroup = vis.g.append("g")
      .attr("class", "x dotted-axis")

    vis.yAxisGroup = vis.g.append("g")
      .attr("class", "y dotted-axis")
  }

  setDimensions(width: number, height: number, margin: number) {
    let vis: any = this

    vis.MARGIN = { TOP: margin, BOTTOM: margin * 2, LEFT: (margin * 2) + 10, RIGHT: 20 }
    // this will make it square!
    vis.WIDTH = Math.min(width, height) - vis.MARGIN.LEFT - vis.MARGIN.RIGHT
    vis.HEIGHT = Math.min(width, height) - vis.MARGIN.TOP - vis.MARGIN.BOTTOM

    vis.svg
      .attr("width", vis.WIDTH + vis.MARGIN.LEFT + vis.MARGIN.RIGHT)
      .attr("height", vis.HEIGHT + vis.MARGIN.TOP + vis.MARGIN.BOTTOM)

    vis.g.attr("transform", `translate(${vis.MARGIN.LEFT}, ${vis.MARGIN.TOP})`)

    vis.g.append("text")
      .attr("class", "x axisLabel")
      .attr("y", vis.HEIGHT + 30)
      .attr("x", vis.WIDTH / 2)
      .attr("font-size", "18px")
      .attr("text-anchor", "middle")
      .attr("fill", "#6C809D")
      .text("Scale")
    vis.g.append("text")
      .attr("class", "y axisLabel")
      .attr("y", (vis.HEIGHT / 2) + 4)
      .attr("x", -50)
      .attr("font-size", "18px")
      .attr("text-anchor", "middle")
      .attr("fill", "#6C809D")
      .text("Capability")

    vis.x = d3.scaleLinear()
      .domain([0, 5])
      .range([0, vis.WIDTH])
    vis.y = d3.scaleLinear()
      .domain([0, 5])
      .range([vis.HEIGHT, 0])

    vis.xAxisCall = d3.axisBottom(vis.x)
      .tickValues([])
      .tickSizeOuter(0)
    vis.xAxisGroup
      .attr("transform", `translate(0, ${vis.HEIGHT / 2})`)
      .style("dominant-baseline", "central")
      .call(vis.xAxisCall)

    vis.xAxisGroup.select("path").attr("marker-end", "url(#arrow)");
      
    vis.yAxisCall = d3.axisLeft(vis.y)
      .tickValues([])
      .tickSizeOuter(0)
    vis.yAxisGroup
      .attr("transform", `translate(${vis.WIDTH / 2}, 0)`)
      .style("dominant-baseline", "central")
      .call(vis.yAxisCall)

    vis.yAxisGroup.select("path").attr("marker-end", "url(#arrow)");
  }

  update(data: any[], capabilities: any, adaptabilities: any) {
    let vis: any = this
    vis.data = data || vis.data
    vis.t = () => d3.transition().duration(1000)


    const adaptReducer = (items: any, d: any) => ( 
      items.reduce(
        (acc: any, curr: any) => Number(d[curr.name]) + acc,
        0
      ) / items.length || 2.5
    ).toFixed(1)
    
    const scoreReducer = (items: any, d: any) => ( 
      items.reduce(
        (acc: any, curr: any) => Number(d[curr.name]) + acc,
        0
      ) / items.length * 5 || 2.5
    ).toFixed(1)

    const adaps = adaptabilities.filter((d: any) => d.scale_type === "score")

    vis.data.forEach((d: any) => {
      d.cap_score = scoreReducer(capabilities, d)
      d.adapt_score = adaptReducer(adaps, d)
    })

    vis.logos = vis.g.selectAll(".logo")
      .data(vis.data)
      .join(
        (enter: any) => (
          enter.append("svg:image")
            .attr("class", "logo")
            .attr("transform", (d: any) => (
              `translate(${vis.x(d.cap_score) - 20}, 
                ${vis.y(d.adapt_score) - 20})`
            ))
            .attr("xlink:href", (d: any) => d.logo)
            .attr("width", 40)
            .attr("height", 40)
            .style("opacity", 0.8)
        ),
        (update: any) => (
          update.call((update: any) => (
            update.transition(vis.t)
              .attr("transform", (d: any) => (
                `translate(${vis.x(d.cap_score) - 20},
                  ${vis.y(d.adapt_score) - 20})`
              ))
          ))
        ),
        (exit: any) => exit.remove()
      )
  }
}

export default D32X2
