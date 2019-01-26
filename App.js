import React from 'react';
import CreateAppContainer from './config/createappcontainer';
import { Data } from './src/data';
import { Provider } from 'react-redux';
import { configureStore } from './src/store/indexstore';
export default class App extends React.Component {
  componentWillMount() {
    new Data();
  }
  render() {
    return (
      <Provider store={configureStore}>
        <CreateAppContainer />
      </Provider>

    );
  }
}




