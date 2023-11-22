import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getAuth, signOut } from "firebase/auth";

const Profile = ({ route, navigation }) => {
    const auth = getAuth();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log('User signed out!');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            })
            .catch((error) => {
                // An error happened.
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome, {route.params.email}!</Text>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: '700',
    }
});

export default Profile;