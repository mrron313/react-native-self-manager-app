import * as React from 'react'
import { Appbar, Drawer } from 'react-native-paper'
import { SafeAreaView, createAppContainer } from 'react-navigation'
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer'; 
import { ScrollView, View, StyleSheet, Text, Image } from 'react-native'
import Todo from './Todo/Todo'
import Note from './Note/Note'

class TodoPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Action
            icon="menu"
            onPress={() =>
              this.props.navigation.dispatch(DrawerActions.toggleDrawer())
            }
          />
          <Appbar.Content
            title="My Manager"
            subtitle="Aims to make balance"
          />  
        </Appbar.Header>
          <Todo />
      </View>
    );
  }
}

class NotePage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Action
            icon="menu"
            onPress={() =>
              this.props.navigation.dispatch(DrawerActions.toggleDrawer())
            }
          />
          <Appbar.Content
            title="My Manager"
            subtitle="Aims to make balance"
          />  
        </Appbar.Header>
          <Note />
      </View>
    );
  }
}

const Menu = createDrawerNavigator(
  {
    Todo: { screen: TodoPage },
    Note: { screen: NotePage }
  },
  {
    contentComponent: props => (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <SafeAreaView forceInset={{ horizontal: "never" }}>
              <View
                style={styles.navigationHeader}
              >
                <View style={styles.navigationHeaderImagePart}>
                  <Image
                    style={styles.navigationHeaderImage}
                    source={require('../assets/icon.png')}
                  />
                  <Text style={styles.navigationHeaderText}>
                    Arif Ul Islam
                  </Text>
                </View>
              </View>
              <Drawer.Item
                style={styles.navigationItem}
                label="Todo List"
                active="true"
                icon="pencil"
                onPress={() => props.navigation.navigate("Todo")}
              />
              <Drawer.Item
                style={styles.navigationItem}
                label="Keep Notes"
                active="true"
                icon="notebook"
                onPress={() => props.navigation.navigate("Note")}
              />
          </SafeAreaView>
        </ScrollView>
      </View>
    )
  }
);

const AppNav = createAppContainer(Menu);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigationHeader:{
    backgroundColor: '#DF76A9',
    height: 100,
    justifyContent: 'center', 
    alignItems: 'center', 
    flex:1,
    flexDirection: 'row'
  },
  navigationHeaderImagePart:{
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  navigationHeaderImage:{
    width: 50, 
    height: 50,
    marginLeft: 10,
    marginRight: 10
  },
  navigationHeaderText:{ 
    color: 'white', 
    fontSize: 15,
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  navigationItem:{
    backgroundColor: '#fff'
  },
});

export default class MainApp extends React.Component {
  render() {
    return <AppNav />;
  }
}

// 