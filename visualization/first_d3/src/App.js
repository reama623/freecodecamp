import { scaleBand, scaleLinear, max, format } from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import useData from "./useData";

import "./style.css";

// const url =
//   "https://gist.githubusercontent.com/reama623/b6c0dd948cecf951c7026220aa02fe57/raw/8e389ab4faadff97a8c9c5408bdcd9f8a7453376/cssNamedColors.csv";
const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 20, left: 200 };

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

function App() {
  // custom 훅을 이용하여 데이터를 받아옴.
  const data = useData();
  const xValue = (d) => d.Population;
  const yValue = (d) => d.country;
  /*
   * yScale은 scaleBand를 이용해 구하는데,
   * Band는 동일한 간격을 나누는 것이므로 domain이 필요 없이 range만 정해줘도 알아서 구해진다. -> 개소리..
   *
   * y축은 나라를 축에 나타내는 것으로, 동일한 간격으로 band를 나눠줘야 한다. (가로 막대그래프 형태로 나타내주기 때문)
   * y축을 동일한 간격으로 나누기 위해 scaleBand를 사용했고, 한칸은 나라 하나이고 동일하게 나누어야하기 때문에,
   * domain은 표현하기 위한 모든 나라를 배열로 리턴해주면 된다.
   * range는 0부터 높이로 표현 -> domain을 y축에 매칭시켜준다. 링크 참조(https://media.vlpt.us/images/badbeoti/post/ed3bd426-3263-4ae4-af4f-aa4b8bb8e11d/image.png)
   */
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.2);

  /**
   * xScale의 정의는, Population을 width에 매칭시키는 것이다.
   * 인구수를 길이로 표현하는데, 쉽게 생각해보자. 비율을 구하는 것이다.
   * 만약 데이터 군의 최대 인구 수가 81명이고, 그래프를 그리기 위한 도화지의 크기가 1000px라면, 81은 1000px에 매칭될 것이다.
   * 그렇다면 인구수가 71이면 몇 px으로 표현될까? 답은 864.19753...px이다. 방정식을 이용해 구하면 된다.(81 : 71 = 1000 : x)
   * 이런 계산을 ScaleLinear가 해준다고 생각하면 된다. 링크 참조(https://miro.medium.com/max/346/0*K2Na5iCzLQjePbUp)
   */
  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

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
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            axisTickFormat={axisTickFormat}
          />
          <AxisLeft yScale={yScale} />
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
