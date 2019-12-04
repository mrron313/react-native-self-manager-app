import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
  Image,
  Keyboard,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Modal
} from "react-native";
import { Card } from 'react-native-elements'

const isAndroid = Platform.OS == "android"
const viewPadding = 10

export default class Note extends Component {
  state = {
    notes: [],
    note: "",
    modalVisible: false,
  };

  changeNoteHandler = note => {
    this.setState({ note: note });
  };

  openModal = () => {
    this.setState({modalVisible: true});
  };

  closeModal = () => {
    this.setState({modalVisible: false});
  };

  addNote = () => {
    let notEmpty = this.state.note.trim().length > 0;

    if (notEmpty) {
      this.setState(
        prevState => {
          let { notes, note } = prevState;
          return {
            notes: notes.concat({ key: notes.length, note: note }),
            note: ""
          };
        },
        () => Notes.save(this.state.notes)
      );
    }

    this.setState({modalVisible: false});
  };

  deleteNote= i => {
    this.setState(
      prevState => {
        let notes = prevState.notes.slice();

        notes.splice(i, 1);

        return { notes: notes };
      },
      () => Notes.save(this.state.notes)
    );
  };

  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: viewPadding })
    );

    Notes.all(notes => this.setState({ notes: notes || [] }));
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
          onRequestClose={() => { this.closeModal } }
        >
          <View style={{marginTop: 22}}>

              <TextInput
                style={styles.textInput}
                onChangeText={this.changeNoteHandler}
                onSubmitEditing={this.addNote}
                value={this.state.note}
                placeholder="Add Notes"
                returnKeyType="done"
                returnKeyLabel="done"
              />
          </View>
        </Modal>

        <FlatList
          data={this.state.notes}
          renderItem={({ item, index }) => 
              <View>
                <Card
                  title={item.note} >
                
                  <Text style={{marginBottom: 10}}>
                    The idea with React Native Elements is more about component structure than actual design.
                  </Text>
                
                </Card>
            </View>
          }
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.openModal}
          style={styles.TouchableOpacityStyle}>
          <Image
            source={{
              uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

let Notes = {
  convertToArrayOfObject(notes, callback) {
    return callback(
      notes ? notes.split("||").map((note, i) => ({ key: i, note: note })) : []
    );
  },
  convertToStringWithSeparators(notes) {
    return notes.map(note => note.note).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("NOTES", (err, notes) =>
      this.convertToArrayOfObject(notes, callback)
    );
  },
  save(notes) {
    AsyncStorage.setItem("NOTES", this.convertToStringWithSeparators(notes));
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: viewPadding,
    paddingTop: 20
  },
  list: {
    width: "100%"
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
    //backgroundColor:'black'
  },
});

// AppRegistry.registerComponent("TodoList", () => TodoList);