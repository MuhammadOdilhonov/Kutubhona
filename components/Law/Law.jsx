import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';

const Law = () => {
    // Funksiyalar URL ni ochish uchun
    const openLink1 = () => {
        Linking.openURL('https://example.com/781-karor');
    };

    const openLink2 = () => {
        Linking.openURL('https://example.com/782-karor');
    };

    return (
        <ScrollView style={styles.LawScreen}>
            <Text style={styles.headerText}>Yordamchi hujjatlar</Text>
            <View style={styles.card}>
                <Text style={styles.cardText}>781-qaror</Text>
                <TouchableOpacity style={styles.button} onPress={openLink1}>
                    <Text style={styles.buttonText}>Ko'rish</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardText}>782-qaror</Text>
                <TouchableOpacity style={styles.button} onPress={openLink2}>
                    <Text style={styles.buttonText}>Ko'rish</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    LawScreen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginVertical: 20,
    },
    card: {
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    cardText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Law;
