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

    vis.DIAMETER = Math.max(width, height) * 1
    vis.RADIUS = (vis.DIAMETER / 8)

    vis.svg
      .attr("width", vis.DIAMETER)
      .attr("height", vis.DIAMETER)
    vis.g.attr("transform", `translate(${vis.DIAMETER / 2}, ${vis.DIAMETER / 2})`)

    vis.format = d3.format(",d");

    vis.arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(vis.RADIUS * 1.5)
      .innerRadius(d => d.y0 * vis.RADIUS)
      .outerRadius(d => Math.max(d.y0 * vis.RADIUS, d.y1 * vis.RADIUS - 1));

    vis.partition = data => {
      const root = d3.hierarchy(data)
        .sum(d => d.size)
        .sort((a, b) => b.size - a.size);
      return d3.partition()
        .size([2 * Math.PI, root.height + 1])
        (root);
    }

    vis.selectedLabel = vis.g.append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "1.8rem")
      .attr("y", "-1rem")
      .text("Business Line")

    vis.selectedCount = vis.g.append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "1rem")
      .attr("y", "1rem")
      .text("25210 companies")

    vis.update()
  }

  update(data) {
    let vis = this
    vis.data = data || vis.data
    
    vis.root = vis.partition(vis.data);
    const color = d3.scaleOrdinal()
      .range(d3.quantize(d3.interpolateRainbow, vis.data.children.length + 1));
    
    vis.root.each(d => d.current = d);
        
    vis.path = vis.g.append("g")
      .selectAll("path")
      .data(vis.root.descendants().slice(1), d => d.data.name)
      .join("path")
      .attr("fill", d => {
        while (d.depth > 1)
          d = d.parent;
        return color(d.data.name);
      })
      .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
      .attr("d", d => vis.arc(d.current));

    vis.path.filter(d => d.children)
      .style("cursor", "pointer")
      .on("click", clicked);

    vis.path.append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${vis.format(d.value)}`);

    vis.label = vis.g.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
      .selectAll("text")
      .data(vis.root.descendants().slice(1), d => d.data.name)
      .join("text")
      .attr("dy", "0.35em")
      .style("font-size", "12px")
      .attr("fill-opacity", d => +labelVisible(d.current))
      .attr("transform", d => labelTransform(d.current))
      .text(d => d.data.name);

    const parent = vis.g.append("circle")
      .datum(vis.root, d => d.data.name)
      .attr("r", vis.RADIUS)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("click", clicked);
    
    if (vis.activeNode?.parent) {
      clicked("", vis.activeNode, 0)
    }

    function clicked(e, p, time = 750) {
      parent.datum(p.parent || vis.root);

      vis.selectedLabel.text(p.data.name)
      vis.selectedCount.text(`${p.value} companies`)

      vis.setActiveNode(p)

      vis.root.each(d => d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth)
      });

      const t = vis.g.transition().duration(time);

      vis.path.transition(t)
        .tween("data", d => {
          const i = d3.interpolate(d.current, d.target);
          return t => d.current = i(t);
        })
        .filter(function(d) {
          return +this.getAttribute("fill-opacity") || arcVisible(d.target)
        })
        .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
        .attrTween("d", d => () => vis.arc(d.current));

      vis.label
        .filter(function(d) { return +this.getAttribute("fill-opacity") || labelVisible(d.target)})
        .transition(t)
          .attr("fill-opacity", d => +labelVisible(d.target))
          .attrTween("transform", d => () => labelTransform(d.current));
    }

    function arcVisible(d) {
      return d.y1 <= 4 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
      return d.y1 <= 4 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    function labelTransform(d) {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      const y = (d.y0 + d.y1) / 2 * vis.RADIUS;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }

  }
}

export default D3Chart
