export const Marks = ({ data, yScale, xScale, xValue, yValue }) =>
  data.map((d, i) => {
    return (
      <rect
        key={i}
        x={0}
        y={yScale(yValue(d))}
        width={xScale(xValue(d))}
        height={yScale.bandwidth()}
      />
    );
  });
