// ios 1091481095498-aeao7k3v524hmqmjq56qvqo1q81c3f6e.apps.googleusercontent.com
// web 1091481095498-4lnh1srj4ojbvolpstool30876skgff3.apps.googleusercontent.com
// android 1091481095498-fi8sjmp68etk5m914vahm116fc8qrefs.apps.googleusercontent.com

import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Colors from "../Assets/Shared/Colors";
import { Ionicons } from "@expo/vector-icons";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const styles = StyleSheet.create({
  container: {
    padding: 40,
    marginTop: -20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  welcomeText: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  login: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    margin: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Login() {
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1091481095498-fi8sjmp68etk5m914vahm116fc8qrefs.apps.googleusercontent.com",
    iosClientId:
      "1091481095498-aeao7k3v524hmqmjq56qvqo1q81c3f6e.apps.googleusercontent.com",
    webClientId:
      "1091481095498-4lnh1srj4ojbvolpstool30876skgff3.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.log("error in getUserInfo", error);
    }
  };

  return (
    <View>
      <Image
        source={require("./../Assets/Images/login.png")}
        style={{ width: 416, height: 300 }}
      />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to KoKoSpic!</Text>
        <Text>{JSON.stringify(userInfo, null, 2)}</Text>
        <Text style={styles.login}>Login/Signup</Text>
        <View>
          <Pressable style={styles.button} onPress={() => promptAsync()}>
            <Ionicons
              name="logo-google"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
            />
            <Text style={{ color: Colors.white }}>Sign In with Google</Text>
          </Pressable>
        </View>

        <View>
          <Pressable
            style={styles.button}
            onPress={() => AsyncStorage.removeItem("@user")}
          >
            <Text style={{ color: Colors.white }}>Delete local storage</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
