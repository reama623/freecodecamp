import { scaleLinear, format, extent, scaleTime, max, timeFormat } from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import useData from "./useData";

import "./style.css";

// const url =
//   "https://gist.githubusercontent.com/reama623/b6c0dd948cecf951c7026220aa02fe57/raw/8e389ab4faadff97a8c9c5408bdcd9f8a7453376/cssNamedColors.csv";
// const width = 960;
// const height = 500;
const margin = { top: 20, right: 20, bottom: 70, left: 100 };

const xAxisLabelOffset = 50;
const yAxisLabelOffset = 50;

const Graph = ({ width, height }) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const data = useData();
  const xValue = (d) => d.timestamp;
  const xAxisLabelText = "Time stamp";
  const yValue = (d) => d.temperature;
  const yAxisLabelText = "Temperature";

  const yScale = scaleLinear()
    .domain([0, max(data.map(yValue))])
    .range([innerHeight, 0])
    .nice();
  const xScale = scaleTime()
    .domain(extent(data.map(xValue)))
    .range([0, innerWidth])
    .nice();

  // const tickFormatter = format(".2s");
  const xAxisTickFormat = timeFormat("%a");

  return (
    <>
      {!data && <div>Loading...</div>}
      {data && (
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisLeft yScale={yScale} innerWidth={innerWidth} />
            <text
              className="axisLabel"
              textAnchor="middle"
              transform={`translate(${-yAxisLabelOffset},${
                innerHeight / 2
              }) rotate(-90)`}
            >
              {yAxisLabelText}
            </text>
            <AxisBottom
              xScale={xScale}
              innerHeight={innerHeight}
              axisTickFormat={xAxisTickFormat}
              tickOffset={5}
            />
            <text
              className="axisLabel"
              textAnchor="middle"
              x={innerWidth / 2}
              y={innerHeight + xAxisLabelOffset}
            >
              {xAxisLabelText}
            </text>
            <Marks
              data={data}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              tooltipFormat={xAxisTickFormat}
            />
          </g>
        </svg>
      )}
    </>
  );
};
export default Graph;
