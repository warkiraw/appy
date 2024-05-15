import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Auth from './screens/Auth';
import Help from './screens/Help';
import Registration from './screens/Registration';
import ForgotPassword from './screens/ForgotPassword';
import News from './screens/News';
import Ideas from './screens/Ideas';
import Cabinet from './screens/Cabinet';
import Page from './screens/Page';
import ShowDetails from './screens/ShowDetails';
const switchNavigator = createSwitchNavigator({
    Auth: Auth,
    Help: Help,
    ForgotPassword : ForgotPassword,
    Registration: Registration,
    mainFlow: createMaterialBottomTabNavigator({
        News:createStackNavigator({
            News: News,
            Page: Page 
        }),
        Ideas:createStackNavigator({
            Ideas: Ideas,
            ShowDetails: ShowDetails 
        }),
        Cabinet: Cabinet,
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