import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const Page = (props) => {
    const { busnesses } = props.navigation.state.params;

    const handleCall = () => {
        Linking.openURL(`tel:${busnesses.phone}`);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{busnesses.name}</Text>
            <Image source={{ uri: busnesses.image_url }} style={styles.image} />
            <Text style={styles.rating}>Rating: {busnesses.rating}</Text>
            <Text style={styles.reviewCount}>Reviews: {busnesses.review_count}</Text>
            <Text style={styles.address}>Address: {busnesses.location.display_address.join(', ')}</Text>
            <TouchableOpacity style={styles.callButton} onPress={handleCall}>
                <Text style={styles.callText}>Call</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    image: {
        width: 300,
        height: 200,
        marginBottom: 10,
        borderRadius: 10,
    },
    rating: {
        fontSize: 18,
        marginBottom: 5,
    },
    reviewCount: {
        marginBottom: 10,
    },
    address: {
        marginBottom: 10,
        textAlign: 'center',
    },
    callButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    callText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Page;
