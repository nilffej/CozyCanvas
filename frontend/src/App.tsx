import { useEffect, useState } from "react";

import Canvas from "./pages/Canvas";
import SidePanel from "./components/SidePanel/SidePanel";

function App() {
  // const [data, setData] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:8000/")
  //     .then((res) => {
  //       console.log(res);
  //       return res.json();
  //     })
  //     .then((data) => console.log(data))
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <div className="flex">
      <SidePanel></SidePanel>
      <div className="flex justify-center items-center w-full">
        <Canvas />
      </div>
    </div>
  );
}

export default App;
