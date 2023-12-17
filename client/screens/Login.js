import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from 'firebase/auth'; 
import firebaseApp from '../firebase';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Get the Auth object using getAuth from Firebase
  const auth = getAuth(firebaseApp);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // If login is successful, navigate to the Welcome screen
      navigation.navigate('Welcome', { userEmail: email });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      // Handle different error codes and provide user-friendly messages
      if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found') {
        setError('Invalid email address. Please check your email and try again.');
      } else if (errorCode === 'auth/wrong-password') {
        setError('Incorrect password. Please check your password and try again.');
      } else {
        setError(errorMessage);
      }
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // If sign up is successful, navigate to the Home screen
      navigation.navigate('Welcome', { userEmail: email });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      // Handle different error codes and provide user-friendly messages
      if (errorCode === 'auth/email-already-in-use') {
        setError('Email address is already in use. Please use a different email.');
      } else if (errorCode === 'auth/invalid-email') {
        setError('Invalid email address. Please check your email and try again.');
      } else {
        setError(errorMessage);
      }
    }
  };

  return (
    <ImageBackground
      source={require("../assets/pexels-william-choquette-2641886.jpeg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Login or Register</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust the opacity (0.7 in this case)
    padding: 20,
    borderRadius: 10,
    width: '80%', // Adjust as needed
    maxWidth: 400, // Adjust as needed
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%', // Take up the full width within the overlay
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Login;
