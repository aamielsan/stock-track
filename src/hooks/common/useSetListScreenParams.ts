import { useEffect } from 'react';
import { NavigationInjectedProps } from 'react-navigation';

interface Options {
  onRefresh: () => void;
  navigation: NavigationInjectedProps['navigation'];
}

export function useSetListScreenParams(opts: Options) {
  const { navigation, onRefresh } = opts;

  useEffect(() => {
    navigation.setParams({
      onRefresh,
    });
  }, []); // eslint-disable-line
}
