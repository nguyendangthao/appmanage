import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import CreateAppContainer from './config/createappcontainer';
import { Data } from './src/data'

export default class App extends React.Component {
  componentWillMount() {
    new Data();
  }
  render() {
    return (
      <CreateAppContainer />
    );
  }
}

// AppRegistry.registerComponent('appmanage', () => App);



