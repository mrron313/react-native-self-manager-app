import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  AsyncStorage,
  TextInput,
  Image,
  Keyboard,
  Platform,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator
} from "react-native";
import { Icon } from 'react-native-elements'
import FormData from 'FormData'
import DatePicker from 'react-native-datepicker'
import SITE_URL from '../../config/site'

const isAndroid = Platform.OS == "android"
const viewPadding = 10

export default class Todo extends Component {
  state = {
    tasks: [],
    text: "",
    date: "",
    modalVisible: false,
  };

  changeTextHandler = text => {
    this.setState({ text: text });
  };

  openModal = () => {
    this.setState({ modalVisible: true });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {
      var data = new FormData();
      data.append("task", this.state.text);
      data.append("date", this.state.date)
      data.append("user_id", "1");

      fetch(SITE_URL + '/api/todos', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('response object:', responseJson)
        })
        .catch((error) => {
          console.error(error);
        });

      this.fetchTodos()

    }

    this.setState({ modalVisible: false });
  };

  deleteTask = (i, itemId) => {
    this.setState(
      prevState => {
        let tasks = prevState.tasks.slice();

        tasks.splice(i, 1);

        console.log("item id", itemId)

        fetch(SITE_URL + '/api/todos/' + itemId, {
          method: 'delete'
        }).then(response =>
          response.json().then(json => {
            console.log(json)
          })
        );

        return { tasks: tasks };
      },
      () => Tasks.save(this.state.tasks)
    );
  };

  fetchTodos = () => {
    fetch(SITE_URL + '/api/get-undone-todos/2019-12-07', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          tasks: json,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: viewPadding })
    );

    this.fetchTodos()
    Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
  }

  render() {
    return (
      <View
        style={[styles.container, { paddingBottom: this.state.viewPadding }]}
      >
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.closeModal }}
        >
          <View style={{ padding: 20 }}>

            <TextInput
              style={styles.textInput}
              onChangeText={this.changeTextHandler}
              value={this.state.text}
              placeholder="Add Tasks"
              returnKeyType="done"
              returnKeyLabel="done"
            />

            <DatePicker
              style={{ width: 200, marginBottom: 10 }}
              date={this.state.date}
              mode="date"
              placeholder="Select Day"
              format="YYYY-MM-DD"
              minDate="2019-12-06"
              maxDate="2019-12-07"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36,
                  height: 40,
                  paddingRight: 10,
                  paddingLeft: 10,
                  borderColor: "gray",
                  borderWidth: isAndroid ? 0 : 1,
                  width: "100%"
                }
              }}
              onDateChange={(date) => { this.setState({ date: date }) }}
            />

            <View style={styles.btnGroup}>
              <View style={styles.buttonContainer}>
                <Button title="Add" onPress={this.addTask} />
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Cancel" color="#FA8072" onPress={this.closeModal} />
              </View>
            </View>

          </View>
        </Modal>

        <FlatList
          data={this.state.tasks}
          renderItem={({ item, index }) =>

            <View style={styles.taskRow}>
              <View
                style={styles.checkBox}
              >
                <Icon
                  type="font-awsome"
                  name='check'
                  color='white'
                  onPress={() => this.deleteTask(index, item.id)} />
              </View>

              <View style={styles.taskDetails}>
                <Text style={styles.taskDate}>{item.date}</Text>
                <Text style={styles.taskName}>{item.task}</Text>
              </View>

            </View>
          }
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.openModal}
          style={styles.TouchableOpacityStyle}>
          <Image
            source={require('../../assets/plus_icon.png')}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>

      </View>
    );
  }
}

let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
    );
  },
  convertToStringWithSeparators(tasks) {
    return tasks.map(task => task.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  save(tasks) {
    AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: viewPadding,
    padding: 25
  },
  btnGroup: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: isAndroid ? 0 : 1,
    width: "100%"
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    elevation: 8
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  taskRow: {
    elevation: 1,
    borderRadius: 2,
    borderColor: '#DF76A9',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 0,
    marginBottom: 10,
  },
  checkBox: {
    flex: 0,
    flexDirection: 'column',
    borderColor: '#263238',
    backgroundColor: '#263238',
    borderWidth: 2,
    borderRadius: 50,
    padding: 5
  },
  taskDetails: {
    color: '#263238',
    paddingLeft: 16,
    flex: 0,
  },
  taskDate: {
    color: '#263238',
    textAlignVertical: 'bottom',
    includeFontPadding: false,
    flex: 0,
    fontSize: 12,
    color: '#DF76A9',
    textAlign: 'right'
  },
  taskName: {
    color: '#263238',
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 18,
  },
});