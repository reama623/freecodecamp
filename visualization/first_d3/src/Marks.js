export const Marks = ({
  data,
  yScale,
  xScale,
  xValue,
  yValue,
  tooltipFormat,
  colorScale,
  colorValue,
  markRadius = 8,
}) =>
  data.map((d, i) => {
    return (
      <circle
        className="mark"
        key={i}
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={markRadius}
        fill={colorScale(colorValue(d))}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>
    );
  });
