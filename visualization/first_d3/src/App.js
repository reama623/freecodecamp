import { useEffect, useState } from "react";
// import { AutoSizer } from "react-virtualized";
import Graph from "./Graph";

function App() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const handleWindowResize = function () {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <div style={{ border: "1px solid black" }}>
      <Graph {...size} />
    </div>
  );
}

export default App;
