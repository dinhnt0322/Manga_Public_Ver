import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { View, AsyncStorage } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@Screen/HomeScreen';
import MangaDetailScreen from '@Screen/MangaDetail';
import NavigationService from '@Service/NavigationService';

import * as commonActions from '@ReduxSaga/actions/CommonActions';
import { useDispatch } from 'react-redux';

const ProjectStack = createStackNavigator();
const Apploader = React.memo(() => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const _loadResourcesAsync = async () => {
    const { initTheme } = commonActions;
    //CheckVersion
    //CheckTheme
    let theme = await AsyncStorage.getItem('THEME');
    await dispatch(initTheme({ theme }));
    //CheckLogin
    return true;
  };
  const _onStop = () => {
    setLoading(false);
  };
  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <AppLoading startAsync={_loadResourcesAsync} onError={_onStop} onFinish={_onStop} />
      ) : (
        <NavigationContainer ref={NavigationService.navigationRef}>
          {/* {Split 2 part all screen and other part etc popupc deepLink} */}
          {/* Screen Part */}
          <ProjectStack.Navigator headerMode={'none'}>
            <ProjectStack.Screen name={'HomeScreen'} component={HomeScreen} />
            <ProjectStack.Screen name={'MangaDetailScreen'} component={MangaDetailScreen} />
          </ProjectStack.Navigator>
          {/* Other Part */}
        </NavigationContainer>
      )}
    </View>
  );
});

export default Apploader;
