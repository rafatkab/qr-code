import { Text, View } from "react-native";
import QRCode from "react-qr-code";
import Camera from "react-native-camera";

import "../global.css";

export default function Index() {
  return (
    <View>
      <Text className="text-4xl">Hello World</Text>
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "25%", width: "25%" }}
        value={"Hello"}
        viewBox={`0 0 256 256`}
      />
      <Camera
        aspect={Camera.constants.Aspect.fill}
        captureAudio={false}
      ></Camera>
    </View>
  );
}
