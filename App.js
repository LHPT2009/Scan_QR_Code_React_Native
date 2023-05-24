import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState();

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    // console.log("Type: " + type + "\nData: " + data);
    alert("chuyển trang...");
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  const stringHandling = () => {
    if (text) {
      const cuttext = text.split("||");
      //chuỗi 1
      const idcard = cuttext[0];
      //chuỗi 2
      const info = cuttext[1].split("|");
      const name = info[0];
      const date =
        info[1].substr(4, 4) +
        "-" +
        info[1].substr(2, 2) +
        "-" +
        info[1].substr(0, 2);
      const sex = info[2];
      const dress = info[3];
      const daterange =
        info[4].substr(4, 4) +
        "-" +
        info[4].substr(2, 2) +
        "-" +
        info[4].substr(0, 2);
      const obj = `${idcard}, ${name}, ${date}, ${sex}, ${dress}, ${daterange}`;
      return obj;
    } else {
      return "";
    }
  };
  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.maintext}>{stringHandling()}</Text>

      {scanned && (
        <>
          <Button
            title={"quet lai"}
            onPress={() => setScanned(false)}
            color="tomato"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
});
