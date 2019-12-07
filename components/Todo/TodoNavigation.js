import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements'
import Todo from './Todo'
import Note from '../Note/Note'
import Holiday from '../Holiday/Holiday'

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

class HolidayScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Holiday />
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
    Todo: TodoScreen,
    Note: NoteScreen,
    Holiday: HolidayScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Todo') {
          return (
            <Icon
              type='font-awesome'
              name='list'
              size={16} />
          );
        } else if(routeName === 'Note') {
          return (
            <Icon
              type="font-awsome"
              name='edit'
              size={16} />
          );
        }
        else{
          return (
            <Icon
              type="font-awsome"
              name='snooze'
              size={16} />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#DF76A9',
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