import { csv } from "d3-fetch";
import { useEffect, useState } from "react";

const url =
  "https://gist.githubusercontent.com/reama623/78bef39c78b6315b1f552d521d75a86b/raw/f822cbec76419981375d31903925990b7324fb1f/WPP2019_Population.csv";

const useData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 데이터가 string이기 때문에, 숫자로 바꿔주기 위해 +를 앞에 붙여준다.
    // parseFloat를 쓸 필요 없이 + 연산자로 숫자로 바꿔줌.
    const row = (d) => {
      d.Population = +d["2020"];
      return d;
    };
    csv(url, row).then((data) => setData(data.slice(0, 10)));
  }, []);

  return data;
};

export default useData;
