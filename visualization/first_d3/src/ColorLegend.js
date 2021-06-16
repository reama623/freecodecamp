export const ColorLegend = ({
  colorScale,
  tickPadding = 20,
  tickTextOffset = 20,
  tickSpacing = 20,
}) =>
  colorScale.domain().map((domainValue, i) => (
    <g transform={`translate(0, ${i * tickSpacing})`}>
      <circle r={7} fill={colorScale(domainValue)} />
      <text x={tickTextOffset} dy=".32em" key={i}>
        {domainValue}
      </text>
    </g>
  ));
