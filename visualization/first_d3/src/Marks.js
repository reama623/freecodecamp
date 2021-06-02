export const Marks = ({
  data,
  yScale,
  xScale,
  xValue,
  yValue,
  tooltipFormat,
}) =>
  data.map((d, i) => {
    return (
      <line
        className="mark"
        key={i}
        x={xScale(xValue(d))}
        y={yScale(yValue(d))}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </line>
    );
  });
