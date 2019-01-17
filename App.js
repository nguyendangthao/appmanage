import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import CreateAppContainer from './config/createappcontainer';
import { Data } from './src/data';

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




