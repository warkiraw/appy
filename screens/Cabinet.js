import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, Button, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cabinet = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const getData = async () => {
            const storedEmail = await AsyncStorage.getItem('email');
            const storedPassword = await AsyncStorage.getItem('password');
            setEmail(storedEmail);
            setPassword(storedPassword);
        };
        getData();
    }, []);

    const renderPassword = () => {
        return '*'.repeat(password.length);
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.header}>Личный кабинет</Text>
                <Text>Email: {email}</Text>
                <Text>Password: {renderPassword()}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    box: {
        width: '80%',
        backgroundColor: '#f4f4f4',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default Cabinet;
