import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
export default class App extends React.Component {
  state = {
    messages: [
      {
        _id: 2,
        text: 'Hello sure no problem!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://images.unsplash.com/photo-1663056312754-a82872d6ec55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3088&q=80',
        },
      },
      {
        _id: 1,
        text: "Hey I'd like to book in with you",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://images.unsplash.com/photo-1663056312754-a82872d6ec55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3088&q=80',
        },
      },
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          user={{
            _id: 1,
          }}
          messages={this.state.messages}
          wrapperStyle={{ right: { backgroundColor: 'purple' } }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
