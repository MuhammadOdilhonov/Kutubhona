import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
    const [opacity] = useState(new Animated.Value(1)); // Animated opacity value

    useEffect(() => {
        // Simulate some initialization (replace with actual logic)
        setTimeout(() => {
            Animated.timing(opacity, {
                toValue: 10,
                duration: 1000, // Adjust duration for desired animation speed
                useNativeDriver: false, // Improve performance for animations
            }).start(() => navigation.replace('Main')); // Replace 'Login' with your actual screen name
        }, 2000); // Simulate a 2 second delay for demo
    }, [navigation]);

    return (
        <Animated.View style={{ ...styles.container, opacity }}>
            <Image
                source={require('../../assets/splash_background.jpg')}
                style={styles.imageStyle}
                resizeMode='cover'
            />
            <View style={styles.overlay}>
                <Text style={styles.welcomeText}>
                    Hush
                    Kelibsiz
                    Marhamat
                </Text>
            </View>
            <View style={styles.bottonText}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative"
    },
    imageStyle: {
        width: "100%",
        height: 800,
    },
    overlay: {
        position: "absolute",
        top: 50,
        left: 40
    },
    welcomeText: {
        color: 'white',
        fontSize: 70,
        fontFamily: 'KaushanScript-Regular',
        fontWeight: 'bold',
        textAlign: 'left'
    },
    bottonText: {
        position: "absolute",
        top: "65%"
    }
});

export default SplashScreen;
