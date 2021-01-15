import React, { Fragment } from 'react';
import { Button } from '@ui-kitten/components';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';

export default () => (
  <View style={styles.wrapper}>
    <Text style={styles.wrapperTitle}>
      Bài kiểm tra
    </Text>
    <View style={styles.inlineButton}>
      <Button style={styles.btnNotDo}>Chưa làm</Button>
      <Button style={styles.btnDone}>Đã làm</Button>
    </View>
  </View>
)