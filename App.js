import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import MainApp from './components/MainApp'

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
      <MainApp />
    </PaperProvider>
  );
}

