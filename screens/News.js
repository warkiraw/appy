import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, FlatList, View ,Button   } from 'react-native';
import Swiper from 'react-native-swiper';
import config from './config';
import Data from './data';
import { SafeAreaView } from "react-navigation";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const News = ({ navigation}) => {
    

    const [busnesses, setBusnesses] = useState([]);
    const [selectedType, setSelectedType] = useState('all'); // Добавлено состояние для отслеживания выбранного типа
    const getBusnesses = async (type) => {
        try {
            let params = {
                limit: 50,
                location: 'Canada',
            };
            if (type !== 'all') {
                params.term = type === 'restaurants' ? 'restaurants' : 'food'; // Устанавливаем параметр в зависимости от выбора
            }
            const response = await config.get('/search', { params });
            setBusnesses(response.data.businesses);
            console.log('---------------------------------------------------------------------------');
            console.log(busnesses);
        } catch (err) {
            console.log(err);
        }
    };
    const props = busnesses
    console.log("--------------------------------------------------------------------------------------------------");
    console.log(props);
    useEffect(() => {
        getBusnesses(selectedType);
    }, [selectedType]); // Запускаем при загрузке и при изменении выбора
    const perehod = () => {
        navigation.navigate('Page');
      };
    return (
        <SafeAreaView forceInset={{ top: "always" }} style={{ flex: 1 }}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setSelectedType('all')}>
                <Text style={styles.buttonText}>Все</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setSelectedType('restaurants')}>
                <Text style={styles.buttonText}>Рестораны</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setSelectedType('cafes')}>
                <Text style={styles.buttonText}>Кафе</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.containernik}>
            <Swiper loop={true} showsButtons={false} showsPagination={false} autoplay={true}>
                {busnesses.map((item) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Page', { 
                        busnesses: item 
                    })}>
                        <Data key={item.id} result={item} onlyImage={true} />
                    </TouchableOpacity>
                ))}
            </Swiper>
        </View>
        <View style={styles.container}>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={busnesses}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Page', { 
                            busnesses: item 
                        })}>
                            <Data result={item} />
                        </TouchableOpacity>
                    )}
                />
        </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containernik: {
        flex: 1,
        backgroundColor: 'white', 
    },
    container: {
        flex: 2,
        backgroundColor: 'white', 
        paddingHorizontal: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#29aaec',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white', 
        fontWeight: 'bold',
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default News;

