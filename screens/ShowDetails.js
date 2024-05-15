import React from 'react';
import { ScrollView, Image, Text, View } from 'react-native';

const ShowDetails = (props) =>  {
    const { show } = props.navigation.state.params;
    console.log(show);
    const baseUrl = 'https://www.gatob.kz';

    return (
        <ScrollView>
            <Image source={{ uri: `${baseUrl}${show.image}` }} style={{ width: 200, height: 300 }} />
            <Text>{show.date}</Text>
            <Text>{show.description}</Text>
            {/* Add the rest of the show details */}
        </ScrollView>
    );
};


export default ShowDetails;
