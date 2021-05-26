export const AxisLeft = ({ yScale }) => {
  return yScale.domain().map((tick, i) => (
    <text
      key={tick}
      textAnchor="end"
      x={-3}
      dy=".32em"
      y={yScale(tick) + yScale.bandwidth() / 2}
    >
      {tick}
    </text>
  ));
};
