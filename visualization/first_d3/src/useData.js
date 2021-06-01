import { csv } from "d3-fetch";
import { useEffect, useState } from "react";

/**
 * 1차 데이터 셋 - UN 인구 수 데이터
 */
// const url =
//   "https://gist.githubusercontent.com/reama623/78bef39c78b6315b1f552d521d75a86b/raw/f822cbec76419981375d31903925990b7324fb1f/WPP2019_Population.csv";
/**
 * 2차 데이터 셋 - The iris dataset
 */
const url =
  "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";

const useData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 받아온 모든 데이터가 string이기 때문에, number로 형변환을 해줘야 한다.
    const row = (d) => {
      d.petal_length = +d.petal_length;
      d.petal_width = +d.petal_width;
      d.sepal_length = +d.sepal_length;
      d.sepal_width = +d.sepal_width;
      return d;
    };
    csv(url, row).then(setData);
  }, []);

  return data;
};

export default useData;
