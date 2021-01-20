import * as d3 from "d3"
import { tip as d3tip } from "d3-v6-tip"
import "./styles.css"
import retailBanking from "../../../../images/label-retail-banking.svg"

const text = {
  "Neobanks": "Neobanks are Digital Challenger Banks that do not have a full banking license. Instead, they either partner with a bank license holder or leverage another license type to provide ‘bank-like’ features",
  "Challenger Banks": "Challenger Banks hold a full banking license, which permits them to provide a full range of banking products and services",
  "Digital Challenger Banks": "Digital Challenger Banks are digital-native banks that compete with incumbent banks. They are characterized by several main traits: they provide digital-only and mobile-centric services, design personalized user experiences and leverage cloud-native open architecture technology stacks."
}

class D3Chart {
  constructor(element, data, activeNode, setActiveNode) {
    let vis = this
    vis.data = data
    vis.activeNode = activeNode
    vis.setActiveNode = setActiveNode

    vis.DIAMETER = 0
    vis.MARGIN = 0

    vis.svg = d3.select(element)
      .append("svg")
        .attr("width", 0)
        .attr("height", 0)
        .style("background", "#f8fafc")
        .style("cursor", "pointer")
    vis.g = vis.svg.append("g")

    vis.tip = d3tip()
      .attr('class', 'd3-tip n')
      .html((e, d) => `
          <div class="tip-content">
            <div class="tip-header">${d.data.name}</div>
            <div class="tip-body">${text[d.data.name]}</div>
          </div>
        `
      );

    vis.color = d3.scaleOrdinal(d3.schemePastel1)
  }

  setDimensions(width, height) {
    let vis = this

    const scale = width > height ? 0.9 : 0.9

    vis.DIAMETER = Math.max(width, height) * scale

    vis.svg
      .attr("width", width)
      .attr("height", vis.DIAMETER)
    vis.g.attr("transform", `translate(${width / 2}, ${vis.DIAMETER / 2})`)

    vis.pack = d3.pack()
      .size([vis.DIAMETER - vis.MARGIN, vis.DIAMETER - vis.MARGIN])
      .padding(2)

    vis.update()
  }

  update(data) {
    let vis = this
    vis.data = data || vis.data

    vis.root = d3.hierarchy(vis.data)
      .sum(d => d.size)
      .sort((a, b) => b.value - a.value)

    vis.focus = vis.activeNode || vis.root
    vis.nodes = vis.pack(vis.root).descendants()

    let view = [vis.focus.x, vis.focus.y, vis.focus.r * 2]

    vis.g.call(vis.tip)

    vis.circle = vis.g.selectAll("circle")
      .data(vis.nodes)
      .enter().append("circle")
        .attr("class", d =>
          d.noData ? "node no-data node--leaf" 
          : d.parent ? (d.children ? "node" : "node node--leaf") 
          : "node node--root"
        )
        .attr("id", d => `circle-${d.data.name}`)
        .style("fill-opacity", d => (
          d.parent?.data?.name === vis.focus?.data?.name 
            ? 1
            : 0
        ))
        .style("display", d => (d.parent?.data?.name === vis.focus?.data?.name ? "inline" : "none"))
        .style("fill", d => (
            d.depth === 0 ? null
            : d.data?.color || "#D1E7DD"
          )
        )
        .on("click", (event, d) => {
          if (d.children) {
            vis.focus !== d && (zoom(event, d))
          }
          event && event.stopPropagation()
        })
        .on('mouseover', function(event, d) {
          if(text[d.data.name]) {
            vis.tip.show(event, d)
          }
        })
        .on('mouseout', vis.tip.hide)

    vis.label = vis.g.selectAll(".label")
      .attr("pointer-events", "none")
      .data(vis.nodes)
        .enter().append("svg:image")
        .attr("class", "label img-label")
        .style("fill-opacity", d => (
          d.parent?.data?.name === vis.focus?.data?.name 
            ? 1
            : 0
        ))
        .style("display", d => (d.parent?.data?.name === vis.focus?.data?.name ? "inline" : "none"))
        .attr("xlink:href", d => d.data.label || retailBanking)

    vis.node = vis.g.selectAll("circle,.label")

    vis.svg.on("click", (event) => zoom(event, vis.root))

    zoomTo([vis.focus.x, vis.focus.y, vis.focus.r * 2])

    function zoomTo(v) {
      const k = vis.DIAMETER / v[2];

      view = v;
      const p = 0.7

      vis.label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      vis.label
        .attr("padding", "10px")
        .attr("width", d => d.r * k * 2 * p)
        .attr("height", d => d.r * k * 2 * p)
        .attr("y", d => -d.r * k * p)
        .attr("x", d => -d.r * k * p)
      vis.node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      vis.node.attr("r", d => d.r * k);
    }
    
    function zoom(event, d) {
      vis.focus = d;
      vis.setActiveNode(d)

      const transition = vis.svg.transition()
        .duration(event?.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [vis.focus.x, vis.focus.y, vis.focus.r * 2]);
          return t => zoomTo(i(t));
        });

      vis.label
        .filter(function(d) { return d.parent === vis.focus || this.style.display === "inline"; })
        .transition(transition)
        .style("opacity", d => (
          d.parent?.data?.name === vis.focus?.data?.name 
            ? 1
            : 0
        ))

      vis.node
        .filter(function(d) { return d.parent === vis.focus || this.style.display === "inline"; })
        .transition(transition)
          .style("fill-opacity", d => (
            d.parent?.data?.name === vis.focus?.data?.name 
              ? 1
              : 0
          ))
          .on("start", function(d) { if (d.parent === vis.focus) this.style.display = "inline"; })
          .on("end", function(d) { if (d.parent !== vis.focus) this.style.display = "none"; });
    }
  }
}

export default D3Chart
