import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

export const CustomText = (props: TextProps) => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
  {props.children}
  </Text>
);
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Bricolage-Regular',
  },
});

