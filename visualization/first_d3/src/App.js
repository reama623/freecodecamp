import { scaleLinear, format, extent } from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import useData from "./useData";

import "./style.css";

// const url =
//   "https://gist.githubusercontent.com/reama623/b6c0dd948cecf951c7026220aa02fe57/raw/8e389ab4faadff97a8c9c5408bdcd9f8a7453376/cssNamedColors.csv";
const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 70, left: 100 };

const xAxisLabelOffset = 50;
const yAxisLabelOffset = 50;

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

function App() {
  // custom 훅을 이용하여 데이터를 받아옴.
  const data = useData();
  const xValue = (d) => d.sepal_length;
  const xAxisLabelText = "Sepal Length";
  const yValue = (d) => d.sepal_width;
  const yAxisLabelText = "Sepal Width";

  const yScale = scaleLinear()
    .domain(extent(data.map(yValue)))
    .range([0, innerHeight]);
  const xScale = scaleLinear()
    .domain(extent(data.map(xValue)))
    .range([0, innerWidth])
    .nice();

  const tickFormatter = format(".2s");
  const axisTickFormat = (n) => {
    if (!n) {
      return 0;
    }
    return tickFormatter(n).replace("G", "B");
  };

  return (
    <div style={{ border: "1px solid black" }}>
      {!data && <div>Loading...</div>}
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
            axisTickFormat={axisTickFormat}
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
            tooltipFormat={axisTickFormat}
          />
        </g>
      </svg>
    </div>
  );
}

export default App;
