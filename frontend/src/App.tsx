import { useEffect, useState } from "react";

import Canvas from "./pages/Canvas";
import SidePanel from "./components/SidePanel/SidePanel";
import Planner from "./Planner";
import CustomShapeEditor from "./components/CustomShapeEditor";

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
    <div>
      {/* <Planner/> */}
      <CustomShapeEditor/>
    </div>
  );
}

export default App;
