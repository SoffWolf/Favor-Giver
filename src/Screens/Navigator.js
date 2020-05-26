import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import CheckLogin from '~/Screens/CheckLogin';
import Login from '~/Screens/Login';
import HelperRegistration from '~/Screens/HelperRegistration';
import HomeScreen from '~/Screens/HomeScreen';
import HelperCheckbox from '~/Screens/HelperCheckbox';
import ComputerRelatedTask from '~/Screens/ComputerRelatedTask';
import FixFurniture from '~/Screens/FixFurniture';
import FixVehicle from '~/Screens/FixVehicle';
import GeneralTask from '~/Screens/GeneralTask';
import HelperUploadProfile from '~/Screens/HelperUploadProfile';
import HelperInitialScreen from '~/Screens/HelperInitialScreen';
import Pending from '~/Screens/Pending';
import Feedback from '~/Screens/Feedback';
import Matching from '~/Screens/Matching';
import Done from '~/Screens/Done';

const LoginNavigator = createStackNavigator({
    Login,
});

const HelperInitialScreenNavigator = createSwitchNavigator({
    HelperInitialScreen,
})

const FeedbackNavigator = createSwitchNavigator({
    Feedback,
})

const MatchingNavigator = createSwitchNavigator({
    Matching,
})

const DoneNavigator = createSwitchNavigator({
    Done,
})

const HelperPendingNavigator = createSwitchNavigator({
    Pending,
})

const HelperRegistrationNavigator = createStackNavigator({
    HelperRegistration,
    HelperCheckbox,
    ComputerRelatedTask,
    FixFurniture,
    FixVehicle,
    GeneralTask,
    HelperUploadProfile,
    }
);

//createSwitchNavigator checks the login status of the user and switch the screen accordingly
const  AppNavigator = createSwitchNavigator(
    {
    HomeScreen,
    CheckLogin,
    LoginNavigator,
    HelperRegistrationNavigator,
    HelperInitialScreenNavigator,
    HelperPendingNavigator,
    FeedbackNavigator,
    MatchingNavigator,
    DoneNavigator
    },
    {
        initialRouteName: 'HomeScreen',
    }
);

export default createAppContainer(AppNavigator);
// createAppContainer는 내비게이션을 다루기 위한 state, 링크 등을 관리한다.