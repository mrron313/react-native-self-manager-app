import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Todo from './Todo'
import Note from './Note'

class TodoScreen extends React.Component {
  render() {
    return (
      <View style={styles.container} >
        <Todo />
      </View>
    );
  }
}

class NoteScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Note />
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
    Todo: TodoScreen,
    Note: NoteScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0091EA',
      },
      headerTintColor: '#fff',
      title: 'Home Tab',
    
    },
  }
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});

  
export default createAppContainer(TabNavigator);