import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';
const roomUrl = 'https://whereby.com/chat-room-app'; // Replace by your own
const roomParameters = '?needancestor&skipMediaPermissionPrompt';
export default class VideoChat extends Component {
  render() {
    return (
      <>
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
        <StatusBar hidden="true" />
      </>
    );
  }
}
