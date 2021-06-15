export const Marks = ({
  data,
  yScale,
  xScale,
  xValue,
  yValue,
  tooltipFormat,
  colorScale,
  colorValue,
}) =>
  data.map((d, i) => {
    return (
      <circle
        className="mark"
        key={i}
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={10}
        fill={colorScale(colorValue(d))}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>
    );
  });
