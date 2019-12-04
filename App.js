import React from 'react';
import { View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppNavigation from './components/AppNavigation'
import AppBarComponent from './components/AppBarComponent'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000000FF',
    accent: '#FFFFFFFF',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AppBarComponent />
      <AppNavigation />
    </PaperProvider>
  );
}

