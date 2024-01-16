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
      navigation.navigate('Home');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle different error codes and provide user-friendly messages
      if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found') {
        setError('Please check your email and try again.');
      } else if (errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-credential' || errorCode === 'auth/missing-password') {
        setError('Please check your password and try again.');
      } else if (errorCode === 'auth/too-many-requests') {
        setError('Too many tries please try again later.');
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
        setError('Email address is already in use, please use a different email.');
      } else if (errorCode === 'auth/invalid-email') {
        setError('Please check your email and try again.');
      } else if (errorCode === 'auth/missing-password' || errorCode === 'auth/weak-password') {
        setError('Password must be minimum 8 characters.');
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
          <Text style={styles.title}>Login/Register</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}

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
