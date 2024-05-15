import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import cheerio from 'cheerio';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native";
const Ideas = ({navigation}) => {
    const handleShowPress = (showId) => {
        navigation.navigate('ShowDetails', { showId });
    };
    const [shows, setShows] = useState([]);
    const baseUrl = 'https://www.gatob.kz';
    useEffect(() => {
        fetch('https://www.gatob.kz/#tab05_2024')
        .then((response) => response.text())
        .then((html) => {
            const $ = cheerio.load(html);
            const showsData = [];

            $('.poster-prev').each((index, element) => {
            const name = $(element).find('span').text();
            const date = $(element).find('.date').text();
            const image = $(element).find('img').attr('src');
            const description = $(element).find('h5').text();

            showsData.push({ id: index, name, date, image, description });
            console.log(showsData)
            });

            setShows(showsData);
        })
        .catch((error) => {
            console.error('Error fetching shows:', error);
        });
    }, []);

  return (
    <ScrollView>
      {shows.map((show) => (
        <TouchableOpacity key={show.id} onPress={() => navigation.navigate('ShowDetails', { show: show})}>
          <Image style={styles.image} source={{ uri: `${baseUrl}${show.image}` }} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{show.name}</Text>
            <Text>{show.date}</Text>
            <Text>{show.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  showContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Ideas;