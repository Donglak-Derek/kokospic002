// ios 1091481095498-aeao7k3v524hmqmjq56qvqo1q81c3f6e.apps.googleusercontent.com
// web 1091481095498-4lnh1srj4ojbvolpstool30876skgff3.apps.googleusercontent.com
// android 1091481095498-fi8sjmp68etk5m914vahm116fc8qrefs.apps.googleusercontent.com

import { StyleSheet, View } from "react-native";
import Login from "./App/Pages/Login";

export default function App() {
  return (
    <View style={styles.container}>
      <Login />;
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
});
