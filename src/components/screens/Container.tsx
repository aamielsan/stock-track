import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export function Container(props: Props) {
  const { children } = props;
  return <View style={styles.container}>{children}</View>;
}
