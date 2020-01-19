import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationSwitchProp } from 'react-navigation';
import { NAV_APP } from 'src/constants/routes.constants';

interface Props {
  navigation: NavigationSwitchProp;
}

export default function SplashScreen(props: Props) {
  const { navigation } = props;
  useEffect(() => {
    // Check token existence
    navigation.navigate(NAV_APP);
  }, [navigation]);

  return (
    <View>
      <Text>Splash Screen</Text>
    </View>
  );
}
