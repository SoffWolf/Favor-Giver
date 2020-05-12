import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import CheckLogin from '~/Screens/CheckLogin';
import Login from '~/Screens/Login';
import HelperRegister from '~/Screens/HelperRegister';
import HomeScreen from '~/Screens/HomeScreen';

const LoginNavigator = createStackNavigator({
    Login,
});




const HelperNavigator = createStackNavigator({
    HelperRegister,
})

//createSwitchNavigator checks the login status of the user and switch the screen accordingly
const  AppNavigator = createSwitchNavigator(
    {
    HomeScreen,
    CheckLogin,
    LoginNavigator,
    HelperNavigator,
    },
    {
        initialRouteName: 'HomeScreen',
    }
);

export default createAppContainer(AppNavigator);
// createAppContainer는 내비게이션을 다루기 위한 state, 링크 등을 관리한다.