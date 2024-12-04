import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import "./App.css";

function App() {
  const [data, setData] = useState("No result");

  return (
    <div>
      <p style={{ fontSize: "2rem", margin: "0px" }}>{data}</p>
      <center>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.getText());
            }

            if (!!error) {
              console.info(error);
            }
          }}
          constraints={{ facingMode: "user" }}
          containerStyle={{ width: "50%", border: "rounded-full" }}
        />
      </center>
    </div>
  );
}

export default App;
