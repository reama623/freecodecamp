export const AxisLeft = ({ yScale, innerWidth }) => {
  return (
    <g>
      {yScale.ticks().map((tick, i) => (
        <g className="tick" key={i} transform={`translate(0, ${yScale(tick)})`}>
          <line x2={innerWidth} />
          <text key={tick} textAnchor="end" x={-3} dy=".32em">
            {tick}
          </text>
        </g>
      ))}
    </g>
  );
};
