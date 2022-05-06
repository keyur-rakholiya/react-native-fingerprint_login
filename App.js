/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import TouchID from 'react-native-touch-id';

const optionalConfigObject = {
  title: 'Authentication Required', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      biometryType: null,
    };
  }

  componentDidMount() {
    TouchID.isSupported().then(biometryType => {
      this.setState({biometryType});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.btn}
          onPress={this.clickHandler}
          underlayColor="#0380BE"
          activeOpacity={1}>
          <Text
            style={{
              color: '#fff',
              fontWeight: '600',
            }}>
            {`Authenticate with ${this.state.biometryType}`}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  clickHandler() {
    TouchID.isSupported()
      .then(authenticate)
      .catch(error => {
        Alert.alert('TouchID not supported');
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  btn: {
    borderRadius: 3,
    marginTop: 200,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#0391D7',
  },
});

function authenticate() {
  return TouchID.authenticate(
    'to demo this react-native component',
    optionalConfigObject,
  )
    .then(success => {
      Alert.alert('Authenticated Successfully');
    })
    .catch(error => {
      console.log(error);
      Alert.alert(error.message);
    });
}
export default App;
