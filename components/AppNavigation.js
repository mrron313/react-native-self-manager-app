import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
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
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Todo') {
          return (
            <Image
              source={ require('../assets/home_icon.png') }
              style={{ width: 20, height: 20, }} />
          );
        } else {
          return (
            <Image
              source={ require('../assets/settings_icon.png') }
              style={{ width: 20, height: 20 }} />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF6F00',
      inactiveTintColor: '#263238',
    },
  }
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});

  
export default createAppContainer(TabNavigator);