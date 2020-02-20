import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

function Profile({ navigation }){
    const githubUsername = navigation.Params('github_username');
    return <WebView style={{ flex: 1 }} source={{ uri: `https://github.com/${githubUsername}` }}/>
}

export default Profile;