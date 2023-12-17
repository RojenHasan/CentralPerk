import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { signOut } from "firebase/auth"; // Import the signOut function from Firebase Authentication

import { getAuth } from "firebase/auth"; // Import the getAuth function to get the auth object

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const userEmail = route.params?.userEmail;

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  const navigateToLogin = () => {
    if (userEmail) {
      clearUserData();
    } else {
      navigation.navigate("Login");
    }
  };

  const clearUserData = () => {
    const auth = getAuth(); // Get the auth object
    signOut(auth) // Sign out the user using the auth object
      .then(() => {
        // Successfully signed out
        // You can also clear user data from other sources like AsyncStorage here
        navigation.navigate("Logout"); // Navigate to the Logout screen or any other appropriate screen
      })
      .catch((error) => {
        // Handle sign-out error
        console.error(error);
      });
  };

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/pexels-william-choquette-2641886.jpeg")}
    >
      <View
        style={{ flex: 1, backgroundColor: "rgb(0, 0, 0)", opacity: 0.2 }}
      />
      <View
        style={{
          position: "absolute",
          height: "100%",
          zIndex: 2,
          width: "100%",
          justifyContent: "flex-end",
          paddingHorizontal: 10 * 2,
          paddingBottom: 10 * 5,
        }}
      >
        <View>
          <Text
            style={{
              color: "rgb(255, 255, 255)",
              fontWeight: "800",
              fontSize: 10 * 4.5,
              textTransform: "capitalize",
            }}
          >
            Central Perk Eats
          </Text>
          <Text
            style={{
              color: "rgb(255, 255, 255)",
              fontWeight: "600",
              fontSize: 10 * 1.7,
            }}
          >
            Good food, Good mood!
          </Text>
          {userEmail && (
            <Text
            style={{
              color: "rgb(255, 255, 255)",
              fontSize: 10 * 2,
              marginTop: 10 * 2,
              borderWidth: 1, // Border width in pixels
              borderColor: "rgb(255, 255, 255)", // Border color
              borderRadius: 5, // Border radius for rounded corners
              padding: 10, // Optional: Add padding to the text inside the border
              backgroundColor: "rgba(255, 165, 0, 0.5)", // Background color
            }}
            >
              Welcome, {userEmail}!
            </Text>
          )}
          {userEmail && (
            <TouchableOpacity
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)", // Adjust the opacity (0.5 in this case)
                borderColor: "rgb(0, 0, 0)",
                borderWidth: 2,
                padding: 10 * 2,
                borderRadius: 10 * 2,
                alignItems: "center",
                marginTop: 10 * 3,
              }}
              onPress={navigateToHome}
            >
              <Text
                style={{
                  color: "rgb(0, 0, 0)",
                  fontSize: 10 * 2,
                  fontWeight: "700",
                }}
              >
                Explore Now
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)", // Adjust the opacity (0.5 in this case)
              borderColor: "rgb(0, 0, 0)",
              borderWidth: 2,
              padding: 10 * 2,
              borderRadius: 10 * 2,
              alignItems: "center",
              marginTop: 10 * 3,
            }}
            onPress={navigateToLogin}
          >
            <Text
              style={{
                color: "rgb(0, 0, 0)",
                fontSize: 10 * 2,
                fontWeight: "700",
              }}
            >
              {userEmail ? "Log Out" : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
