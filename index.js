/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry, Text, TextInput } from 'react-native';
import { fcmService } from './app/FCMService';
import App from './app/index.js';
import { onNotificationBackground } from '@utils/onNotificationHandler';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

fcmService.backgroundNotificationHandler(onNotificationBackground);

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    console.log('iisHeadless');

    // App has been launched in the background by iOS, ignore
    return null;
  }
  return <App />;
}

AppRegistry.registerComponent('PlanRn', () => HeadlessCheck);
