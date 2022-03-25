import React from 'react';
import { store, persistor } from './store';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigator from './navigation';
import i18n from './i18n';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import '@react-native-firebase/auth';
import { ThemeProvider } from 'react-native-elements';
import {
  getTrackingStatus,
  requestTrackingPermission,
} from 'react-native-tracking-transparency';
import SafeViewAndroidGlobalStyle from './SafeViewAndroidGlobalStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorBoundary from 'react-native-error-boundary';
import CustomFallback from '@screens/CustomFallback';
import { useGetStream, ChatProvider } from 'app/hooks/useGetStream';

console.disableYellowBox = true;
export default function App() {
  const { clientChat, StreamChat } = useGetStream();
  const theme = {
    colors: {
      primary: '#00BAE5',
      secondary: '#2BA275',
      searchBg: '#FFFFFF',
      fontDefault: '#263238',
      danger: '#CC0000',
      shadows: 'rgba(0,0,0,0.6)',
      greyBorder: '#E6E6E6',
    },
    fontFamilyDefault:
      i18next.language == 'en' ? 'CircularStd-Book' : 'NotoSansThai-Regular',
    fontFamilyThin: 'Prompt-Thin',
    fontFamilyBold:
      i18next.language == 'en' ? 'CircularStd-Bold' : 'NotoSansThai-Bold',
    fontFamilyBoldItalic: 'Prompt-BoldItalic',
    fontFamilyItalic: 'Prompt-Italic',
    fontSizeLargest: 24,
    fontSizeLarger: 22,
    fontSizeLarge: 20,
    fontSizeDefault: 18,
    fontSizeSmall: 16,
    fontSizeSmaller: 14,
    fontSizeSmallest: 12,
    iconSizeDefault: 24,
  };

  const errorHandler = (error, stackTrace) => {
    console.log('error', error);
    console.log('stackTrace', stackTrace);
  };

  const checkTrackingStatus = () => {
    setTimeout(async () => {
      if (Platform.OS == 'ios') {
        const trackingStatus = await getTrackingStatus();
        console.log('trackingStatus', trackingStatus);
        if (trackingStatus === 'not-determined') {
          try {
            await requestTrackingPermission();
          } catch (e) {
            Alert.alert('Error', e?.toString?.() ?? e);
          }
        }
      }
    }, 1000);
  };

  React.useEffect(() => {
    checkTrackingStatus();
  }, []);

  return (
    <ErrorBoundary onError={errorHandler} FallbackComponent={CustomFallback}>
      <ReduxProvider store={store}>
        <ChatProvider value={{ clientChat, StreamChat }}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <I18nextProvider i18n={i18n}>
                <SafeAreaView
                  style={SafeViewAndroidGlobalStyle.AndroidSafeArea}
                >
                  <Navigator />
                </SafeAreaView>
              </I18nextProvider>
            </ThemeProvider>
          </PersistGate>
        </ChatProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
}
