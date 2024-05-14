import React from "react";
import { Image, Text, StyleSheet, View } from 'react-native';

const Data = ({ result, onlyImage }) => {
    if (onlyImage) {
        return (
            <View style={styles.container}>
                <Image source={{ uri: result.image_url }} style={styles.image} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: result.image_url }} style={styles.image} />
            <Text style={styles.name}>{result.name}</Text>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 5,
        marginBottom: 10,
    },
    name: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default Data;
