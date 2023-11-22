import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyA0EIXDITEiwPrCpBI6sA-RkpdNLgJ4R5I",
  authDomain: "applenativereactapp.firebaseapp.com",
  projectId: "applenativereactapp",
  storageBucket: "applenativereactapp.appspot.com",
  messagingSenderId: "549484497688",
  appId: "1:549484497688:web:b44dd91c5596cb255d2c6d",
  measurementId: "G-JL02JS9WPY"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = () => {
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("User logged in: ", user.email);
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Profile', params: { email: user.email } }],
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
    }
    return (
        <View style={[styles.container]}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/loginicon.png')} />
            </View>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor='#222222'
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                placeholderTextColor='#222222'
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#ffffff',
        color: '#222222',
    },
    input: {
        height: 45,
        width: '100%',
        borderColor: '#2d2d2d',
        borderWidth: 2,
        marginBottom: 10,
        paddingLeft: 8,
        color: '#222222',
        fontWeight: '700',
        fontSize: 16,
        borderRadius: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20,
        borderColor: '#222222',
        borderWidth: 2,
    },
    button: {
        backgroundColor: '#222222',
        color: '#ffffff',
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Login;