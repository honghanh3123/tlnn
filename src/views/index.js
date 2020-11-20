import React, { useContext, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOME, LOGIN } from 'consts/screens';
import Login from 'views/Login';
import { Spinner } from '@ui-kitten/components';
import ModalLoading from 'components/ModalLoading';
import { RootContext } from 'utils';
import Home from './Home';

const Stack = createStackNavigator();
const BlankHeader = () => <></>

export default () => {
  const refLoading = useRef()
  const { context, setContext } = useContext(RootContext)

  useEffect(() => {
    getIsLogin()
  }, [])

  const getIsLogin = async () => {
    refLoading.current.setVisible(true)
    try {
      const cookie = await AsyncStorage.getItem("@cookie");
      if (cookie) {
        setContext({ isLogin: true })
      }
    } catch (error) {
      console.log(error)
    }
    refLoading.current.setVisible(false)
  }

  return (
    <>
      <ModalLoading ref={refLoading} />
      <NavigationContainer>
        {
          context.isLogin ?
            (
              <Stack.Navigator>
                <Stack.Screen
                  name={HOME}
                  component={Home}
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
    </>
  )
}