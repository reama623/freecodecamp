import { csv } from "d3-fetch";
import { useEffect, useState } from "react";

import temperature from './assets/temperature.csv';

/**
 * 1차 데이터 셋 - UN 인구 수 데이터
 */
// const url =
//   "https://gist.githubusercontent.com/reama623/78bef39c78b6315b1f552d521d75a86b/raw/f822cbec76419981375d31903925990b7324fb1f/WPP2019_Population.csv";
/**
 * 2차 데이터 셋 - The iris dataset
 */
// const url =
//   "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";
const url =
  "https://gist.githubusercontent.com/curran/60b40877ef898f19aeb8/raw/9476be5bd15fb15a6d5c733dd79788fb679c9be9/week_temperature_sf.csv";

const useData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 받아온 모든 데이터가 string이기 때문에, number로 형변환을 해줘야 한다.
    const row = (d) => {
      d.timestamp = new Date(d.timestamp);
      d.temperature = +d.temperature;
      return d;
    };
    csv(temperature, row).then(setData);
  }, []);

  return data;
};

export default useData;
