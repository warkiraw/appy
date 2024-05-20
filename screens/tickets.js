import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Tickets = ({ sector, freeSeats, onPress, onHover }) => {
    return (
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.square} />
            <View style={styles.square} />
            <View style={styles.square} />
          </View>
          <View style={styles.row}>
            <View style={styles.square} />
            <View style={styles.square} />
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, // добавляем отступ между рядами
      },
      square: {
        width: 50,
        height: 50,
        backgroundColor: 'grey',
        margin: 5,
      },
    });

export default Tickets;
