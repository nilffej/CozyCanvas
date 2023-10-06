import { useEffect, useState } from "react";
import Canvas from "./Canvas";

function App() {
  const [data, setData] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:8000/")
  //     .then((res) => {
  //       console.log(res);
  //       return res.json();
  //     })
  //     .then((data) => setData(JSON.stringify(data)))
  //     .catch((err) => console.error(err));
  // }, []);


  // return <div>API request result: {data}</div>;
  return (
    <div>
      <Canvas/>
    </div>
  )
}

export default App;
