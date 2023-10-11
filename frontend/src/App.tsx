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
    <div style={{backgroundColor: "#18181b", height: "100vh", width:"100vw", position:"absolute", top:"0px", left:"0px"}}>
      <Canvas/>
    </div>
  )
}

export default App;
