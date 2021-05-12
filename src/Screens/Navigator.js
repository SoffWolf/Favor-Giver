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
import HelperPending from '~/Screens/HelperPending';
import Feedback from '~/Screens/Feedback';
import Matching from '~/Screens/Matching';
import Done from '~/Screens/Done';

import SeekerSignUp1 from '~/Screens/SeekerSignUp/SeekerSignUp1'
import SeekerSignUp2 from '~/Screens/SeekerSignUp/SeekerSignUp2'
import SeekerSignUp3 from '~/Screens/SeekerSignUp/SeekerSignUp3'
import SeekerStart from '~/Screens/SeekerStart/SeekerStart'
import RequestScreen from '~/Screens/RequestScreen/RequestScreen'
import SeekerPendingScreen from '~/Screens/SeekerPendingScreen/SeekerPendingScreen'
import OnTheWayScreen from '~/Screens/OnTheWayScreen/OnTheWayScreen'
import FeedbackScreen from '~/Screens/FeedbackScreen/FeedbackScreen'
import ArrivedScreen from '~/Screens/ArrivedScreen/ArrivedScreen'

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
    HelperPending,
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

const RootStack = createStackNavigator(
    {
      SeekerSignUp1: SeekerSignUp1,
      SeekerSignUp2: SeekerSignUp2,
      SeekerSignUp3: SeekerSignUp3,
      SeekerStart : SeekerStart,
      RequestScreen : RequestScreen,
      SeekerPendingScreen : SeekerPendingScreen,
      OnTheWayScreen: OnTheWayScreen,
      FeedbackScreen: FeedbackScreen,
      ArrivedScreen : ArrivedScreen,
    },
    {
      headerMode : 'none'
    },
    {
      initialRouteName: 'SeekerSignUp1',
    }
  );

//createSwitchNavigator checks the login status of the user and switch the screen accordingly
const  AppNavigator = createSwitchNavigator(
    {
    HomeScreen,
    CheckLogin,
    RootStack,
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