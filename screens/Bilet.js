import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bilet = () => {
  return (
    <View style={styles.container}>
      <Text>Привет</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Bilet;
