import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Registration = ({ navigation }) => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        if (!email.trim() || !password.trim()) {
            setError(true);
            return;
        }
    
        const emailRegex = /@gmail\.com$/;
        const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/;
    
        if (!emailRegex.test(email)) {
            setError(true);
            return;
        }
    
        if (!passwordRegex.test(password)) {
            setError(true);
            return;
        }
    
        try {
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('password', password);
            navigation.navigate('News');
        } catch (error) {
            console.log('Ошибка при сохранении:', error);
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.header}>Регистрация</Text>
                
                <TextInput
                    placeholder='                                             @gmail.com'
                    style={styles.input}
                    value={email}
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder='Пароль'
                    style={styles.input}
                    value={password}
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />

                <Button
                    onPress={register}
                    title='Зарегистрироваться'
                />
                {error && (
                    <Text style={{ color: 'red', alignSelf: 'center' }}>Произошла ошибка</Text>
                )}
                <TouchableOpacity
                    onPress={() => navigation.navigate('Auth')}
                    style={styles.help}
                >
                    <Text style={{ color: '#007BFF' }}>Уже есть аккаунт? Войти</Text>
                </TouchableOpacity>
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
      padding: 20,
      backgroundColor: '#29aaec', // новый цвет фона
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#fff', // белый цвет текста
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      backgroundColor: '#fff', // белый цвет фона
    },
    help: {
      alignSelf: 'center',
      marginTop: 10,
      color: '#007bff', // цвет текста
      textDecorationLine: 'underline',
    },
  });
export default Registration;
