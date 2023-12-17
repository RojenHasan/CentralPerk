import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Logout = () => {
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate("Welcome");
  };

  return (
    <ImageBackground
      source={require("../assets/pexels-william-choquette-2641886.jpeg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>You have successfully logged out</Text>
        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or "contain" depending on your image aspect ratio
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Adjust the overlay background color and opacity
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "white", // Set the text color to white or another contrasting color
  },
  button: {
    backgroundColor: "#FFA500", // Change to orange color
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default Logout;
