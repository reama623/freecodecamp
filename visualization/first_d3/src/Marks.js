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
      <circle
        className="mark"
        key={i}
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={10}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>
    );
  });
