import React ,{ useState, useEffect } from 'react';
import { ScrollView, Image, Text, View ,StyleSheet} from 'react-native';
import cheerio from 'cheerio';
import { Button } from 'react-native-paper';

const ShowDetails = (props) =>  {
    const { navigation } = props;
    const { show } = props.navigation.state.params;
    console.log(show);
    console.log(show.href)
    const baseUrl = 'https://www.gatob.kz';
    const [concertData, setConcertData] = useState(null);

    useEffect(() => {
        fetch(`https://www.gatob.kz${show.href}`)
        .then((response) => response.text())
        .then((html) => {   
            console.log(html)
            const $ = cheerio.load(html);
            const data = {
                date: $('.date').text().trim(),
                duration: $('p.main:contains("Продолжительность")').text().trim(),
                ageCategory: $('p.main:contains("Возрастная категория")').text().trim(),
                description: $('p.main:contains("История")').text().trim(),
                director: $('p:contains("Режиссер")').text().trim(),
                conductor: $('p:contains("Дирижер")').text().trim(),
                artist: $('p:contains("Художник")').text().trim(),
                choreographer: $('p:contains("Хормейстер")').text().trim(),
                action: $('p:contains("Действие")').text().trim(),
            };
            
            setConcertData(data);
        })
        .catch((error) => {
            console.error('Error fetching concert data:', error);
        });
    }, [show.href]);

    if (!concertData) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{concertData.date}</Text>
            <Text><Text style={styles.bold}>Продолжительность:</Text> {concertData.duration}</Text>
            <Text><Text style={styles.bold}>Возрастная категория:</Text> {concertData.ageCategory}</Text>
            <Text><Text style={styles.bold}>История:</Text> {concertData.description}</Text>
            <Text>{concertData.description}</Text>
            <Text><Text style={styles.bold}>Режиссер:</Text> {concertData.director}</Text>
            <Text><Text style={styles.bold}>Дирижер:</Text> {concertData.conductor}</Text>
            <Text><Text style={styles.bold}>Художник:</Text> {concertData.artist}</Text>
            <Text><Text style={styles.bold}>Хормейстер:</Text> {concertData.choreographer}</Text>
            <Text>{concertData.action}</Text>
            <Button onPress={() => navigation.navigate('Tickets')} >Купить билеты</Button>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
});
export default ShowDetails;
