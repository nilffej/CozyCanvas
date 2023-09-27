import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => setData(JSON.stringify(data)))
      .catch((err) => console.error(err));
  }, []);

  return <div>API request result: {data}</div>;
}

export default App;
