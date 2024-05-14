import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
const ForgotPassword = ({ navigation }) => {
    const forgotPassword = () => {
        navigation.navigate('Auth');
    }

    return <View style={styles.container}>
    <View style={styles.box}>
        <Text style={styles.header}>Жалко</Text>
        <TouchableOpacity onPress={() => forgotPassword()} style={styles.button}>
            <Text style={styles.buttonText}>Назад</Text>
        </TouchableOpacity>
    </View>
</View>
}
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#29aaec',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ForgotPassword;
