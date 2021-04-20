import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Views from 'views';
import { RootContext } from 'utils';

export default () => {
  const [context, setContext] = useState({
    isLogin: false
  });

  const [isSynchronizing, setIsSynchronizing] = useState(false);

  useEffect(() => {
    //handleSaveDataToRealm();
  }, [])

  handleSaveDataToRealm = async () => {
    const latestUpdateTime = await AsyncStorage.setItem("LatestUpdateTime");
    if (!latestUpdateTime || Date.now() - latestUpdateTime >= 24 * 60 * 60) {
      setIsSynchronizing(true);
      await AsyncStorage.setItem("LatestUpdateTime", Date.now());
    }
  }


  const _setContext = (_newContext) => setContext(_context => ({
    ..._context,
    ..._newContext
  }))

  return (
    <RootContext.Provider
      value={{
        context,
        setContext: _setContext
      }}
    >
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Views />
      </ApplicationProvider>
    </RootContext.Provider>
  );

}