import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { ThemeProvider } from 'react-native-elements';
import theme from './assets/styles';
import AppNavigator from './navigators/app.navigator';

const App = () => {
  return (
    <MenuProvider>
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    </MenuProvider>
  );
};

export default App;
