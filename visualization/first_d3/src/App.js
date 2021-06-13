import { scaleLinear, format, extent } from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import useData from "./useData";

import "./style.css";
import { useState } from "react";
import Dropdown from "./Dropdown";

// const url =
//   "https://gist.githubusercontent.com/reama623/b6c0dd948cecf951c7026220aa02fe57/raw/8e389ab4faadff97a8c9c5408bdcd9f8a7453376/cssNamedColors.csv";
const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 70, left: 100 };

const xAxisLabelOffset = 50;
const yAxisLabelOffset = 50;

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const items = [
  { value: "sepal_length", label: "sepal_length" },
  { value: "sepal_width", label: "sepal_width" },
  { value: "petal_length", label: "petal_length" },
  { value: "petal_width", label: "petal_width" },
  { value: "species", label: "species" },
];

const getAttributeLabel = (value) => {
  for (const item of items) {
    if (item.value === value) {
      return item.label;
    }
  }
};

function App() {
  // custom 훅을 이용하여 데이터를 받아옴.
  const data = useData();

  const initialXAttribute = "sepal_length";
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];
  const xAxisLabelText = getAttributeLabel(xAttribute);

  const initialYAttribute = "petal_length";
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];
  const yAxisLabelText = getAttributeLabel(yAttribute);

  const yScale = scaleLinear()
    .domain(extent(data.map(yValue)))
    .range([innerHeight, 0]);
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

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Dropdown
        items={items}
        selectedValue={xAttribute}
        setSelectedValue={setXAttribute}
      />
      <Dropdown
        items={items}
        selectedValue={yAttribute}
        setSelectedValue={setYAttribute}
      />
      <div style={{ border: "1px solid black" }}>
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
    </>
  );
}

export default App;
