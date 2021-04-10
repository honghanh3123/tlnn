import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import Views from 'views';
import { RootContext } from 'utils';

import fs from "react-native-fs"

export default () => {
  const [context, setContext] = useState({
    isLogin: false
  });

  useEffect(() => {
    fs.readDir(fs.DocumentDirectoryPath)
      .then(dirs => console.log("=========>", dirs))
      .catch(err => console.log("<=========", err))
  }, [])

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