import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { QrReader } from "react-qr-reader";
import "./App.css";

function App() {
  useEffect(() => {
    window.addEventListener("click", () => {
      navigator.bluetooth
        .requestDevice({ acceptAllDevices: true })
        .then((device) => console.log(device))
        .catch((error) => console.log(error));
    });
  }, []);

  const [data, setData] = useState("No result");

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "100%" }}
      />
      <p>{data}</p>
      <button>Click me</button>
    </>
  );
}

export default App;
