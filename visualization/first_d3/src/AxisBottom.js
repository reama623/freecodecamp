export const AxisBottom = ({ xScale, innerHeight }) => {
  return xScale.ticks().map((tick, i) => (
    <g transform={`translate(${xScale(tick)},0)`}>
      <line key={i} y2={innerHeight} stroke="black" />
      <text y={innerHeight + 3} dy=".71em" style={{ textAnchor: "middle" }}>
        {tick}
      </text>
    </g>
  ));
};
