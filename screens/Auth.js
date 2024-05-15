import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
const Auth = ({ navigation }) => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try {
            const storedEmail = await AsyncStorage.getItem('email');
            const storedPassword = await AsyncStorage.getItem('password');
            if (email === storedEmail && password === storedPassword) {
                navigation.navigate('News');
            } else {
                setError(true);
            }
        } catch (error) {
            console.log('Ошибка:', error);
        }
    };
    
    const help = () => {
      navigation.navigate('Ideas');
    }
    return <View style={styles.container}>
    <View style={styles.box}>
        <Text style={styles.header}>Авторизация</Text>
        <TextInput
            placeholder='Email'
            style={styles.input}
            value={email}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={setEmail}
        />
        <TextInput
            placeholder='Password'
            style={styles.input}
            value={password}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={setPassword}
            secureTextEntry={true}
        />

        <Button
            onPress={signIn}
            title='Продолжить' 
            color='white'/>
        {error && (
            <Text style={{ color: 'red', alignSelf: 'center', }}>Неверный email или пароль</Text>
        )}
        <Text style={styles.forgotPassword} >Забыли пароль?</Text>
        <TouchableOpacity onPress={() => help()} style={styles.help}>
            <Text style={{ color: '#007BFF' }}>Помощь со входом</Text>
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
    padding: 20,
    backgroundColor: '#29aaec', // эмеральдовый цвет
    borderRadius: 20,
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
  forgotPassword: {
    alignSelf: 'center',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  help: {
    alignSelf: 'center',
    marginTop: 10,
  },
  helpText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});


export default Auth;
