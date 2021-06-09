import { curveCardinal, line } from "d3-shape";

export const Marks = ({
  data,
  yScale,
  xScale,
  xValue,
  yValue,
  tooltipFormat,
}) => {
  return (
    <g className="marks">
      <path
        d={line()
          .curve(curveCardinal)
          .x((d) => xScale(xValue(d)))
          .y((d) => yScale(yValue(d)))(data)}
      />
      {data.map((d, i) => {
        return (
          <circle key={i} cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={3}>
            <title>{tooltipFormat(xValue(d))}</title>
          </circle>
        );
      })}
    </g>
  );
};
