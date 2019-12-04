import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default class AppBarComponent extends React.Component {
  render() {
    return (
      <Appbar.Header>
        <Appbar.Content
          title="My Manager"
          subtitle="Aims to make balance"
        />
      </Appbar.Header>
    );
  }
}
