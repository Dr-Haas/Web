import React from 'react';
import { StyleSheet, Text, Button,View } from 'react-native';
import { AuthSession } from 'expo';



export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app</Text>
        <Button title="FB Connect" onPress={this._handlePressAsync} />
      </View>
    );
  }
  _handlePressAsync = async () => {
    var redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl);

    var result = await AuthSession.startAsync({
      authUrl:
        'https://saahlocapic.herokuapp.com/auth/facebook?redirectUrl='+redirectUrl
    });
   console.log(result.params);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});




