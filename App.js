import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Shows from './screens/shows';
import Cabinet from './screens/Cabinet';
import ShowDetails from './screens/ShowDetails';
import AR from './screens/AR';
import Love from './screens/Love';
import Bilet from './screens/Bilet';
import Tickets from './screens/tickets';
import { areaConversion } from 'geolib';
const switchNavigator = createSwitchNavigator({
    mainFlow: createMaterialBottomTabNavigator({
        Афиша:createStackNavigator({
            Афиша:Shows,
            ShowDetails:ShowDetails,
            Tickets:Tickets,
        }),
        Музей : AR,
        Билет : Bilet,
        Предзаказ : Love,
        Кабинет: Cabinet,
    },
    {
        activeColor: '#ffffff',
        inactiveColor: '#ffffff',
        barStyle: { backgroundColor: '#29aaec', height: '10%' },
        shifting:false,
    }
  )
})

export default createAppContainer(switchNavigator)