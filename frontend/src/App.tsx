import { useEffect, useState } from "react";

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
    <div>
      <SidePanel></SidePanel>
    </div>
  );
}

export default App;
