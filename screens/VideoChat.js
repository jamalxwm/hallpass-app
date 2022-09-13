import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
const roomUrl = 'https://whereby.com/chat-room-app'; // Replace by your own
const roomParameters = '?needancestor&skipMediaPermissionPrompt';
export default class App extends Component {
  render() {
    return (
      <WebView
        startInLoadingState
        source={{ uri: roomUrl + roomParameters }}
        mediaPlaybackRequiresUserAction={false}
        // iOS specific:
        allowsInlineMediaPlayback
        // Android specific:
        javaScriptEnabled
        domStorageEnabled
      />
    );
  }
}
