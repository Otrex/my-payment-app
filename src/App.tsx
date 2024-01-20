/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {logger} from './lib/core/Logger';
import PayApp from './lib/core/PaycomApp';
import {LoadingState} from './dtos/enums';
import Onboarding from './components/Onboarding';
import LoadingScreen from './components/Loader/LoadingScreen';
import {ThemeProvider} from './utils/providers/ThemeProvider';
import Navigator from './Navigator';
import {AppContext, AppProviderHOC} from './utils/providers/AppProvider';
import {SafeAreaView, StyleSheet} from 'react-native';

const payApp = new PayApp();
const style = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

const App = AppProviderHOC(() => {
  const [loadingState, setLoadingState] = React.useState(LoadingState.LOADING);
  const appContext = React.useContext(AppContext);

  React.useEffect(() => {
    logger.info('init application');
    payApp.setAppStateSetter(setLoadingState);
    appContext.register(payApp);
    payApp.BeforeBootstrap();
  }, []);

  function un () {
    setLoadingState(LoadingScreen.INSTALLED);
    storage.add('autohelp').catch()

  }

  if (loadingState === LoadingState.LOADING) {
    return <LoadingScreen />;
  }

  if (loadingState === LoadingState.INSTALLING) {
    return <Onboarding onboard={un}/>;
  }

  return (
    <SafeAreaView style={style.safeArea}>
      <ThemeProvider>
        <Navigator />
      </ThemeProvider>
    </SafeAreaView>
  );
});

export default App;
