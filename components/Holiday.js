import React, { Component } from 'react';
import { StyleSheet, View,  SafeAreaView, ScrollView, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import myData from '../assets/data.json';

export default class Holiday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Day', 'Date', 'Holiday'],
      tableData: []
    }
  }

  componentDidMount(){
      var anotherArr = []

      myData.forEach(row => {
        var arr = []

        arr.push(row.Date)
        arr.push(row.Day)
        arr.push(row.Holiday_Name)

        anotherArr.push(arr)
      });

      this.setState({tableData: anotherArr})
  }

  render() {
    const state = this.state;
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>  
                <View style={styles.container}>
                    <Text style={styles.holidy_header}>Bangladesh 2019 Holiday</Text>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#f5d6e6'}}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                        <Rows data={state.tableData} textStyle={styles.text}/>
                    </Table>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10, padding: 8, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#ecaccb' },
  text: { margin: 6 },
  holidy_header: {paddingBottom: 10, fontSize: 15}
});