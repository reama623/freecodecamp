import { line } from "d3-shape";

export const Marks = ({
  data,
  yScale,
  xScale,
  xValue,
  yValue,
  tooltipFormat,
}) => {
  return (
    <>
      <path
        fill="none"
        stroke="black"
        d={line()
          .x((d) => xScale(xValue(d)))
          .y((d) => yScale(yValue(d)))(data)}
      />
      {data.map((d, i) => {
        return (
          <circle
            className="mark"
            key={i}
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={3}
          >
            <title>{tooltipFormat(xValue(d))}</title>
          </circle>
        );
      })}
    </>
  );
};
