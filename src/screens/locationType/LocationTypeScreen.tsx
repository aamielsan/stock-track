import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { Container } from 'src/components/screens';
import { FCScreen } from 'src/types';
import { useLocationTypeList } from 'src/hooks/locationType/useLocationTypeList';
import { LocationTypeList } from './LocationTypeList';
import { useSetListScreenParams } from 'src/hooks/common/useSetListScreenParams';

type Props = NavigationStackScreenProps;

const LocationTypeScreen: FCScreen<Props, NavigationStackOptions> = props => {
  //Props
  const { navigation } = props;

  // Hooks
  const [list, { refetch, loading }] = useLocationTypeList();
  useSetListScreenParams({
    navigation,
    onRefresh: refetch,
  });

  // Render
  const renderList = useCallback(
    () => (
      <LocationTypeList
        data={list}
        navigation={navigation}
        keyField="id"
        titleField="name"
      />
    ),
    [list, navigation],
  );

  return (
    <Container>
      {loading ? <Text>Loading...</Text> : <View>{renderList()}</View>}
    </Container>
  );
};

LocationTypeScreen.navigationOptions = {
  title: 'Location type',
};

export default LocationTypeScreen;
