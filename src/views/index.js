import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TESTS, LOGIN, WORDS, ME, LEARN, STARTTEST, RESULTS, RESULTDETAIL, LEARNDETAIL } from 'consts/screens';
import Login from 'views/Login';
import { RootContext } from 'utils';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';


import Tests from './Tests';
import Learn from './Learn';
import Words from './Words';
import Profile from './Profile';
import StartTest from './TestDetail';
import TestDetail from './TestDetail';
import VoiceTest from './VoiceTest';
import Results from './Results';
import ResultDetail from './ResultDetail';
import LearnDetail from './LearnDetail';
import LearnItem from './LearnItem';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const BlankHeader = () => <></>

const PersonIcon = (props) => (
  <Icon {...props} name='person-outline' />
);

const WordIcon = (props) => (
  <Icon {...props} name='text-outline' />
);

const TestIcon = (props) => (
  <Icon {...props} name='file-add-outline' />
);

const LearnIcon = (props) => (
  <Icon {...props} name='edit-2-outline' />
)

const TestStackNavigation = () => (
  <Stack.Navigator>
    {/* <Stack.Screen name="VoiceTest" component={VoiceTest} /> */}
    <Stack.Screen name={TESTS} component={Tests} options={{
      header: BlankHeader
    }} />
    <Stack.Screen name={STARTTEST} component={TestDetail} />
    <Stack.Screen name={RESULTS} component={Results} />
    <Stack.Screen name={RESULTDETAIL} component={ResultDetail} />
  </Stack.Navigator>
)

const LearnStackNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen name={LEARN} component={Learn}></Stack.Screen>
    <Stack.Screen {...LearnDetail} />
    <Stack.Screen {...LearnItem} />
  </Stack.Navigator>
)

const ScreenBottomTab = [
  {
    name: TESTS,
    component: TestStackNavigation,
    icon: TestIcon,
  },
  {
    name: LEARN,
    component: LearnStackNavigation,
    icon: LearnIcon
  },
  {
    name: WORDS,
    component: Words,
    icon: WordIcon
  },
  {
    name: ME,
    component: Profile,
    icon: PersonIcon
  }
  // {
  //   name: STARTTEST,
  //   component: StartTest
  // }
]

const BottomTabBar = ({
  navigation,
  state
}) => {
  const _onSelect = index => {
    navigation.navigate(state.routeNames[index])
  }

  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={_onSelect}
    >
      {
        ScreenBottomTab.map((screen, index) => (
          <BottomNavigationTab title={screen.name} key={index} icon={screen.icon} />
        ))
      }
    </BottomNavigation>
  )
}

const _renderBottomTabBar = props => <BottomTabBar {...props} />

const BottomTabNavigator = () => (
  <BottomTab.Navigator
    tabBar={_renderBottomTabBar}
  >
    {
      ScreenBottomTab.map((screen, index) => (
        <BottomTab.Screen {...screen} key={index} />
      ))
    }
  </BottomTab.Navigator>
)

export default () => {
  const { context, setContext } = useContext(RootContext)

  useEffect(() => {
    getIsLogin()
  }, [])

  const getIsLogin = async () => {
    try {
      const cookie = await AsyncStorage.getItem("@cookie");
      if (cookie) {
        setContext({ isLogin: true })
      }
    } catch (error) {
      return error
    }
  }

  return (
    <NavigationContainer>
      {
        context.isLogin ?
          (
            <Stack.Navigator>
              <Stack.Screen
                name={TESTS}
                component={BottomTabNavigator}
                options={{
                  header: BlankHeader
                }}
              />
            </Stack.Navigator>
          ) :
          (
            <Stack.Navigator>
              <Stack.Screen
                name={LOGIN}
                component={Login}
                options={{
                  header: BlankHeader
                }}
              />
            </Stack.Navigator>
          )
      }
    </NavigationContainer>
  )
}