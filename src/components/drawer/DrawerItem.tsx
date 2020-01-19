import React from 'react';
import isFn from 'lodash/isFunction';
import { TouchableNativeFeedback } from 'react-native';
import { ListItem } from 'react-native-elements';

interface Props {
  screen: string;
  title: string;
  onPress: ({ screen }: { screen: string }) => void;
}

export function DrawerItem(props: Props) {
  const { screen, title, onPress } = props;

  const handleOnPress = () => {
    isFn(onPress) && onPress({ screen });
  };

  return (
    <TouchableNativeFeedback key={screen} onPress={handleOnPress}>
      <ListItem title={title} bottomDivider />
    </TouchableNativeFeedback>
  );
}
