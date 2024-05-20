import { useState } from 'react';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { send, EmailJSResponseStatus } from '@emailjs/react-native';

export default function Cabinet () {
  const [email, setEmail] = useState();
  const [name, setName] = useState();

  const onSubmit = async () => {
    try {
      await send(
        'service_dqnav8x',
        'template_59n0nmq',
        {
          name:'nigga',
          email:'warkigarki@gmail.com',
          message: 'This is a static message',
        },
        {
          publicKey: 'uuWISHTDpOw_OrCF1',
        },
      );

      console.log('SUCCESS!');
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        console.log('EmailJS Request Failed...', err);
      }

      console.log('ERROR', err);
    }
  };

  return (
    <View style={styles.container}>
    <TextInput
      style={styles.input}
      inputMode="email"
      keyboardType="email-address"
      textContentType="emailAddress"
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
    />
    <TextInput
      style={styles.input}
      inputMode="text"
      placeholder="Name"
      value={name}
      onChangeText={setName}
    />
    <Button style={styles.button} title="Submit" onPress={onSubmit} />
  </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
      width: '100%',
    },
    button: {
      marginTop: 10,
    },
  });