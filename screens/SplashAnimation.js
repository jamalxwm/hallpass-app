import { View, Text } from 'react-native';
import React, { Component, component } from 'react';
import AnimatedLottieView from 'lottie-react-native';

export default class SplashAnimation extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: '#524ffc',
        }}
      >
        <AnimatedLottieView
          style={{ width: '80%' }}
          source={require('../assets/splash.json')}
          autoPlay
          loop={false}
          speed={1.5}
          onAnimationFinish={() => this.props.navigation.replace('Login')}
        />
      </View>
    );
  }
}
