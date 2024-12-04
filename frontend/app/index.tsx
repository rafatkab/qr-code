import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { BleManager, Device } from "react-native-ble-plx";

export default function Index() {
  const [manager, setManager] = useState<BleManager | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const bleManager = new BleManager();
    setManager(bleManager);

    // iOS-specific permission handling
    if (Platform.OS === "ios") {
      const subscription = bleManager.onStateChange((state) => {
        if (state === "PoweredOn") {
          console.log("Bluetooth is powered on.");
        } else {
          Alert.alert(
            "Bluetooth is Off",
            "Please turn on Bluetooth to scan for devices."
          );
        }
      }, true);

      return () => {
        subscription.remove();
        bleManager.destroy();
      };
    }

    return () => {
      bleManager.destroy();
    };
  }, []);

  const startScan = () => {
    if (!manager) {
      Alert.alert("Error", "Bluetooth Manager is not initialized.");
      return;
    }

    setDevices([]); // Clear previously scanned devices
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error("Scan error:", error.message);
        return;
      }

      if (device && !devices.some((d) => d.id === device.id)) {
        setDevices((prevDevices) => [...prevDevices, device]);
      }
    });

    // Stop scanning after 10 seconds
    setTimeout(() => manager.stopDeviceScan(), 10000);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TouchableOpacity
        onPress={startScan}
        style={{
          backgroundColor: "#6200ee",
          padding: 16,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          Start Scan
        </Text>
      </TouchableOpacity>

      <ScrollView style={{ flex: 1 }}>
        {devices.map((device) => (
          <View
            key={device.id}
            style={{
              marginBottom: 8,
              padding: 8,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 4,
            }}
          >
            <Text>ID: {device.id}</Text>
            <Text>Name: {device.name || "N/A"}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
