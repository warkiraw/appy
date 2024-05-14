import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
const Help = ({ navigation }) => {
    const forgotPassword = () => {
        navigation.navigate('ForgotPassword');
    }
    const changePassword = () => {
        navigation.navigate('Registration');
    }
    const callSupport = () => {
        Linking.openURL('tel:+79261234567');
    }
    

    return <View style={styles.container}>
    <View style={styles.box}>
        <Text style={styles.header}>Не получается войти?</Text>
        <TouchableOpacity onPress={() => forgotPassword()} style={styles.button}>
            <Text style={styles.buttonText}>Забыли пароль?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changePassword()} style={styles.button}>
            <Text style={styles.buttonText}>Изменить пароль</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => callSupport()} style={styles.button}>
            <Text style={styles.buttonText}>Позвонить</Text>
        </TouchableOpacity>
    </View>
</View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D0F5FF',
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

export default Help;
