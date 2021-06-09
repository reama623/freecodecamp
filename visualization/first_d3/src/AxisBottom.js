export const AxisBottom = ({ xScale, innerHeight, axisTickFormat }) => {
  return (
    <g>
      {xScale.ticks().map((tick, i) => (
        <g className="tick" key={i} transform={`translate(${xScale(tick)},0)`}>
          <line key={i} y2={innerHeight} />
          <text y={innerHeight + 3} dy=".71em" style={{ textAnchor: "middle" }}>
            {axisTickFormat(tick)}
          </text>
        </g>
      ))}
    </g>
  );
};
